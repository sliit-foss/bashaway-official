# Architecture 01 — Current State (as built, 2023–2025 platform)

This document records the platform as it exists across the six repositories,
as the baseline every ADR modifies. File references point at real paths in
`bashaway-backend` and `scorekeeper`.

## 1. System context

```mermaid
flowchart TB
    TEAM(["Team (1–4 members)<br/>one shared account"])
    ADMIN(["Organizers / Judges"])
    SPEC(["Spectators"])

    subgraph Platform
        PORTAL["Event Portal<br/><i>React + Vite (Vercel)</i><br/>registration, challenge view,<br/>submission upload, leaderboard"]
        ADMINP["Admin Portal<br/><i>React + Vite (Vercel)</i><br/>question mgmt, manual grading,<br/>settings, analytics"]
        API["Backend API<br/><i>Node/Express + Mongoose</i><br/>api.bashaway.sliitfoss.org"]
        SK["Scorekeeper<br/><i>GitHub Actions</i><br/>automated grading"]
    end

    BLOB[("Azure Blob Storage<br/>question zips + submission zips<br/>SAS-token access")]
    MONGO[("MongoDB")]
    GH["GitHub API<br/>repository_dispatch"]
    SITE["Official Site (per-year apps,<br/>Turborepo) — rules & timeline"]

    TEAM --> PORTAL
    TEAM -.reads rules.-> SITE
    ADMIN --> ADMINP
    SPEC --> PORTAL
    PORTAL --> API
    ADMINP --> API
    PORTAL -->|"direct upload<br/>(team-scoped SAS)"| BLOB
    API --> MONGO
    API -->|dispatch| GH
    GH --> SK
    SK -->|download zips| BLOB
    SK -->|"PATCH /submissions/:id<br/>x-api-key"| API
```

**Trust boundaries.** Teams authenticate with JWT; the scorekeeper→backend
channel uses a shared `x-api-key` (`middleware/auth.js`); blob access uses
container-level SAS tokens; the grading runner is a disposable
`ubuntu-22.04` GitHub-hosted VM.

## 2. Data model

```mermaid
erDiagram
    USER ||--o{ SUBMISSION : makes
    QUESTION ||--o{ SUBMISSION : receives
    USER {
        string name "unique; doubles as blob folder name"
        string email "unique"
        string password "bcrypt; complexity-validated"
        string role "ADMIN | SPECTATOR | GROUP"
        bool is_verified "email verification required"
        bool is_active
        bool eliminated "indexed; round-2 filter"
        string university "required, free text"
        array members "1..4: name, email, phone, academic_year 1-4, nic, gender, meal_preference, student_id_url"
    }
    QUESTION {
        string name "unique"
        string description
        string difficulty "EASY | MEDIUM | HARD | EXTREME"
        array constraints "free text, display only"
        number max_score "required scalar"
        bool enabled
        objectid creator
        bool creator_lock "visible only to creator"
        string codebase_url "question.zip in blob"
        bool strict_inputs "grader wipes + restores src/"
    }
    SUBMISSION {
        objectid user
        objectid question
        string link "submission.zip URL; prefix-checked"
        number score "default 0"
        objectid graded_by "admin ref (manual grading)"
        bool automatically_graded "set by scorekeeper"
    }
    SETTING {
        date submission_deadline
        date registration_deadline
        date contest_start
        date round_breakpoint "splits round 1 / round 2"
        object leaderboard "freezed, freeze_at, freeze_vanguard(3)"
    }
```

Key invariants:

- **There is no Team model** — a User with `role: GROUP` *is* the team; all
  members share credentials (stated in the public rules).
- **Score is never stored on the user.** Migration
  `20230802065917-remove_score_from_user_model` removed it; totals are
  always aggregated from submissions at query time.
- A submission is "graded" iff `graded_by != null OR automatically_graded`.

## 3. Submission → grading sequence

```mermaid
sequenceDiagram
    autonumber
    participant T as Team (portal)
    participant B as Backend API
    participant G as GitHub API
    participant W as Scorekeeper workflow<br/>(ubuntu-22.04, 5-min cap)
    participant AZ as Azure Blob

    T->>AZ: upload submission.zip (team's own folder)
    T->>B: POST /api/submissions {question, link}
    B->>B: deadline check (now < submission_deadline)
    B->>B: question exists && enabled
    B->>B: link prefix must equal team's blob folder
    B->>B: insert Submission (score 0)
    B->>G: repository_dispatch run-{env}-tests<br/>{name,email,submission_id,submission_url,question_url,question_name,strict_inputs}
    G->>W: trigger test-prod.yml / test-staging.yml → test.yml
    W->>AZ: curl submission.zip (SAS) + question.zip (SAS)
    W->>W: clean (strip __MACOSX, lockfiles, .git, out, dist, dotfiles)
    W->>W: restore — DELETE submission/test, copy question/test + jest.config.js
    alt strict_inputs
        W->>W: rm -rf submission/src; copy question/src
    end
    W->>W: pnpm install --ignore-scripts --fix-lockfile
    W->>W: dos2unix execute.sh; bash execute.sh
    W->>W: clean again (preserve out/dist); re-download question.zip;<br/>restore tests a SECOND time (anti-mutation)
    W->>W: pnpm dlx jest@29.6.2
    alt all tests pass
        W->>B: PATCH /api/submissions/{id} {automatically_graded:true} (x-api-key)
        B->>B: gradeSubmission → score ??= question.max_score
    else any test fails
        W--xW: workflow aborts — score stays 0
    end
```

The binary outcome (step 15–18) is the single most consequential property
of the current design: **full `max_score` or nothing**. The scorekeeper
cannot transmit a number; the README states "All tests must pass for a
submission to be scored."

## 4. Submission lifecycle

```mermaid
stateDiagram-v2
    [*] --> Uploaded: zip in team's blob folder
    Uploaded --> Queued: POST /submissions accepted
    Queued --> Grading: repository_dispatch received
    Grading --> Scored_Max: all jest tests pass →<br/>automatically_graded, score = max_score
    Grading --> Scored_Zero: any test fails / timeout →<br/>workflow aborts, score stays 0
    Scored_Zero --> Queued: team resubmits (unlimited, free)
    Scored_Max --> [*]
    note right of Scored_Max
        Leaderboard: best submission
        per question, ties → earliest
    end note
    Scored_Zero --> Manually_Graded: admin PATCH score (0..max_score)
    Manually_Graded --> [*]
```

## 5. Challenge anatomy (2023–2024 format)

```
challenge/
├── QUESTION.md          scenario + Constraints + Evaluation Criteria
├── question.zip         exact bundle handed to teams (stub execute.sh)
├── code/
│   ├── execute.sh       ← the ONLY file teams write (pure bash)
│   ├── package.json     pinned devDeps: jest 29.6.2, @faker-js/faker 8.0.2,
│   │                    @sliit-foss/actions-exec-wrapper, @sliit-foss/bashaway
│   ├── src/             optional input fixtures (regenerated by tests)
│   └── test/index.test.js   the grader
└── solutions/           published team zips (post-event)
```

A typical grader:

1. `beforeAll`: wipe `./src`, regenerate randomized fixtures with faker
   (random file counts/sizes/words/branches) — answers cannot be hardcoded.
2. `exec('bash execute.sh')` via `@sliit-foss/actions-exec-wrapper`,
   capture stdout; or assert side effects (`docker ps`, `kubectl get`,
   HTTP probes via axios).
3. Correctness assertions against a JS-computed oracle
   (`compactString`-normalized), or artifact reads (`out/merged.json`).
4. **Constraint block** (near-universal): `shellFiles().length === 1` and
   `=== scan('**', ['src/**']).length` (exactly one file, and it's shell);
   `dependencyCount()` equals the question's own devDep count (no extra
   packages); `restrictJavascript` / `restrictPython`; a
   `prohibitedCommands` regex; bans on invoking the grader helpers
   (`@sliit-foss`, `bashaway`); and for golf questions
   `expect(script.length).toBeLessThan(N)` over raw bytes.

## 6. Leaderboard pipeline

```mermaid
flowchart LR
    S[(Submissions)] --> F1["filter: score > 0<br/>round split by round_breakpoint<br/>eliminated filter (round 2)"]
    F1 --> F2["sort score desc,<br/>created_at asc"]
    F2 --> F3["$group by (user, question)<br/>take $first → best per question"]
    F3 --> F4["Σ per team +<br/>last_submission_time = max(created_at)"]
    F4 --> F5["rank: score desc,<br/>last_submission_time asc"]
    F5 --> F6["freeze: if freezed && now > freeze_at,<br/>mask top freeze_vanguard rows with<br/>pseudonyms + '????' scores"]
    F6 --> OUT["leaderboard rows<br/>(GROUP + verified + active only)"]
```

## 7. Anti-cheat inventory (all preserved by the evolution)

| Layer | Mechanism | Where |
|---|---|---|
| Submission origin | blob URL must start with team's own folder | backend `createSubmission` |
| Test integrity | team's `test/` deleted, question's copied — **twice** (post-execution re-restore) | scorekeeper `restore` action |
| Input integrity | `strict_inputs` wipes and restores `src/` | scorekeeper `test.yml` |
| Lifecycle-hook abuse | `pnpm install --ignore-scripts` | scorekeeper |
| Runner integrity | pinned `jest@29.6.2` via `pnpm dlx`; runner `src` restored via `git checkout` | scorekeeper |
| Artifact hygiene | clean action strips `.git`, lockfiles, `out`, dotfiles | scorekeeper |
| Resource abuse | 5-minute job timeout | scorekeeper |
| Language/dep escape | `shellFiles`, `dependencyCount`, `restrictJavascript/Python`, `prohibitedCommands` | per-question jest |
| Grading channel | `x-api-key` shared secret; the scorekeeper sends only `automatically_graded: true`, but the route accepts a numeric `score` too, and the key bypasses **all** auth and role checks platform-wide — see doc 07 F3 | backend |
| Information hiding | non-admins can only read their own submissions; leaderboard freeze | backend |

## 8. Security posture

The anti-cheat inventory above defends the *grading logic*; it does not
isolate the *runner*. Team-authored code runs as the same user, on the
same filesystem, with the same network as the scorekeeper's own
credentialed steps. Doc 07 records seven verified findings (background
processes surviving between steps, writable runner dependencies, the
global-bypass API key, browser-bundled SAS tokens, unrestricted egress,
dispatch-driven DoS, and public run titles) with an ordered fix list that
is independent of, and prerequisite to, the evolution work.

## 9. Known weaknesses this evolution addresses

1. Binary scoring + speed tiebreak + free resubmission — see ADR-0002/0006.
2. Unenforceable AI prohibition online — ADR-0001/0003.
3. Char-golf automatable — ADR-0004.
4. No cross-team similarity tooling despite published archives — ADR-0008.
5. Track-less data model blocks rubric/sub-task scoring the public rules
   already promise — ADR-0009.
6. (Hygiene, observed in the archive) several 2024 `QUESTION.md` files
   contradict their own graders (e.g. *Harsh Conditions*, *Centurion*) and
   two `package.json` name collisions — a challenge-CI lint (doc 06 §4)
   should gate future archive commits.

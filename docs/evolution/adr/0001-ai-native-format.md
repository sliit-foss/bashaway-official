# ADR-0001: Adopt an AI-native competition format

- **Status:** Proposed
- **Date:** 2026-08-20
- **Deciders:** SLIIT FOSS organizing committee
- **Supersedes:** the implicit "pure human bash" format of editions 2022–2025

## Context

Bashaway's competitive core is: teams of 1–4 write a single `execute.sh`
(pure bash) per challenge, graded by a hidden jest suite in the `scorekeeper`
GitHub-Actions pipeline. Scoring is binary — all tests pass → full
`max_score`, any failure → 0 (`score ??= maxScore` in the backend's
`gradeSubmission`; the scorekeeper can only set `automatically_graded: true`,
never a number). The leaderboard takes the best submission per question and
breaks ties by earliest submission time. Round 1 is online; round 2 is
on-campus.

Three facts, established from the challenge archive and grading code, make
this format non-viable against 2026-era AI:

1. **The tasks are one-prompt-solvable.** The 2023–2024 archive (82 graded
   challenges) is dominated by tasks of the shape "transform this input into
   that output under these constraints" — e.g. *merge two JSON files in
   under 100 characters* (reference solution: `jq -s '.[0] * .[1]'`),
   *flatten nested JSON to dot-notation*, *print total byte size of files
   under `src/`*. This is precisely the problem shape LLMs solve best. The
   harder infra challenges (nginx load balancing, Kubernetes, GitHub Actions
   under `act`) fall to a short agent loop.
2. **Round 1 is unproctorable.** A "no AI" rule cannot be verified for an
   online round. It penalizes only honest teams and converts the rule into a
   selection filter for rule-breakers.
3. **The scoring system amplifies the problem.** Binary scoring means an
   AI-generated first answer is already the maximum score; the
   earliest-time tiebreak then ranks teams by prompting latency; unlimited
   free resubmissions let teams use the hidden suite as a training oracle
   (paste the failing output into the model, regenerate, resubmit).

At the same time, the competition's identity — "the first-ever scripting and
**automation** competition" — and its infrastructure (a dispatch-driven,
sandboxed, anti-cheat-hardened grading pipeline) are assets that transfer
directly to an AI-era format.

## Decision

Bashaway becomes explicitly **AI-native**. Concretely:

1. **AI use is permitted and expected in all online events.** No online rule
   ever prohibits AI. Fairness is achieved by *leveling access* (every team
   receives identical, sponsored, metered model access — ADR-0003), not by
   prohibition.
2. **AI use is restricted only where restriction is enforceable**: the
   on-site round, on contest machines, with a controlled network
   (ADR-0007). The classic pure-bash golf format survives there, as the
   competition's protected heritage event.
3. **The scored skill shifts** from recall of shell idioms to what remains
   scarce: problem decomposition, verification, debugging under ambiguity,
   cost/budget management, and the engineering of AI systems themselves.
   This is realized through weighted scoring with robustness and efficiency
   dimensions (ADR-0002), resubmission costs and hidden variant suites
   (ADR-0006), the Prompt Golf track (ADR-0004), and the Bring-Your-Own-Agent
   track (ADR-0005).
4. **Transparency rules extend to AI artifacts.** The existing rule of
   publishing all team solutions after the event extends to prompts, agent
   harnesses, and token-usage summaries.

## Alternatives considered

### A. Ban AI everywhere, add plagiarism-style detection
Rejected. AI-output detectors are unreliable and adversarial; false
accusations against students are a reputational catastrophe; honest teams
are disadvantaged. Detection of *cross-team* similarity remains useful
(ADR-0008) but cannot distinguish "both teams asked the same model" from
"team A copied team B" — which is itself a reason to stop treating AI
assistance as cheating in online rounds.

### B. Keep the format, make challenges "AI-proof"
Rejected as a primary strategy. Any challenge that is (a) fully specified in
text and (b) automatically gradable is, by construction, machine-solvable —
the specification is the prompt. Obfuscation (riddle-wording, as in 2024's
*Scripter's Riddle*) raises the AI floor briefly but degrades the human
experience more. Elements of this survive as *hidden variant suites*
(ADR-0006), which punish overfitting rather than pretending to prevent AI.

### C. Do nothing
Rejected. The 2025 edition already ran under silent AI pressure. Continuing
converts the leaderboard into a measurement of who is most willing to break
an unenforceable rule.

## Consequences

**Positive**
- The competition measures durable skills and regains integrity: the rules
  describe what actually happens.
- "First Sri Lankan student competition with an agent track" is a strong
  marketing and sponsorship asset (model credits are a natural sponsor
  contribution).
- Existing infrastructure is preserved: the dispatch→Actions→jest pipeline
  remains the grading backbone for every track.

**Negative / costs**
- Challenge design becomes harder: authors must design for AI-in-the-loop
  (larger, under-specified, stateful problems) rather than clever one-liners.
- New infrastructure is required: the metering proxy (ADR-0003), model-runner
  job (ADR-0004), agent sandbox (ADR-0005), weighted scoring (ADR-0002).
- Scoring complexity rises; the "all tests green = max score" simplicity is
  lost (mitigated by the scoring spec in architecture doc 03).
- Sponsored model budgets introduce a real monetary operating cost per
  contestant.

**Neutral**
- The two-round structure, team model, registration flow, and publication
  tradition are unchanged.

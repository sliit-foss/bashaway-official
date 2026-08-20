# Architecture 03 — Scoring Specification

Normative specification of every score computed by the platform.
Notation: `Q` a question, `S` a submission, `T` a team.

## 1. Rubric score (all tracks)

Each question defines `rubric = [{test_pattern, weight, category, hidden}]`
(ADR-0002). After jest runs with `--json`:

```
matched(e)     = jest tests whose fullName matches e.test_pattern
passed(e)      = all tests in matched(e) passed
constraint_ok  = ∀ e with category='constraint': passed(e)

raw_score(S) = 0                                   if ¬constraint_ok
             = Σ { e.weight : passed(e) }          otherwise

max_score(Q) = Σ e.weight            (stored, kept in sync by pre-save hook)
```

Rules:

- A rubric entry matching zero jest tests ⇒ workflow **warning**, weight
  contributes 0 (drift is visible, never silently scored).
- A jest test matching no rubric entry ⇒ warning, ignored.
- `hidden: true` entries are evaluated only in the final variant pass (§5).
- Constraint entries are **gates**: one failure zeroes the submission
  regardless of other passes. All existing anti-cheat assertions
  (single shell file, dependency count, language restrictions, prohibited
  commands, golf byte limits) are authored as `category: 'constraint'`.

### Worked example — an ai-open question, max 50

| test_pattern | weight | category | result |
|---|---|---|---|
| `parses all log formats` | 15 | correctness | pass |
| `writes out/report.json` | 10 | correctness | pass |
| `handles empty input` | 5 | robustness | fail |
| `finishes under 30s` | 5 | efficiency | pass |
| `deduplicates entries` | 10 | correctness | fail |
| `dependency & language checks` | 5 | constraint | pass |

`raw_score = 15 + 10 + 5 + 5 = 35` (constraint passed → not zeroed;
constraint weight itself counts when passed).

## 2. Resubmission multiplier (ADR-0006)

Per (team, question), over **graded, non-void** submissions:

```
attempts(T,Q)   = count of graded submissions with void=false
multiplier(T,Q) = max(0.70, 1 − 0.02 × max(0, attempts − 1))
question_score(T,Q) = best_raw_score(T,Q) × multiplier(T,Q)
```

- `best_raw_score` = the maximum `raw_score` (final-pass score if one
  exists — §5). "Best" is over raw scores; the multiplier applies once,
  after selection. This keeps stored scores immutable and the policy a pure
  aggregation concern.
- Void submissions (infra failure before jest ran) never count.
- Both constants live in `Setting.resubmission_penalty` and are published
  in the rules.

Worked example: best raw 35, attempts 4 → multiplier `1 − 0.02×3 = 0.94` →
question score `32.9`.

## 3. Prompt Golf multiplier (ADR-0004)

Question defines `golf = {unit: 'bytes', full_score_at, zero_score_at}`
with `full_score_at < zero_score_at`. Let `L` = byte length of
`prompt.txt` (UTF-8, after trailing-newline trim, no other normalization —
whitespace is part of the game, exactly like today's `script.length`).

```
length_multiplier(L) = 1                                    if L ≤ full_score_at
                     = 0                                    if L ≥ zero_score_at
                     = (zero_score_at − L)
                       ─────────────────────                otherwise (linear)
                       (zero_score_at − full_score_at)

score(S) = raw_score(S) × length_multiplier(L)
```

The rubric (including constraints) applies to the **generated script** — a
prompt that produces python still gates to 0 via `restrictPython`.

Worked example: `full_score_at 80`, `zero_score_at 400`, prompt 200 bytes,
rubric 40/40 → multiplier `(400−200)/(400−80) = 0.625` → score 25. A team
that trims the prompt to 80 bytes and still passes scores 40.

## 4. Agent efficiency bands (ADR-0005)

Per agent run, with per-run budget `B` tokens (Setting `llm_budgets`), the
question's efficiency rubric entries are evaluated by the workflow (not
jest) from proxy-reported `tokens_used`:

```
remaining = B − tokens_used
band      = remaining / B
```

Recommended default entry set (weights per question author):
`band ≥ 0.5 → full efficiency weight; ≥ 0.25 → half; else 0.`
Wall-clock bands work identically from `runtime_ms`.

## 5. Final variant pass (ADR-0006)

At round close, for each (team, question) the best submission is re-run
with visible + hidden suites:

```
final_raw(S*) = Σ { e.weight : passed(e) }   over ALL rubric entries
```

- The leaderboard **prefers `final_pass` scores** where present; during the
  round, standings reflect visible-suite scores only.
- Hidden entries are typically `category: 'robustness'`; hidden constraint
  entries are allowed (e.g. a stricter prohibited-commands regex) but must
  be announced generically in the rules ("hidden tests may include
  constraint checks").

## 6. Incident track composition (ADR-0007)

```
automated(T,Q)  = rubric score with SLA multiplier:
                  × 1.0        if restored ≤ T1
                  × linear decay T1 → hard stop, floor 0.4
interview(T,Q)  = mean over judges of Σ rubric_scores   (normalized to max_score)
question_score  = 0.8 × automated + 0.2 × interview
```

Interview rubric (published, 4 items, each 0–5): root-cause correctness,
fix durability, monitoring/prevention insight, division of understanding
across the team (any member must be able to answer).

## 7. Team total and ranking (ADR-0009)

```
track_score(T, k)  = Σ_{Q ∈ track k} question_score(T,Q)
total(T)           = Σ_k Setting.tracks[k].weight × track_score(T,k)

rank: total desc, then last_submission_time asc
```

- `last_submission_time` = max `created_at` over T's **scoring**
  submissions (unchanged semantics — now a true tiebreak, since partial
  scoring makes exact total ties rare).
- Per-track sub-boards rank by `track_score` with the same tiebreak
  restricted to that track's submissions.
- Round split (`round_breakpoint`), elimination, verification filters, and
  the freeze operate exactly as today, above this computation.

### Recommended year-1 track weights

| Track | Weight | Rationale |
|---|---|---|
| ai-open | 1.0 | the core round-1 body of work |
| prompt-golf | 0.5 | signature event, but narrower skill |
| agent | 0.0 (exhibition) | ranked from year 2 |
| incident | 1.5 | the finale carries the title |
| classic | 0.75 | prestige event, own trophy besides |

## 8. Invariants (testable)

1. `0 ≤ score ≤ max_score` for every submission (backend clamp, both
   automated and manual paths).
2. Stored `raw_score` never changes after grading; every policy constant
   (penalty, weights, bands) affects aggregation only ⇒ any policy change
   is retroactively recomputable without regrading.
3. A submission failing any constraint entry scores exactly 0.
4. Removing all new fields reproduces today's behavior: default rubric
   (one entry, weight = max_score, pattern `.*` + constraint entries) makes
   the weighted pipeline emit `max_score` iff all tests pass — this is the
   backwards-compatibility test for the migration (doc 06).

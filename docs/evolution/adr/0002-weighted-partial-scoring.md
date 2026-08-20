# ADR-0002: Replace binary pass/fail with weighted partial scoring

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0001

## Context

Today the scorekeeper's `test.yml` workflow runs `pnpm dlx jest@29.6.2` and,
only if **every** test passes, executes
`node src/index.js --script update-score`, which sends
`PATCH /api/submissions/{id}` with `{ automatically_graded: true }`. The
backend's `gradeSubmission` then applies `score ??= question.max_score`. If
any test fails, the workflow aborts and the submission stays at 0. The
scorekeeper cannot transmit a numeric score at all; the `x-api-key`-guarded
route deliberately accepts only the flag.

Consequences of this design in an AI-permitted round:

- An AI's first plausible answer already achieves the maximum; there is no
  headroom to reward deeper work.
- A 95%-correct solution scores identically to an empty file, so the hidden
  suite becomes a binary oracle that teams brute-force via free resubmission.
- The earliest-time tiebreak (`last_submission_time asc` in the leaderboard
  aggregation) becomes the *primary* differentiator once many teams reach
  max score, and it measures prompting latency.
- Challenge authors express difficulty only through the pass/fail wall;
  multi-part challenges must be split into separate questions to award
  partial credit (the 2025 rules already gesture at "sub-tasks of each
  challenge" without pipeline support).

## Decision

Scoring becomes **per-test weighted**, computed by the scorekeeper and
transmitted numerically:

1. **Question model** gains a `rubric` array replacing the scalar semantics
   of `max_score` (which is retained as the computed sum for backwards
   compatibility):

   ```js
   rubric: [{
     test_pattern: String,   // regex matched against jest fullName
     weight: Number,         // points for this test / group
     category: {             // what dimension this measures
       type: String,
       enum: ['correctness', 'constraint', 'robustness', 'efficiency'],
       default: 'correctness'
     },
     hidden: Boolean         // true → runs only in the variant pass (ADR-0006)
   }]
   ```

2. **Scorekeeper** runs jest with `--json --testLocationInResults` (never
   aborting the workflow on test failure — `continue-on-error` on the jest
   step), maps each test result to a rubric entry by `test_pattern`, and
   computes `raw_score = Σ weight(passed tests)`. Unmatched tests default to
   weight 0 with a workflow warning, so a rubric/test drift is visible in
   the Actions log rather than silently mis-scoring.
3. **Constraint tests remain gate tests.** Any failed rubric entry with
   `category: 'constraint'` (the anti-cheat assertions: single shell file,
   dependency count, `restrictJavascript`/`restrictPython`,
   `prohibitedCommands`, golf length) forces `raw_score = 0` regardless of
   other passes. Partial credit must never soften the anti-cheat wall.
4. **The scorekeeper→backend contract changes** from
   `{ automatically_graded: true }` to:

   ```json
   {
     "automatically_graded": true,
     "score": 37,
     "test_report": { "passed": 9, "failed": 2, "detail_url": "<actions run URL>" },
     "runtime_ms": 41250
   }
   ```

   The backend validates `0 ≤ score ≤ max_score` (the same clamp already
   applied to manual admin grading) and continues to require the
   `x-api-key`.
5. **Efficiency scoring** (optional per question): rubric entries of
   `category: 'efficiency'` may award weight bands by measured wall-clock of
   the `execute.sh` step (already bounded by the job's 5-minute cap), e.g.
   full weight under 10 s, half under 60 s. Measured by the workflow, not by
   jest, and reported in `runtime_ms`.

## Alternatives considered

- **Keep binary scoring, split challenges into micro-questions.** Rejected:
  multiplies Azure blobs, dispatch volume, and Actions minutes by the
  sub-task count; makes the archive incoherent; still no
  robustness/efficiency dimension.
- **Score = fraction of tests passed × max_score (unweighted).** Rejected:
  test count is an accident of authoring style; authors need to make "the
  hard part" worth more than boilerplate assertions, and constraint tests
  must be gates, not fractions.
- **LLM-judge scoring of code quality.** Deferred, not rejected. An LLM
  rubric judge is attractive for the Incident Room defense interviews
  (ADR-0007) as an assist to human judges, but automated primary scoring by
  LLM is too contestable for a ranked competition in year 1.

## Consequences

**Positive** — headroom above "AI's first answer"; hidden/robustness tests
get a natural home; the tiebreak demotes from primary differentiator to
actual tiebreak; sub-task scoring matches what the public rules already
promise.

**Negative** — challenge authoring now includes rubric authoring (mitigated:
a default rubric of "every visible test weight 1, every dependency-check
test `constraint`" can be generated from the existing suites, making
migration of the 2023–2024 archive mechanical); the backend PATCH route's
attack surface grows from a boolean to a number (mitigated: clamp +
`x-api-key` + the existing rule that only the scorekeeper identity and
admins may grade).

**Neutral** — jest, the pinned-runner pattern, and the clean/restore
anti-cheat steps are unchanged.

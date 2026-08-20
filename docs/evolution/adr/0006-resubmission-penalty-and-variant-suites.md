# ADR-0006: Resubmission penalties and hidden variant test suites

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0002

## Context

Two current mechanics turn the hidden test suite into a free optimization
oracle:

1. **Unlimited free resubmissions.** The rules state "a team can submit
   multiple submissions to a single challenge, but only the submission with
   the highest mark will be considered", and the leaderboard aggregation
   (`score desc, created_at asc`, `$first` per question) implements exactly
   that. With an LLM in the loop, the optimal strategy is a tight loop:
   submit → read failure → paste into model → resubmit. Failed attempts
   cost nothing; Actions minutes and grading integrity pay the price.
2. **The full test suite is effectively observable.** Teams receive
   `question.zip` including `test/index.test.js` (the scorekeeper restores
   the canonical copy over whatever the team ships, but the *content* is
   known). Fixture randomization via faker prevents hardcoding *outputs*,
   but a solution can still overfit the exact assertions — and an LLM is an
   excellent assertion-satisfier.

## Decision

### 1. Resubmission cost

Each *failed or lower-scoring* graded attempt after the first applies a
multiplicative penalty to the question's final score:

```
final_score = best_raw_score × max(0.7, 1 − 0.02 × max(0, attempts − 1))
```

- 2% per extra attempt, floored at 70% — enough to make oracle-grinding
  costly, not enough to destroy a team that debugged honestly.
- `attempts` counts graded submissions for (team, question); infrastructure
  failures (workflow errors before jest ran) are excluded and flagged
  `void: true` by the scorekeeper.
- Implemented entirely in the leaderboard aggregation + a persisted
  `attempt_seq` on Submission (ADR-0009); raw scores remain stored
  unpenalized so the policy can be tuned or waived without regrading.

### 2. Hidden variant suites

Each question may carry a second, unpublished test suite:

- Authored alongside the visible suite; stored in a **separate private
  bucket** (`question-variants` container) never included in
  `question.zip`.
- Rubric entries with `hidden: true` (ADR-0002) belong to the variant suite,
  typically `category: 'robustness'` weights: edge-case inputs, different
  fixture distributions, larger scales, permuted flag orders.
- **When it runs:** not on every submission (that would leak it through
  score deltas). It runs in a **final scoring pass** after the round closes:
  the scorekeeper re-runs each team's *best* submission per question with
  visible + variant suites, and that result is final. During the round the
  leaderboard shows visible-suite scores; the rules state that final scores
  include hidden robustness tests.
- The existing "restore tests twice" and `strict_inputs` machinery is reused
  verbatim for the variant pass.

### 3. Rules text

Both mechanics are stated plainly in the published rules ("final scoring
includes hidden robustness tests"; "each failed attempt beyond the first
reduces that question's score by 2%, floor 70%"). Surprise is not the
mechanism — changed incentives are.

## Alternatives considered

- **Hard cap on attempts (e.g. 5).** Rejected: a hard wall punishes
  beginners debugging honest mistakes more than grinders; a soft cost
  shapes behavior without eliminating recovery.
- **Rate-limit resubmissions (cooldown).** Complementary, not sufficient: a
  10-minute cooldown per question is cheap to add at the backend
  (`createSubmission` already checks deadlines) and recommended, but alone
  it just slows the oracle loop.
- **Never reveal test code at all.** Rejected: reading the grader is part of
  Bashaway's charm and pedagogy, and the restore mechanism depends on
  shipping the harness shape.
- **Fully re-randomized grading on every run (no stable visible suite).**
  Rejected: makes honest debugging miserable and score progression noisy.

## Consequences

**Positive** — the oracle loop gets a price; overfitting to visible
assertions is penalized where it belongs (final robustness pass); Actions
minute consumption drops.

**Negative** — variant suites double challenge-authoring effort for the
questions that carry them (target: hard/extreme only in year 1); the final
scoring pass delays definitive results by up to a few hours after round
close (communicated in the timeline; the freeze mechanism the leaderboard
already has covers the suspense window nicely).

**Neutral** — no change to the submission UX; the penalty is visible in the
portal per question ("attempts: 3, current multiplier: 0.96").

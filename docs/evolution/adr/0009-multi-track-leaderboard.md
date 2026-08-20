# ADR-0009: Multi-track leaderboard and data-model changes

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0002, ADR-0004, ADR-0005, ADR-0006, ADR-0007

## Context

The current data model is track-less: Question has one `max_score`,
Submission has one `score`, and the leaderboard is a single aggregation —
best scoring submission per question (`score desc, created_at asc`,
`$first`), summed per team, ranked `score desc, last_submission_time asc`,
with round selection via `round_breakpoint` and the `eliminated` flag, and
a freeze that masks the top `freeze_vanguard` (default 3) with pseudonyms.

Five tracks with different scoring shapes (weighted rubrics, golf
multipliers, agent budgets, interview scores) must coexist without breaking
this machinery — especially the freeze, the round split, and the "score is
always derived from submissions, never stored on the user" invariant
(established by the 2023 migration that removed `score` from the user
model, and worth preserving: it makes every scoring policy change
re-computable).

## Decision

### Schema changes (all additive)

**Question**
```js
track:        { type: String,
                enum: ['ai-open', 'prompt-golf', 'agent', 'incident', 'classic'],
                default: 'ai-open', index: true },
rubric:       [RubricEntry],          // ADR-0002; max_score becomes Σ weights
variant_url:  String,                 // private variant-suite zip (ADR-0006)
golf:         { unit: { type: String, enum: ['bytes'] },  // prompt-golf only
                full_score_at: Number, zero_score_at: Number },
```

**Submission**
```js
raw_score:      Number,               // unpenalized rubric score
attempt_seq:    Number,               // per (user, question), set at insert
void:           Boolean,              // infra failure — excluded from attempts
runtime_ms:     Number,
tokens_used:    Number,               // from proxy, agent/golf runs
test_report:    { passed: Number, failed: Number, detail_url: String },
final_pass:     Boolean,              // true if scored in the variant pass
// `score` retains its meaning: the effective score used by the leaderboard
```

**Setting**
```js
tracks: [{ track: String, weight: Number, enabled: Boolean }],
agent_submission_deadline: Date,
resubmission_penalty: { per_attempt: Number, floor: Number },  // 0.02 / 0.7
llm_budgets: [{ track: String, tokens: Number }],
```

New collections: `TokenUsage` (ADR-0003), `Fingerprint` (ADR-0008),
`InterviewScore { user, question, judge, rubric_scores[], total }`
(ADR-0007, written from the admin portal's manual-grading UI).

### Leaderboard

1. The per-question aggregation is unchanged in shape but adds the
   penalty stage: after selecting the best submission per question, apply
   `× max(floor, 1 − per_attempt × (attempts − 1))` using a `$lookup`-free
   pre-computed `attempt_seq` max.
2. Team total becomes `Σ_track ( track_weight × Σ_question score )`, with
   per-track sub-boards exposed at `GET /api/leaderboard?track=…` and the
   overall board at the existing route. Track weights live in Setting so
   the committee can rebalance between editions without code changes.
3. Incident-track question scores add the interview component:
   `0.8 × automated + 0.2 × avg(InterviewScore)` at aggregation time.
4. Tiebreak stays `last_submission_time asc` but is now computed **within
   the overall total only** — with partial scoring it is a genuine tiebreak
   again rather than the primary differentiator.
5. Freeze, round split (`round_breakpoint`), elimination, and the
   spectator/GROUP/verified filters are untouched — they operate above the
   per-question stage and are indifferent to tracks.

## Alternatives considered

- **Separate Question/Submission collections per track.** Rejected:
  multiplies every route, index, and admin view; the differences are a few
  optional fields.
- **Store computed team totals.** Rejected: re-introduces the denormalized
  score the 2023 migration removed; penalty/weight tuning would require
  regrade jobs instead of being a pure aggregation change.
- **Single combined board without track weights.** Rejected: token-heavy
  tracks (agent) and interview tracks (incident) have incomparable raw
  scales; explicit weights make the exchange rate a published committee
  decision.

## Consequences

**Positive** — every scoring policy in this ADR set is expressible as an
aggregation change over immutable submissions; sub-boards give each track
its own race; all schema changes are additive, so the 2023–2024 archive and
existing admin tooling remain valid.

**Negative** — the leaderboard aggregation grows meaningfully more complex
and needs performance testing at contest scale (mitigated: it is already an
aggregation pipeline; add compound indexes on
`{question, user, score, created_at}` and `{user, question, attempt_seq}`).

**Neutral** — API shapes are extended, not changed; portals read new fields
opportunistically.

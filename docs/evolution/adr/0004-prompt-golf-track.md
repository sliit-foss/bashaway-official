# ADR-0004: Introduce the Prompt Golf track

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0001, ADR-0002, ADR-0003

## Context

Character golf is Bashaway's signature mechanic: assertions like
`expect(script.length).toBeLessThan(25)` (2023 *clockwise*) or the 100-char
JSON merge (2024 *Harsh Conditions*) forced elegant one-liners, and the golf
challenge count doubled between 2023 (5) and 2024 (8). But models golf bash
competently and can iterate against a length assertion for free, so the
mechanic no longer differentiates humans online.

The *spirit* of the mechanic — minimal input, maximal effect, an adversarial
grader counting every byte — transfers cleanly to the AI era if the golfed
artifact becomes the **prompt** rather than the script.

## Decision

Add a **Prompt Golf** track to the online round:

1. **Submission artifact:** a single `prompt.txt` (UTF-8) inside the
   standard submission zip, alongside nothing else. The team never submits a
   script.
2. **Grading flow:** a new scorekeeper job type (`run-*-prompt-tests`
   dispatch event) that:
   - downloads the question and submission zips exactly as today
     (same SAS-token, clean, restore steps);
   - sends `prompt.txt` as the sole user message to the **pinned golf
     model** via the LLM proxy (ADR-0003) with frozen parameters
     (temperature 0, fixed system prompt published in the rules, fixed
     `max_tokens`);
   - extracts the first fenced code block from the response into
     `execute.sh` (no code block → score 0);
   - proceeds through the *existing* pipeline: `bash execute.sh`, restore
     tests, jest, weighted scoring (ADR-0002).
3. **Scoring:** `score = rubric_score × length_multiplier`, where the
   multiplier decays with prompt length in *bytes* (spec in architecture doc
   03). The question's own constraint tests still apply to the generated
   script — a prompt that coaxes the model into python still scores 0 via
   `restrictPython`.
4. **Determinism policy:** temperature 0 with a pinned model snapshot;
   accepted residual nondeterminism is handled by the standing rule "best
   submission per question counts" — a team may resubmit the identical
   prompt, subject to the resubmission cost (ADR-0006).
5. **Publication:** all prompts are published post-event with the solutions
   archive. Golf prompts are the new one-liners.

## Alternatives considered

- **Golf the (prompt + generated script) combined length.** Rejected:
  double-counts the model's verbosity, which teams don't control.
- **Let teams pick any model.** Rejected: destroys comparability; the fixed
  model *is* the shared golf course.
- **Interactive multi-turn golf (dialogue budget).** Deferred to a future
  edition; single-shot keeps year-1 grading simple and the artifact
  publishable as one file.

## Consequences

**Positive** — preserves the competition's most distinctive mechanic in a
form AI strengthens rather than breaks; measures precise specification, a
genuinely new and durable skill; produces short, delightful, publishable
artifacts; reuses ~90% of the existing pipeline (only the model-call step is
new).

**Negative** — introduces a model call into the grading hot path: the
scorekeeper run becomes dependent on proxy availability and on model
snapshot stability across the contest window (mitigated: pin a dated model
snapshot; smoke-test hourly during the round). Residual nondeterminism at
temperature 0 is nonzero (accepted and disclosed in the rules).

**Neutral** — the submission-zip flow, blob layout, and leaderboard are
untouched; Prompt Golf questions are ordinary Question documents with a
`track: 'prompt-golf'` field (ADR-0009).

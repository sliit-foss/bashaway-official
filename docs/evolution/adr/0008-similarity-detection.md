# ADR-0008: Cross-team similarity detection

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0001

## Context

Bashaway already publishes every team's solutions post-event (638 archived
zips across 2023–2024), and teams cannot read each other's submissions
during the contest (`viewSubmissions` forces `filter.user = self` for
non-admins). But there is no tooling to detect collusion *during* the event
— and the AI era adds a confound: two teams prompting the same model on the
same task will produce convergent scripts *without* copying each other.
Without tooling that distinguishes these cases, organizers will either
falsely accuse or stop looking.

Prompt Golf sharpens the problem: prompts are short, and a leaked
high-scoring prompt is instantly reusable.

## Decision

Add a similarity pipeline as an **admin-portal decision-support tool** —
never an automatic penalty:

1. **Collection point:** the scorekeeper already unzips every submission; a
   new post-grading step normalizes the artifact (`execute.sh` /
   `prompt.txt`: strip comments and whitespace, canonicalize variable names
   via a token-class map) and stores `{ submission_id, sha256,
   normalized_text, minhash_signature }` to a new `Fingerprint` collection
   via the existing authenticated PATCH channel's sibling endpoint.
2. **Matching:** MinHash/LSH over character 5-gram shingles of the
   normalized text, flagging pairs above Jaccard 0.85 across *different*
   teams. Exact-hash matches flag at any length; near-matches below 40
   normalized characters are suppressed (golf one-liners legitimately
   collide — `jq -s '.[0] * .[1]'` has one canonical form).
3. **Baseline correction for AI convergence:** for each question, the
   admin view shows the *cluster size* (how many teams landed in the same
   similarity cluster). Large clusters on an easy question are evidence of
   model convergence, not collusion; the interesting signal is a
   **cluster of exactly two–three teams sharing distinctive noise** —
   identical unusual variable names, identical mistakes, identical dead
   code. The UI ranks pairs by (similarity × distinctiveness), where
   distinctiveness is inverse cluster frequency.
4. **Timing signal:** flagged pairs display submission timestamps and
   attempt sequences side by side (copy typically follows the original
   within minutes).
5. **Human adjudication only:** flags surface in the admin portal's
   existing grading UI; penalties remain a manual admin action (the manual
   grading path — admin `PATCH` with an explicit score — already exists).

## Alternatives considered

- **AI-generated-text detectors.** Rejected: unreliable, adversarial, and
  irrelevant once AI use is permitted (ADR-0001).
- **Automatic disqualification above a threshold.** Rejected: the
  convergence confound guarantees false positives; a wrong automated
  accusation against students is far worse than a missed copy.
- **Do nothing (status quo).** Rejected: with solutions published annually,
  organizers implicitly promise integrity of the ranking; the AI era makes
  "we'd notice copying" false without tooling.

## Consequences

**Positive** — collusion gets materially riskier; organizers gain a
defensible, evidence-based adjudication trail; the distinctiveness ranking
prevents the tool from drowning admins in convergence noise.

**Negative** — normalization and LSH are new code with tuning risk
(mitigated: run it in shadow mode over the published 2023–2024 archive
first — a ready-made labeled corpus of ~638 solutions where cross-team
similarity is observable and no penalties apply); storage of normalized
artifacts adds a small privacy surface (they're published post-event
anyway).

**Neutral** — no contestant-facing behavior changes; no scoring change
without human action.

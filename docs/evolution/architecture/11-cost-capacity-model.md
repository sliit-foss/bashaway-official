# Architecture 11 — Cost and Capacity Model

Parametric model for the two resources the evolution consumes that the
current format barely does: **model tokens** and **grading compute**.
Every number below is either measured from the archive (doc 08) or an
explicitly labeled assumption the committee should replace with its own.
The model is deliberately simple enough to live in a spreadsheet.

## 1. Inputs

| Symbol | Meaning | Source / default |
|---|---|---|
| `T` | registered, verified teams in round 1 | assumption: **150** |
| `F` | finalist teams in round 2 | assumption: **20** |
| `Q_A`, `Q_B`, `Q_C` | questions in tracks A / B / C (agent exhibition) | **12 / 6 / 5** |
| `S_ok` | successful solutions per (team, question) — historical | measured: 2024 mean **9.0 per challenge / 40 challenges** ≈ 0.22 per team-question at ~100 teams |
| `k` | graded attempts per successful solution (incl. failures) | assumption: **4** (unrecorded today — the archive keeps successes only; instrument this in year 1) |
| `m_job` | Actions minutes per script/golf grading job | measured cap **5**, typical **2–3** |
| `m_agent` | Actions minutes per agent run | cap **15**, typical **8** |
| `B_A`, `B_B`, `B_C` | proxy token budget per team for tracks A / B / C | assumption: **300k / 50k / 40k-per-run** |
| `p_in`, `p_out` | provider price per 1M input / output tokens | **committee inserts current sponsor rate** |
| `r_out` | output share of tokens | assumption: **0.25** |

## 2. Grading compute

```
jobs_A   = T × Q_A × attempt_rate_A          attempt_rate_A ≈ (S_ok × k) ≈ 0.9   → 150 × 12 × 0.9 ≈ 1,620 jobs
jobs_B   = T × Q_B × attempt_rate_B          golf attempts are cheaper & more numerous, assume 1.5 → 1,350 jobs
jobs_C   = A × Q_C                           A = agent participants (≤ 20) → 100 runs
final    = T × (Q_A + Q_B) × solved_share    variant pass on best submissions, solved_share ≈ 0.4 → 1,080 jobs

minutes  = (jobs_A + jobs_B + final) × m_job + jobs_C × m_agent
         ≈ (1,620 + 1,350 + 1,080) × 3 + 100 × 8
         ≈ 12,150 + 800 ≈ 13,000 Actions minutes for round 1
```

Sensitivity: the term that dominates is `k` (attempts per success). The
resubmission penalty and cooldown (ADR-0006) exist to hold `k` down; each
unit of `k` is ≈ 1,300 minutes at these sizes. Round 2 (F = 20) is
negligible by comparison and can run on on-site hardware as self-hosted
runners.

Concurrency: the historical pattern is a burst at contest start. With a
per-team concurrency cap of 1 (doc 07 F6) the ceiling is `T` simultaneous
jobs; GitHub's default org concurrency for hosted runners is far lower
for free/team plans — **the backend must queue dispatches** (doc 10 §1.2)
rather than fire-and-forget, or the org needs a paid tier / self-hosted
pool for the first hour.

## 3. Token spend

Budgets are hard caps, so worst case is exact:

```
tokens_max = T × (B_A + B_B) + A × Q_C × B_C
           = 150 × 350k + 20 × 5 × 40k
           = 52.5M + 4M = 56.5M tokens (absolute ceiling)

cost_max   = tokens_max × [ (1 − r_out) × p_in + r_out × p_out ] / 1M
```

Expected spend is well below the ceiling — teams do not exhaust budgets
uniformly. A planning factor of **0.4 × ceiling** is reasonable for a
first edition; measure and revise.

Worked illustration (replace prices): at a hypothetical blended
$3.00 per 1M tokens, the ceiling is ≈ $170 and the planning figure ≈ $70.
At $15 blended (a large-model-only allow-list) the ceiling is ≈ $850.
**The sponsorship ask is therefore the ceiling at the chosen model tier,
stated as tokens, not dollars, so it survives price changes.**

Budget sizing rule of thumb (doc 09): the reference AI-assisted solve of a
question should use ≤ ⅓ of the per-question share of `B_A`. With
`B_A = 300k` and `Q_A = 12` that is ~8k tokens per solve — enough for
several careful passes with a mid-size model, tight for brute force.

## 4. Storage and bandwidth

Median solution zip is small (the code tree is the question's ~few KB
plus `execute.sh`), but `node_modules` accidentally zipped by teams is
the historical outlier — the `clean` action strips lockfiles but not
`node_modules`, so **add `node_modules` to the clean list and reject
uploads > 5 MB at the delegated-SAS issue step** (doc 07 F4). Budget:
`T × Q × k × 100 KB ≈ 150 × 18 × 4 × 100 KB ≈ 1.1 GB` per event —
trivial.

## 5. People

| Activity | Effort | Notes |
|---|---|---|
| Challenge authoring, Track A (12 q, 4–6 with variant suites) | ~2 author-days each | reference AI-assisted solve is part of authoring (doc 09 checklist) |
| Prompt-golf questions (6) | ~0.5 day each | reuse archive graders |
| Agent exhibition set (5) | ~1.5 days each + starter-kit agent | |
| Incident scenarios (3–4) | ~3 days each incl. snapshot/reset tooling | the heaviest per-item cost |
| Defense interviews | `F × scenarios × 5 min` = 20 × 3 × 5 = 5 judge-hours | run in parallel with 3 judge pairs → < 2 h |
| Similarity review | ~2 h post-round with the ranked queue | |
| Final scoring pass supervision | ~2 h | mostly waiting on Actions |

## 6. Dials the committee controls

| Dial | Effect | Where |
|---|---|---|
| `cooldown_s`, penalty constants | attempts `k` → Actions minutes | Setting |
| Token budgets per track | ceiling spend, difficulty of budget-bounded tracks | Setting `llm_budgets` |
| Model allow-list tier | blended price, solvability | proxy config |
| Variant-suite coverage | final-pass job count, authoring effort | per-question `variant_url` |
| Agent participant cap `A` | sandbox minutes, tokens | registration |
| Self-hosted runners for round 2 | Actions minutes → ~0 for the finale | infra |

## 7. Instrumentation to add in year 1

The model's weakest inputs are `k` (attempts per success) and per-question
token use — neither exists in today's data. Both become free once the
schema changes land (`attempt_seq`, `tokens_used`); publish them with the
post-event archive so the next edition's model is measured, not assumed.

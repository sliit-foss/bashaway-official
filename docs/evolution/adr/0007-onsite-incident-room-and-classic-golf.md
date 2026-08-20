# ADR-0007: On-site round — Incident Room + protected Classic Golf

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0001

## Context

Round 2 is already on-campus (SLIIT Malabe) with elimination from round 1
(`eliminated` flag, `round_breakpoint` submission split). On-site is the
only venue where an AI restriction is *enforceable* — and also the only
venue where AI-assisted work can be *observed*, which is valuable in the
opposite direction. The finale should exploit both properties instead of
replicating the online format on campus.

The challenge archive shows the raw material for realistic operations
scenarios already exists: 2023–2024 extreme challenges stand up Docker
networks, nginx load balancers, Kubernetes clusters, git surgery, CI
pipelines under `act`, and private npm registries.

## Decision

Round 2 consists of two on-site events with opposite AI postures:

### Track D — Incident Room (AI open, observed)

- Each team receives a deliberately sabotaged environment: a k8s cluster
  with a poisoned config, a compose stack with a failing dependency chain, a
  corrupted git history blocking a release, a CI pipeline red on a subtle
  cause. Scenarios are packaged exactly like existing extreme challenges
  (project dir + jest/health-check verification), so the scorekeeper's
  grading pattern reuses directly with local runners.
- **SLA clock:** score = weighted checks restored (ADR-0002 rubric) ×
  time-band multiplier (full ≤ T1, decaying to a floor at the hard stop).
- **AI is allowed and leveled** — contest machines have the LLM proxy
  preconfigured; the room removes the proctoring problem because judges see
  *how* teams work.
- **Defense interview (20% of scenario weight):** 5 minutes per team per
  scenario — *what was broken, why does your fix hold, what would you
  monitor to catch it next time*. Scored by human judges on a 4-item
  published rubric. This is the cheapest effective control against
  outsourced understanding: a team that pasted their way to green without
  understanding fails the defense.

### Track E — Classic Golf (AI banned, enforceably)

- The traditional format, unchanged in substance: `execute.sh`, pure bash,
  char-limit assertions, hostile grader — on contest machines with network
  restricted to the submission portal + package mirrors, no model access,
  invigilated room.
- Positioned explicitly as the heritage/prestige event ("the classic
  category"), with its own trophy. What was the whole competition becomes
  its most distilled hour.
- Grading pipeline: exactly today's, untouched.

## Alternatives considered

- **All of round 2 AI-free.** Rejected: wastes the observability advantage
  and reintroduces the measurement problem (round 1 skills wouldn't carry
  into the finale).
- **All of round 2 AI-open.** Rejected: forfeits the one venue where the
  beloved classic format can survive honestly.
- **Viva/defense for online round 1 too.** Rejected on logistics (hundreds
  of teams); the interview is only feasible at finalist scale.

## Consequences

**Positive** — the finale becomes watchable (incident rooms are dramatic;
golf is tense); the AI-era and heritage identities both get a protected
home; defense interviews add an integrity backstop precisely where stakes
are highest; existing admin-portal manual grading is the natural entry
point for interview scores.

**Negative** — scenario infrastructure per team is the heaviest logistics
in the proposal (mitigated: environments are containerized snapshots,
reset-per-team, prepared as ordinary challenge repos; a dry run happens at
the awareness session, matching the existing "simulated battle" tradition);
defense interviews cost judge-hours (finalist count × scenarios × 5 min —
bounded by capping finalists, as elimination already does).

**Neutral** — round mechanics (breakpoint, elimination, freeze) are
unchanged; Track D/E scores enter the same leaderboard as distinct tracks
(ADR-0009).

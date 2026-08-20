# ADR-0005: Introduce the Bring-Your-Own-Agent track

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0001, ADR-0002, ADR-0003
- **Rollout:** exhibition event in year 1, ranked track in year 2

## Context

The most defensible competitive skill in 2026 is not writing scripts but
building systems that write and verify scripts: harness design, tool
orchestration, self-verification loops, cost control. Bashaway's grading
infrastructure — arbitrary zips executed in a disposable Actions runner
under a hard timeout, with fixture randomization and test restoration — is
unusually close to an agent-evaluation harness already.

## Decision

Add a **Bring-Your-Own-Agent (BYOA)** track:

1. **Artifact:** teams submit an *agent*, not a solution — a zip containing
   `agent/run.sh` as entry point (any language/framework inside), submitted
   **before the challenge set is revealed**. The submission deadline for
   agents precedes challenge reveal; this is enforced by a separate
   `agent_submission_deadline` in the Setting singleton.
2. **Execution:** at contest time the scorekeeper's new `run-*-agent-tests`
   job runs, per (agent × challenge):
   - unpack the challenge exactly as a human would receive it
     (`question.zip` minus `test/`);
   - run `bash agent/run.sh` inside the sandbox (architecture doc 05) with
     env vars `BASHAWAY_TASK_DIR`, `BASHAWAY_LLM_BASE_URL`,
     `BASHAWAY_LLM_KEY` (a per-run child key of the team's proxy key),
     wall-clock capped (10 min/challenge) and network restricted to the
     LLM proxy + package registries;
   - the agent must leave its answer as `execute.sh` in the task dir;
   - the standard pipeline then takes over: restore tests, jest, weighted
     scoring (ADR-0002).
3. **Budget as a scored resource:** each agent run gets an identical token
   budget enforced by the proxy (ADR-0003). Efficiency rubric entries award
   remaining-budget bands, so burn-it-all brute force is a strategy with a
   price, not a dominant move.
4. **No human in the loop:** agents run unattended; the same agent binary
   faces every challenge. Randomized fixtures (already standard via
   `@faker-js/faker` in `beforeAll`) prevent answer baking; the pre-reveal
   deadline prevents challenge-specific hardcoding.
5. **Publication:** agent harnesses are published post-event. This is the
   highest-value archive Bashaway will ever publish.

## Alternatives considered

- **Host a common agent framework and let teams submit only prompts/config.**
  Rejected as the main format (it caps the engineering ceiling), but a
  starter-kit reference agent will be published to lower the entry floor.
- **Live agent round (teams operate their agent interactively).** Rejected
  for ranking (human-in-the-loop blurs what is being measured); suitable as
  an on-site showcase.
- **Run agents on teams' own machines against an API.** Rejected: no
  isolation, no budget enforcement, trivially cheatable.

## Consequences

**Positive** — positions Bashaway at the actual frontier; the agent
sandbox generalizes the existing runner rather than replacing it;
sponsorship story is strong; the published harness archive has lasting
educational value (the stated purpose of the existing solutions archive).

**Negative** — the sandbox is the largest new engineering effort in this
proposal (isolation, egress control, per-run key issuance — architecture
doc 05); grading cost is (agents × challenges × tokens), which is why year 1
is a small exhibition set (≤5 challenges, capped participants). Failure
modes multiply (agent hangs, proxy hiccups) — mitigated by per-run
timeouts, one free re-run per agent×challenge on infrastructure failure,
and journaling every run's transcript for dispute resolution.

**Neutral** — Track A/B grading paths are untouched; BYOA questions are
Question documents with `track: 'agent'`.

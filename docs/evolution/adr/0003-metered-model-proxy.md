# ADR-0003: Provide sponsored LLM access through an organizer-run metering proxy

- **Status:** Proposed
- **Date:** 2026-08-20
- **Depends on:** ADR-0001

## Context

Once AI is permitted (ADR-0001), the deciding resource must not be a team's
wallet. Frontier-model subscriptions and API budgets vary wildly across
students; an "AI allowed, bring your own" rule replaces the unfairness of
unenforceable prohibition with the unfairness of unequal access. The
competition also needs *observability* over AI use — token counts feed the
scoring and transparency commitments — and *reproducibility* for Prompt Golf
(ADR-0004), which requires every team's prompt to hit the same model under
the same parameters.

The platform already has the shape needed to support this: a central backend
with authenticated teams, an `x-api-key` service-to-service pattern, and a
settings singleton for contest-wide configuration.

## Decision

Stand up **`bashaway-llm-proxy`**, a new service (new repository) that is the
*only* sanctioned model access path during online events:

1. **API surface:** OpenAI-compatible `POST /v1/chat/completions` plus
   Anthropic-compatible `POST /v1/messages`, so off-the-shelf SDKs and agent
   frameworks work unmodified by pointing `base_url` at the proxy. The proxy
   forwards to the sponsored upstream provider(s) with organizer-held keys.
2. **Authentication:** per-team proxy keys, issued at contest start by the
   backend (`POST /api/llm/keys`, admin-triggered batch issue), delivered in
   the event portal. Keys are scoped to the contest window
   (`contest_start` → `submission_deadline` from the Setting singleton).
3. **Budget metering:** every response's usage block is recorded to a new
   `TokenUsage` collection `{ user, track, prompt_tokens, completion_tokens,
   model, request_id, created_at }`. A team's remaining budget is
   `budget_total(track) − Σ usage`. Requests beyond budget receive
   `429 { error: "budget_exhausted" }`. Budgets are identical per team per
   track and set in the Setting singleton.
4. **Model pinning:** the proxy exposes an allow-listed model set. For
   Prompt Golf the allow-list is exactly one model with fixed parameters
   (temperature 0, fixed max tokens); for Track A and the agent track the
   list may include a small/large pair so budget strategy (when to spend on
   the big model) becomes part of the skill.
5. **Live budget meter:** the event portal shows remaining tokens per track,
   polled from `GET /api/llm/usage/self`.
6. **Transparency:** per-team aggregate usage is published post-event with
   the solutions archive, per the existing publication rule.

Teams *may* still use their own tools/accounts in Track A (an outright ban is
unenforceable online — the same logic as ADR-0001), but scoring dimensions
that reference AI cost (agent track, prompt golf) count **only** proxy usage,
and the proxy budget is calibrated to be comfortably sufficient, removing
the incentive to pay for private access.

## Alternatives considered

- **Distribute raw provider API keys to teams.** Rejected: no metering, no
  revocation granularity, keys leak to the public internet within hours,
  and post-event cost is unbounded.
- **Provide a hosted chat UI instead of an API.** Rejected as the only
  path: it breaks agent frameworks and Prompt Golf automation. A chat UI
  *frontend to the proxy* is a nice-to-have for less experienced teams.
- **No sponsored access; score AI use as bring-your-own.** Rejected:
  reintroduces the wallet gap as a ranking factor.

## Consequences

**Positive** — level access; usage observability; reproducible model calls
for golf; a concrete, attractive sponsorship line-item ("your API credits
power Bashaway"); revocation and abuse control (per-key rate limits,
contest-window scoping).

**Negative** — a new always-up service in the hot path of the online round;
it must be load-tested for the contest-start spike (mitigated: stateless
proxy + Mongo usage writes are horizontally scalable; a circuit-breaker
"grace mode" can queue usage writes). Prompt-injection/jailbreak abuse of
sponsored credits for non-contest use is possible (mitigated: contest-window
scoping, per-key rate limits, published acceptable-use rule, post-event
usage publication).

**Security notes** — upstream provider keys live only in the proxy's
environment; the proxy strips/replaces `Authorization` headers; team keys
are hashed at rest exactly like user passwords; the backend↔proxy admin
channel reuses the `x-api-key` pattern.

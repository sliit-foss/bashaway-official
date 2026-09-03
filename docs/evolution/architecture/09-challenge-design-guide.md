# Architecture 09 — Challenge Design Guide for the AI Era

For challenge authors. Everything here assumes the target platform
(docs 02–06): weighted rubrics, hidden variant suites, the LLM proxy, and
the three job types. The current authoring conventions (one `execute.sh`,
jest grader, `@sliit-foss/bashaway` helpers, faker fixtures) are kept — this
guide adds to them.

## 1. Design principles

1. **The spec is the prompt.** Whatever you write in `QUESTION.md` will be
   pasted into a model verbatim. Write it knowing that; hide difficulty in
   the *environment* and the *hidden suite*, never in obscure wording.
   (Riddle-style questions such as 2024's *Scripter's Riddle* raise the AI
   floor for minutes and the human frustration for hours.)
2. **Grade state, not strings.** A grader that probes live state
   (`docker ps`, `kubectl get`, HTTP health, git object graph) is
   verifiable only by running it — which is the work you want teams to do.
3. **Randomize structure, not just values.** Faker already varies numbers
   and words. In the hidden suite, vary the *shape*: extra JSON fields,
   permuted flag order, Windows line endings, a larger scale, a missing
   optional input.
4. **Weight the hard part.** A rubric where boilerplate assertions carry
   most points rewards the model's first draft. Put 60%+ of weight on the
   two or three assertions that require understanding.
5. **Make attempts cost something.** Assume teams will iterate with a
   model. Budget-bounded tracks (agent, golf) and the resubmission penalty
   do this platform-wide; within a challenge, prefer few, decisive
   assertions over many small ones a loop can pick off one at a time.
6. **Keep constraints as gates.** The dependency/language/single-file
   block stays `category: 'constraint'` and zeroes the submission — partial
   credit never softens anti-cheat.

## 2. Patterns that survive

| Pattern | Why it survives | Example |
|---|---|---|
| **Broken-world repair** | the fault must be *found*; the prompt can't contain what the author hid | compose stack with a wrong env var, a depends_on cycle, and a port clash — three faults, weighted separately |
| **Ordered side effects** | each stage's failure is only visible by running it | build image → create network → run → expose → health check |
| **Contract from probing** | the spec is discovered from a running service (OpenAPI at `/docs`, a schema endpoint) rather than stated | "make the client script satisfy the server at :8080" |
| **Scale cliff** | a naive solution passes visible tests and times out on the hidden one | 200-line log in `src/`; 2 M lines in the variant suite with a 60 s budget |
| **Adversarial fixtures** | the model's "obvious" parser breaks on structure it didn't see | CSV with quoted commas only in the hidden variant |
| **Budgeted resolution** (agent track) | spending is a decision | token budget sized for ~3 careful passes, not 30 |

## 3. Anti-patterns

- Pure text transforms with a full oracle in the visible test (the
  majority of the 2023–24 corpus — doc 08).
- Specification-by-obfuscation (riddles, deliberately vague wording).
- Assertions the model can satisfy without the environment
  (`expect(stdout).toBe("hello")`).
- Golf on script bytes in an AI-permitted round (move it to Prompt Golf or
  the on-site classic track).
- "Install X and print its version" — one tool call.
- Hidden suites that test *different* behavior than the visible one.
  Hidden = **harder inputs for the same contract**, never a new contract.

## 4. Challenge manifest

Every challenge carries `manifest.json` at its root; the admin portal
imports it, and the challenges-repo CI validates it.

```json
{
  "schema": 1,
  "name": "Fleet Repair",
  "track": "ai-open",
  "difficulty": "HARD",
  "strict_inputs": true,
  "rubric": [
    { "test_pattern": "^constraints ", "weight": 10, "category": "constraint" },
    { "test_pattern": "all three services report healthy", "weight": 30, "category": "correctness" },
    { "test_pattern": "gateway routes /api to the right upstream", "weight": 20, "category": "correctness" },
    { "test_pattern": "survives restart of the database", "weight": 15, "category": "robustness" },
    { "test_pattern": "completes under 90s", "weight": 5, "category": "efficiency" },
    { "test_pattern": "\\[hidden\\] ", "weight": 20, "category": "robustness", "hidden": true }
  ],
  "golf": null,
  "budget": { "tokens": null, "time_s": 300 },
  "variant_suite": "variant/index.test.js",
  "published": { "prompts": true, "solutions": true }
}
```

Rules enforced by CI: weights sum to `max_score`; every `test_pattern`
matches ≥1 test in the referenced suite (visible or variant); at least one
`constraint` entry; `golf` non-null iff `track == "prompt-golf"`.

## 5. Worked examples

### 5.1 Track A (ai-open) — "Fleet Repair" (HARD)

**QUESTION.md (excerpt)**

> The `src/fleet` compose project used to run three services behind a
> gateway. Somebody "cleaned it up". Bring it back: `docker compose up -d`
> from `src/fleet` must leave `gateway` (host port 9000), `api`, `worker`
> and `db` healthy, with `/api/*` routed to `api` and `/jobs/*` to `worker`.
> Your `execute.sh` may edit anything under `src/fleet`. Do not add
> services. Tests restart `db` mid-run; the fleet must recover without
> intervention.

**Planted faults** (author's private notes, never published):
`api` reads `DB_HOST` but compose sets `DATABASE_HOST`; `worker` has
`depends_on: worker` (self-cycle); gateway nginx `proxy_pass` points both
locations at `api`; `db` lacks a healthcheck so `depends_on: condition:
service_healthy` never fires. Hidden variant: the `db` image tag is bumped
to a version whose default auth mode changes — the "fix" of hardcoding an
old client flag fails.

**Grader skeleton**

```js
const { exec, shellFiles, scan, dependencyCount, restrictJavascript,
        restrictPython, prohibitedCommands } = require('@sliit-foss/bashaway');
const axios = require('axios');

let script;
beforeAll(async () => {
  script = require('fs').readFileSync('execute.sh', 'utf8');
  await exec('bash execute.sh');
  await exec('cd src/fleet && docker compose up -d --wait --wait-timeout 90');
}, 180000);

describe('constraints', () => {
  test('constraints single shell file', () => {
    expect(shellFiles().length).toBe(1);
    expect(scan('**', ['src/**']).length).toBe(1);
  });
  test('constraints no extra deps / languages', async () => {
    expect(await dependencyCount()).toBe(4);
    restrictJavascript(script); restrictPython(script);
    expect(script).not.toMatch(prohibitedCommands);
  });
});

test('all three services report healthy', async () => {
  const { stdout } = await exec('cd src/fleet && docker compose ps --format json');
  const rows = stdout.trim().split('\n').map(JSON.parse);
  for (const s of ['gateway', 'api', 'worker', 'db'])
    expect(rows.find(r => r.Service === s)?.Health).toBe('healthy');
});

test('gateway routes /api to the right upstream', async () => {
  expect((await axios.get('http://localhost:9000/api/whoami')).data.service).toBe('api');
  expect((await axios.get('http://localhost:9000/jobs/whoami')).data.service).toBe('worker');
});

test('survives restart of the database', async () => {
  await exec('cd src/fleet && docker compose restart db');
  await new Promise(r => setTimeout(r, 15000));
  expect((await axios.get('http://localhost:9000/api/db-ping')).status).toBe(200);
}, 60000);
```

Reference solution size: ~40 lines (mostly `sed`); expected AI-assisted
time: 20–40 minutes *with* the environment, because each fault only
surfaces after the previous one is fixed.

### 5.2 Track B (prompt-golf) — "Harsh Conditions, Reprise" (EASY)

Reuses the 2024 grader for the two-JSON deep merge unchanged. What changes
is the artifact and the published system prompt:

**Published system prompt (frozen, in the rules):**
```
You write a single bash script. Reply with exactly one ```bash fenced block and nothing else.
```

**manifest**: `"track":"prompt-golf", "golf":{"unit":"bytes","full_score_at":60,"zero_score_at":240}`.

A 2024 winning *script* was `jq -s '.[0] * .[1]' src/a.json src/b.json > out/merged.json`
(~70 B). Prompt-golf winners will be ~50–90 bytes of *English* that reliably
elicit that line, e.g.
`deep-merge src/a.json into src/b.json with jq -s, write out/merged.json, mkdir out first`
— 92 bytes, multiplier `(240−92)/(240−60) = 0.82`. Trimming to ≤60 bytes
while keeping the model reliable is the game. The constraint block
(`restrictPython`, single file) still runs against the *generated* script.

### 5.3 Track C (agent) — "Frontier Inspector" (MEDIUM, exhibition set)

Agents receive `/task` containing a small Go service with failing unit
tests and a `Makefile`. Goal: produce `execute.sh` that fixes the source so
`make test` passes, without editing the tests. Budget: 40k tokens, 10 min.

```json
"rubric": [
  { "test_pattern": "^constraints ", "weight": 10, "category": "constraint" },
  { "test_pattern": "make test passes", "weight": 50, "category": "correctness" },
  { "test_pattern": "tests unmodified", "weight": 10, "category": "constraint" },
  { "test_pattern": "budget band", "weight": 20, "category": "efficiency" },
  { "test_pattern": "\\[hidden\\] fuzz cases", "weight": 10, "category": "robustness", "hidden": true }
]
```

`tests unmodified` compares a hash of `*_test.go` before/after; `budget
band` is evaluated by the workflow from proxy usage (doc 03 §4). Authors
should verify the reference agent (published starter kit) solves it in
~15k tokens, leaving headroom for the efficiency band to differentiate.

### 5.4 Track D (incident) — "Poisoned Ingress" (on-site scenario)

Environment: a `kind` cluster per team, pre-loaded with a two-service app
behind an ingress; traffic "from customers" (a load generator) is failing
with 502s at ~30%.

Planted: an ingress annotation typo sending a fraction of traffic to a
`Service` with a wrong `targetPort`; a `HorizontalPodAutoscaler` with
`minReplicas: 0` on a chart that doesn't support it; a ConfigMap edit that
is correct but not rolled out (pods still hold the old value).

| Check | Weight | Verified by |
|---|---|---|
| error rate < 1% for 60 s | 40 | load generator's metrics endpoint |
| no pod restarts in last 5 min | 15 | `kubectl get pods -o json` |
| fix is declarative (manifests updated, not `kubectl edit`) | 15 | diff of `src/manifests` |
| SLA multiplier | ×1.0 ≤ 20 min → ×0.4 at 60 min | wall clock from scenario start |
| Defense interview | 20% of total | judge rubric (doc 03 §6) |

Interview prompts for judges: *Which of the three faults would have
recurred if you'd only restarted pods? What would you alert on?*

### 5.5 Track E (classic) — unchanged

Any 2023–2024 golf challenge, as is, on-site. The design guide has nothing
to add; the archive is the reference.

## 6. Authoring checklist

- [ ] `QUESTION.md` states the contract; difficulty lives in the
      environment / hidden suite, not the wording.
- [ ] Rubric: ≥60% weight on assertions needing understanding; constraint
      block present; weights sum to `max_score`.
- [ ] Variant suite (hard/extreme): harder inputs, same contract; tagged
      `[hidden]` in test names to match the manifest pattern.
- [ ] Reference solution committed **and** stub committed; CI runs both
      (green / red).
- [ ] Reference AI-assisted solve recorded (time, tokens) — this is your
      difficulty calibration now, more than "how long would a human take".
- [ ] For prompt-golf: system prompt is the frozen one; `full_score_at` set
      ≈ reference prompt length, `zero_score_at` ≈ 4× that.
- [ ] For agent: starter-kit agent solves it within half the budget.
- [ ] For incident: scenario resets to a clean snapshot in < 2 min.
- [ ] `manifest.json` validates; `package.json` name is unique in the
      archive.

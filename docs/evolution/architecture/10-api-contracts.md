# Architecture 10 — API Contracts and Reference Implementations

Concrete interface changes for the backend, scorekeeper, and proxy, with
reference code where the behavior is subtle. Existing routes and payloads
are quoted from the repos so diffs are unambiguous.

## 1. Backend — changed and new routes

All routes are under `/api`, behind the existing `protect` middleware
unless noted. Auth notation: **JWT** (team/admin token), **ADMIN** (JWT +
`roleProtect([ADMIN])`), **SVC** (the new scoped scorekeeper identity —
doc 07 F3; **not** the global `x-api-key` bypass).

### 1.1 `PATCH /api/submissions/:id` — grade (changed)

Today (`validations/submission.js`):
```js
submissionUpdateSchema = { score: Joi.number().optional(), automatically_graded: Joi.boolean().optional() }
```
Target:
```js
submissionUpdateSchema = {
  score:                Joi.number().min(0).optional(),
  raw_score:            Joi.number().min(0).optional(),        // SVC only
  automatically_graded: Joi.boolean().optional(),
  void:                 Joi.boolean().optional(),              // SVC only
  runtime_ms:           Joi.number().integer().min(0).optional(),
  tokens_used:          Joi.number().integer().min(0).optional(),
  final_pass:           Joi.boolean().optional(),              // SVC only
  test_report: Joi.object({
    passed:     Joi.number().integer().min(0).required(),
    failed:     Joi.number().integer().min(0).required(),
    detail_url: Joi.string().uri().required(),
    gates:      Joi.array().items(Joi.string()).default([])   // failed constraint names
  }).optional(),
  run_signature:        Joi.string().optional()                // SVC: HMAC over (id, raw_score, run_id, ts)
};
```
Semantics:
- SVC callers must supply `run_signature`; the backend recomputes the HMAC
  with `SCOREKEEPER_HMAC_SECRET` and rejects mismatches with `401`.
- `score` is clamped `0 ≤ score ≤ question.max_score` for every caller
  (the clamp already exists in `gradeSubmission`).
- ADMIN manual grading behaves exactly as today (`score` only; sets
  `graded_by`).
- `void: true` is only honored when no test ran (`test_report` absent).

### 1.2 `POST /api/submissions` — create (changed)

Body unchanged (`{question, link}`). New guards in `createSubmission`,
in this order after the existing checks:

1. Track gate: `question.track === 'agent'` requires
   `now < setting.agent_submission_deadline`; other tracks use
   `submission_deadline` (existing).
2. Cooldown: reject `429 { retry_after_s }` if the team's latest non-void
   submission for this question is younger than
   `setting.cooldown_s` (default 600).
3. Concurrency: reject `409` if the team has a submission in state
   *dispatched-but-ungraded* older than 0 s and younger than 10 min
   (i.e. one grading job per team at a time). Older than 10 min is
   treated as a lost dispatch and re-fired.
4. `attempt_seq` = 1 + count of non-void submissions for (user, question).
5. Blob pinning: `HEAD` the blob, store `etag`; the dispatch payload
   carries it.

### 1.3 `GET /api/leaderboard` — (changed, public as today)

Query: existing `round`, `ghost_legion`; new `track` (enum) — omit for the
overall board. Response rows gain `tracks: { [track]: number }` and
`attempts: number`. Freeze masking applies identically.

### 1.4 New routes

| Route | Auth | Purpose |
|---|---|---|
| `POST /api/llm/keys/issue` | ADMIN | batch-issue proxy keys for verified GROUP teams (proxies to `POST /admin/keys/batch`) |
| `GET /api/llm/usage/self` | JWT | `{ budgets: {track: {total, used, remaining}} }` for the portal meter |
| `POST /api/submissions/final-pass` | ADMIN | selects best per (team, question) with `variant_url`, dispatches with `final_pass: true` |
| `POST /api/storage/upload-url` | JWT | returns a 5-minute write-only delegated SAS for `{team}/{submission_id}/submission.zip` (doc 07 F4) |
| `GET /api/questions/:id/rubric` | JWT | rubric with hidden entries **stripped** for non-admins |
| `POST /api/fingerprints` | SVC | stores normalized artifact + minhash (ADR-0008) |
| `GET /api/fingerprints/pairs?question=` | ADMIN | similarity review queue |
| `POST /api/interviews` | ADMIN | `{ user, question, rubric_scores[4] }` (ADR-0007) |

### 1.5 Question schema (additive fields, `validations/question.js`)

```js
track:       Joi.string().valid('ai-open','prompt-golf','agent','incident','classic').default('ai-open'),
rubric:      Joi.array().items(Joi.object({
               test_pattern: Joi.string().required(),
               weight:       Joi.number().min(0).required(),
               category:     Joi.string().valid('correctness','constraint','robustness','efficiency').default('correctness'),
               hidden:       Joi.boolean().default(false)
             })).min(1).optional(),
variant_url: Joi.string().uri().optional(),
golf:        Joi.object({ unit: Joi.valid('bytes').default('bytes'),
                          full_score_at: Joi.number().integer().min(1).required(),
                          zero_score_at: Joi.number().integer().greater(Joi.ref('full_score_at')).required() })
               .when('track', { is: 'prompt-golf', then: Joi.required(), otherwise: Joi.forbidden() }),
```
Pre-save hook: if `rubric` present, `max_score = Σ weight`; if absent, a
default rubric is synthesized from `max_score` (doc 06 §1 migration) so old
questions behave identically.

## 2. Dispatch payloads (backend → scorekeeper)

Existing (`services/github.js`):
```json
{ "name", "email", "submission_id", "submission_url", "question_url", "question_name", "strict_inputs" }
```
Target — three event types, one payload shape:

```json
{
  "event_type": "run-production-tests | run-production-prompt-tests | run-production-agent-tests",
  "client_payload": {
    "submission_id": "64d2…",
    "submission_url": "https://…/{team}/{submission_id}/submission.zip",
    "submission_etag": "\"0x8DB…\"",
    "question_url": "https://…/question.zip",
    "question_id": "64c1…",
    "strict_inputs": true,
    "rubric": [ { "test_pattern": "…", "weight": 10, "category": "constraint", "hidden": false } ],
    "final_pass": false,
    "variant_url": null,
    "track": "ai-open",
    "golf": null,
    "budget": { "tokens": 40000, "time_s": 600 },
    "proxy_child_key_request": { "team": "64a0…", "track": "agent" }
  }
}
```
Removed from the payload: `name`, `email`, `question_name` (doc 07 F7 —
run names become `[{submission_id}]`). The rubric travels in the payload so
the runner never needs backend read access.

## 3. Scorekeeper — `test.yml` diff (Track A / classic)

```diff
-      - name: Execute answer script
-        run: |
-          dos2unix ./submission/execute.sh
-          cd submission && bash execute.sh
+      - name: Execute answer script (isolated)
+        id: exec
+        run: |
+          dos2unix ./submission/execute.sh
+          start=$(date +%s%3N)
+          docker run --rm --network none --pids-limit 256 --memory 2g --cpus 2 \
+            --user 1000:1000 -v "$PWD/submission:/work" -w /work \
+            ghcr.io/sliit-foss/bashaway-runner:22.04@sha256:${{ vars.RUNNER_DIGEST }} \
+            timeout --signal=KILL ${{ github.event.client_payload.budget.time_s || 240 }} bash execute.sh \
+            || echo "exit=$?" >> "$GITHUB_OUTPUT"
+          echo "runtime_ms=$(( $(date +%s%3N) - start ))" >> "$GITHUB_OUTPUT"
...
-      - name: Run tests
-        run: cd submission && pnpm dlx jest@29.6.2
+      - name: Run tests
+        id: jest
+        continue-on-error: true
+        run: cd submission && pnpm dlx jest@29.6.2 --json --outputFile=../jest-report.json --testLocationInResults
+
+      - name: Run hidden variant suite
+        if: github.event.client_payload.final_pass == true
+        continue-on-error: true
+        run: |
+          curl -L "${{ github.event.client_payload.variant_url }}?${{ secrets.VARIANT_CONTAINER_SAS_TOKEN }}" -o variant.zip
+          unzip -o variant.zip -d submission/test
+          cd submission && pnpm dlx jest@29.6.2 --json --outputFile=../jest-variant.json
+
+      - name: Compute score
+        id: score
+        run: node src/index.js --script compute-score --report jest-report.json --variant-report jest-variant.json \
+               --runtime-ms "${{ steps.exec.outputs.runtime_ms }}" --out score.json
+      - uses: actions/upload-artifact@v4
+        with: { name: score, path: score.json }
+
+  report:                                   # separate job: clean VM, never shared with untrusted code
+    needs: test
+    runs-on: ubuntu-22.04
+    steps:
+      - uses: actions/checkout@v4
+      - uses: actions/download-artifact@v4
+        with: { name: score }
+      - run: pnpm install --frozen-lockfile --prod --ignore-scripts
+      - name: Update score
+        run: node src/index.js --script update-score --submission-id "${{ github.event.client_payload.submission_id }}" --score-file score.json
+        env:
+          BASHAWAY_SERVER_URL:   ${{ secrets[format('BASHAWAY_{0}_SERVER_URL', inputs.application_environment)] }}
+          SCOREKEEPER_API_KEY:   ${{ secrets[format('SCOREKEEPER_{0}_API_KEY', inputs.application_environment)] }}
+          SCOREKEEPER_HMAC_SECRET: ${{ secrets[format('SCOREKEEPER_{0}_HMAC', inputs.application_environment)] }}
```

The `clean` / `restore` / `strict_inputs` steps stay exactly as they are.

## 4. Scorekeeper — `compute-score` reference implementation

`src/scripts/compute-score.js` (CommonJS, matching the existing scripts):

```js
const fs = require('fs');

const load = (p) => (p && fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null);

/** flatten jest --json into [{ fullName, passed }] */
const flatten = (report) =>
  (report?.testResults ?? []).flatMap((f) =>
    f.assertionResults.map((a) => ({ fullName: a.fullName, passed: a.status === 'passed' }))
  );

exports.compute = ({ rubric, visible, variant, runtimeMs, golfBytes, golf, budget, tokensUsed, finalPass }) => {
  const tests = [...flatten(visible), ...(finalPass ? flatten(variant) : [])];
  const warnings = [];
  let raw = 0, gateFailed = [], passed = 0, failed = 0;

  for (const e of rubric) {
    if (e.hidden && !finalPass) continue;                    // hidden entries only count in the final pass
    const re = new RegExp(e.test_pattern);
    const matched = tests.filter((t) => re.test(t.fullName));
    if (matched.length === 0) { warnings.push(`rubric "${e.test_pattern}" matched no tests`); continue; }
    const ok = matched.every((t) => t.passed);
    if (e.category === 'efficiency' && e.band) ok && (raw += bandWeight(e, { runtimeMs, budget, tokensUsed }));
    else if (ok) raw += e.weight;
    if (!ok && e.category === 'constraint') gateFailed.push(e.test_pattern);
    ok ? passed++ : failed++;
  }
  for (const t of tests) if (!rubric.some((e) => new RegExp(e.test_pattern).test(t.fullName)))
    warnings.push(`test "${t.fullName}" matched no rubric entry`);

  if (gateFailed.length) raw = 0;                            // constraint gates zero everything

  let multiplier = 1;
  if (golf) {                                                // prompt-golf length decay (doc 03 §3)
    const { full_score_at: f, zero_score_at: z } = golf;
    multiplier = golfBytes <= f ? 1 : golfBytes >= z ? 0 : (z - golfBytes) / (z - f);
  }
  return {
    raw_score: Math.round(raw * multiplier * 100) / 100,
    test_report: { passed, failed, gates: gateFailed },
    runtime_ms: runtimeMs, tokens_used: tokensUsed ?? 0, final_pass: !!finalPass, warnings
  };
};

const bandWeight = (e, { runtimeMs, budget, tokensUsed }) => {
  // e.band = { metric: 'runtime_ms' | 'tokens', full: x, half: y }  — full weight ≤ full, half ≤ half, else 0
  const v = e.band.metric === 'tokens' ? tokensUsed : runtimeMs;
  return v <= e.band.full ? e.weight : v <= e.band.half ? e.weight / 2 : 0;
};
```

`update-score` then posts `raw_score`, `score` (= `raw_score`; the
penalty is applied at aggregation), `test_report` (with
`detail_url = ${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/actions/runs/${GITHUB_RUN_ID}`),
`runtime_ms`, `tokens_used`, `final_pass`, and `run_signature =
HMAC_SHA256(secret, `${id}.${raw_score}.${run_id}.${ts}`)`.

Warnings are echoed as `::warning::` annotations so rubric drift is
visible on the run page (ADR-0002 rule 2).

## 5. Scorekeeper — `prompt-test.yml` (Track B)

Differences from `test.yml`, in order:

1. After `clean`: assert the submission contains **only** `prompt.txt`
   (`find submission -type f | wc -l` = 1) else `void:false, raw_score:0`.
2. `golf_bytes=$(printf %s "$(cat submission/prompt.txt)" | wc -c)`
   (trailing newline trimmed by `$(...)`).
3. Model call (via proxy, scorekeeper's own golf key):
   ```bash
   curl -s "$LLM_BASE_URL/v1/messages" -H "authorization: Bearer $GOLF_KEY" -H 'content-type: application/json' \
     -d "$(jq -n --rawfile p submission/prompt.txt --arg m "$GOLF_MODEL" \
          '{model:$m, max_tokens:1024, temperature:0,
            system:"You write a single bash script. Reply with exactly one ```bash fenced block and nothing else.",
            messages:[{role:"user",content:$p}]}')" > response.json
   ```
4. Extract: first ```` ```bash ```` … ```` ``` ```` block → `submission/execute.sh`;
   none → `raw_score: 0`, `test_report.gates: ["no-code-block"]`.
5. Copy `question/*` except `test/` over the submission (the team never
   shipped the project), then continue with the standard tail
   (`restore` → isolated execute → jest → `compute-score --golf-bytes`).
6. `tokens_used` from `response.json.usage`.

The frozen system prompt is published verbatim in the rules; changing it
between rounds is a rules change, not a config change.

## 6. Scorekeeper — `agent-test.yml` (Track C)

Matrix job over `client_payload.challenges[]` (the final-pass style
dispatch that lists every challenge for one agent). Per matrix entry:

1. Mint child key: `POST $PROXY/admin/keys/{team}/child
   {budget_override: budget.tokens, ttl_s: budget.time_s + 60}` → `KEY`.
2. `docker network create --internal bw-$RUN` + start the egress gateway
   container with the allow-list (doc 05 §2).
3. Run the agent container (doc 05 §3 contract) with
   `HTTPS_PROXY=http://gateway:8888`, `BASHAWAY_LLM_BASE_URL`,
   `BASHAWAY_LLM_KEY=$KEY`, `timeout --signal=KILL budget.time_s`.
4. Revoke child key (`DELETE /admin/keys/{id}`), read its usage →
   `tokens_used`.
5. If `/task/execute.sh` absent → `raw_score: 0`; else standard tail.
6. Journal: container logs + gateway host log uploaded as run artifacts.

## 7. LLM proxy — contract summary

| Endpoint | Auth | Request (delta from upstream) | Response (delta) |
|---|---|---|---|
| `POST /v1/messages` | team key | `model` must be allow-listed; golf keys reject `temperature`/`top_p`/`system` (`400 pinned_parameter`) | `x-bashaway-remaining-tokens` header |
| `POST /v1/chat/completions` | team key | same | same |
| `GET /v1/models` | team key | — | `{ data: [{ id, tracks: [...] }] }` |
| `POST /admin/keys/batch` | SVC | `{ teams: [{ user, track }] }` | `[{ user, key (plaintext once), id }]` |
| `POST /admin/keys/:team/child` | SVC | `{ budget_override, ttl_s }` | `{ key, id }` |
| `DELETE /admin/keys/:id` | SVC | — | `{ usage: { prompt_tokens, completion_tokens } }` |
| `GET /admin/usage?group_by=team,track` | SVC | — | aggregates |
| any, budget exceeded | — | — | `429 { error: { type: "budget_exhausted", remaining: 0 } }` |

## 8. Leaderboard aggregation — reference pipeline

Extends `getLeaderboardData` (`repository/user.js`). Stages 1–3 are the
existing ones; 4–6 are new.

```js
const penalty = (per, floor) => ({
  $max: [floor, { $subtract: [1, { $multiply: [per, { $max: [0, { $subtract: ['$attempts', 1] }] }] }] }]
});

pipeline: [
  { $match: { ...submissionFilters, score: { $gt: 0 }, void: { $ne: true } } },
  // prefer final-pass scores, then best raw, then earliest
  { $sort: { final_pass: -1, score: -1, created_at: 1 } },
  { $group: { _id: '$question', score: { $first: '$score' }, created_at: { $first: '$created_at' },
              track: { $first: '$track' }, attempts: { $max: '$attempt_seq' } } },
  { $addFields: { effective: { $multiply: ['$score', penalty(PER_ATTEMPT, FLOOR)] } } },
  { $lookup: { from: 'interviewscores', let: { q: '$_id', u: '$$userId' }, pipeline: [ /* avg total by (u,q) */ ], as: 'iv' } },
  { $addFields: { effective: { $cond: [{ $eq: ['$track', 'incident'] },
      { $add: [{ $multiply: [0.8, '$effective'] }, { $multiply: [0.2, { $ifNull: [{ $avg: '$iv.total' }, 0] }] }] },
      '$effective'] } } }
]
// outer stage: score = Σ trackWeight[track] × effective ; last_submission_time = max(created_at) ; sort as today
```

Track weights and penalty constants are read from the Setting singleton
once per request and injected as literals — the pipeline stays a pure
function of stored submissions (doc 03 §8 invariant 2).

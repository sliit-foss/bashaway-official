# Draft Competition Rules — AI-Native Edition

Contestant-facing rules text, written to be dropped into
`apps/<year>/src/components/landing/rules/data.json` (one array entry per
bullet) and expanded on the platform. Items marked **[unchanged]** are the
current 2025 rules kept verbatim in spirit. Bracketed values are committee
decisions from the Setting singleton.

## General

1. **[unchanged]** A competing team can consist of 1 to 4 members.
2. **[unchanged]** Each team registers on the competition platform; all
   members log in with the team credentials.
3. The competition has two rounds. Round 1 is online. Round 2 is held at
   the SLIIT Malabe campus for teams that qualify from round 1.
4. Each round contains named **tracks**. Every track has its own
   leaderboard; the overall leaderboard combines tracks with the published
   weights: [ai-open 1.0 · prompt-golf 0.5 · incident 1.5 · classic 0.75 ·
   agent — exhibition, unranked].
5. **[unchanged]** Points are assigned per challenge and per sub-task.
   Scores are computed automatically by the platform's test suites;
   sub-task weights are visible on each challenge page.
6. The overall winner is the team with the highest combined score; ties
   are broken by the earlier time at which the final score was reached.
7. **[unchanged]** After the competition, all submissions — scripts,
   prompts, agents, and per-team AI usage totals — are published in the
   SLIIT FOSS GitHub organization.
8. The rankings in the leaderboard are final after the final scoring pass
   (see 14).

## Use of AI

9. In **round 1 and all online events, AI tools are permitted** and their
   use is expected. Every registered team receives identical access to the
   competition's model gateway with an identical token budget per track.
   Budgets are shown live on the platform and are not extended.
10. Teams may use other AI tools or accounts in the ai-open track. Only
    gateway usage counts toward budget-based scoring, and the gateway
    budget is sized to be sufficient.
11. In the **classic track (on-site), AI tools are prohibited**. Contest
    machines are provided with network access limited to the platform.
    Use of personal devices during the classic track results in
    disqualification from that track.
12. In the **incident track (on-site), AI tools are permitted** via the
    gateway on contest machines. Each team defends its work in a short
    interview; the interview is 20% of the scenario score and any member
    may be asked any question.

## Submissions and scoring

13. **[unchanged]** A team may submit multiple times to a challenge; the
    best submission counts. However: each graded attempt after the first
    reduces that challenge's score by [2%], to a floor of [70%]. A
    [10-minute] cooldown applies between submissions to the same
    challenge. Attempts that fail due to platform error are not counted.
14. Final scores include a **hidden test pass** run after the round closes
    on each team's best submission. Hidden tests use the same contract as
    the visible tests with harder inputs and may include constraint
    checks. The leaderboard during the round shows visible-test scores
    only; the final leaderboard is published within [4 hours] of round
    close.
15. Submissions failing any constraint check (single shell file, no extra
    dependencies, no other languages, prohibited commands, length limits)
    score zero for that attempt regardless of other results.
16. **Prompt golf:** submit a `prompt.txt` only. The platform sends it to
    the pinned model with the published system prompt at temperature 0,
    extracts the first ```bash block as your script, and grades it under
    the challenge's normal tests. Score scales with prompt length in bytes
    between the challenge's published full-score and zero-score limits.
    Small run-to-run model variation is possible; resubmission rules
    apply.
17. **Agent track (exhibition):** submit your agent before the agent
    deadline, prior to the challenge reveal. Agents run unattended in the
    platform sandbox with a fixed time and token budget per challenge and
    no network access other than the gateway and package registries.
    Exhibition results are published but do not affect the overall
    leaderboard this year.

## Conduct

18. Collusion between teams — sharing solutions, prompts, or agents during
    a round — is prohibited. The platform flags similar submissions for
    human review; penalties are decided by the organizing committee after
    hearing the teams involved.
19. Attempting to interfere with the grading platform, other teams'
    submissions, or the model gateway (including attempts to exceed
    budgets or exfiltrate credentials) results in disqualification and
    may be reported to the university.
20. The organizing committee's decisions on scoring disputes are final.
    Every automated grade links to its full execution log, which is
    available to the team on request.

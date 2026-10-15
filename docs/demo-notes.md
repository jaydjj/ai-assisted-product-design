# Demo Notes

Moments, prompts, and artifacts worth replaying in the 30-minute talk.
🧑‍🎨 = designer's call · 🤖 = AI recommendation

## Talk outline (draft)
1. Baseline feature (polished but limited, backed by a richer dataset)
2. Discovery: AI investigates the data and uncovers opportunities
3. Research & roadmap: competitive patterns → Now/Next/Later
4. Live design + build: one improvement, surfacing real design-system decisions
5. Outcome: before/after + how the design system evolved

## Setup
Three branches, three URLs. Every push redeploys in about a minute.

| Branch | URL | Purpose |
|---|---|---|
| `baseline` | `/baseline/` | Frozen starting point. Never commit to it. |
| `demo` | `/demo/` | Live-demo and rehearsal branch. Reset it before every run. |
| `main` | `/` | The finished work. Never touched during the demo. |

**Reset the demo branch** (from your terminal, before each rehearsal or the real thing):
```bash
git fetch origin
git push --force origin baseline:demo
```
Then start a fresh Claude Code session on the `demo` branch. The repo's `CLAUDE.md` and docs load automatically,
so the AI starts with the same rules the finished work used.

**Docs are live pages:** `/docs/plan.html`, `/docs/design-system.html`, `/docs/decisions.html`, `/docs/opportunities.html`.
They render from the markdown in the repo at build time. Show them changing as the demo progresses.

## Runbook (30 min)

| # | Min | Beat | Live or canned | Fallback |
|---|---|---|---|---|
| 1 | 0–3 | **Baseline.** Open `/demo/`. "Polished, limited, and the data knows more." Show `src/data/projects.json` briefly. | Live (static) | — |
| 2 | 3–9 | **Discovery.** Prompt P1. AI computes signals and reports what the table hides. | Live. Reliable: it's arithmetic on JSON. Output varies in wording, not substance. | `/` already shows the result; `docs/opportunities.html` has the findings. |
| 3 | 9–14 | **Research + roadmap.** Prompt P2. Show `docs/opportunities.md` appear. | Semi-live. Web search is the slow, variable part. Consider pre-running and showing the file. | `/docs/opportunities.html` on `main`. |
| 4 | 14–25 | **Build one thing.** Prompt P3 (due dates). AI asks the two design questions (relative/absolute; color). Answer them. Watch the page and `decisions.md` update. | Live. The questions are the point; the code is small. | Screenshots `five-col.png`; `/` on main. |
| 5 | 25–30 | **Outcome.** `/baseline/` vs `/demo/` (or `/`). Open `design-system.html` and `decisions.html`: what grew, who decided what. | Live (static) | — |

What is **unpredictable** live: exact wording, how many questions the AI asks (should be 1–2; `CLAUDE.md` says so),
web-search latency. What is **reliable**: the data findings, the decision logging, the deploy.

## Prompts that worked (P1–P3)

**P1 — Discovery**
> Review the Project Portfolio feature and the data behind it in `src/data/`. Identify information we collect but don't
> expose, usability problems, and quick wins achievable with existing data. Compute, don't guess: compare self-reported
> status and progress with task completion, blocker age, status age, velocity trend, dependencies and workload.
> Don't implement anything yet.

**P2 — Research + roadmap**
> Do a lightweight competitive pass on two or three products known for strong UX in this space (e.g. Linear, Asana,
> Jira). Distinguish observed patterns from your inferences and cite sources. Then write `docs/opportunities.md` as a
> Now / Next / Later roadmap: user problem, improvement, evidence, data, dependencies, value, confidence. Recommend
> priorities but leave the decision to me.

**P3 — Build one improvement**
> Implement N1 (due dates) in the table. Before adding any new visual convention, check `docs/design-system.md`; if a
> decision is undefined, ask me with two or three options and a recommendation, one or two questions at a time. Record
> my decision in `docs/decisions.md` and the usage rule in `docs/design-system.md`, then implement with tokens and push.

**Bonus (if time)** — the scalability question that reshaped the implementation:
> Will any of the NOW suggestions run into UI crowdedness, given the max and min values in the data?

## Screenshots for fallback
Kept in `docs/screenshots/`: baseline, five-column, stress data, long names.


## Moments log

### 1. Kickoff — the brief
🧑‍🎨 The designer gave Claude a detailed project brief: roles, phases, design-system rules, demo goals.
🤖 Claude proposed the Project Portfolio dashboard, a dataset with hidden tensions, and a minimal structure,
then asked for approval before building.

### 2. Changing the environment
🧑‍🎨 The designer redirected the setup: *"Can we use GitHub Pages and just make it live… I want to show this chat
plus a GitHub page that updates."* That replaced the plan of running the app locally with a public URL that
updates on every push, which works better for a live audience.

### 3. Pre-demo restyle (not part of the talk)
🧑‍🎨 Before discovery, the designer asked for a quick competitive look at modern UI and chose direction A
("quiet precision", keep Inter). Recorded as D-001. The `baseline` branch was moved forward to include it, so
before/after in the demo differs only in what gets built live, not in visual polish.

### 4. Discovery + roadmap
🤖 Prompt: *"go"* after setup. Claude computed per-project signals (status vs. task %, blocker age, status age,
velocity trend, dependents, workload) and ran a three-product pass (Linear, Asana, Jira). Output: `docs/opportunities.md`.
Key reusable line: Linear deliberately keeps health human-judged; our data shows humans lag. → product-policy question X2.

### 5. The scalability question
🧑‍🎨 *"Will any of the NOW suggestions run into UI crowdedness based on the max and mins of the data?"*
🤖 Measured the extremes, concluded columns alone would hit 9, proposed 5 columns + secondary line. Designer agreed.
Good moment: designer's question reshaped the implementation before any code.

### 6. Two design-system decisions, asked one at a time
🤖 Asked: (1) relative vs absolute dates, (2) whether dates get color. Recommended 1c/2a with tradeoffs.
🧑‍🎨 Chose 1c, 2a. → D-002, D-003. Logged AI defaults separately as D-004.
Then built it, found two bugs in the screenshot (duplicate date, "overdue" on a completed project), fixed, added `?stress` mode.

### 7. Dense-row competitive pass → three quick wins
🧑‍🎨 Asked for a second pass on developer tools and consumer products that pack information into rows.
🤖 Found the shared pattern (primary + one muted line, trailing scan target, click not hover, wrap over truncate),
recommended four quick wins, flagged one as uncertain. Designer accepted 1–3 and the wrap rule → D-005.

## Dataset tensions (presenter-only — don't reveal before discovery)
- Billing Platform Migration: says *On track, 70%*, but tasks are 22/48, it has a blocker open since Sep 24,
  no update since Sep 27, weekly velocity is falling to 0, and 3 projects depend on it.
- Mobile Checkout Redesign: *On track, 85%*, due Oct 18 (3 days away) with 2 open blockers.
- Enterprise SSO: says *At risk*, but its blocker was resolved and velocity is rising (a stale status the other way).
- Data Warehouse Consolidation: past its due date (Sep 30); Customer Health Score is on hold waiting on it.
- Maya Chen owns 2 projects and is on the team of 6, including the critical Billing migration.
- Two projects have no due date (empty-state question).
- Three names are long on purpose (SSO, Data Warehouse, Notifications) so the wrap rule (D-005) is visible with real data.
- Priority exists (4 critical) but the table ignores it; rows are in arbitrary order.
- The table scrolls sideways on mobile.

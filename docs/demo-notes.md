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
- **Live site:** https://jaydjj.github.io/ai-assisted-product-design/ (current) and `/baseline/` (start).
  Every push to `main` redeploys in ~1 minute, so the audience can watch the page change alongside the chat.
- **Starting point:** the `baseline` branch (frozen; never commit to it).

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

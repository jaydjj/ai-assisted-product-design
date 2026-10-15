# Demo Notes

How to run the 30-minute talk, plus the prompts and moments behind it.
There are two ways to run it. The **demo player** (`/play/`) is the default: it's fast, and nothing can break on
stage. The **live path** runs a real Claude session on the `demo` branch; use it only if you want the AI working in
front of the audience.
🧑‍🎨 = designer's call · 🤖 = AI recommendation

## Talk outline (draft)
1. Baseline feature (polished but limited, backed by a richer dataset)
2. Discovery: AI investigates the data and uncovers opportunities
3. Research & roadmap: competitive patterns → Now/Next/Later
4. Live design + build: one improvement, surfacing real design-system decisions
5. Outcome: before/after + how the design system evolved

## How to run the demo (step by step)
This is the fast path: the demo player at `/play/` swaps in each step of the real build on a keypress, so nothing
waits on a live AI session or a deploy. The live path (Setup and Runbook below) is optional.

### The day before
1. Open `https://jaydjj.github.io/ai-assisted-product-design/play/` and press → four times. Each step should appear
   instantly. If a step is blank, rebuild the snapshots with `scripts/build-play.sh` and push to `main`.
2. Test your clicker: **PgDn** advances and **PgUp** goes back.
3. Have the prompts (P1–P3, below) on a slide or in your notes. You'll read them out; you won't type them.

### Ten minutes before
1. Open `/play/` full screen (F11, or ⌃⌘F on a Mac) at 100% zoom. If the room is 720p, zoom out to 90% so all
   14 rows fit; otherwise you'll have to scroll to reach the overdue Data Warehouse row.
2. Press **H** to check the key hints, then press **H** again to hide them.
3. Press **0**, so you start on the baseline.

### During the talk
Every step change shows a small label at the bottom left for about a second. Only you will notice it.

| Min | Press | You see | Say |
|---|---|---|---|
| 0–3 | **0** | Baseline: four columns, status pills, no dates | "Polished, limited, and the data knows more than the table shows." |
| 3–9 | **→** (step 1) | The same table. The UI hasn't changed yet | Read P1. Then reveal two findings from *Dataset tensions*: Billing says *On track, 70%*, but only 22 of 48 tasks are done and a blocker has been open since Sep 24. Mobile Checkout is due in 3 days with 2 blockers. |
| 9–14 | **O** | The Now / Next / Later roadmap | Read P2. "Observed patterns, kept separate from inferences, with sources." Press **A** to go back to the app. |
| 14–18 | **→** (step 2) | The first build: five columns, relative dates, a secondary line on every row | "The AI asked me two questions before building, one at a time." Press **D**: D-002 and D-003 are mine; D-004 is the AI's own default, labelled as such. Press **A**. |
| 18–21 | **→** (step 3) | Due right-aligned, a "Critical" prefix, long names wrapping | "A second competitive pass on dense rows gave three quick wins." Press **D**: D-005. Press **A**. |
| 21–25 | **→** (step 4) | Four columns, quiet rows, a red blocker count, "Due in 3 days" and "15 days overdue" | The honest moment: "I looked at step 3 and said *this is overwhelming*. The AI's first pass was more information; my eye made it better information." Hover "1 blocker" on Billing to open the card. Press **D**: D-006 to D-008. Press **S** and point at principle 5, *Show the exception, not the norm*. |
| 25–30 | **0**, then **4** | Before, then after | Flip between them twice. Press **D** on step 4: "Every decision says who made it, the designer or the AI." |

### If something goes wrong
- **Keys stop working:** click anywhere on the page, then press the key again.
- **Lost your place:** press a number key (**0**–**4**) to jump straight to that step.
- **Page went blank or you reloaded:** the address keeps your step (`/play/#2/decisions`), so a reload brings you back to the same view.
- **Whole site down:** use the screenshots in `docs/screenshots/`.

### Keys
| Key | Does |
|---|---|
| → · Space · PgDn | Next step |
| ← · PgUp | Previous step |
| 0–4 | Jump to a step |
| D · S · O | That step's Decisions · Design system · Opportunities (press again for the app) |
| A · Esc | Back to the app |
| H | Show or hide the key hints |

Steps: **0** baseline · **1** discovery + roadmap · **2** first build · **3** dense-row quick wins ·
**4** show the exception. Pressing → while you're viewing a doc shows that doc growing; the decision log opens at its
newest entry. Step 0 has no roadmap yet, so **O** stays on the app there.

## Live path (optional)

### Setup
Three branches, three URLs. Every push redeploys in about a minute.

| Branch | URL | Purpose |
|---|---|---|
| `baseline` | `/baseline/` | Frozen starting point. Never commit to it. |
| `demo-start` | — | Frozen: baseline + the deploy workflow. What `demo` is reset to. |
| `demo` | `/demo/` | Live-demo and rehearsal branch. Reset it before every run. |
| `main` | `/` | The finished work and the demo player (`/play/`). Never touched during the demo. |

**Reset the demo branch** — no terminal needed. On GitHub: **Actions → Deploy to GitHub Pages → Run workflow →
tick "Reset the demo branch" → Run.** About a minute later `demo` is back at `demo-start` and `/demo/` is rebuilt.
(Or ask Claude in the build chat to do it; it can trigger the same run.)

Then start a fresh Claude Code session at claude.ai/code on this repo, branch **`demo`**. The repo's `CLAUDE.md` and
docs load automatically, so the AI starts with the same rules the finished work used. First message:
*"We're on the demo branch. Push there, never to main."*

**Docs on the live path:** the `/docs/*.html` pages are built from `main` only, so they don't change when the demo
pushes, and they already show the finished decisions (D-001 to D-008), which give away the answers. Show the docs
from the `demo` branch on GitHub instead (for example `docs/decisions.md`), or use the player's **D** / **S** keys.

### Runbook (30 min)

| # | Min | Beat | Live or canned | Fallback |
|---|---|---|---|---|
| 1 | 0–3 | **Baseline.** Open `/demo/`. "Polished, limited, and the data knows more." Show `src/data/projects.json` briefly. | Live (static) | Player step 0 |
| 2 | 3–9 | **Discovery.** Prompt P1. AI computes signals and reports what the table hides. | Live. Reliable: it's arithmetic on JSON. Output varies in wording, not substance. | Player step 1, plus *Dataset tensions* below |
| 3 | 9–14 | **Research + roadmap.** Prompt P2. Show `docs/opportunities.md` appear on the `demo` branch. | Semi-live. Web search is the slow, variable part. Consider pre-running and showing the file. | Player step 1, then **O** |
| 4 | 14–25 | **Build one thing.** Prompt P3 (due dates). AI asks how dates should read. Answer: *"absolute normally; relative only when due within a week or overdue."* Then: *"apply that principle to everything else on the row."* Watch `/demo/` and `decisions.md` on the `demo` branch update. | Live. The principle emerging from one answer is the point. | Player step 4 |
| 5 | 25–30 | **Outcome.** `/baseline/` vs `/demo/` (or `/`). Show `decisions.md` on the `demo` branch: what grew, who decided what. | Live (static) | Player **0** then **4**, then **D** |

The live path goes straight from baseline to the final principle in one build. The player follows what actually
happened (five columns, then quick wins, then the second-guess), which takes longer but makes a better story.

What is **unpredictable** live: exact wording, how many questions the AI asks (should be 1–2; `CLAUDE.md` says so),
web-search latency. What is **reliable**: the data findings, the decision logging, the deploy.

## Prompts that worked (P1–P3)
Read these out at the matching step in the player, or type them on the live path.

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

**P3 follow-up — the principle**
> Use the absolute date normally and relative wording only when it's outside the norm: due within a week, or overdue.
> Then treat that as a principle, "show the exception, not the norm", and apply it to everything else on the row.

**Bonus (if time)** — the scalability question that reshaped the implementation:
> Will any of the NOW suggestions run into UI crowdedness, given the max and min values in the data?

## Screenshots for fallback
If the site is down, use these from `docs/screenshots/`: `baseline.png` (step 0), `five-column.png` (step 2),
`long-names.png` (step 3), `final.png` and `final-hover.png` (step 4), `status-progress-options.png` (the three
mock-ups behind D-007), and `stress-data.png` / `final-stress.png` (the `?stress` view).


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

### 8. The second-guess (the most honest moment)
🧑‍🎨 Looking at the five-column version: *"Now we have so much information this is overwhelming to look at."* Asked for
relative dates only outside norms, blocker count only (red if critical), detail on hover, and "a more modern way to
combine progress and status; can we derive meaning more simply?"
🤖 Named the principle ("show the exception, not the norm"), flagged that a red count is a new signal vocabulary (D-006),
and mocked three status+progress options instead of building one.
🧑‍🎨 Chose A and accepted the signal token. → D-006, D-007, D-008. Columns went from five back to four, with less on each row.
Worth saying on stage: the AI's first pass was *more* information; the designer's eye made it *better* information.

## Dataset tensions (presenter-only — don't reveal before discovery)
- Billing Platform Migration: says *On track, 70%*, but tasks are 22/48, it has a blocker open since Sep 24,
  no update since Sep 27, weekly velocity is falling to 0, and 3 projects depend on it.
- Mobile Checkout Redesign: *On track, 85%*, due Oct 18 (3 days away) with 2 open blockers.
- Enterprise SSO: says *At risk*, but its blocker was resolved and velocity is rising (a stale status the other way).
- Data Warehouse Consolidation: past its due date (Sep 30); Customer Health Score is on hold waiting on it.
- Maya Chen owns 2 projects and is on the team of 6, including the critical Billing migration.
- Two projects have no due date (empty-state question).
- Three names are long on purpose (SSO, Data Warehouse, Notifications) so the wrap rule (D-005) is visible with real data.
  They were lengthened at step 3, so steps 0–2 of the player and the `demo` branch still show the short names.
- Priority exists (3 critical: Billing, Audit Logging, Usage-Based Pricing), but the baseline table ignores it and its
  rows are in arbitrary order. From step 2 the rows are sorted by priority, which is why Mobile Checkout (due in 3 days)
  sits below Usage-Based Pricing.
- The table scrolls sideways on mobile.

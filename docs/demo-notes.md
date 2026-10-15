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
- **Starting point:** git tag `baseline`.

## Moments log

### 1. Kickoff — the brief
🧑‍🎨 The designer gave Claude a detailed project brief: roles, phases, design-system rules, demo goals.
🤖 Claude proposed the Project Portfolio dashboard, a dataset with hidden tensions, and a minimal structure,
then asked for approval before building.

### 2. Changing the environment
🧑‍🎨 The designer redirected the setup: *"Can we use GitHub Pages and just make it live… I want to show this chat
plus a GitHub page that updates."* That replaced the plan of running the app locally with a public URL that
updates on every push, which works better for a live audience.

## Dataset tensions (presenter-only — don't reveal before discovery)
- Billing Platform Migration: says *On track, 70%*, but tasks are 22/48, it has a blocker open since Sep 24,
  no update since Sep 27, weekly velocity is falling to 0, and 3 projects depend on it.
- Mobile Checkout Redesign: *On track, 85%*, due Oct 18 (3 days away) with 2 open blockers.
- Enterprise SSO: says *At risk*, but its blocker was resolved and velocity is rising (a stale status the other way).
- Data Warehouse Consolidation: past its due date (Sep 30); Customer Health Score is on hold waiting on it.
- Maya Chen owns 2 projects and is on the team of 6, including the critical Billing migration.
- Two projects have no due date (empty-state question).
- Priority exists (4 critical) but the table ignores it; rows are in arbitrary order.
- The table scrolls sideways on mobile.

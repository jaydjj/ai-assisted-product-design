# Opportunities — Now / Next / Later

> Living roadmap. Evidence comes from `src/data/` as of 2026-10-15 and the Phase 1 competitive pass.
> 🤖 = AI recommendation · 🧑‍🎨 = designer decision. Priorities below are recommendations until marked decided.

## NOW — existing data, no new capabilities

### N1 · Make time visible 🤖 *recommended first*
- **Problem:** Readers can't tell what's urgent. Mobile Checkout (85%, "On track") is due in 3 days with 2 blockers.
- **Improvement:** Due-date column with relative phrasing ("in 3 days", "15 days overdue", "no due date").
- **Evidence:** 2 projects overdue/near-due; no date anywhere in the UI. Asana's portfolio timeline exists for this reason.
- **Data:** `dueDate` (nullable). **Dependencies:** a date-formatting convention; an empty-state convention for null dates.
- **Value:** High. Cheapest change with the largest comprehension gain.
- **Confidence:** High. Assumes "today" is the reference date.

### N2 · Show blockers on the row 🤖
- **Problem:** "At risk" says nothing about why. Billing has a 21-day-old blocker; the table shows "On track".
- **Improvement:** Open-blocker count with age of the oldest ("2 blockers · oldest 21d").
- **Evidence:** 4 projects have open blockers; Jira Plans surfaces a blocked count for the same reason.
- **Data:** `blockers[]` with `openedOn`/`resolvedOn`. **Dependencies:** how counts/ages are displayed (badge vs. text).
- **Value:** High. **Confidence:** High.

### N3 · Order by what matters 🤖
- **Problem:** Rows are arbitrary; a critical project 15 days out sits next to a low-priority one with no date.
- **Improvement:** Default sort by priority, then due date. Optionally group or let the user sort.
- **Evidence:** `priority` exists (3 critical, 4 high) and is unused.
- **Data:** `priority`, `dueDate`. **Dependencies:** whether priority is shown or only used for ordering.
- **Value:** Medium–High. **Confidence:** High.

### N4 · Status freshness 🤖
- **Problem:** Enterprise SSO reads "At risk" from a status 37 days old; its blocker resolved weeks ago and velocity is rising.
- **Improvement:** "Updated 37d ago" beside the status; visually de-emphasise statuses older than N days.
- **Evidence:** Status age ranges 1–41 days. Linear attaches health to a dated update for this reason.
- **Data:** `statusUpdatedOn`. **Dependencies:** policy for "stale" threshold (product rule, not design).
- **Value:** Medium–High. **Confidence:** Medium; threshold is an assumption.

### N5 · Reality check on progress 🤖
- **Problem:** Self-reported 70% vs. 46% of tasks done (Billing). Three projects diverge by >10 points.
- **Improvement:** Show task-based completion next to the reported figure, or flag divergence.
- **Evidence:** `tasks.completed/total` exists for all projects. No competitor observed showing this gap.
- **Data:** `progress`, `tasks`. **Dependencies:** a convention for showing two numbers without confusion.
- **Value:** Medium. Risk of looking like we distrust owners. **Confidence:** Medium.

### N6 · Dependency hint 🤖
- **Problem:** Billing slipping quietly delays Usage-Based Pricing, Invoice Redesign and Partner Portal.
- **Improvement:** "Blocks 3" on the row; names on hover or in detail.
- **Data:** `dependsOn`. **Value:** Medium. **Confidence:** High.

### N7 · Portfolio summary strip 🤖
- **Improvement:** Counts by status above the table (9 on track · 2 at risk · 1 off track · 1 on hold · 1 done).
- **Evidence:** Asana Portfolios does this. **Value:** Low–Medium (orients, doesn't decide). **Confidence:** High.

## NEXT — modest development or validation

### X1 · Project detail view
- **Problem:** Rows lead nowhere. Blockers, dependencies, activity and team have no home.
- **Improvement:** Click a row for a side panel or page showing everything we hold.
- **Dependencies:** navigation/disclosure pattern; detail layout conventions. **Value:** High. **Confidence:** High.

### X2 · Risk signals vs. computed risk ⚠️ product decision
- **Problem:** Self-reported status is sometimes wrong (Billing) or stale (SSO).
- **Options:** (a) show signals (overdue, blockers, stale, falling velocity) beside the human status;
  (b) compute a "needs attention" flag from those signals; (c) replace status with a computed health.
- **Evidence:** Linear deliberately keeps health human-judged. Our data shows humans lag.
- **Dependencies:** 🧑‍🎨 a policy on what counts as a signal; validation with real PMs before (b)/(c).
- **Value:** High. **Confidence:** Low on thresholds; this needs the designer's call.

### X3 · Velocity trend
- **Improvement:** 6-week sparkline or "slowing/steady/accelerating" word on the row or in detail.
- **Data:** `weeklyCompleted`. **Dependencies:** a data-viz convention. **Value:** Medium. **Confidence:** Medium.

### X4 · Workload view
- **Problem:** Maya Chen is on 6 projects; Hannah and James on 5. Invisible.
- **Improvement:** Per-person load, or a warning when assigning. **Data:** `teamIds`. **Value:** Medium. **Confidence:** Medium.

### X5 · Mobile layout
- **Improvement:** Card layout under ~700px instead of a sideways-scrolling table. **Value:** Medium. **Confidence:** High.

## LATER — new data, integrations or research

- **L1 · Predicted completion date** from velocity and remaining tasks. Needs validation that velocity is meaningful.
- **L2 · Live task integration** (Jira/Linear) so progress isn't self-reported.
- **L3 · Written status updates** à la Linear, with health attached to the update, not the project.
- **L4 · Dark mode** — a token swap once the system stabilises.
- **L5 · Notifications / digests** when a project crosses a risk threshold.

## Recommended order 🤖
**N1 → N2 → N3**, then **X2** as the demo's "decision moment". N1 and N2 are small, use real data, and each raises a genuine
design-system question (date formatting, empty states, count display). X2 is where product policy and design meet.

_Decided (2026-10-15):_ 🧑‍🎨 Build N1, N2 (as a secondary line), N3, N4, N6 in a five-column layout with secondary
lines. Defer N5 and N7. Decisions D-002/D-003 cover date display.

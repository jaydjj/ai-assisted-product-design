# Plan

> One page. Where the Halcyon Project Portfolio stands, what's next, and why.
> Detail lives in [opportunities](./opportunities.html) · [design system](./design-system.html) · [decisions](./decisions.html)

## Done

| Step | Outcome |
|---|---|
| Baseline | Four-column table (name, owner, status, progress) over a dataset that knows much more. Frozen at `/baseline/`. |
| Visual direction | "Quiet precision": warm neutrals, hairline borders, dense rows, one accent. Designer's call (D-001). |
| Discovery | Computed what the table hides: stale statuses, a 21-day blocker on a critical project, three projects waiting on it, an overdue project nobody is looking at. |
| Roadmap | Now / Next / Later with evidence, data and confidence for each item. |
| First improvement | Five columns + a secondary line: due dates, blockers, dependents, status age, priority ordering. Five decisions logged (D-002 to D-005). |
| Second pass | The designer found five columns overwhelming. New principle: **show the exception, not the norm.** Dates absolute unless within a week or past; blocker count only, red on critical projects, detail on hover; progress and status merged into one cell. Four columns again, quieter rows (D-006 to D-008). |
| Design system | 8 components, 5 principles, a signal-token vocabulary, basic vs. advanced table patterns, data conventions. Rendered here, from the repo. |

## Next

### 1. The risk question (X2) — a product decision, not a visual one
Self-reported status is sometimes wrong (Billing says *On track* while slipping) or stale (SSO says *At risk* 37 days
after its blocker cleared). Three options, in increasing order of system judgement:

- **(a) Signals beside the human status** — overdue, blockers, stale, slowing velocity shown as facts. Reader decides. *(Where we are now: the red blocker count is the first signal.)*
- **(b) A "needs attention" flag** computed from those signals, shown *next to* the human status, never replacing it.
- **(c) Computed health** replacing the self-reported label.

Linear argues health must be human-judged; Asana users complain about stale manual status. We hold both kinds of
evidence. Recommendation: **(b)**, with the thresholds written down as policy and visible in the UI ("flagged because…").
*Designer decides.*

### 2. Project detail (X1)
Rows lead nowhere. Blocker titles, dependency names, team and activity have no home. A side panel keeps the table in
view; a page gives more room. Either way: **row = summary, click = detail** (already a rule).

### 3. Mobile (X5)
Under ~700px the table scrolls sideways. Replace it with a card list: name, status, due, one attention line.

## Rethinking table scalability

The five-column + secondary-line layout is tested to ~60-character names, 12 blockers and 200-day ages (`?stress`).
It is **not** tested for row count. At 50–200 projects the table needs, in order:

1. **User-controlled sort and filter** — by status, owner, priority, due. Default order stays as is.
2. **Grouping** — by priority or owner, with collapsible group headers, so priority becomes visible without a column.
3. **Density setting** — comfortable / compact, like Gmail. Secondary lines hide in compact.
4. **Column rules** — hide a column that is empty for every row; a column picker beyond six.
5. **Virtualised rows** past ~200 (only if the data ever gets there).
6. **Two table components** — `BasicTable` (flat lookup) and `DataTable` (advanced: sort, group, density, secondary
   lines), so a basic list never inherits advanced complexity.

Each of these is a design-system decision before it is code. None are needed for 14 projects.

## Later
Predicted completion from velocity · live task integration · written status updates with health attached (Linear-style)
· dark mode (token swap) · notifications when a project crosses a threshold · workload view per person.

## How the demo works
See [demo notes](./demo-notes.html): sequence, prompts, what runs live, and how to reset.

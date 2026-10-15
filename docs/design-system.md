# Design System

> Living document. It grows only when we make a real decision while building the product.
> Tokens: `src/tokens.css` · Decision history: `docs/decisions.md`

## Principles
1. **Clarity over density.** Show what someone needs to decide, not everything we know.
2. **Never rely on color alone.** Every color-coded meaning also has text.
3. **Honest data.** Label where information comes from (e.g. self-reported vs. measured).

4. **Color means state.** The interface is near-achromatic; color appears only for status, a signal, or an action.
5. **Show the exception, not the norm.** Secondary facts appear only when they are outside the norm (a date within a
   week or past; a status older than 14 days; an open blocker). A row with nothing wrong has nothing extra on it.

## Visual direction — "quiet precision" (D-001)
- Warm-tinted neutrals: near-black text (never pure black) on an off-white canvas.
- **Containment by hairline, not shadow.** Cards and tables use a 1px ring (`--ring-hairline`); no drop shadows.
- Headings use tight tracking (`--tracking-tight`); uppercase labels use wide tracking (`--tracking-caps`).
- Dense data: 13px table text, 44px rows, tabular numerals. Mono (`--font-family-mono`) for technical values.
- One accent (indigo) reserved for actions and focus. Progress fills use the text color, not the accent.
- Light mode only for now; dark mode is a token swap when we get there.

## Tokens
- Components use **semantic tokens** (`--color-text`, `--status-at-risk-fg`) and never palette tokens (`--palette-*`).
- Spacing uses the 4px scale (`--space-1` … `--space-7`).

## Components

### ProgressStatus
Progress and status in one cell (D-007): percentage left, status word right, bar colored by status.
- The status word is always present; the bar color repeats it, never replaces it.
- Both values are **self-reported** by the owner; the component does not judge them.
- Available but no longer used in the table: `StatusBadge` (pill) and `ProgressBar` (neutral bar). Use them when
  status or progress appears alone, e.g. in a detail view.

### Avatar
Initials in a circle. Decorative only: always render the person's name next to it.

### Stacked (secondary line)
A primary value with one muted 12px line beneath it. The row-level convention for "one more fact" (D-004).
- Secondary line is single-line and truncates with an ellipsis; pass `title` so the full text is on hover.
- Use for: counts, ages, absolute dates, short context. Never for a second primary value.
- A cell with no secondary content stays single-line; rows don't reserve space for it.

### DueDate
One line. The absolute date normally; relative words only outside the norm (D-002 revised): within 7 days
("Due in 3 days") or past ("15 days overdue", capped at "Overdue" past 90 days). Never colored (D-003); attention
dates use medium weight and show the absolute date on hover.
- `null` → "No due date" in subtle text. Completed → the date, in subtle text, never "overdue".

### HoverCard
Trigger text plus a card on hover or keyboard focus, for detail that doesn't earn a place in the row.
- The trigger must make sense alone ("2 blockers"); the card only adds (titles, ages, what it blocks).
- Not for primary information, and never the only way to reach something actionable.

### Signals (D-006)
A **signal** is a computed fact the system points at, distinct from self-reported status. Today there is one:
an open blocker on a critical-priority project, shown as a red count (`--signal-critical-fg`) with screen-reader
text. Signals use the `--signal-*` tokens, never `--status-*`, so the two vocabularies stay separate.

### ProjectTable
The portfolio overview. One row per project; the project name is the row header.
- Four columns: Project · Owner · Progress (with status) · Due. Extra facts go on secondary lines, not new columns.
- Default order (D-004): completed last, then priority, then nearest due date; undated after dated.
- Project name wraps to two lines. Beneath it, only the open-blocker count (red when critical); details in its hover card.
- Status age appears under the progress cell only when older than 14 days.
- Known gap: a project that blocks others but has no blockers of its own shows no dependents in the row.
- Scrolls horizontally on narrow screens (known gap: see opportunities X5).

## Table patterns

**Basic table** — a flat list to look things up.
- ≤5 columns, one line per row, no secondary lines, no default sort beyond source order.
- Use when every column is populated for most rows and no row needs "one more fact".

**Advanced table** — a working view to decide from.
- Secondary lines, a defined default order, truncation with tooltips, hover highlight, a stress-data test.
- Use when readers must prioritise, or when facts vary by row (blockers, dependents) and would leave a column mostly empty.
- Still ≤6 columns. Verbose content (blocker titles, names of dependents) belongs in a detail view, not in the row.

Rules for both:
- The entity name is the row header. **It wraps (max two lines) rather than truncates** (D-005); everything else truncates with a tooltip.
- Numbers are tabular. The **trailing column is the scan target** (dates, amounts) and is right-aligned.
- **Row = summary, click = detail.** No hover-only disclosure (Primer: use progressive disclosure sparingly).
- Hide a column that is empty for every row; show an explicit empty label when only some rows lack a value.
- A stress-data pass (`?stress`) is run before shipping a new column.

## Data conventions
- **Fixed reference date.** The dataset describes a moment (`TODAY` in `src/lib/dates.ts`); relative text is computed from it, not the clock.
- **Explicit empties.** Missing values get words ("No due date"), never a dash or blank.

## Open questions
_Undefined areas we expect to decide as we go: risk communication (X2), user-controlled sorting/filtering,
alerts vs. badges, secondary actions and detail views, responsive layout._

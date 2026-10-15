# Design System

> Living document. It grows only when we make a real decision while building the product.
> Tokens: `src/tokens.css` · Decision history: `docs/decisions.md`

## Principles
1. **Clarity over density.** Show what someone needs to decide, not everything we know.
2. **Never rely on color alone.** Every color-coded meaning also has text.
3. **Honest data.** Label where information comes from (e.g. self-reported vs. measured).

_Status: baseline drafts by AI, not yet reviewed by the designer._

## Tokens
- Components use **semantic tokens** (`--color-text`, `--status-at-risk-fg`) and never palette tokens (`--palette-*`).
- Spacing uses the 4px scale (`--space-1` … `--space-7`).

## Components

### StatusBadge
Shows a project's **self-reported** status: On track, At risk, Off track, On hold, Completed.
- Always shows a dot and a text label. Color is never the only signal.
- Communicates what the owner *said*, not a computed health score.

### ProgressBar
Percent complete with a visible numeric value.
- Requires an accessible label that names what is measured.
- Currently shows **self-reported** progress.

### Avatar
Initials in a circle. Decorative only: always render the person's name next to it.

### ProjectTable
The portfolio overview. One row per project; the project name is the row header.
- Scrolls horizontally on narrow screens (baseline behavior).

## Open questions
_Undefined areas we expect to decide as we go: risk communication, sorting/filtering, empty states,
dates, alerts vs. badges, secondary actions, responsive layout._

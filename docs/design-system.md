# Design System

> Living document. It grows only when we make a real decision while building the product.
> Tokens: `src/tokens.css` · Decision history: `docs/decisions.md`

## Principles
1. **Clarity over density.** Show what someone needs to decide, not everything we know.
2. **Never rely on color alone.** Every color-coded meaning also has text.
3. **Honest data.** Label where information comes from (e.g. self-reported vs. measured).

4. **Color means state.** The interface is near-achromatic; color appears only for status or action.

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

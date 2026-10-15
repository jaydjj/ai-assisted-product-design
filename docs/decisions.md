# Decision Log

Each entry records **who decided**, what we chose, and what we didn't choose.
- 🧑‍🎨 **Designer decision** — made by the designer, often after AI options.
- 🤖 **AI default** — set by AI during scaffolding; open to review.

---

## D-000 · Baseline conventions — 🤖 AI default
**Date:** 2026-10-15 · **Status:** Superseded in part by D-001

Set by AI to build a credible starting point before discovery:
- Five self-reported status values, shown as tinted pill badges with a dot and a label.
- One accent color for progress; status colors are reserved for status.
- Semantic token layer on top of a raw palette.
- Inter typeface, 4px spacing scale.

**Why:** A polished but deliberately limited baseline, so discovery finds gaps in *insight*, not in visual polish.

---

## D-001 · Visual direction: "quiet precision" — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Decided (pre-demo)

**Context:** Before discovery, a quick competitive pass at modern product UI (Linear, Vercel/Geist, Raycast, current
dashboard guidance). AI presented three directions; the designer chose.

**Chosen:** A — light canvas, warm near-black neutrals, hairline borders instead of shadows, tight heading tracking,
13px dense tables with tabular numerals, single indigo accent, muted status tints. Keep **Inter**.

**Alternatives considered:**
- B — Dark utility (Raycast/Linear-dark default). Rejected: harder to read on a projector; doubles token work up front.
- C — Warm editorial (serif display, softer radii). Rejected: less credible for an ops tool; took its warm neutrals only.
- Geist Sans/Mono instead of Inter. Rejected: Inter is safe, free, and already loaded.

**Rationale:** Most legible on stage; modernises the baseline with token changes alone; leaves dark mode as a roadmap item.

---

## D-002 · Due dates read relative-first, absolute beneath — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Revised by D-008

**Chosen:** "Due in 3 days" with "Oct 18" on the secondary line.
**Alternatives:** relative only (loses the real date); absolute only (reader does the arithmetic).
**Rationale:** Urgency scans fastest as words; the exact date is one glance away and uses the secondary-line convention.

## D-003 · Dates are never colored — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Decided (D-006 adds a separate signal vocabulary; dates themselves stay uncolored)

**Chosen:** Overdue/near-due dates stay in text color; the words carry the meaning.
**Alternative:** color overdue red / near-due amber. Rejected: reuses status colors for a different meaning and would
pre-empt X2 (whether the system judges risk at all). If the system later flags risk, that is where color goes.

## D-004 · Secondary line + default order — 🤖 AI default
**Date:** 2026-10-15 · **Status:** Applied, open to review

- Extra row facts go on a muted 12px line under the primary value (`Stacked`), not in new columns. Five columns max for now.
- Default order: completed last → priority → nearest due date. Priority is used for ordering but not displayed.
- Status age ("Updated 18d ago") sits under the badge; blockers and dependents sit under the project name.

## D-005 · Row headers wrap; everything else truncates — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Decided

**Context:** Competitive pass on dense rows (GitHub/Primer, Gmail, Apple HIG, Stripe, GitLab). Primer prefers wrapping
because truncation hides content; the row header is the one cell that must never hide its value.
**Chosen:** Project name wraps to a maximum of two lines; secondary lines and other cells truncate with a tooltip.
Also adopted from the same pass: trailing column right-aligned as the scan target; "Critical" named on the secondary
line so the default order is explainable.
**Alternative:** truncate everything (uniform row height). Rejected: hides the primary identifier.

---

## D-006 · Signal tokens: red blocker count on critical projects — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Decided

**Context:** Second pass on the table. The designer found the five-column version overwhelming and asked for blockers
as a count only, red when critical, with detail on hover.
**Chosen:** A new `--signal-*` token family for computed facts, distinct from `--status-*`. First use: the open-blocker
count on a critical-priority project is red, with screen-reader text so color isn't the only cue.
**Alternative:** reuse the off-track red. Rejected: status and signal would share one meaning.
**Note:** This is the first time the system points at risk rather than reporting it. It stays a fact (critical + blocked),
not a verdict; the X2 question about a computed "needs attention" flag remains open.

## D-007 · Progress and status combined in one cell — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Decided

**Options shown (mocked):** A — status-colored bar with the status word beside the percentage; B — A plus a tick for
time elapsed (progress vs. schedule); C — badge stays, bar goes.
**Chosen:** A. "Realistic and still shows the most info." Two columns become one; the status word is always present.
**Rejected:** B — derives the most meaning but is one more thing to read; kept as a later option. C — loses the scan.

## D-008 · Show the exception, not the norm — 🧑‍🎨 Designer decision
**Date:** 2026-10-15 · **Status:** Decided (new principle)

**Trigger:** "Now we have so much information this is overwhelming to look at."
**Chosen:** Secondary facts appear only outside the norm. Dates: absolute normally, relative within a week or past.
Status age: only when older than 14 days. Blockers: count only; titles, ages and dependents in a hover card.
**Policy values (product, not visual):** 7-day due window, 14-day stale threshold. Both are constants in `src/lib/dates.ts`.
**Rationale:** Rows with nothing wrong should look quiet, so the ones with something wrong stand out.

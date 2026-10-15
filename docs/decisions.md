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

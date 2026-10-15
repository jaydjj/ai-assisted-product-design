# CLAUDE.md — How we work

This repo is a small product (Halcyon **Project Portfolio** dashboard) and a living design system.
It is also the basis for a live talk on AI-assisted product design. Keep it small, honest, and working.

## Roles
- **The designer owns decisions**: product direction, UX, and design-system conventions.
- **Claude is a collaborator**: investigate, surface opportunities, compare options, recommend, implement, and record.
- Question requests when there's a real reason. Don't ask about routine implementation details.

## Before adding a component, visual convention, or interaction pattern
1. Check `docs/design-system.md` and `src/tokens.css` for an existing answer. Reuse it.
2. If an important decision is undefined, **stop and ask**: give 2–3 options with brief tradeoffs and a recommendation.
3. Wait for the designer's decision. Don't establish a convention on your own.
4. Record it in `docs/decisions.md` (who decided, rationale, alternatives) and add the usage rule to `docs/design-system.md`.
5. Implement it as reusable code that uses tokens.

Ask one or two questions at a time. Don't invent questions. Once a decision is made, apply it consistently.

**Keep product policy separate from visual design.** "What counts as at risk?" is a product/business rule.
"How does at-risk look?" is a design-system rule. Call out which one is being decided.

## Code rules
- React + Vite + TypeScript, local JSON in `src/data/`. No backend, no UI libraries, no Storybook.
- Components use **semantic tokens** from `src/tokens.css`, never raw hex values or palette tokens.
- Colocate each component's CSS next to it (`Component.tsx` + `Component.css`).
- Accessibility is part of every component: semantic HTML, text alongside color, labelled controls.

## Docs
| File | Purpose |
|---|---|
| `docs/design-system.md` | Principles, component usage rules, patterns (intent, not implementation) |
| `docs/decisions.md` | Decision log: AI recommendation vs. designer's call |
| `docs/opportunities.md` | Now / Next / Later roadmap |
| `docs/demo-notes.md` | Moments and prompts worth replaying in the talk |

Docs describe *why* and *when*. Don't duplicate what the code already says.

## Git & publishing
- `main` auto-deploys to GitHub Pages. `/baseline/` always shows the original version (tag `baseline`).
- Commit at meaningful milestones, not every change. Never move or delete the `baseline` tag.

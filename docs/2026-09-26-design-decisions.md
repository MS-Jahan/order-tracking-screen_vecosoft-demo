# Design & Implementation Decisions — Order Tracking Screen

Date: 2026-09-26
Status: Implemented

## Scope

Mobile order tracking screen (360–430px) per `docs/2026-09-26-init.md`. Three required scenarios (delayed, delivered-but-missing, pre-tracking) plus loading/error fallbacks and an evaluator switcher.

## Stack Choice

- **Vite + React 19** over Next.js App Router: single-screen demo, no routing/SSR needs. Lighter build, faster preview, same component code.
- **Tailwind v3.4** (not v4): plan specifies v3.4+ config-extension workflow; v3's `tailwind.config.js` keeps the token layer in one reviewable file.
- React 19, TypeScript strict, `framer-motion`, `lucide-react`, `clsx` + `tailwind-merge` (`cn()` in `src/lib/utils.ts`).

## Design Decisions

### Typography
- **One family: Plus Jakarta Sans** (400–800). The plan allows Inter or Plus Jakarta Sans; chose PJS for its slightly geometric, warm-neutral character matching the earthy palette. Weight range does hierarchy work; no second display face.
- Scale pinned as Tailwind tokens: `eta` 22px/800, `step` 13px/600, `micro` 11px/500.

### Palette
- Follows the brief exactly (earthy minimal): canvas `#F7F6F2`, surface white, forest `#1E3A2F` primary, amber `#D97706` strictly for delay signals, crimson `#DC2626` strictly for the missing-package flow, success `#059669`.
- Semantic discipline: amber and crimson never appear decoratively — color encodes state, nothing else.

### Layout
- Phone frame (`max-w-[430px]`, `rounded-[36px]`, shell shadow) centered on the `#F7F6F2` canvas; full-bleed below 480px viewports.
- **Frame height is viewport-bound** (`min(880px, 100dvh − desktop padding)`), and the frame is a flex column: the app content scrolls in an inner region while the evaluator bar sits at the frame bottom as a regular flex child. This replaced an earlier viewport-`fixed` bar that could fall out of view at some device heights (and sat under mobile browser chrome); the bar now also honors `env(safe-area-inset-bottom)`.
- Content left-aligned, single column, generous `px-4 py-5` rhythm.
- **Hero = status card**: forest-solid card carrying status badge, headline, ETA (with struck-through original ETA in delayed state), copyable tracking ID.

### Deliberate deviations from the plan doc
1. **Evaluator bar moved to fixed bottom** instead of a sticky top pill-bar. Rationale: the top of the shell belongs to the product UI (header + hero, the first thing an evaluator sees); a bottom-docked tray reads as a demo instrument, not app chrome, and avoids pushing the hero below the fold.
2. **Timeline ordering newest-first** with a "Show earlier updates" expand when >4 steps, instead of oldest-first + collapse. Newest-first matches how couriers' own trackers work and puts the current node in view without scrolling.
3. **Report-missing checklist is guidance, not a gate** — the report button stays enabled regardless of checkbox state, to avoid trapping an anxious user in a required-interaction loop.

### Anti-generic constraints applied
- No all-caps eyebrow labels, no middle-dot meta separators, no `→` glyphs on links, no gradient washes, no glassmorphism outside the header (which the brief itself specifies as `backdrop-blur`).
- Motion budget: pulse rings on timeline current/delayed nodes, package icon idle bounce in pre-tracking, height animations on disclosures, bottom-sheet slide. Nothing else animates. `prefers-reduced-motion` collapses all of it globally in `src/index.css`.

## Data & State

- `src/types/tracking.ts` is the single contract, written before component work started so four coding agents could run in parallel without interface drift.
- `mockOrders.ts`: three fully deterministic fixtures (fixed timestamp strings, no `Date.now()`) so every evaluator reload shows identical content.
- `useTrackingOrder()`: scenario state machine; simulated ~900ms loading latency on scenario switch, simulated ticket creation (`DS-###`) for the dispute flow with timer cleanup.

## Testing

Verification via TypeScript build (`tsc -b`) plus production build; dev-server smoke test in Docker (`node:22-slim`, glibc — the alpine/musl image breaks rolldown's native bindings) with per-scenario screenshot review at 430px and 360px.

## Post-build review fixes

A dedicated review pass (plus visual QA) caught and fixed:

1. **Timeline duplicate row** — expanded view rendered the oldest step twice (visible list + appended tail). `visible` now always slices to the visible count.
2. **Delayed fixture status** — was `IN_TRANSIT`, which left the amber "Delayed" badge branch unreachable and (before a separate fix) hid the struck-through original ETA. Fixture now `DELAYED`; strikethrough keys off `originalEta` presence.
3. **Contrast (WCAG AA)** — struck-through ETA `white/50 → white/60` on forest; "Why is this delayed?" trigger `#D97706 → amber-800` on the amber tint; proof-photo microcopy dropped its `/80` opacity.
4. **Sheet focus containment** — the report bottom sheet now traps Tab cycling and only restores focus when the trigger is still connected.
5. **Error recovery** — `setScenario` never cleared `isError`, so "Try again" stayed stuck on the error view; also, retry now re-enters the last *real* scenario (never `loading`).
6. **Small polish** — off-state notify toggle is neutral (was amber, read as "on"); copy-tracking button hidden in pre-tracking (no real tracking number yet); mug item got its own SVG (was reusing the vase); shell content gets `pb-24` so the evaluator bar never covers content; scenario-switch effect added `setIsError(false)`.

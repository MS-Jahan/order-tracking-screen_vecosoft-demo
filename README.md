# Order Tracking Screen

Mobile-first order tracking demo (360–430px) built with Vite, React 19, TypeScript, Tailwind CSS v3, framer-motion, and lucide-react.

## Run it

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run preview  # serve the production build
```

## Testing the three required states

Use the pill bar fixed at the bottom of the screen (demo-only chrome, not part of the UI):

- **Delayed** — ETA rescheduled with a struck-through original date, root-cause breakdown ("Why is this delayed?"), and a notify-on-movement toggle.
- **Not received** — delivery-verification card with proof-photo placeholder, a "before you report" checklist, and a bottom-sheet flow that files ticket `DS-892`.
- **Pre-tracking** — pre-carrier warehouse stage with a first-scan time window and a dispatch alert opt-in.
- **Loading / Error** — shimmer skeleton and a retry-able network failure view.

## Architecture

- `src/types/tracking.ts` — the single data contract (statuses, timeline steps, order context, scenario keys).
- `src/data/mockOrders.ts` — three deterministic fixtures, one per scenario.
- `src/hooks/useTrackingOrder.ts` — scenario state machine: simulated load latency, simulated dispute ticket, timer cleanup.
- `src/components/` — shell (`MobileShell`), chrome (`TrackingHeader`, `EvaluatorControls`), hero (`StatusHeroCard`), timeline (`TrackingTimeline`), edge states (`DelayedAlertCard`, `DeliveryDisputeCard`, `PreTrackingCard`), items (`OrderItemsSummary`), fallbacks (`TrackingSkeleton`, `TrackingErrorView`).
- `tailwind.config.js` — the earthy-minimal token layer (palette, type scale, shadows, keyframes).

Design decisions and deviations: `docs/2026-09-26-design-decisions.md`. Implementation plan: `docs/2026-09-26-init.md`.

import { useState } from 'react'
import { BellRing, Clock, Package } from 'lucide-react'
import type { OrderContext } from '../types/tracking'
import { cn } from '../lib/utils'

interface PreTrackingCardProps {
  order: OrderContext
}

/** Pre-carrier empty state: friendly "not scanned yet" card with an opt-in alert button. */
export function PreTrackingCard(_props: PreTrackingCardProps) {
  const [alerted, setAlerted] = useState(false)

  return (
    <section className="rounded-2xl border border-line bg-surface p-6 text-left shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-app">
        <Package className="h-6 w-6 animate-bounce-soft text-brand" strokeWidth={2} />
      </div>

      <h2 className="mt-4 text-step font-semibold text-ink">Carrier hasn't scanned your package yet</h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
        Fulfillment is underway at the warehouse. Tracking updates start after the first carrier scan.
      </p>

      <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-app px-3 py-2">
        <Clock className="h-4 w-4 shrink-0 text-ink-soft" strokeWidth={2} />
        <span className="text-micro text-ink-soft">
          Typical first scan takes 12–24 hours after dispatch.
        </span>
      </div>

      <button
        type="button"
        onClick={() => setAlerted((prev) => !prev)}
        aria-pressed={alerted}
        className={cn(
          'mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-step font-semibold transition-colors',
          alerted
            ? 'border-line bg-app text-success'
            : 'border-line bg-surface text-brand hover:bg-app',
        )}
      >
        {alerted ? <BellRing className="h-4 w-4" strokeWidth={2} /> : null}
        {alerted ? "We'll alert you" : 'Alert me when dispatch starts'}
      </button>
    </section>
  )
}

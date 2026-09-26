import { useState } from 'react'
import { CalendarDays, Check, Copy } from 'lucide-react'
import type { OrderContext, TrackingStatus } from '../types/tracking'
import { cn } from '../lib/utils'

interface StatusHeroCardProps {
  order: OrderContext
}

const badgeByStatus: Record<TrackingStatus, string> = {
  DELIVERED: 'bg-success text-white',
  DELAYED: 'bg-delayed text-white',
  PREPARING: 'bg-white/15 text-white',
  IN_TRANSIT: 'bg-white/15 text-white',
  OUT_FOR_DELIVERY: 'bg-white/15 text-white',
}

export function StatusHeroCard({ order }: StatusHeroCardProps) {
  const [copied, setCopied] = useState(false)
  const isDelayed = order.originalEta !== undefined

  const copyTrackingNumber = () => {
    try {
      void navigator.clipboard.writeText(order.trackingNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave the icon as-is.
    }
  }

  return (
    <section
      className="rounded-2xl bg-brand p-5 text-white shadow-card"
      aria-label={`Order ${order.orderId} status`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-1 text-micro',
            badgeByStatus[order.status],
          )}
        >
          {order.statusLabel}
        </span>
        <span className="text-micro text-white/70">{order.carrierName}</span>
      </div>

      <h2 className="mt-4 text-eta">{order.headline}</h2>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {isDelayed ? (
          <>
            <span className="text-step text-white/60 line-through">{order.originalEta}</span>
            <span className="inline-flex items-center rounded-full bg-amber-400/15 px-2.5 py-1 text-step text-amber-300">
              {order.eta}
            </span>
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-step text-white/85">
            <CalendarDays className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
            {order.eta}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
        <span className="text-micro text-white/70">{order.trackingNumber}</span>
        {order.activeStateKey !== 'pre_tracking' && (
          <button
            type="button"
            onClick={copyTrackingNumber}
            aria-label="Copy tracking number"
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </section>
  )
}

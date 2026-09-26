import { ChevronLeft, Headset } from 'lucide-react'
import { cn } from '../lib/utils'

interface TrackingHeaderProps {
  orderId: string
  onSupport: () => void
}

/** Sticky glassmorphic top bar inside the shell: back, order id, support. */
export function TrackingHeader({ orderId, onSupport }: TrackingHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/80 backdrop-blur-md">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          aria-label="Back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-line/60"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex min-w-0 flex-col">
          <span className="text-micro text-ink-soft">Order</span>
          <span className="truncate text-step font-semibold text-ink">{orderId}</span>
        </div>

        <button
          type="button"
          aria-label="Help"
          onClick={onSupport}
          className={cn(
            'ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
            'border border-line bg-surface text-ink-soft transition-colors hover:text-ink',
          )}
        >
          <Headset className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}

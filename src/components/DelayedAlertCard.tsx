import { useState } from 'react'
import type { ReactNode } from 'react'
import { AlertTriangle, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { OrderContext } from '../types/tracking'
import { cn } from '../lib/utils'

interface DelayedAlertCardProps {
  order: OrderContext
  notifyOnMovement: boolean
  onToggleNotify: () => void
}

const DELAY_CAUSES = [
  'Weather congestion at the regional hub',
  'Higher-than-usual package volume this week',
  'Route was rerouted for a faster path forward',
]

/** Amber warning card for the delayed scenario, with a cause disclosure and a notify toggle. */
export function DelayedAlertCard({ order, notifyOnMovement, onToggleNotify }: DelayedAlertCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="rounded-2xl border border-amber-200 bg-[#FEF3E2] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-4 w-4 text-amber-800" strokeWidth={2} />
        </span>
        <div className="min-w-0">
          <h2 className="text-step font-semibold text-ink">Delayed at the regional hub</h2>
          {order.delayReason ? (
            <p className="mt-1 text-[12px] leading-relaxed text-ink/70">{order.delayReason}</p>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="mt-3 flex w-full items-center justify-between rounded-lg px-1 py-1.5 text-left text-micro font-semibold text-amber-800 transition-colors hover:text-amber-900/70"
      >
        Why is this delayed?
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', expanded && 'rotate-180')}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="delay-causes"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="space-y-1.5 px-1 pb-1 pt-2">
              {DELAY_CAUSES.map((cause) => (
                <DelayCauseRow key={cause}>{cause}</DelayCauseRow>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-amber-200/70 pt-3">
        <span className="text-[12px] font-medium text-ink">Notify me when it moves</span>
        <button
          type="button"
          role="switch"
          aria-checked={notifyOnMovement}
          aria-label="Notify me when it moves"
          onClick={onToggleNotify}
          className={cn(
            'relative h-6 w-10 shrink-0 rounded-full transition-colors duration-200',
            notifyOnMovement ? 'bg-brand' : 'bg-ink/15',
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-surface shadow-card transition-transform duration-200',
              notifyOnMovement && 'translate-x-4',
            )}
          />
        </button>
      </div>
    </section>
  )
}

function DelayCauseRow({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[12px] leading-relaxed text-ink/70">
      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-delayed/70" aria-hidden />
      <span>{children}</span>
    </li>
  )
}

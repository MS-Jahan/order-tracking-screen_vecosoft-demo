import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Check, ChevronDown, ChevronUp, Circle } from 'lucide-react'
import type { TimelineStep, TimelineStepStatus } from '../types/tracking'
import { cn } from '../lib/utils'

interface TrackingTimelineProps {
  steps: TimelineStep[]
}

const VISIBLE_COUNT = 4

/** Node visual per step status: 28px slot on the rail. */
function TimelineNode({ step }: { step: TimelineStep }) {
  switch (step.status) {
    case 'completed':
      return (
        <div className="flex h-7 w-7 items-center justify-center">
          <Check
            className="h-5 w-5 rounded-full bg-success p-0.5 text-white"
            strokeWidth={3}
            aria-hidden="true"
          />
        </div>
      )
    case 'current':
      return (
        <div
          className="h-7 w-7 animate-pulse-green rounded-full border-2 border-success bg-surface"
          aria-hidden="true"
        />
      )
    case 'delayed':
      return (
        <div className="flex h-7 w-7 animate-pulse-ring items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-delayed">
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        </div>
      )
    default:
      return (
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-line bg-surface text-line"
          aria-hidden="true"
        >
          <Circle className="h-1.5 w-1.5 fill-current" aria-hidden="true" />
        </div>
      )
  }
}

/** Segment style derives from the step ABOVE it. */
function segmentClasses(status: TimelineStepStatus): string {
  switch (status) {
    case 'completed':
      return 'w-0.5 bg-line'
    case 'current':
      return 'w-0.5 bg-success'
    case 'delayed':
      return 'w-0 border-l-2 border-dashed border-delayed'
    default:
      return 'w-0 border-l-2 border-dashed border-line'
  }
}

interface TimelineRowProps {
  step: TimelineStep
  /** True when no segment should be drawn below this row (rail ends here). */
  isRailEnd: boolean
}

function TimelineRow({ step, isRailEnd }: TimelineRowProps) {
  const muted = step.isCompleted && !step.isCurrent

  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      <div className="relative w-7 shrink-0">
        <TimelineNode step={step} />
        {!isRailEnd && (
          <div
            aria-hidden="true"
            className={cn(
              'absolute bottom-0 left-[13px] top-[30px]',
              segmentClasses(step.status),
            )}
          />
        )}
      </div>
      <div className={cn('pt-0.5', muted && 'opacity-70')}>
        <p className={cn('text-step', muted ? 'text-ink-soft' : 'text-ink')}>{step.label}</p>
        <p className="mt-0.5 text-micro text-ink-soft">
          <span>{step.location}</span>
          <span className="ml-2">{step.timestamp}</span>
        </p>
      </div>
    </div>
  )
}

export function TrackingTimeline({ steps }: TrackingTimelineProps) {
  const [expanded, setExpanded] = useState(false)

  // Newest first: the input is oldest → newest, so reverse for display.
  const ordered = useMemo(() => [...steps].reverse(), [steps])
  const hasMore = ordered.length > VISIBLE_COUNT
  const visible = ordered.slice(0, VISIBLE_COUNT)

  return (
    <section aria-label="Shipment timeline">
      <div>
        {visible.map((step, index) => (
          <TimelineRow
            key={step.id}
            step={step}
            isRailEnd={!expanded && hasMore && index === VISIBLE_COUNT - 1}
          />
        ))}
        <AnimatePresence initial={false}>
          {expanded && hasMore && (
            <motion.div
              key="earlier"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              {ordered.slice(VISIBLE_COUNT).map((step, index) => (
                <TimelineRow
                  key={step.id}
                  step={step}
                  isRailEnd={index === ordered.length - VISIBLE_COUNT - 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-1 inline-flex items-center gap-1 rounded text-sm font-semibold text-brand transition-colors hover:text-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          {expanded ? (
            <>
              Show fewer
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              Show earlier updates
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      )}
    </section>
  )
}

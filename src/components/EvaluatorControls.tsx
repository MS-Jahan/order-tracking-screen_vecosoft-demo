import { motion } from 'framer-motion'
import type { ScenarioKey } from '../types/tracking'
import { cn } from '../lib/utils'

interface EvaluatorControlsProps {
  scenario: ScenarioKey
  onScenarioChange: (s: ScenarioKey) => void
}

const SCENARIOS: ReadonlyArray<{ key: ScenarioKey; label: string }> = [
  { key: 'delayed', label: 'Delayed' },
  { key: 'delivered_missing', label: 'Not received' },
  { key: 'pre_tracking', label: 'Pre-tracking' },
  { key: 'loading', label: 'Loading' },
  { key: 'error', label: 'Error' },
]

/**
 * Demo-only scenario switcher, docked at the bottom of the phone frame as a
 * regular flex child (not viewport-fixed), so it stays visible at any device
 * height and never covers scrolling content. Honors the iOS safe area.
 */
export function EvaluatorControls({ scenario, onScenarioChange }: EvaluatorControlsProps) {
  return (
    <div
      className={cn(
        'z-50 shrink-0 border-t border-line bg-surface/90 backdrop-blur-sm',
        'px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]',
      )}
      role="group"
      aria-label="Demo scenario"
    >
      <div className="mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto">
        {SCENARIOS.map(({ key, label }) => {
          const isActive = key === scenario
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => onScenarioChange(key)}
              className={cn(
                'relative shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                isActive ? 'text-white' : 'text-ink-soft hover:text-ink',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="evaluator-active-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

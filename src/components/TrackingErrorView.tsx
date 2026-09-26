import { CloudOff, RotateCcw } from 'lucide-react'

interface TrackingErrorViewProps {
  onRetry: () => void
}

/** Network failure view with a retry action. */
export default function TrackingErrorView({ onRetry }: TrackingErrorViewProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-8 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-app">
        <CloudOff className="h-8 w-8 text-ink-soft" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-lg font-bold text-ink">Can't load tracking right now</h2>
      <p className="mt-2 max-w-[26ch] text-[13px] leading-relaxed text-ink-soft">
        We couldn't reach the tracking service. Check your connection and try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-soft"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  )
}

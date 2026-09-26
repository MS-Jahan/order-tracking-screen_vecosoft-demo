import { cn } from '@/lib/utils'

function ShimmerLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-shimmer rounded-md bg-[linear-gradient(90deg,#F1EFEA_0%,#FAF9F6_50%,#F1EFEA_100%)] bg-[length:400px_100%]',
        className,
      )}
    />
  )
}

/** Placeholder view shown while order data loads. */
export default function TrackingSkeleton() {
  return (
    <div className="space-y-4 px-4 py-5" role="status" aria-label="Loading order tracking">
      <span className="sr-only">Loading order tracking…</span>
      <ShimmerLine className="h-44 rounded-2xl" />
      <ShimmerLine className="h-5 w-2/3 rounded-full" />
      <div className="space-y-5 py-2 pl-1">
        <div className="flex items-center gap-3">
          <ShimmerLine className="h-7 w-7 rounded-full" />
          <ShimmerLine className="h-4 w-36 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <ShimmerLine className="h-7 w-7 rounded-full" />
          <ShimmerLine className="h-4 w-28 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <ShimmerLine className="h-7 w-7 rounded-full" />
          <ShimmerLine className="h-4 w-32 rounded-full" />
        </div>
      </div>
      <ShimmerLine className="h-14 rounded-2xl" />
    </div>
  )
}

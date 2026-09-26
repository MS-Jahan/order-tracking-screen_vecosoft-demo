import { useEffect, useRef } from 'react'

import { DelayedAlertCard } from '@/components/DelayedAlertCard'
import { DeliveryDisputeCard } from '@/components/DeliveryDisputeCard'
import { EvaluatorControls } from '@/components/EvaluatorControls'
import { MobileShell } from '@/components/MobileShell'
import { OrderItemsSummary } from '@/components/OrderItemsSummary'
import { PreTrackingCard } from '@/components/PreTrackingCard'
import { StatusHeroCard } from '@/components/StatusHeroCard'
import TrackingErrorView from '@/components/TrackingErrorView'
import { TrackingHeader } from '@/components/TrackingHeader'
import TrackingSkeleton from '@/components/TrackingSkeleton'
import { TrackingTimeline } from '@/components/TrackingTimeline'
import { useTrackingOrder } from '@/hooks/useTrackingOrder'
import type { ScenarioKey } from '@/types/tracking'

export default function App() {
  const tracking = useTrackingOrder()
  const lastActiveScenario = useRef<ScenarioKey>('delayed')

  useEffect(() => {
    if (
      tracking.scenario === 'delayed' ||
      tracking.scenario === 'delivered_missing' ||
      tracking.scenario === 'pre_tracking'
    ) {
      lastActiveScenario.current = tracking.scenario
    }
  }, [tracking.scenario])

  const order = tracking.order

  return (
    <MobileShell>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {order !== null && !tracking.isLoading && !tracking.isError && (
          <TrackingHeader orderId={order.orderId} onSupport={tracking.openSupportChat} />
        )}

        {tracking.isLoading || tracking.scenario === 'loading' ? (
          <TrackingSkeleton />
        ) : tracking.isError ? (
          <TrackingErrorView
            onRetry={() => tracking.setScenario(lastActiveScenario.current)}
          />
        ) : order ? (
          <main className="space-y-4 px-4 pt-5 pb-8">
            <StatusHeroCard order={order} />

            {order.activeStateKey === 'delayed' && (
              <DelayedAlertCard
                order={order}
                notifyOnMovement={tracking.notifyOnMovement}
                onToggleNotify={tracking.toggleAlertSubscription}
              />
            )}

            {order.activeStateKey === 'delivered_missing' && (
              <DeliveryDisputeCard
                order={order}
                ticketId={tracking.ticketId}
                onReportMissing={tracking.reportMissingPackage}
              />
            )}

            {order.activeStateKey === 'pre_tracking' && (
              <PreTrackingCard order={order} />
            )}

            <TrackingTimeline steps={order.timeline} />
            <OrderItemsSummary order={order} />
          </main>
        ) : null}
      </div>

      <EvaluatorControls
        scenario={tracking.scenario}
        onScenarioChange={tracking.setScenario}
      />
    </MobileShell>
  )
}

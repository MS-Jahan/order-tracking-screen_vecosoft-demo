import { useCallback, useEffect, useRef, useState } from 'react'
import type { OrderContext, ScenarioKey } from '@/types/tracking'
import { mockOrders } from '@/data/mockOrders'

const LOAD_DURATION_MS = 900
const DISPUTE_DURATION_MS = 600

/** Simulates fetching an order for the selected demo scenario. */
export function useTrackingOrder() {
  const [scenario, setScenarioState] = useState<ScenarioKey>('delayed')
  const [order, setOrder] = useState<OrderContext | null>(mockOrders.delayed)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [hasDisputeCase, setHasDisputeCase] = useState(false)
  const [ticketId, setTicketId] = useState<string | null>(null)
  const [notifyOnMovement, setNotifyOnMovement] = useState(false)

  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const disputeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Cancel pending simulated requests on scenario change or unmount.
  useEffect(() => {
    return () => {
      if (loadTimer.current !== null) clearTimeout(loadTimer.current)
      if (disputeTimer.current !== null) clearTimeout(disputeTimer.current)
    }
  }, [])

  const setScenario = useCallback((s: ScenarioKey) => {
    setScenarioState(s)
    setNotifyOnMovement(false)

    if (loadTimer.current !== null) {
      clearTimeout(loadTimer.current)
      loadTimer.current = null
    }
    if (disputeTimer.current !== null) {
      clearTimeout(disputeTimer.current)
      disputeTimer.current = null
    }

    setHasDisputeCase(false)
    setTicketId(null)
    setIsError(false)

    if (s === 'error') {
      setOrder(null)
      setIsError(true)
      setIsLoading(false)
      return
    }

    const nextOrder: OrderContext | undefined =
      s === 'loading' ? undefined : mockOrders[s]
    if (!nextOrder) {
      setOrder(null)
      setIsError(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setOrder(null)
    loadTimer.current = setTimeout(() => {
      loadTimer.current = null
      setIsLoading(false)
      setOrder(nextOrder)
    }, LOAD_DURATION_MS)
  }, [])

  const reportMissingPackage = useCallback(() => {
    if (disputeTimer.current !== null) return
    disputeTimer.current = setTimeout(() => {
      disputeTimer.current = null
      setTicketId('DS-892')
      setHasDisputeCase(true)
    }, DISPUTE_DURATION_MS)
  }, [])

  const toggleAlertSubscription = useCallback(() => {
    setNotifyOnMovement((prev) => !prev)
  }, [])

  const openSupportChat = useCallback(() => {
    console.info('[demo] Support chat opened for scenario:', scenario)
  }, [scenario])

  return {
    order,
    scenario,
    setScenario,
    isLoading,
    isError,
    reportMissingPackage,
    hasDisputeCase,
    ticketId,
    notifyOnMovement,
    toggleAlertSubscription,
    openSupportChat,
  }
}

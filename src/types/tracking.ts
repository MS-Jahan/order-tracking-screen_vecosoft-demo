export type TrackingStatus =
  | 'PREPARING'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'DELAYED'

/** The five demo scenarios the evaluator can switch between. */
export type ScenarioKey =
  | 'delayed'
  | 'delivered_missing'
  | 'pre_tracking'
  | 'loading'
  | 'error'

export type TimelineStepStatus = 'completed' | 'current' | 'upcoming' | 'delayed'

export interface TimelineStep {
  id: string
  label: string
  location: string
  timestamp: string
  status: TimelineStepStatus
  isCompleted: boolean
  isCurrent: boolean
  isDelayed: boolean
}

export interface OrderItem {
  id: string
  name: string
  attributes: string
  price: number
  qty: number
  image: string
}

export type ActiveStateKey = Exclude<ScenarioKey, 'loading' | 'error'>

export interface OrderContext {
  orderId: string
  carrierName: string
  trackingNumber: string
  eta: string
  originalEta?: string
  activeStateKey: ActiveStateKey
  status: TrackingStatus
  statusLabel: string
  /** Short headline shown in the hero card, e.g. "Arriving Thursday". */
  headline: string
  /** Root-cause copy for the delayed scenario; absent otherwise. */
  delayReason?: string
  /** Delivery proof details for the delivered_missing scenario. */
  deliveryProof?: {
    deliveredAt: string
    dropLocation: string
    photoUrl: string | null
  }
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod: string
  timeline: TimelineStep[]
}

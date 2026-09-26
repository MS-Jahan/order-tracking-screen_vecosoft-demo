import type { ActiveStateKey, OrderContext } from '@/types/tracking'

/**
 * Inline SVG data URIs — compact, URL-encoded, deterministic.
 * Each illustration uses simple geometric shapes on a muted earthy background.
 */
const throwImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23E8E0D1'/%3E%3Crect x='16' y='26' width='48' height='12' rx='3' fill='%23CBC0A8'/%3E%3Crect x='16' y='40' width='48' height='12' rx='3' fill='%23B4A787'/%3E%3Crect x='16' y='54' width='48' height='8' rx='3' fill='%23A09070'/%3E%3C/svg%3E"

const boardImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23E3D8C9'/%3E%3Crect x='30' y='14' width='20' height='52' rx='9' fill='%236B4A32'/%3E%3Ccircle cx='40' cy='24' r='3' fill='%23E3D8C9'/%3E%3Crect x='24' y='34' width='32' height='3' rx='1.5' fill='%23543A26'/%3E%3Crect x='24' y='42' width='32' height='3' rx='1.5' fill='%23543A26'/%3E%3Crect x='24' y='50' width='32' height='3' rx='1.5' fill='%23543A26'/%3E%3C/svg%3E"

const napkinsImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23DDE2D8'/%3E%3Crect x='18' y='20' width='30' height='38' rx='2' fill='%23A8B5A0'/%3E%3Crect x='32' y='26' width='30' height='38' rx='2' fill='%238FA085'/%3E%3Crect x='36' y='30' width='22' height='30' rx='1' fill='%23DDE2D8' opacity='0.35'/%3E%3C/svg%3E"

const vaseImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23EBDCCB'/%3E%3Cpath d='M32 18 h16 v6 c6 5 8 12 8 19 0 11 -7 19 -16 19 s-16 -8 -16 -19 c0 -7 2 -14 8 -19 z' fill='%23C07B57'/%3E%3Crect x='30' y='16' width='20' height='5' rx='2' fill='%23A8664A'/%3E%3Ccircle cx='40' cy='40' r='6' fill='%23EBDCCB' opacity='0.4'/%3E%3C/svg%3E"

const coastersImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23E1E0DA'/%3E%3Ccircle cx='34' cy='34' r='17' fill='%239A9488'/%3E%3Ccircle cx='46' cy='46' r='17' fill='%237E786C'/%3E%3Ccircle cx='46' cy='46' r='11' fill='%23E1E0DA' opacity='0.3'/%3E%3C/svg%3E"

const mugImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23E4E7E2'/%3E%3Crect x='22' y='26' width='26' height='30' rx='4' fill='%236B7280'/%3E%3Cpath d='M48 32 h7 a7 7 0 0 1 0 14 h-7 v-5 h6 a2.5 2.5 0 0 0 0 -5 h-6 z' fill='%23555B66'/%3E%3Cellipse cx='35' cy='30' rx='10' ry='2.5' fill='%23E4E7E2' opacity='0.5'/%3E%3C/svg%3E"

const kettleImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23DFE3E6'/%3E%3Cpath d='M28 34 h24 v22 a6 6 0 0 1 -6 6 h-12 a6 6 0 0 1 -6 -6 z' fill='%235E6B74'/%3E%3Crect x='24' y='30' width='32' height='6' rx='3' fill='%2348535A'/%3E%3Cpath d='M52 38 q10 2 0 14' fill='none' stroke='%2348535A' stroke-width='4'/%3E%3Cpath d='M34 24 q6 -6 12 0 v4 h-12 z' fill='%2348535A'/%3E%3C/svg%3E"

export const mockOrders: Record<ActiveStateKey, OrderContext> = {
  delayed: {
    orderId: 'VSC-10482',
    carrierName: 'SwiftParcel',
    trackingNumber: 'SP774218355US',
    eta: 'Mon, Sep 29 · 6:00 PM',
    originalEta: 'Wed, Sep 24 · 8:00 PM',
    activeStateKey: 'delayed',
    status: 'DELAYED',
    statusLabel: 'Delayed',
    headline: 'Arriving later than planned',
    delayReason:
      'Severe storms across the Midwest have closed the Chicago regional hub. Your parcel is queued for the next available departure, and the carrier has pushed the delivery estimate to Monday evening.',
    items: [
      {
        id: 'item-throw',
        name: 'Cedar Woven Throw',
        attributes: 'Oat / 130×180 cm',
        price: 89,
        qty: 1,
        image: throwImage,
      },
      {
        id: 'item-board',
        name: 'Ashwood Serving Board',
        attributes: 'Walnut / 45 cm',
        price: 54,
        qty: 1,
        image: boardImage,
      },
      {
        id: 'item-napkins',
        name: 'Linen Napkin Set',
        attributes: 'Sage / Set of 4',
        price: 32,
        qty: 1,
        image: napkinsImage,
      },
    ],
    subtotal: 175,
    shipping: 12.5,
    total: 187.5,
    paymentMethod: 'Visa ending in 4281',
    timeline: [
      {
        id: 'step-order',
        label: 'Order confirmed',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Sat, Sep 20 · 10:12 AM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-packed',
        label: 'Packed at warehouse',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Sun, Sep 21 · 4:36 PM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-departed',
        label: 'Departed origin hub',
        location: 'SwiftParcel, Grand Rapids',
        timestamp: 'Mon, Sep 22 · 7:58 AM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-hub',
        label: 'Held at regional hub',
        location: 'SwiftParcel, Chicago hub',
        timestamp: 'Tue, Sep 23 · 11:20 AM',
        status: 'delayed',
        isCompleted: false,
        isCurrent: true,
        isDelayed: true,
      },
      {
        id: 'step-out',
        label: 'Out for delivery',
        location: 'SwiftParcel, Local depot',
        timestamp: 'Expected Mon, Sep 29',
        status: 'upcoming',
        isCompleted: false,
        isCurrent: false,
        isDelayed: false,
      },
    ],
  },

  delivered_missing: {
    orderId: 'VSC-10167',
    carrierName: 'Northline Express',
    trackingNumber: 'NX550913702US',
    eta: 'Thu, Sep 25 · 1:47 PM',
    activeStateKey: 'delivered_missing',
    status: 'DELIVERED',
    statusLabel: 'Delivered',
    headline: 'Marked delivered, but not found',
    deliveryProof: {
      deliveredAt: 'Thu, Sep 25 · 1:47 PM',
      dropLocation: 'Front porch',
      photoUrl: null,
    },
    items: [
      {
        id: 'item-vase',
        name: 'Ember Ceramic Vase',
        attributes: 'Terracotta / 24 cm',
        price: 68,
        qty: 1,
        image: vaseImage,
      },
      {
        id: 'item-coasters',
        name: 'Stone Coaster Set',
        attributes: 'Slate / Set of 6',
        price: 28,
        qty: 1,
        image: coastersImage,
      },
    ],
    subtotal: 96,
    shipping: 8,
    total: 104,
    paymentMethod: 'Apple Pay',
    timeline: [
      {
        id: 'step-order',
        label: 'Order confirmed',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Mon, Sep 22 · 9:05 AM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-packed',
        label: 'Packed at warehouse',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Mon, Sep 22 · 3:42 PM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-departed',
        label: 'Departed origin hub',
        location: 'Northline Express, Grand Rapids',
        timestamp: 'Tue, Sep 23 · 8:14 AM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-out',
        label: 'Out for delivery',
        location: 'Northline Express, Local depot',
        timestamp: 'Thu, Sep 25 · 9:31 AM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-delivered',
        label: 'Delivered',
        location: 'Front porch',
        timestamp: 'Thu, Sep 25 · 1:47 PM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
    ],
  },

  pre_tracking: {
    orderId: 'VSC-10730',
    carrierName: 'Veco Fulfillment',
    trackingNumber: 'Carrier assigned at first scan',
    eta: 'Dispatch window: Sat, Sep 27 · morning',
    activeStateKey: 'pre_tracking',
    status: 'PREPARING',
    statusLabel: 'Preparing',
    headline: 'Getting ready to ship',
    items: [
      {
        id: 'item-kettle',
        name: 'Slate Pour-Over Kettle',
        attributes: 'Matte graphite / 0.9 L',
        price: 76,
        qty: 1,
        image: kettleImage,
      },
      {
        id: 'item-mugs',
        name: 'Stoneware Mug Pair',
        attributes: 'Sand / 350 ml each',
        price: 44,
        qty: 1,
        image: mugImage,
      },
    ],
    subtotal: 120,
    shipping: 0,
    total: 120,
    paymentMethod: 'Mastercard ending in 7735',
    timeline: [
      {
        id: 'step-order',
        label: 'Order confirmed',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Fri, Sep 26 · 8:21 AM',
        status: 'completed',
        isCompleted: true,
        isCurrent: false,
        isDelayed: false,
      },
      {
        id: 'step-picking',
        label: 'Picking and packing',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Fri, Sep 26 · 11:02 AM',
        status: 'current',
        isCompleted: false,
        isCurrent: true,
        isDelayed: false,
      },
      {
        id: 'step-pickup',
        label: 'Carrier pickup',
        location: 'Veco Fulfillment, Grand Rapids',
        timestamp: 'Expected Sat, Sep 27',
        status: 'upcoming',
        isCompleted: false,
        isCurrent: false,
        isDelayed: false,
      },
    ],
  },
}

import { useState } from 'react'
import { ChevronDown, CreditCard } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { OrderContext } from '../types/tracking'
import { cn } from '../lib/utils'

interface OrderItemsSummaryProps {
  order: OrderContext
}

const formatPrice = (amount: number) => `$${amount.toFixed(2)}`

/** Collapsible order contents: item rows plus subtotal, shipping, total and payment method. */
export function OrderItemsSummary({ order }: OrderItemsSummaryProps) {
  const [expanded, setExpanded] = useState(false)
  const firstItem = order.items[0]

  return (
    <section className="rounded-2xl border border-line bg-surface shadow-card">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        {firstItem ? (
          <img
            src={firstItem.image}
            alt=""
            className="h-7 w-7 shrink-0 rounded-md object-cover"
          />
        ) : null}
        <span className="text-step font-semibold text-ink">{order.items.length} items</span>
        <span className="ml-auto text-step font-semibold text-ink">{formatPrice(order.total)}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200',
            expanded && 'rotate-180',
          )}
          strokeWidth={2}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="order-items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <ul className="space-y-3">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-step text-ink">{item.name}</p>
                      <p className="mt-0.5 text-micro text-ink-soft">{item.attributes}</p>
                    </div>
                    <span className="shrink-0 text-[12px] font-medium text-ink">
                      {item.qty} × {formatPrice(item.price)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 space-y-1.5 border-t border-line pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-ink-soft">Subtotal</span>
                  <span className="text-[12px] text-ink">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-ink-soft">Shipping</span>
                  {order.shipping === 0 ? (
                    <span className="text-[12px] font-medium text-success">Free</span>
                  ) : (
                    <span className="text-[12px] text-ink">{formatPrice(order.shipping)}</span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-step font-semibold text-ink">Total</span>
                  <span className="text-step font-bold text-ink">{formatPrice(order.total)}</span>
                </div>
                <div className="flex items-center gap-2 pt-1.5">
                  <CreditCard className="h-4 w-4 shrink-0 text-ink-soft" strokeWidth={2} />
                  <span className="text-micro text-ink-soft">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

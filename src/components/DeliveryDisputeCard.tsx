import { useEffect, useRef, useState } from 'react'
import { Camera, CheckCircle2 } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { OrderContext } from '../types/tracking'
import { cn } from '../lib/utils'

interface DeliveryDisputeCardProps {
  order: OrderContext
  ticketId: string | null
  onReportMissing: () => void
}

const CHECKLIST_ITEMS = [
  'Check with your building reception',
  'Look around the porch or mailbox area',
  'Ask neighbors if they accepted it',
]

/** Delivered-but-missing scenario: delivery proof, guidance checklist, and the report flow. */
export function DeliveryDisputeCard({ order, ticketId, onReportMissing }: DeliveryDisputeCardProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CHECKLIST_ITEMS.map((label) => [label, false])),
  )
  const proof = order.deliveryProof

  return (
    <section className="rounded-2xl border border-line bg-surface p-4 shadow-card">
      <h2 className="text-step font-semibold text-ink">Marked delivered</h2>

      {proof ? (
        <>
          <p className="mt-1 text-[12px] text-ink-soft">Delivered {proof.deliveredAt}</p>
          <p className="text-[12px] text-ink-soft">{proof.dropLocation}</p>

          <div className="mt-3 flex h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-app">
            {proof.photoUrl ? (
              <img src={proof.photoUrl} alt="Proof of delivery" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <>
                <Camera className="h-5 w-5 text-ink-soft" strokeWidth={2} />
                <span className="text-micro text-ink-soft">Proof photo</span>
                <span className="text-[11px] text-ink-soft">No photo was captured</span>
              </>
            )}
          </div>
        </>
      ) : null}

      <div className="mt-4 rounded-xl bg-app p-3">
        <h3 className="text-step text-ink">Before you report</h3>
        <ul className="mt-2 space-y-2">
          {CHECKLIST_ITEMS.map((label) => (
            <li key={label}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={checked[label]}
                  onChange={(event) =>
                    setChecked((prev) => ({ ...prev, [label]: event.target.checked }))
                  }
                  className="h-4 w-4 shrink-0 accent-brand"
                />
                <span className="text-[12px] text-ink">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {ticketId ? (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-app p-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" strokeWidth={2} />
          <div className="min-w-0">
            <p className="text-step font-semibold text-ink">Report filed</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
              Ticket {ticketId} · investigation started. We'll email you within 24 hours.
            </p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="mt-4 w-full rounded-xl bg-alert py-3 text-step font-semibold text-white transition-colors hover:bg-alert/90"
        >
          Report package missing
        </button>
      )}

      <ReportSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConfirm={() => {
          onReportMissing()
          setSheetOpen(false)
        }}
      />
    </section>
  )
}

interface ReportSheetProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

function ReportSheet({ open, onClose, onConfirm }: ReportSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    sheetRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      // Keep Tab cycling inside the modal sheet.
      if (event.key === 'Tab' && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (restoreFocusRef.current?.isConnected) {
        restoreFocusRef.current.focus()
      }
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="report-sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40"
          onClick={onClose}
        >
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Report missing package"
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'w-full max-w-md rounded-t-2xl bg-surface p-4 pt-3 pb-24 outline-none',
              'shadow-raise',
            )}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" aria-hidden />

            <h2 className="text-step font-semibold text-ink">Report missing package</h2>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-soft">
              We'll open an investigation with the carrier and follow up by email.
            </p>

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={onConfirm}
                className="w-full rounded-xl bg-alert py-3 text-step font-semibold text-white transition-colors hover:bg-alert/90"
              >
                File report
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-line bg-surface py-3 text-step font-semibold text-brand transition-colors hover:bg-app"
              >
                Keep looking
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

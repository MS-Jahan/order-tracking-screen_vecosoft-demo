import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface MobileShellProps {
  children: ReactNode
}

/**
 * Desktop presentation frame: app-colored backdrop with a centered phone-sized
 * shell. The frame never exceeds the viewport height, so app chrome docked at
 * its bottom stays visible at any device height; content scrolls inside it.
 * Below 480px viewports the shell goes full-bleed so the demo reads as a real
 * mobile screen.
 */
export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="flex min-h-dvh justify-center bg-app md:py-10">
      <div
        className={cn(
          'flex h-dvh w-full max-w-[430px] flex-col overflow-hidden',
          'rounded-shell bg-surface shadow-shell',
          'md:h-[min(880px,calc(100dvh-5rem))]',
          'max-[479px]:max-w-none max-[479px]:rounded-none max-[479px]:shadow-none',
        )}
      >
        {children}
      </div>
    </div>
  )
}

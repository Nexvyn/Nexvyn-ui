import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const FADE =
  'transition-opacity duration-(--motion-dur-showcase) ease-(--motion-ease-in-out) group-hover:opacity-0 group-focus-visible:opacity-0'

const CORNERS = ['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'] as const

export function BlueprintSheet({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div
        aria-hidden="true"
        className={cn('pointer-events-none absolute inset-0 text-foreground', FADE)}
      >
        {CORNERS.map((pos) => (
          <span key={pos} className={cn('absolute size-2 opacity-30', pos)}>
            <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
          </span>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

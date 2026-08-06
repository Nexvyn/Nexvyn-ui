import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function BlueprintSheet({
  children,
  className,
  scale = 'md',
}: {
  children: ReactNode
  className?: string

  scale?: 'sm' | 'md'
}) {
  return (
    <div className={cn('relative flex flex-1 min-w-0 items-center justify-center', className)}>
      <div className={cn('relative', scale === 'sm' ? 'scale-110' : 'scale-125')}>{children}</div>
    </div>
  )
}

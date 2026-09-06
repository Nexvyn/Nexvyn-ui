import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function HomeShowcaseGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('flex w-full flex-col gap-4 sm:gap-6', className)}>{children}</div>
}

export function HomeShowcaseRow({
  children,
  className,
}: {
  children: ReactNode
  columnWeights?: number[]
  className?: string
}) {
  return (
    <div className={cn('relative w-full overflow-visible', className)}>
      <div className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12">{children}</div>
    </div>
  )
}

export const homeShowcaseColSpan = {
  3: 'col-span-full min-w-0 md:col-span-3',
  4: 'col-span-full min-w-0 md:col-span-4',
  5: 'col-span-full min-w-0 md:col-span-5',
  6: 'col-span-full min-w-0 md:col-span-6',
  7: 'col-span-full min-w-0 md:col-span-7',
  9: 'col-span-full min-w-0 md:col-span-9',
  12: 'col-span-full min-w-0 md:col-span-12',
} as const

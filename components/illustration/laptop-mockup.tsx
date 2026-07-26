'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const laptopChassisVariants = {
  gray: {
    border: 'border-(--color-border)',
    base: 'bg-(--color-muted)',
    notch: 'bg-(--color-border)',
  },
  titanium: {
    border: 'border-(--color-foreground)',
    base: 'bg-(--color-card)',
    notch: 'bg-(--color-muted)',
  },
} as const

type LaptopChassisVariant = keyof typeof laptopChassisVariants

type LaptopMockupCardProps = Readonly<
  ComponentPropsWithoutRef<'div'> & {
    variant?: LaptopChassisVariant
    children?: ReactNode
  }
>

export const LaptopMockupCard = forwardRef<HTMLDivElement, LaptopMockupCardProps>(
  ({ className, children, variant = 'gray', ...props }, ref) => {
    const frame = laptopChassisVariants[variant]

    return (
      <div
        ref={ref}
        data-slot="laptop-mockup-card"
        data-variant={variant}
        className={cn('flex flex-col items-center font-sans', className)}
        {...props}
      >
        <div
          className={cn(
            'w-[280px] overflow-hidden rounded-t-xl border-2 border-b-0 shadow-xl md:w-[384px]',
            frame.border,
          )}
        >
          <div className="bg-black p-1.5 pb-0">
            <div className="relative h-[184px] overflow-hidden rounded-t-[4px] bg-black md:h-[252px]">
              <div className="relative size-full overflow-hidden rounded-t-[4px]">{children}</div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'relative h-2.5 w-[315px] rounded-b-xl md:h-3 md:w-[432px]',
            frame.base,
          )}
        >
          <div
            className={cn(
              'absolute top-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-b-md md:w-16',
              frame.notch,
            )}
            aria-hidden="true"
          />
        </div>
      </div>
    )
  },
)

LaptopMockupCard.displayName = 'LaptopMockupCard'

'use client'

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const mockupChassisVariants = {
  black: {
    frame: 'bg-(--color-foreground)',
    button: 'bg-(--color-foreground)',
  },
  white: {
    frame: 'bg-(--color-card)',
    button: 'bg-(--color-card)',
  },
  accent: {
    frame:
      'bg-(--color-accent) dark:bg-[color-mix(in_srgb,var(--color-accent)_60%,var(--color-card))]',
    button:
      'bg-(--color-accent) dark:bg-[color-mix(in_srgb,var(--color-accent)_60%,var(--color-card))]',
  },
} as const

type MockupChassisVariant = keyof typeof mockupChassisVariants

const CHASSIS_ASPECT_RATIO = 70.6 / 146.6

type PhoneMockupCardProps = Readonly<
  ComponentPropsWithoutRef<'div'> & {
    variant?: MockupChassisVariant
    visibleRatio?: number
    showDynamicIsland?: boolean
  }
>

const sideControlClass = (color: string) => cn('absolute w-0.5 rounded-l-sm', color)

function SideControls({
  frame,
}: Readonly<{
  frame: (typeof mockupChassisVariants)[MockupChassisVariant]
}>) {
  return (
    <>
      <div
        className={cn(sideControlClass(frame.button), 'top-[15.5%] -left-0.5 h-[3.2%]')}
        aria-hidden="true"
      />
      <div
        className={cn(sideControlClass(frame.button), 'top-[21%] -left-0.5 h-[7.2%]')}
        aria-hidden="true"
      />
      <div
        className={cn(sideControlClass(frame.button), 'top-[30.5%] -left-0.5 h-[7.2%]')}
        aria-hidden="true"
      />
      <div
        className={cn(
          sideControlClass(frame.button),
          'top-[23%] -right-0.5 h-[11.5%] rounded-l-none rounded-r-sm',
        )}
        aria-hidden="true"
      />
    </>
  )
}

function MockupScreen({
  children,
  showDynamicIsland,
}: Readonly<{
  children: ReactNode
  showDynamicIsland: boolean
}>) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black">
      <div className="absolute inset-[3.5px] overflow-hidden rounded-[2.3rem] bg-white">
        <div className="relative h-full w-full">{children}</div>
        {showDynamicIsland && (
          <div
            className="absolute top-[9px] left-1/2 z-20 h-5 w-[66px] -translate-x-1/2 rounded-full bg-black"
            aria-hidden="true"
          >
            <div
              className="absolute top-1/2 right-[5px] block h-2 w-2 shrink-0 -translate-y-1/2 rounded-full bg-(--color-muted)/40"
              aria-hidden="true"
            />
          </div>
        )}
        <div
          className="absolute bottom-[5.5px] left-1/2 z-20 h-[3px] w-[32%] -translate-x-1/2 rounded-full bg-black/20"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export const PhoneMockupCard = forwardRef<HTMLDivElement, PhoneMockupCardProps>(
  (
    {
      className,
      children,
      variant = 'accent',
      visibleRatio = 1,
      showDynamicIsland = true,
      style,
      ...props
    },
    ref,
  ) => {
    const frame = mockupChassisVariants[variant]
    const ratio = Math.min(1, Math.max(0, visibleRatio))
    const isCropped = ratio < 1

    const phoneFrameClassName = cn('relative w-64 rounded-[2.6rem] p-0.5', frame.frame)

    if (!isCropped) {
      return (
        <div
          ref={ref}
          data-slot="phone-mockup-card"
          data-variant={variant}
          className={cn(phoneFrameClassName, 'aspect-[70.6/146.6]', className)}
          style={style}
          {...props}
        >
          <SideControls frame={frame} />
          <MockupScreen showDynamicIsland={showDynamicIsland}>{children}</MockupScreen>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        data-slot="phone-mockup-card"
        data-variant={variant}
        data-visible-ratio={ratio}
        className={cn('relative w-65 overflow-hidden', className)}
        style={{ aspectRatio: `${CHASSIS_ASPECT_RATIO / ratio}`, ...style }}
        {...props}
      >
        <div className="absolute inset-0 right-0.5 left-0.5 overflow-hidden">
          <div
            className={cn(phoneFrameClassName, 'w-full shrink-0')}
            style={{ height: `${100 / ratio}%` }}
          >
            <MockupScreen showDynamicIsland={showDynamicIsland}>{children}</MockupScreen>
          </div>
        </div>
        <div
          className="pointer-events-none absolute top-0 left-0.5 z-10 w-64 shrink-0"
          style={{ height: `${100 / ratio}%` }}
        >
          <SideControls frame={frame} />
        </div>
      </div>
    )
  },
)

PhoneMockupCard.displayName = 'PhoneMockupCard'

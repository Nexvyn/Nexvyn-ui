'use client'

import { Slider as BaseSlider } from '@base-ui/react/slider'
import { type MotionValue, motion, useTransform } from 'motion/react'
import type { Ref } from 'react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import { BAR_BOX, barCenterFor, fillEdgePx } from './geometry'
import { type UseFaderOptions, useFader } from './use-fader'

const MARK_HIDE_RADIUS = 10
const MARK_HIDE_FADE = 6

const sizeVariants = {
  sm: {
    control: 'h-8',
    overlay: 'px-3',
    text: 'text-xs',
    bar: 'h-4',
    mark: 'size-1',
  },
  md: {
    control: 'h-10',
    overlay: 'px-3.5',
    text: 'text-sm',
    bar: 'h-5',
    mark: 'size-1',
  },
  lg: {
    control: 'h-12',
    overlay: 'px-4',
    text: 'text-sm',
    bar: 'h-6',
    mark: 'size-1.5',
  },
} as const

const toneVariants = {
  accent: {
    fill: 'border border-muted-foreground/30 bg-muted-foreground/40 pointer-fine:group-hover/fader:bg-muted-foreground/50 group-data-dragging/control:bg-muted-foreground/55',
    bar: 'bg-muted-foreground',
  },
  neutral: {
    fill: 'border border-muted-foreground/25 bg-muted-foreground/35 pointer-fine:group-hover/fader:bg-muted-foreground/45 group-data-dragging/control:bg-muted-foreground/50',
    bar: 'bg-muted-foreground/90',
  },
} as const

function DetentMark({
  pct,
  fill,
  trackWidth,
  className,
}: {
  pct: number
  fill: MotionValue<number>
  trackWidth: MotionValue<number>
  className: string
}) {
  const filledOpacity = useTransform(() => {
    const tw = trackWidth.get()
    if (!tw) return fill.get() >= pct ? 1 : 0
    const covered = fillEdgePx(fill.get(), tw) - (pct / 100) * tw
    return Math.min(1, Math.max(0, covered / 8))
  })
  const visibility = useTransform(() => {
    const tw = trackWidth.get()
    if (!tw) {
      return Math.abs(fill.get() - pct) < 0.001 ? 0 : 1
    }
    const markPx = (pct / 100) * tw
    const barCenter = barCenterFor(fillEdgePx(fill.get(), tw))
    const distance = Math.abs(markPx - barCenter)
    return Math.min(1, Math.max(0, (distance - MARK_HIDE_RADIUS) / MARK_HIDE_FADE))
  })
  return (
    <motion.span
      aria-hidden
      className={cn('-translate-x-1/2 -translate-y-1/2 absolute top-1/2', className)}
      style={{ left: `${pct}%`, opacity: visibility }}
    >
      <span className="absolute inset-0 round bg-foreground/25" />
      <motion.span
        className="absolute inset-0 round bg-foreground/60"
        style={{ opacity: filledOpacity }}
      />
    </motion.span>
  )
}

export interface FaderProps extends Omit<UseFaderOptions, 'remeasureKey'> {
  size?: keyof typeof sizeVariants
  tone?: keyof typeof toneVariants
  bordered?: boolean
  className?: string
  ref?: Ref<HTMLDivElement>
}

export function Fader({
  size = 'md',
  tone = 'accent',
  bordered = false,
  className,
  ref,
  ...behavior
}: FaderProps) {
  const slider = useFader({ ...behavior, remeasureKey: size })
  const sizeStyle = sizeVariants[size]
  const toneStyle = toneVariants[tone]

  return (
    <BaseSlider.Root
      ref={ref}
      {...slider.rootProps}
      className={cn('w-full data-disabled:opacity-45', className)}
    >
      <div className="group/fader relative w-full">
        <BaseSlider.Control
          {...slider.controlProps}
          className={cn(
            'group/control relative block w-full cursor-grab touch-pan-y select-none rounded-md outline-none data-disabled:cursor-default data-dragging:cursor-grabbing has-[&:focus-visible]:ring-2 has-[&:focus-visible]:ring-ring has-[&:focus-visible]:ring-offset-2 has-[&:focus-visible]:ring-offset-background bg-muted',
            sizeStyle.control,
          )}
        >
          <BaseSlider.Track
            render={
              <motion.div
                style={{
                  scaleX: slider.trackScaleX,
                  transformOrigin: slider.trackOrigin,
                }}
              />
            }
            className={cn(
              'h-full w-full overflow-hidden rounded-md bg-muted border border-border/50',
              bordered && '!border-border',
            )}
          >
            <motion.div
              className={cn(
                'absolute top-0 left-0 h-full rounded-md transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out)',
                toneStyle.fill,
              )}
              style={{ width: slider.fillWidth }}
            >
              <div
                className="ml-auto flex h-full items-center justify-center"
                style={{ width: BAR_BOX }}
              >
                <motion.span
                  aria-hidden
                  className={cn('w-1 rounded-full', sizeStyle.bar, toneStyle.bar)}
                  initial={false}
                  animate={
                    slider.dodge
                      ? {
                          opacity: 0.3,
                          scaleY: slider.reducedMotion ? 1 : 0.75,
                        }
                      : slider.grabbed
                        ? {
                            opacity: 1,
                            scaleY: slider.reducedMotion ? 1 : 1.2,
                          }
                        : slider.focusVisible
                          ? {
                              opacity: 1,
                              scaleY: slider.reducedMotion ? 1 : 1.35,
                            }
                          : { opacity: 0.85, scaleY: 1 }
                  }
                  transition={springs.settle}
                />
              </div>
            </motion.div>
            <div className="pointer-events-none absolute inset-0">
              {slider.markPercents.map((pct) => (
                <DetentMark
                  key={pct}
                  pct={pct}
                  fill={slider.fillPercent}
                  trackWidth={slider.trackWidth}
                  className={sizeStyle.mark}
                />
              ))}
            </div>
            <BaseSlider.Thumb {...slider.thumbProps} className="h-8 w-5 outline-none" />
          </BaseSlider.Track>
        </BaseSlider.Control>

        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-between',
            sizeStyle.overlay,
          )}
        >
          <BaseSlider.Label
            ref={slider.labelRef}
            className={cn('font-medium text-foreground', sizeStyle.text)}
          >
            {behavior.label}
          </BaseSlider.Label>
          <BaseSlider.Value
            ref={slider.valueRef}
            className={cn('text-foreground tabular-nums', sizeStyle.text)}
          >
            {(parts) => (
              <>
                {parts[0]}
                {behavior.unit ? (
                  <span className="text-muted-foreground">{behavior.unit}</span>
                ) : null}
              </>
            )}
          </BaseSlider.Value>
        </div>
      </div>
    </BaseSlider.Root>
  )
}

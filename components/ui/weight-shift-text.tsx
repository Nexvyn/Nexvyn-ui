'use client'

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { durations } from '@/lib/motion-tokens'

export interface WeightShiftTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children: ReactNode
  baseWeight?: number
  activeWeight?: number
  active?: boolean
  duration?: string
}

export const WeightShiftText = forwardRef<HTMLSpanElement, WeightShiftTextProps>(
  (
    {
      children,
      baseWeight = 400,
      activeWeight = 600,
      active,
      duration = durations.fast,
      className,
      style,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const [isHovered, setIsHovered] = useState(false)

    const isControlledActive = active !== undefined
    const currentWeight = isControlledActive
      ? active
        ? activeWeight
        : baseWeight
      : isHovered
        ? activeWeight
        : baseWeight

    return (
      <span
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={(e) => {
          setIsHovered(true)
          onMouseEnterProp?.(e)
        }}
        onMouseLeave={(e) => {
          setIsHovered(false)
          onMouseLeaveProp?.(e)
        }}
        style={style}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none invisible absolute inset-0"
          style={{
            fontVariationSettings: `"wght" ${activeWeight}`,
          }}
        >
          {children}
        </span>
        <span
          className="relative"
          style={{
            fontVariationSettings: `"wght" ${currentWeight}`,
            transition: reduceMotion
              ? 'none'
              : `font-variation-settings ${duration} var(--motion-ease-out)`,
          }}
        >
          {children}
        </span>
      </span>
    )
  },
)
WeightShiftText.displayName = 'WeightShiftText'

export function WeightShiftTextPreview() {
  return (
    <div
      className="w-full h-full min-h-50 rounded-lg overflow-hidden flex flex-col items-center justify-center gap-6 p-4"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <WeightShiftText
        baseWeight={300}
        activeWeight={700}
        className="text-lg cursor-pointer select-none"
        style={{ color: 'var(--color-fg)' }}
      >
        Hover to shift weight
      </WeightShiftText>
      <WeightShiftText
        baseWeight={400}
        activeWeight={600}
        active={true}
        className="text-sm"
        style={{ color: 'var(--color-muted)' }}
      >
        Always active
      </WeightShiftText>
    </div>
  )
}

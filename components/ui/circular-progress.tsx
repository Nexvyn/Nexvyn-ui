'use client'

import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface CircularProgressProps extends ComponentPropsWithoutRef<'svg'> {
  progress: number
  size?: number
  strokeWidth?: number
  trackClassName?: string
  progressClassName?: string
}

export const CircularProgress = forwardRef<SVGSVGElement, CircularProgressProps>(
  function CircularProgress(
    {
      progress,
      size = 18,
      strokeWidth = 2,
      className,
      trackClassName,
      progressClassName,
      ...props
    },
    ref,
  ) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const safeProgress = Math.max(0, Math.min(100, progress))
    const offset = circumference - (safeProgress / 100) * circumference

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        className={cn('block -rotate-90 overflow-visible', className)}
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
        {...props}
      >
        <circle
          className={cn('text-foreground/10', trackClassName)}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn(
            'text-(--color-accent) transition-all duration-500 ease-out',
            progressClassName,
          )}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transitionProperty: 'stroke-dashoffset',
            filter: 'drop-shadow(0 0 2px currentColor)',
          }}
        />
      </svg>
    )
  },
)

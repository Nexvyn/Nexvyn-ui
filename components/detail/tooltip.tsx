'use client'

import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  side?: TooltipSide
  sideOffset?: number
  delayDuration?: number
  className?: string
}

function Tooltip({
  content,
  children,
  side = 'top',
  sideOffset = 8,
  delayDuration = 200,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration)
  }

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const position = {
    top: { y: -sideOffset, x: 0, originY: 1 },
    bottom: { y: sideOffset, x: 0, originY: 0 },
    left: { x: -sideOffset, y: 0, originX: 1 },
    right: { x: sideOffset, y: 0, originX: 0 },
  }

  const slide = {
    top: { y: 4 },
    bottom: { y: -4 },
    left: { x: 4 },
    right: { x: -4 },
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, ...slide[side] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...slide[side] }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute z-50 pointer-events-none whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium',
              'bg-(--color-fg) text-(--color-bg)',
              side === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
              side === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
              side === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
              side === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2',
              className,
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Tooltip }
export type { TooltipProps, TooltipSide }

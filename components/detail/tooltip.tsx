'use client'

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

const VIEWPORT_MARGIN = 8

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
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const [computedSide, setComputedSide] = useState<TooltipSide>(side)
  const [prevSide, setPrevSide] = useState(side)

  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (side !== prevSide) {
    setPrevSide(side)
    setComputedSide(side)
  }

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration)
  }

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(false)
  }

  const handlePointerDown = () => {
    hide()
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const updateCoords = useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()

    let tooltipW = 100
    let tooltipH = 32
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      tooltipW = tooltipRect.width
      tooltipH = tooltipRect.height
    }

    let newSide = side
    const spaceTop = rect.top
    const spaceBottom = window.innerHeight - rect.bottom
    const spaceLeft = rect.left
    const spaceRight = window.innerWidth - rect.right

    if (side === 'top' && spaceTop < tooltipH + sideOffset && spaceBottom > spaceTop) {
      newSide = 'bottom'
    } else if (side === 'bottom' && spaceBottom < tooltipH + sideOffset && spaceTop > spaceBottom) {
      newSide = 'top'
    } else if (side === 'left' && spaceLeft < tooltipW + sideOffset && spaceRight > spaceLeft) {
      newSide = 'right'
    } else if (side === 'right' && spaceRight < tooltipW + sideOffset && spaceLeft > spaceRight) {
      newSide = 'left'
    }

    setComputedSide(newSide)

    let top = 0
    let left = 0

    if (newSide === 'top') {
      top = rect.top - sideOffset - tooltipH
      left = rect.left + rect.width / 2 - tooltipW / 2
    } else if (newSide === 'bottom') {
      top = rect.bottom + sideOffset
      left = rect.left + rect.width / 2 - tooltipW / 2
    } else if (newSide === 'left') {
      top = rect.top + rect.height / 2 - tooltipH / 2
      left = rect.left - sideOffset - tooltipW
    } else {
      top = rect.top + rect.height / 2 - tooltipH / 2
      left = rect.right + sideOffset
    }

    const maxLeft = window.innerWidth - tooltipW - VIEWPORT_MARGIN
    const maxTop = window.innerHeight - tooltipH - VIEWPORT_MARGIN
    setCoords({
      top: Math.min(Math.max(top, VIEWPORT_MARGIN), Math.max(maxTop, VIEWPORT_MARGIN)),
      left: Math.min(Math.max(left, VIEWPORT_MARGIN), Math.max(maxLeft, VIEWPORT_MARGIN)),
    })
  }, [side, sideOffset])

  const setTooltipRef = useCallback(
    (node: HTMLDivElement | null) => {
      tooltipRef.current = node
      if (node) {
        requestAnimationFrame(() => {
          updateCoords()
        })
      }
    },
    [updateCoords],
  )

  useEffect(() => {
    if (!open) return

    updateCoords()
    let raf = 0
    const scheduleCoords = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        updateCoords()
      })
    }
    window.addEventListener('resize', scheduleCoords, { passive: true })
    window.addEventListener('scroll', scheduleCoords, { passive: true, capture: true })

    return () => {
      window.removeEventListener('resize', scheduleCoords)
      window.removeEventListener('scroll', scheduleCoords, true)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [open, updateCoords])

  const positionStyles = {
    position: 'fixed' as const,
    top: coords ? coords.top : 0,
    left: coords ? coords.left : 0,
    visibility: coords ? ('visible' as const) : ('hidden' as const),
    zIndex: 9999,
  }

  const slide = {
    top: { y: 4 },
    bottom: { y: -4 },
    left: { x: 4 },
    right: { x: -4 },
  }

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onPointerDown={handlePointerDown}
    >
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div ref={setTooltipRef} style={positionStyles} className="pointer-events-none">
                <motion.div
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, ...slide[computedSide] }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, ...slide[computedSide] }}
                  transition={{ duration: reduceMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-normal',
                    'bg-(--color-fg) text-(--color-bg) shadow-md',
                    className,
                  )}
                >
                  {content}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

export { Tooltip }
export type { TooltipProps, TooltipSide }

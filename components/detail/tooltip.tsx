'use client'

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const [computedSide, setComputedSide] = useState<TooltipSide>(side)

  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setComputedSide(side)
  }, [side])

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
    const scrollY = window.pageYOffset || document.documentElement.scrollTop
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft

    if (newSide === 'top') {
      top = rect.top + scrollY - sideOffset
      left = rect.left + scrollX + rect.width / 2
    } else if (newSide === 'bottom') {
      top = rect.bottom + scrollY + sideOffset
      left = rect.left + scrollX + rect.width / 2
    } else if (newSide === 'left') {
      top = rect.top + scrollY + rect.height / 2
      left = rect.left + scrollX - sideOffset
    } else if (newSide === 'right') {
      top = rect.top + scrollY + rect.height / 2
      left = rect.left + scrollX + rect.width + sideOffset
    }

    setCoords({ top, left })
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
    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, true)

    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords, true)
    }
  }, [open, updateCoords])

  const positionStyles = () => {
    if (!coords) return { opacity: 0, position: 'absolute' as const }

    let transform = ''
    if (computedSide === 'top') {
      transform = 'translate(-50%, -100%)'
    } else if (computedSide === 'bottom') {
      transform = 'translate(-50%, 0)'
    } else if (computedSide === 'left') {
      transform = 'translate(-100%, -50%)'
    } else if (computedSide === 'right') {
      transform = 'translate(0, -50%)'
    }

    return {
      position: 'absolute' as const,
      top: `${coords.top}px`,
      left: `${coords.left}px`,
      transform,
      zIndex: 9999,
    }
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
              <motion.div
                ref={setTooltipRef}
                initial={{ opacity: 0, ...slide[computedSide] }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, ...slide[computedSide] }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={positionStyles()}
                className={cn(
                  'pointer-events-none whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium',
                  'bg-(--color-fg) text-(--color-bg) shadow-md',
                  className,
                )}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

export { Tooltip }
export type { TooltipProps, TooltipSide }

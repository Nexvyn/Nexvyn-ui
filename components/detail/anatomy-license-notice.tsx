'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

const ICON_CLASS =
  'inline-flex items-center justify-center text-(--color-muted) transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none hover:text-(--color-fg)'

function InfoIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function AnatomyLicenseNotice({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const mounted = useMounted()
  const reduceMotion = useReducedMotion()

  const updateCoords = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    const panelW = panelRef.current?.offsetWidth ?? 260
    const left = Math.min(
      Math.max(8, rect.right - panelW),
      window.innerWidth - panelW - 8,
    )
    setCoords({ top: rect.top - 8, left })
  }, [])

  useEffect(() => {
    if (!open) return
    updateCoords()
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      setOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('resize', updateCoords)
    window.addEventListener('scroll', updateCoords, true)
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords, true)
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, updateCoords])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Anatomy diagram license notice"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className={cn(ICON_CLASS, className)}
      >
        <InfoIcon />
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && coords && (
              <motion.div
                ref={panelRef}
                role="note"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 4 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'fixed',
                  top: coords.top,
                  left: coords.left,
                  transform: 'translateY(-100%)',
                  zIndex: 9999,
                }}
                className="w-65 max-w-[calc(100vw-1rem)] rounded-lg squircle-corners border border-(--color-border) bg-(--color-bg) p-3 text-sm text-(--color-fg) shadow-lg"
              >
                Anatomy diagrams are CC BY-NC 4.0 — not for commercial use.
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}

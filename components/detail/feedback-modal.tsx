import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, Check, AlertCircle } from 'lucide-react'

type FeedbackModalProps = {
  isOpen: boolean
  onClose: () => void
  componentName?: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function FeedbackModal({ isOpen, onClose, componentName }: FeedbackModalProps) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, component: componentName }),
      })
      if (res.ok) {
        setStatus('success')
        successTimer.current = setTimeout(() => {
          onClose()
          setStatus('idle')
          setText('')
        }, 2200)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setText('')
      setStatus('idle')
    }
  }, [isOpen])

  useEffect(
    () => () => {
      if (successTimer.current) clearTimeout(successTimer.current)
    },
    [],
  )

  useEffect(() => {
    if (!isOpen) return

    triggerRef.current = document.activeElement as HTMLElement | null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFirst = () => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
      first?.focus()
    }
    focusFirst()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      triggerRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-100 w-[90%] max-w-90 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-(--color-border-strong) bg-(--color-bg) p-6 shadow-2xl select-none"
          >
            {status === 'success' && (
              <div className="flex flex-col items-center text-center py-6 px-2">
                <div className="h-16 w-16 bg-(--color-success) rounded-full flex items-center justify-center text-(--color-bg) mb-5 shadow-lg">
                  <Check className="h-8 w-8 stroke-[2.5]" />
                </div>
                <h3
                  id="feedback-modal-title"
                  className="text-xl font-semibold text-(--color-fg) mb-1.5"
                >
                  Thanks!
                </h3>
                <p className="text-xs sm:text-sm text-(--color-muted) leading-relaxed">
                  Your feedback helps us build something better.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center text-center py-4 px-2">
                <div className="h-16 w-16 bg-(--color-error)/10 text-(--color-error) rounded-full flex items-center justify-center mb-5">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h3
                  id="feedback-modal-title"
                  className="text-xl font-semibold text-(--color-fg) mb-1.5"
                >
                  Something went wrong
                </h3>
                <p className="text-xs sm:text-sm text-(--color-muted) leading-relaxed mb-6">
                  We couldn&apos;t send your feedback. Please try again.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="w-full rounded-xl bg-(--color-accent) hover:opacity-90 text-(--color-bg) font-medium py-3 text-center transition-opacity cursor-pointer border-0 text-sm"
                >
                  Try again
                </button>
              </div>
            )}

            {status === 'idle' && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    id="feedback-modal-title"
                    className="text-[17px] font-semibold text-(--color-fg)"
                  >
                    Help us improve
                  </h3>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer rounded-full p-1 hover:bg-(--color-surface-2) border-0 bg-transparent flex items-center justify-center"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault()
                      if (text.trim() && !submitting) {
                        const form = e.currentTarget.form
                        if (form) form.requestSubmit()
                      }
                    }
                  }}
                  placeholder="Share an idea or report a bug"
                  className="w-full min-h-30 bg-transparent text-(--color-fg) placeholder:text-(--color-muted) border-0 outline-none resize-none text-[14.5px] leading-relaxed py-1"
                />

                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-(--color-surface-2) hover:bg-(--color-surface-3) text-(--color-fg) font-semibold py-3 text-center transition-colors cursor-pointer border-0 text-xs tracking-wide"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !text.trim()}
                    className="flex-1 rounded-xl bg-(--color-fg) text-(--color-bg) hover:opacity-90 font-semibold py-3 text-center transition-opacity cursor-pointer border-0 text-xs tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}

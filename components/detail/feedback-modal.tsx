import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Check } from 'lucide-react'
import { SPRING_PANEL, SPRING_PRESS } from '@/lib/motion-tokens'

type FeedbackModalProps = {
  isOpen: boolean
  onClose: () => void
  componentName?: string
}

export function FeedbackModal({ isOpen, onClose, componentName }: FeedbackModalProps) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
        setTimeout(() => { onClose(); setStatus('idle'); setText('') }, 1500)
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
    if (!isOpen) { setText(''); setStatus('idle') }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={SPRING_PANEL}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-(--color-border) bg-(--color-bg) p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-(--color-fg)">Send Feedback</h3>
              <button onClick={onClose} className="text-(--color-muted) hover:text-(--color-fg) transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === 'success' ? (
              <div className="flex items-center gap-2 text-emerald-500 py-8 justify-center">
                <Check className="h-5 w-5" />
                <span>Feedback sent!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the issue or suggestion..."
                  className="min-h-[120px] rounded-xl border border-(--color-border) bg-(--color-surface) p-3 text-sm text-(--color-fg) placeholder:text-(--color-muted) resize-none focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
                />
                {status === 'error' && (
                  <p className="text-xs text-red-500">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={submitting || !text.trim()}
                  className="rounded-xl bg-(--color-fg) text-(--color-bg) px-4 py-2 text-sm font-medium disabled:opacity-50 transition-opacity"
                >
                  {submitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

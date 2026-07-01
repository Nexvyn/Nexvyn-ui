'use client'

import { useEffect, useState } from 'react'
import { motion, useDragControls } from 'motion/react'
import type { ComponentItem } from '@/lib/components-registry'
import { cn } from '@/lib/utils'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="detail-toolbar-btn detail-copy-btn shrink-0 rounded-md px-2 py-1 text-xs font-medium"
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-muted)',
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

type CodeDrawerProps = {
  open: boolean
  onClose: () => void
  item?: ComponentItem
}

export default function CodeDrawer({ open, onClose, item }: CodeDrawerProps) {
  const dragControls = useDragControls()
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !item?.registry) return
    let cancelled = false
    setLoading(true)
    setCode(null)
    fetch(`/api/source?name=${encodeURIComponent(item.registry)}`)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error())))
      .then((text) => !cancelled && setCode(text))
      .catch(() => !cancelled && setCode('// Unable to load source.'))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [open, item?.registry])

  return (
    <motion.div
      drag="y"
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.4 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 120) onClose()
      }}
      initial={false}
      animate={{ y: open ? '0%' : '110%' }}
      transition={{ type: 'spring', stiffness: 280, damping: 32 }}
      className={cn(
        'absolute inset-x-0 bottom-0 z-10 flex h-full flex-col rounded-2xl',
        'border-[0.5px] shadow-2xl',
      )}
      style={{
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div
        onPointerDown={(event) => dragControls.start(event)}
        className="shrink-0 cursor-grab touch-none px-4 pb-2 pt-3 active:cursor-grabbing"
      >
        <div
          className="mx-auto mb-3 h-1.5 w-12 rounded-full"
          style={{ backgroundColor: 'var(--color-border-strong)' }}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium" style={{ color: 'var(--color-fg)' }}>
            {item?.name ?? 'Code'}
          </span>
          {code && !loading && <CopyButton value={code} />}
        </div>
      </div>

      <pre className="detail-code-drawer-pre mx-4 mb-4">
        <code>{loading ? 'Loading...' : code}</code>
      </pre>
    </motion.div>
  )
}

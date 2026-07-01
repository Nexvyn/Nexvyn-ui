'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useDragControls } from 'motion/react'
import type { ComponentItem } from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import { ChevronLeft, Download, Copy, Check } from 'lucide-react'

function highlightCode(code: string) {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  html = html.replace(/("(?:\\"|[^"])*")/g, '<span class="text-(--color-muted)">$1</span>')
  html = html.replace(/('(?:\\'|[^'])*')/g, '<span class="text-(--color-muted)">$1</span>')

  const keywords = ['const', 'let', 'var', 'return', 'import', 'from', 'export', 'default', 'function', 'true', 'false', 'type', 'interface', 'as', 'async', 'await']
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g')
    html = html.replace(reg, '<span class="text-(--color-accent) font-semibold">$1</span>')
  })

  html = html.replace(/(&lt;\/?[A-Z][a-zA-Z0-9]*)/g, '<span class="text-(--color-accent) font-medium">$1</span>')
  html = html.replace(/(&lt;\/?[a-z]+)/g, '<span class="text-(--color-accent) font-medium">$1</span>')

  const attrs = ['className', 'key', 'style', 'onClick', 'type', 'ref', 'value', 'onChange', 'href', 'target', 'rel']
  attrs.forEach(attr => {
    const reg = new RegExp(`\\b(${attr})\\b`, 'g')
    html = html.replace(reg, '<span class="text-(--color-fg)">$1</span>')
  })

  html = html.replace(/(\/\/.*)/g, '<span class="text-(--color-muted) italic">$1</span>')

  return html
}

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
      className="p-1.5 rounded-md hover:bg-(--color-surface-2) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer shrink-0 border-0 bg-transparent flex items-center justify-center"
      title="Copy Code"
    >
      {copied ? <Check className="h-4 w-4 text-(--color-success)" /> : <Copy className="h-4 w-4" />}
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

  const handleDownload = () => {
    if (!code) return
    const blob = new Blob([code], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = item?.id ? `${item.id}.tsx` : 'code.tsx'
    a.click()
    URL.revokeObjectURL(url)
  }

  const filename = item?.id ? `${item.id}.tsx` : 'code.tsx'

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
        'absolute inset-x-0 bottom-0 z-10 flex h-full flex-col rounded-t-3xl',
        'border border-(--color-border) shadow-2xl',
      )}
      style={{
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <div
        className="w-full flex justify-center pt-3 pb-1 shrink-0 select-none cursor-row-resize touch-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="h-1.5 w-12 rounded-full bg-(--color-muted) opacity-30" />
      </div>

      <div className="shrink-0 flex items-center justify-between px-6 pb-4 select-none">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium text-(--color-fg) hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 p-0"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
          <span>Source Code</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!code || loading}
            className="flex items-center gap-1.5 text-xs text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer bg-transparent border-0 p-0 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download TSX source file"
          >
            <Download className="h-4 w-4" />
            <span className="font-mono">{filename}</span>
          </button>
          {code && !loading && <CopyButton value={code} />}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-15 z-20 h-10"
        style={{
          background: 'linear-gradient(to bottom, var(--color-bg) 30%, transparent)',
        }}
      />

      <div className="flex-1 overflow-y-auto px-8 py-6 select-text no-scrollbar">
        <pre className="no-scrollbar overflow-x-auto text-[13.5px] font-mono leading-relaxed bg-transparent border-0 p-0" style={{ color: 'var(--color-fg)' }}>
          {loading ? (
            <code className="text-(--color-muted)">Loading...</code>
          ) : code ? (
            <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
          ) : (
            <code className="text-(--color-muted)">// No code loaded.</code>
          )}
        </pre>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 rounded-b-3xl"
        style={{
          background: 'linear-gradient(to top, var(--color-bg) 30%, transparent)',
        }}
      />
    </motion.div>
  )
}

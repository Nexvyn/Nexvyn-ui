'use client'

import { useEffect, useState } from 'react'
import { motion, useDragControls, AnimatePresence } from 'motion/react'
import type { ComponentItem } from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import { ChevronLeft, Download, Copy, Check } from 'lucide-react'

import { CodeSnippet } from './code-snippet'

const getLanguageFromFileName = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase()
  const languageMap: Record<string, string> = {
    tsx: 'typescript',
    ts: 'typescript',
    jsx: 'javascript',
    js: 'javascript',
    css: 'css',
    html: 'html',
    json: 'json',
    md: 'markdown',
    mdx: 'markdown',
  }
  return languageMap[ext || ''] || 'typescript'
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

interface RegistryFile {
  path: string
  type: string
  content: string
}

const getFileName = (pathString: string) => {
  return pathString.split('/').pop() || pathString
}

export default function CodeDrawer({ open, onClose, item }: CodeDrawerProps) {
  const dragControls = useDragControls()
  const [files, setFiles] = useState<RegistryFile[]>([])
  const [selectedFileIndex, setSelectedFileIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !item?.registry) return
    let cancelled = false
    setLoading(true)
    setFiles([])
    setSelectedFileIndex(0)

    fetch(`/r/${item.registry}.json`)
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        if (!cancelled && data && Array.isArray(data.files)) {
          setFiles(data.files)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setFiles([
            {
              path: item.id ? `${item.id}.tsx` : 'code.tsx',
              type: 'registry:ui',
              content: '// Unable to load source.',
            },
          ])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open, item?.registry])

  const selectedFile = files[selectedFileIndex] || files[0]
  const code = selectedFile?.content || ''
  const filename = selectedFile ? getFileName(selectedFile.path) : 'code.tsx'

  const handleDownload = () => {
    if (!code) return
    const blob = new Blob([code], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasMultipleFiles = files.length > 1

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
        'border-0 shadow-2xl',
      )}
      style={{
        backgroundColor: 'var(--detail-code-bg)',
      }}
    >
      <div
        className="w-full flex justify-center pt-4 pb-1 shrink-0 select-none cursor-row-resize touch-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="h-1.5 w-12 rounded-full bg-(--color-muted) opacity-30" />
      </div>

      <div className="shrink-0 flex flex-col pt-1 select-none">
        <div className="flex items-center justify-between px-6 pb-3">
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
              title="Download source file"
            >
              <Download className="h-4 w-4" />
              <span className="font-mono">{filename}</span>
            </button>
            {code && !loading && <CopyButton value={code} />}
          </div>
        </div>

        {hasMultipleFiles && (
          <div
            className="flex items-center justify-start w-full gap-0.5 mt-2 border-b border-solid overflow-x-auto no-scrollbar px-4 sm:px-6"
            style={{ borderColor: 'var(--color-border)' }}
            role="tablist"
          >
            {files.map((file, index) => {
              const displayName = getFileName(file.path)
              const isActive = selectedFileIndex === index
              return (
                <button
                  key={file.path}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedFileIndex(index)}
                  className={cn(
                    'px-3 sm:px-4 py-2 text-[11px] sm:text-[13px] font-normal relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 transition-colors cursor-pointer border-0 bg-transparent shrink-0 whitespace-nowrap',
                    'text-(--color-muted) hover:text-(--color-fg)',
                    isActive && 'text-(--color-fg) font-semibold',
                  )}
                >
                  {displayName}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeCodeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 z-20 h-10"
        style={{
          top: hasMultipleFiles ? '104px' : '60px',
          background: 'linear-gradient(to bottom, var(--detail-code-bg) 30%, transparent)',
        }}
      />

      <div className="flex-1 overflow-y-auto py-6 select-text no-scrollbar">
        {loading ? (
          <pre className="px-4 sm:px-6 md:px-8 text-[13px] font-mono text-(--color-muted)">
            <code>Loading...</code>
          </pre>
        ) : code ? (
          <CodeSnippet
            code={code}
            language={selectedFile ? getLanguageFromFileName(selectedFile.path) : 'typescript'}
          />
        ) : (
          <pre className="px-4 sm:px-6 md:px-8 text-[13px] font-mono text-(--color-muted)">
            <code>// No code loaded.</code>
          </pre>
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 rounded-b-3xl"
        style={{
          background: 'linear-gradient(to top, var(--detail-code-bg) 30%, transparent)',
        }}
      />
    </motion.div>
  )
}

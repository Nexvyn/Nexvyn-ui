'use client'

import { useEffect, useId, useRef, useState } from 'react'
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
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current)
    },
    [],
  )

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    if (resetTimer.current) clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
      className="hit-area-44 p-1.5 rounded-md hover:bg-(--color-surface-2) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer shrink-0 border-0 bg-transparent flex items-center justify-center"
      title="Copy Code"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex items-center justify-center motion-reduce:transition-none motion-reduce:filter-none"
          >
            <Check className="h-4 w-4 text-(--color-success)" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex items-center justify-center motion-reduce:transition-none motion-reduce:filter-none"
          >
            <Copy className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
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
  const tabLayoutId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

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

  const moveTabFocus = (index: number) => {
    setSelectedFileIndex(index)
    tabRefs.current[index]?.focus()
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        moveTabFocus((selectedFileIndex + 1) % files.length)
        break
      case 'ArrowLeft':
        event.preventDefault()
        moveTabFocus((selectedFileIndex - 1 + files.length) % files.length)
        break
      case 'Home':
        event.preventDefault()
        moveTabFocus(0)
        break
      case 'End':
        event.preventDefault()
        moveTabFocus(files.length - 1)
        break
      default:
        break
    }
  }

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
        'absolute inset-x-0 bottom-0 z-10 flex h-full flex-col rounded-t-2xl overflow-hidden',
        'border-0 shadow-none',
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
          <div className="relative mt-2">
            <div
              role="tablist"
              aria-label="Source files"
              className="flex items-center justify-start w-full gap-1 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-2"
              onKeyDown={handleTabKeyDown}
            >
              {files.map((file, index) => {
                const displayName = getFileName(file.path)
                const isActive = selectedFileIndex === index
                return (
                  <button
                    key={file.path}
                    ref={(el) => {
                      tabRefs.current[index] = el
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setSelectedFileIndex(index)}
                    className={cn(
                      'relative px-3 sm:px-4 py-1.5 text-[11px] sm:text-[13px] font-normal rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-0 transition-colors duration-(--motion-dur-fast) cursor-pointer border-0 bg-transparent shrink-0 whitespace-nowrap',
                      'text-(--color-muted) hover:text-(--color-fg)',
                      isActive && 'text-(--color-fg) font-semibold',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={`${tabLayoutId}-active-code-tab`}
                        className="-z-10 absolute inset-0 rounded-md bg-(--color-surface-2)"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    {displayName}
                  </button>
                )
              })}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-2 right-0 w-8 sm:w-12"
              style={{
                background: 'linear-gradient(to left, var(--detail-code-bg) 25%, transparent)',
              }}
            />
          </div>
        )}
      </div>

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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16"
        style={{
          background: 'linear-gradient(to top, var(--detail-code-bg) 30%, transparent)',
        }}
      />
    </motion.div>
  )
}

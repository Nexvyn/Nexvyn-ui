'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent as ReactDragEvent,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const DEFAULT_ACCEPT = 'image/png,image/jpeg,application/pdf'

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}

interface InputMessageSlotContext {
  openFilePicker: (acceptOverride?: string) => void
  files: File[]
}

type InputMessageSlot = ReactNode | ((ctx: InputMessageSlotContext) => ReactNode)

export interface InputMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string
  onValueChange: (value: string) => void
  onSend?: (value: string, files: File[]) => void
  placeholder?: string
  leftSlot?: InputMessageSlot
  rightSlot?: InputMessageSlot
  disabled?: boolean
  minRows?: number
  maxRows?: number
  clickToFocus?: boolean
  sendLabel?: string
  files?: File[]
  onFilesChange?: (files: File[]) => void
  accept?: string
  maxFiles?: number
  filePreviewSize?: number
  textareaLabel?: string
  removeLabel?: string
  textareaProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'onKeyDown' | 'disabled' | 'placeholder'
  >
}

type PdfjsModule = typeof import('pdfjs-dist')
let pdfjsPromise: Promise<PdfjsModule> | null = null

async function loadPdfjs(): Promise<PdfjsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import('pdfjs-dist').then((mod) => {
      if (!mod.GlobalWorkerOptions.workerSrc) {
        mod.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${mod.version}/build/pdf.worker.min.mjs`
      }
      return mod
    })
  }
  return pdfjsPromise
}

async function renderPdfFirstPage(file: File, targetWidth: number): Promise<string> {
  const pdfjs = await loadPdfjs()
  const buffer = await file.arrayBuffer()
  const pdf = await pdfjs.getDocument({ data: buffer }).promise
  const page = await pdf.getPage(1)
  const baseViewport = page.getViewport({ scale: 1 })
  const scale = (targetWidth * 2) / baseViewport.width
  const viewport = page.getViewport({ scale })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvas, viewport }).promise
  return canvas.toDataURL('image/png')
}

interface FilePreviewTileProps {
  file: File
  onRemove: () => void
  size: number
  removeLabel: string
}

function FilePreviewTile({ file, onRemove, size, removeLabel }: FilePreviewTileProps) {
  const reduceMotion = useReducedMotion()
  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'
  const imageUrl = useMemo(() => (isImage ? URL.createObjectURL(file) : null), [isImage, file])
  useEffect(() => {
    if (!imageUrl) return
    return () => URL.revokeObjectURL(imageUrl)
  }, [imageUrl])
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!isPdf) return
    let cancelled = false
    renderPdfFirstPage(file, size)
      .then((url) => {
        if (!cancelled) setPdfUrl(url)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [file, isPdf, size])
  const previewUrl = imageUrl ?? pdfUrl
  const showsIcon = !previewUrl && !isImage && !isPdf
  return (
    <motion.div
      layout={!reduceMotion}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.06 } }}
      transition={reduceMotion ? { duration: 0 } : springs.press}
      className="relative shrink-0 overflow-hidden rounded-lg squircle-corners bg-muted border border-border cursor-default group/tile"
      style={{ width: size, height: size }}
    >
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt={file.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : showsIcon ? (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <FileIcon />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-6 h-6 rounded-full border-2 border-border border-t-muted-foreground animate-spin motion-reduce:animate-none"
            aria-label="Loading preview"
            role="status"
          />
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        onPointerDown={(e) => e.preventDefault()}
        aria-label={`${removeLabel} ${file.name}`}
        className="absolute top-1 inset-e-1 w-5 h-5 rounded-full bg-foreground text-background opacity-0 group-hover/tile:opacity-100 transition-opacity duration-(--motion-dur-fast) motion-reduce:transition-none flex items-center justify-center cursor-pointer outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-(--color-accent)"
      >
        <XIcon />
      </button>
    </motion.div>
  )
}

export const InputMessage = forwardRef<HTMLDivElement, InputMessageProps>(
  (
    {
      value,
      onValueChange,
      onSend,
      placeholder = 'Ask me anything…',
      leftSlot,
      rightSlot,
      disabled,
      minRows = 1,
      maxRows = 8,
      clickToFocus = true,
      sendLabel = 'Send',
      files,
      onFilesChange,
      accept = DEFAULT_ACCEPT,
      maxFiles,
      filePreviewSize = 80,
      textareaLabel = 'Message',
      removeLabel = 'Remove',
      textareaProps,
      className,
      ...props
    },
    ref,
  ) => {
    const reduceMotion = useReducedMotion()
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [focusVisible, setFocusVisible] = useState(false)
    const [dragOver, setDragOver] = useState(false)

    const filesArr = useMemo(() => files ?? [], [files])
    const supportsFiles = onFilesChange !== undefined

    useIsoLayoutEffect(() => {
      const el = textareaRef.current
      if (!el) return
      el.style.height = 'auto'
      const computed = getComputedStyle(el)
      const lineHeight = parseFloat(computed.lineHeight)
      if (Number.isNaN(lineHeight)) return
      const min = lineHeight * minRows
      const max = lineHeight * maxRows
      const next = Math.min(Math.max(el.scrollHeight, min), max)
      el.style.height = `${next}px`
      el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden'
    }, [value, minRows, maxRows])

    const trimmed = value.trim()
    const canSend = !disabled && (trimmed.length > 0 || filesArr.length > 0)

    const handleSend = useCallback(() => {
      if (!canSend) return
      onSend?.(trimmed, filesArr)
    }, [canSend, onSend, trimmed, filesArr])

    const handleKeyDown = useCallback(
      (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing) return
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          handleSend()
        }
      },
      [handleSend],
    )

    const handleContainerMouseDown = useCallback(
      (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!clickToFocus || disabled) return
        const target = e.target as HTMLElement
        if (target === textareaRef.current) return
        if (
          target.closest('button, a, input, select, textarea, [contenteditable], [role="button"]')
        ) {
          return
        }
        e.preventDefault()
        textareaRef.current?.focus()
      },
      [clickToFocus, disabled],
    )

    const acceptTokens = useMemo(
      () =>
        accept
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      [accept],
    )

    const matchesAccept = useCallback(
      (file: File) =>
        acceptTokens.some((token) => {
          if (token.endsWith('/*')) return file.type.startsWith(token.slice(0, -1))
          if (token.startsWith('.')) return file.name.toLowerCase().endsWith(token.toLowerCase())
          return file.type === token
        }),
      [acceptTokens],
    )

    const addFiles = useCallback(
      (incoming: File[]) => {
        if (!onFilesChange) return
        const fingerprint = (f: File) => `${f.name}-${f.size}-${f.lastModified}`
        const existing = new Set(filesArr.map(fingerprint))
        const accepted: File[] = []
        for (const f of incoming) {
          if (!matchesAccept(f)) continue
          const fp = fingerprint(f)
          if (existing.has(fp)) continue
          existing.add(fp)
          accepted.push(f)
        }
        if (!accepted.length) return
        const next = [...filesArr, ...accepted]
        onFilesChange(maxFiles != null ? next.slice(0, maxFiles) : next)
      },
      [onFilesChange, filesArr, matchesAccept, maxFiles],
    )

    const removeFile = useCallback(
      (idx: number) => {
        if (!onFilesChange) return
        onFilesChange(filesArr.filter((_, i) => i !== idx))
      },
      [onFilesChange, filesArr],
    )

    const openFilePicker = useCallback(
      (overrideAccept?: string) => {
        const el = fileInputRef.current
        if (!el) return
        if (overrideAccept) {
          el.accept = overrideAccept
          el.click()
          queueMicrotask(() => {
            if (fileInputRef.current) fileInputRef.current.accept = accept
          })
          return
        }
        el.click()
      },
      [accept],
    )

    const slotCtx = useMemo<InputMessageSlotContext>(
      () => ({ openFilePicker, files: filesArr }),
      [openFilePicker, filesArr],
    )
    // eslint-disable-next-line react-hooks/refs -- ref read is deferred to the consumer's own event handler, not executed during this render
    const leftContent = typeof leftSlot === 'function' ? leftSlot(slotCtx) : leftSlot
    // eslint-disable-next-line react-hooks/refs -- see leftContent above
    const rightContent = typeof rightSlot === 'function' ? rightSlot(slotCtx) : rightSlot

    const handleDragOver = useCallback(
      (e: ReactDragEvent<HTMLDivElement>) => {
        if (!supportsFiles || disabled) return
        if (!Array.from(e.dataTransfer.types).includes('Files')) return
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
        setDragOver(true)
      },
      [supportsFiles, disabled],
    )

    const handleDragLeave = useCallback((e: ReactDragEvent<HTMLDivElement>) => {
      const wrapper = e.currentTarget
      const next = e.relatedTarget as Node | null
      if (next && wrapper.contains(next)) return
      setDragOver(false)
    }, [])

    const handleDrop = useCallback(
      (e: ReactDragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragOver(false)
        if (!supportsFiles || disabled) return
        addFiles(Array.from(e.dataTransfer.files))
      },
      [supportsFiles, disabled, addFiles],
    )

    const handleFileInputChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        addFiles(Array.from(e.target.files))
        e.target.value = ''
      },
      [addFiles],
    )

    return (
      <div
        ref={ref}
        onMouseDown={handleContainerMouseDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col gap-1 p-2 rounded-xl squircle-corners bg-card border border-transparent shadow-sm',
          'transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
          clickToFocus && !disabled && 'cursor-text',
          dragOver && 'border-(--color-accent)',
          !dragOver && focusVisible && 'border-foreground/20',
          !dragOver && !focusVisible && clickToFocus && !disabled && 'hover:border-border',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        {...props}
      >
        {supportsFiles && (
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={maxFiles == null || maxFiles > 1}
            className="hidden"
            onChange={handleFileInputChange}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        <AnimatePresence initial={false}>
          {filesArr.length > 0 && (
            <motion.div
              key="preview-row"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { ...springs.settle, bounce: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pb-1">
                <AnimatePresence initial={false} mode="popLayout">
                  {filesArr.map((file, i) => (
                    <FilePreviewTile
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      file={file}
                      onRemove={() => removeFile(i)}
                      size={filePreviewSize}
                      removeLabel={removeLabel}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            if (e.target.matches(':focus-visible')) setFocusVisible(true)
          }}
          onBlur={() => setFocusVisible(false)}
          placeholder={dragOver && supportsFiles ? 'Drop files here to add to chat' : placeholder}
          disabled={disabled}
          rows={minRows}
          aria-label={textareaProps?.['aria-label'] ?? textareaLabel}
          className="w-full resize-none bg-transparent outline-none text-[14px] font-normal text-foreground placeholder:text-muted-foreground px-2 py-2"
          {...textareaProps}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">{leftContent}</div>
          <div className="flex items-center gap-1.5 shrink-0">
            {rightContent}
            <button
              type="button"
              onClick={handleSend}
              onPointerDown={(e) => e.preventDefault()}
              disabled={!canSend}
              aria-label={sendLabel}
              className={cn(
                'flex items-center justify-center size-8 rounded-full squircle bg-foreground text-background cursor-pointer outline-none',
                'transition-[opacity,transform] duration-(--motion-dur-fast) motion-reduce:transition-none',
                'active:scale-95 motion-reduce:active:scale-100 disabled:opacity-40 disabled:pointer-events-none',
                'focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              )}
            >
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </div>
    )
  },
)

InputMessage.displayName = 'InputMessage'

export function InputMessagePreview() {
  const [value, setValue] = useState('')
  return (
    <div className="flex h-full w-full min-h-50 items-center justify-center px-6 pt-6 pb-24 sm:px-8 sm:pt-8 sm:pb-28">
      <div className="w-full max-w-2xl">
        <InputMessage
          value={value}
          onValueChange={setValue}
          onSend={() => setValue('')}
          placeholder="Ask me anything…"
          minRows={2}
          maxRows={6}
        />
      </div>
    </div>
  )
}

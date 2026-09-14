'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'
import { useScrollLock, useRestoreFocus } from '@/lib/hooks/use-overlay'
import { matchesSearch, buildSearchableText } from '@/lib/search-match'
import { playClickSound, playHoverSound } from '@/lib/sound'

export interface CommandAction {
  id: string
  label: string
  detail?: string
  section?: string
  keywords?: string[]
  icon?: ReactNode
  hint?: string
  disabled?: boolean
  perform?: () => void
}

interface PaletteSection {
  heading: string
  actions: CommandAction[]
}

export interface CommandPaletteProps {
  actions: CommandAction[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  hotkey?: string | null
  placeholder?: string
  emptyState?: ReactNode
  recentLimit?: number
  recentStorageKey?: string | null
  ungroupedHeading?: string
  recentHeading?: string
  title?: string
  showFooter?: boolean
  navigateLabel?: string
  selectLabel?: string
  closeLabel?: string
  className?: string
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const
const ENTER_DURATION = 0.2
const EXIT_DURATION = 0.12

function actionMatches(action: CommandAction, query: string): boolean {
  return matchesSearch(
    buildSearchableText(action.label, action.detail, [
      ...(action.keywords ?? []),
      ...(action.section ? [action.section] : []),
    ]),
    query,
  )
}

function nextEnabledIndex(flat: CommandAction[], from: number, dir: 1 | -1): number {
  if (flat.length === 0) return -1
  let cursor = from
  for (let step = 0; step < flat.length; step++) {
    cursor = (cursor + dir + flat.length) % flat.length
    if (!flat[cursor]?.disabled) return cursor
  }
  return -1
}

function firstEnabledIndex(flat: CommandAction[]): number {
  return flat.findIndex((a) => !a.disabled)
}

function loadRecents(key: string | null | undefined): string[] {
  if (!key || typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

function assignRef<T>(ref: ForwardedRef<T>, node: T | null) {
  if (typeof ref === 'function') ref(node)
  else if (ref) ref.current = node
}

function Kbd({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 select-none items-center justify-center rounded-md squircle-corners',
        'border border-(--color-border) bg-(--color-surface) px-1.5',
        'font-mono text-xs leading-none text-(--color-muted)',
        className,
      )}
    >
      {children}
    </kbd>
  )
}

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      actions,
      open: openProp,
      defaultOpen = false,
      onOpenChange,
      hotkey = 'k',
      placeholder = 'Type a command or search…',
      emptyState = 'No matching commands.',
      recentLimit = 4,
      recentStorageKey = null,
      ungroupedHeading = 'Commands',
      recentHeading = 'Recent',
      title = 'Command palette',
      showFooter = true,
      navigateLabel = 'Navigate',
      selectLabel = 'Open',
      closeLabel = 'Close',
      className,
    },
    ref,
  ) => {
    const isControlled = openProp !== undefined
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const open = isControlled ? openProp : uncontrolledOpen

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isControlled) setUncontrolledOpen(next)
        onOpenChange?.(next)
      },
      [isControlled, onOpenChange],
    )

    const reduceMotion = useReducedMotion()
    const mounted = useMounted()
    const reactId = useId()
    const listboxId = `${reactId}-listbox`
    const titleId = `${reactId}-title`

    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const [recentIds, setRecentIds] = useState<string[]>(() =>
      recentLimit > 0 ? loadRecents(recentStorageKey) : [],
    )
    const [prevRecentKey, setPrevRecentKey] = useState(recentStorageKey)
    if (prevRecentKey !== recentStorageKey) {
      setPrevRecentKey(recentStorageKey)
      setRecentIds(recentLimit > 0 ? loadRecents(recentStorageKey) : [])
    }

    const panelRef = useRef<HTMLDivElement | null>(null)
    const listRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [itemRefsMap] = useState(() => new Map<number, HTMLButtonElement | null>())

    useScrollLock(open)
    useRestoreFocus(open)

    useEffect(() => {
      if (!open) return
      const frame = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(frame)
    }, [open])

    useEffect(() => {
      if (!open) return
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          setOpen(false)
        } else if (e.key === 'Tab') {
          e.preventDefault()
          inputRef.current?.focus()
        }
      }
      const onPointerDown = (e: PointerEvent) => {
        const panel = panelRef.current
        if (panel && !panel.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener('keydown', onKeyDown)
      document.addEventListener('pointerdown', onPointerDown)
      return () => {
        document.removeEventListener('keydown', onKeyDown)
        document.removeEventListener('pointerdown', onPointerDown)
      }
    }, [open, setOpen])

    useEffect(() => {
      if (recentLimit <= 0 || !recentStorageKey) return
      const onStorage = (e: StorageEvent) => {
        if (e.key === recentStorageKey) {
          setRecentIds(loadRecents(recentStorageKey))
        }
      }
      window.addEventListener('storage', onStorage)
      return () => window.removeEventListener('storage', onStorage)
    }, [recentLimit, recentStorageKey])

    useEffect(() => {
      if (!hotkey) return
      const wanted = hotkey.toLowerCase()
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.repeat) return
        if (
          (e.metaKey || e.ctrlKey) &&
          !e.altKey &&
          !e.shiftKey &&
          e.key.toLowerCase() === wanted
        ) {
          e.preventDefault()
          setOpen(!open)
        }
      }
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    }, [hotkey, open, setOpen])

    const sections = useMemo<PaletteSection[]>(() => {
      const trimmed = query.trim()
      const result: PaletteSection[] = []

      if (!trimmed && recentLimit > 0 && recentIds.length > 0) {
        const byId = new Map(actions.map((a) => [a.id, a]))
        const recentActions = recentIds
          .map((id) => byId.get(id))
          .filter((a): a is CommandAction => Boolean(a))
          .slice(0, recentLimit)
        if (recentActions.length > 0) {
          result.push({ heading: recentHeading, actions: recentActions })
        }
      }

      const order: string[] = []
      const buckets = new Map<string, CommandAction[]>()
      for (const action of actions) {
        if (trimmed && !actionMatches(action, trimmed)) continue
        const heading = action.section ?? ungroupedHeading
        let bucket = buckets.get(heading)
        if (!bucket) {
          bucket = []
          buckets.set(heading, bucket)
          order.push(heading)
        }
        bucket.push(action)
      }
      for (const heading of order) {
        result.push({ heading, actions: buckets.get(heading) ?? [] })
      }

      return result
    }, [actions, query, recentIds, recentLimit, recentHeading, ungroupedHeading])

    const flat = useMemo(() => sections.flatMap((s) => s.actions), [sections])

    const [prevOpen, setPrevOpen] = useState(open)
    const [prevFlat, setPrevFlat] = useState(flat)
    if (open !== prevOpen || flat !== prevFlat) {
      setPrevOpen(open)
      setPrevFlat(flat)
      if (open && !prevOpen) setQuery('')
      setActiveIndex(flat.length > 0 ? firstEnabledIndex(flat) : null)
    }

    useEffect(() => {
      if (open) listRef.current?.scrollTo({ top: 0 })
    }, [flat, open])

    const performAction = useCallback(
      (action: CommandAction | undefined) => {
        if (!action || action.disabled) return
        playClickSound()
        if (recentLimit > 0) {
          setRecentIds((prev) => {
            const next = [action.id, ...prev.filter((id) => id !== action.id)].slice(0, recentLimit)
            if (recentStorageKey && typeof window !== 'undefined') {
              try {
                window.localStorage.setItem(recentStorageKey, JSON.stringify(next))
              } catch {}
            }
            return next
          })
        }
        setOpen(false)
        action.perform?.()
      },
      [recentLimit, recentStorageKey, setOpen],
    )

    const focusIndex = useCallback(
      (index: number) => {
        if (index < 0) return
        setActiveIndex(index)
        itemRefsMap.get(index)?.scrollIntoView({ block: 'nearest' })
      },
      [itemRefsMap],
    )

    const onInputKeyDown = useCallback(
      (e: ReactKeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            focusIndex(nextEnabledIndex(flat, activeIndex ?? -1, 1))
            break
          case 'ArrowUp':
            e.preventDefault()
            focusIndex(nextEnabledIndex(flat, activeIndex ?? 0, -1))
            break
          case 'Home':
            e.preventDefault()
            focusIndex(firstEnabledIndex(flat))
            break
          case 'End':
            e.preventDefault()
            focusIndex(nextEnabledIndex(flat, 0, -1))
            break
          case 'Enter':
            e.preventDefault()
            if (activeIndex !== null) performAction(flat[activeIndex])
            break
          default:
            break
        }
      },
      [activeIndex, flat, focusIndex, performAction],
    )

    if (!mounted) return null

    const enter = reduceMotion ? { duration: 0 } : { duration: ENTER_DURATION, ease: EASE_OUT }
    const exit = reduceMotion ? { duration: 0 } : { duration: EXIT_DURATION, ease: EASE_OUT }

    let runningIndex = -1
    const activeOptionId =
      activeIndex !== null && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined

    return createPortal(
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-300 flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
            <motion.div
              className="absolute inset-0 bg-(--color-bg)/70 backdrop-blur-[2px] motion-reduce:backdrop-blur-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: enter }}
              exit={{ opacity: 0, transition: exit }}
              aria-hidden="true"
            />

            <motion.div
              ref={(node) => {
                panelRef.current = node
                assignRef(ref, node)
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={cn(
                'relative z-10 flex max-h-[min(70dvh,32rem)] w-full max-w-xl flex-col overflow-hidden',
                'rounded-md squircle-corners border border-(--color-border) bg-(--color-bg)',
                'shadow-xl outline-none',
                className,
              )}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1, transition: enter }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, transition: exit }}
            >
              <h2 id={titleId} className="sr-only">
                {title}
              </h2>

              <div className="flex shrink-0 items-center gap-3 border-b border-(--color-border) px-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 text-(--color-subtle)"
                >
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M13.5 13.5 10.5 10.5" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={listboxId}
                  aria-activedescendant={activeOptionId}
                  aria-autocomplete="list"
                  aria-label={title}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder={placeholder}
                  className={cn(
                    'h-14 w-full min-w-0 bg-transparent text-base text-(--color-fg) outline-none sm:text-sm',
                    'placeholder:text-(--color-subtle)',
                  )}
                />
                <Kbd className="hidden sm:inline-flex">Esc</Kbd>
              </div>

              <div
                ref={listRef}
                id={listboxId}
                role="listbox"
                aria-label={title}
                className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
              >
                {flat.length === 0 ? (
                  <div className="px-3 py-12 text-center text-sm text-(--color-muted)">
                    {emptyState}
                  </div>
                ) : (
                  sections.map((section, sectionIndex) => (
                    <div
                      key={section.heading}
                      role="group"
                      aria-label={section.heading}
                      className={cn(sectionIndex > 0 && 'mt-2')}
                    >
                      <div
                        aria-hidden="true"
                        className="px-3 pb-1.5 pt-2 text-xs text-(--color-subtle)"
                      >
                        {section.heading}
                      </div>
                      {section.actions.map((action) => {
                        runningIndex += 1
                        const index = runningIndex
                        const isActive = index === activeIndex
                        return (
                          <button
                            key={`${section.heading}:${action.id}`}
                            ref={(node) => {
                              itemRefsMap.set(index, node)
                              return () => {
                                itemRefsMap.delete(index)
                              }
                            }}
                            type="button"
                            role="option"
                            tabIndex={-1}
                            id={`${listboxId}-opt-${index}`}
                            aria-selected={isActive}
                            aria-disabled={action.disabled || undefined}
                            disabled={action.disabled}
                            data-active={isActive || undefined}
                            onPointerDown={(e) => e.preventDefault()}
                            onPointerMove={() => {
                              if (!action.disabled && !isActive) {
                                setActiveIndex(index)
                                playHoverSound()
                              }
                            }}
                            onClick={() => performAction(action)}
                            className={cn(
                              'relative flex min-h-10 w-full items-center gap-3 rounded-md squircle-corners px-3 py-2 text-start pointer-coarse:min-h-11',
                              'text-sm outline-none',
                              'before:absolute before:inset-y-2 before:inset-s-0 before:w-0.5 before:rounded-full before:bg-(--color-accent) before:opacity-0',
                              'data-active:bg-(--color-surface) data-active:before:opacity-100',
                              action.disabled
                                ? 'cursor-not-allowed text-(--color-subtle)'
                                : 'cursor-pointer text-(--color-muted) data-active:text-(--color-fg)',
                            )}
                          >
                            {action.icon !== undefined && (
                              <span
                                aria-hidden={typeof action.icon !== 'string' ? 'true' : undefined}
                                className="flex size-4 shrink-0 items-center justify-center text-(--color-subtle)"
                              >
                                {action.icon}
                              </span>
                            )}
                            <span className="flex min-w-0 flex-1 items-baseline gap-3">
                              <span className="shrink-0 truncate">{action.label}</span>
                              {action.detail && (
                                <span className="hidden min-w-0 truncate text-xs text-(--color-subtle) sm:block">
                                  {action.detail}
                                </span>
                              )}
                            </span>
                            {action.hint && <Kbd className="shrink-0">{action.hint}</Kbd>}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {showFooter && (
                <div className="flex shrink-0 items-center gap-4 border-t border-(--color-border) px-4 py-2.5 text-xs text-(--color-subtle) pointer-coarse:hidden">
                  <span className="inline-flex items-center gap-1.5">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    <span>{navigateLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Kbd>↵</Kbd>
                    <span>{selectLabel}</span>
                  </span>
                  <span className="ms-auto inline-flex items-center gap-1.5">
                    <Kbd>Esc</Kbd>
                    <span>{closeLabel}</span>
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body,
    )
  },
)
CommandPalette.displayName = 'CommandPalette'

export function CommandPalettePreview() {
  const [open, setOpen] = useState(false)
  const actions: CommandAction[] = [
    { id: 'new-file', label: 'New file', section: 'Actions', hint: '⌘N', perform: () => {} },
    { id: 'search', label: 'Search project', section: 'Actions', hint: '⌘F', perform: () => {} },
    {
      id: 'settings',
      label: 'Open settings',
      detail: 'Editor, theme, keybindings',
      section: 'Navigate',
      perform: () => {},
    },
    { id: 'docs', label: 'Read the docs', section: 'Navigate', perform: () => {} },
    { id: 'theme', label: 'Toggle theme', section: 'Preferences', hint: '⌘L', perform: () => {} },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'flex min-h-11 items-center gap-2 rounded-md squircle-corners border border-(--color-border) bg-(--color-surface)',
          'px-4 py-2.5 text-sm text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out)',
          'hover:text-(--color-fg) motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
        )}
      >
        <span>Search commands</span>
        <Kbd>⌘K</Kbd>
      </button>
      <CommandPalette actions={actions} open={open} onOpenChange={setOpen} hotkey={null} />
    </div>
  )
}

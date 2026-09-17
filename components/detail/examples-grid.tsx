'use client'

import { useEffect, useRef, useState, useCallback, useMemo, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ComponentExample } from './examples-types'

const examplesMap: Record<string, () => Promise<{ examples: ComponentExample[] }>> = {
  badge: () =>
    import('@/components/ui/examples/badge-examples').then((m) => ({ examples: m.examples })),
  select: () =>
    import('@/components/ui/examples/select-examples').then((m) => ({ examples: m.examples })),
  switch: () =>
    import('@/components/ui/examples/switch-examples').then((m) => ({ examples: m.examples })),
}

const EASE = [0.22, 1, 0.36, 1] as const

interface ExamplesGridProps {
  id: string
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {}
    document.body.removeChild(textarea)
    return ok
  }
}

function CopyCodeButton({ example }: { example: ComponentExample }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  const handleCopy = async () => {
    const ok = await copyText(example.code)
    setState(ok ? 'copied' : 'failed')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setState('idle'), 1500)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${example.title} code`}
        className="hit-area-44 flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-(--color-muted) transition-colors duration-(--motion-dur-fast) hover:text-(--color-fg) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none"
      >
        {state === 'copied' ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Failed' : 'Copy code'}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === 'copied'
          ? `${example.title} code copied`
          : state === 'failed'
            ? `Could not copy ${example.title} code`
            : ''}
      </span>
    </>
  )
}

function ExamplesGridContent({ examples }: { examples: ComponentExample[] }) {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)

  const groups = useMemo(() => {
    const result: { name: string; items: { example: ComponentExample; index: number }[] }[] = []
    examples.forEach((example, index) => {
      let group = result.find((entry) => entry.name === example.group)
      if (!group) {
        group = { name: example.group, items: [] }
        result.push(group)
      }
      group.items.push({ example, index })
    })
    return result
  }, [examples])

  const order = useMemo(
    () => groups.flatMap((group) => group.items.map((item) => item.index)),
    [groups],
  )
  const position = Math.max(0, order.indexOf(active))
  const current = examples[active]

  const select = useCallback((index: number, focus = false) => {
    setActive(index)
    if (focus) {
      listRef.current?.querySelector<HTMLButtonElement>(`[data-example-index="${index}"]`)?.focus()
    }
  }, [])

  const selectPosition = (next: number) => {
    const wrapped = (next + order.length) % order.length
    select(order[wrapped], true)
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      selectPosition(position + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      selectPosition(position - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectPosition(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectPosition(order.length - 1)
    }
  }

  return (
    <section aria-label="Examples" className="relative flex h-full flex-col md:block">
      <div
        className={cn(
          'z-10 shrink-0 px-4 md:absolute md:end-4 md:top-0 md:w-60 md:px-0',
          'md:rounded-md md:border md:border-(--color-fg)/10 md:bg-(--color-panel-float) md:p-1.5',
        )}
      >
        <div className="hidden items-center justify-between px-2 pt-1 pb-2 md:flex">
          <p className="text-sm text-(--color-fg)">Examples</p>
          <span className="font-mono text-xs tabular-nums text-(--color-muted)">
            {position + 1} / {examples.length}
          </span>
        </div>
        <div
          ref={listRef}
          role="radiogroup"
          aria-label="Choose an example"
          onKeyDown={onListKeyDown}
          className="no-scrollbar flex gap-1 overflow-x-auto md:flex-col md:overflow-visible"
        >
          {groups.map((group) => (
            <div key={group.name} className="flex shrink-0 gap-1 md:flex-col">
              <p className="hidden px-2 pt-2 pb-1 font-mono text-[11px] text-(--color-muted) md:block">
                {group.name}
              </p>
              {group.items.map(({ example, index }) => {
                const selected = index === active
                return (
                  <button
                    key={example.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    data-example-index={index}
                    onClick={() => select(index)}
                    className={cn(
                      'shrink-0 rounded-md px-2.5 py-1.5 text-start text-sm transition-colors duration-(--motion-dur-fast) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) motion-reduce:transition-none',
                      selected
                        ? 'bg-(--color-fg)/8 text-(--color-fg)'
                        : 'text-(--color-muted) hover:text-(--color-fg)',
                    )}
                  >
                    {example.title}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        {current && (
          <div className="mt-1.5 hidden border-t border-(--color-fg)/8 px-1 pt-1.5 md:block">
            <CopyCodeButton example={current} />
          </div>
        )}
      </div>

      <div className="relative min-h-0 flex-1 md:absolute md:inset-0 md:pe-64">
        <AnimatePresence initial={false}>
          {current && (
            <motion.div
              key={current.id}
              className="absolute inset-0 flex items-center justify-center overflow-y-auto px-6 pt-6 pb-28 no-scrollbar"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, filter: 'blur(2px)' }
              }
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.01, filter: 'blur(2px)' }
              }
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
            >
              {current.render()}
            </motion.div>
          )}
        </AnimatePresence>
        {current && (
          <div className="absolute inset-x-0 bottom-24 flex justify-center md:hidden">
            <CopyCodeButton example={current} />
          </div>
        )}
      </div>
    </section>
  )
}

export function ExamplesGrid({ id }: ExamplesGridProps) {
  const [examples, setExamples] = useState<ComponentExample[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const loaderExists = id in examplesMap

  useEffect(() => {
    let mounted = true

    if (!loaderExists) {
      // Defer setting state to avoid synchronous setState in effect
      Promise.resolve().then(() => {
        if (mounted) {
          setLoading(false)
        }
      })
      return
    }

    const loader = examplesMap[id]
    loader()
      .then((mod) => {
        if (mounted) {
          setExamples(mod.examples)
          setError(null)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError('Failed to load examples')
          console.error(err)
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [id, loaderExists])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-(--color-muted)">
        Loading examples...
      </div>
    )
  }

  if (!loaderExists) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-(--color-muted)">
        No examples available
      </div>
    )
  }

  if (error || !examples) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-(--color-muted)">
        {error || 'No examples available'}
      </div>
    )
  }

  return <ExamplesGridContent examples={examples} />
}

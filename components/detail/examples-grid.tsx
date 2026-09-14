'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Copy } from 'lucide-react'
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

interface ExamplesGridProps {
  id: string
}

function ExampleCell({ example }: { example: ComponentExample }) {
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const cellRef = useRef<HTMLLIElement>(null)
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cellRef.current) {
      observer.observe(cellRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(
    () => () => {
      const timerId = copyTimerRef.current
      if (timerId) clearTimeout(timerId)
    },
    [],
  )

  const handleCopy = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Fallback to execCommand
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
      } catch {}
      document.body.removeChild(textarea)
    }

    setCopied(true)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopied(false), 1500)
  }, [])

  return (
    <li
      ref={cellRef}
      className="group flex flex-col rounded-md bg-(--color-surface-2) border border-(--color-border) overflow-hidden"
      style={{ gridColumn: `span ${example.span ?? 1}` }}
    >
      <div className="flex-1 flex items-center justify-center p-4 min-h-24">
        {isVisible && example.render()}
      </div>
      <div className="border-t border-(--color-border) bg-(--color-surface) px-3 py-2 flex items-center justify-between gap-2">
        <p className="text-xs text-(--color-muted) font-mono truncate">{example.title}</p>
        <button
          type="button"
          onClick={() => handleCopy(example.code)}
          aria-label={`Copy ${example.title} code`}
          className={cn(
            'hit-area-44 p-1.5 rounded-md flex items-center justify-center shrink-0',
            'text-(--color-muted) hover:text-(--color-fg)',
            'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100',
            'transition-opacity duration-(--motion-dur-fast) ease motion-reduce:transition-none',
            'hover:bg-(--color-surface-2)',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)',
          )}
        >
          {copied ? '✓' : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </li>
  )
}

function ExamplesGridContent({ examples }: { examples: ComponentExample[] }) {
  const groupedExamples = useMemo(() => {
    const groups: Record<string, ComponentExample[]> = {}
    examples.forEach((ex) => {
      if (!groups[ex.group]) groups[ex.group] = []
      groups[ex.group].push(ex)
    })
    return groups
  }, [examples])

  const groups = Object.keys(groupedExamples).sort()

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {groups.map((group) => (
        <div key={group} className="flex flex-col">
          <h3 className="sticky top-0 z-10 px-4 py-3 text-sm font-normal uppercase tracking-wider text-(--color-muted) bg-(--color-surface) border-b border-(--color-border)">
            {group}
          </h3>
          <ul
            className={cn(
              'grid gap-3 p-4',
              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
            )}
          >
            {groupedExamples[group].map((example) => (
              <ExampleCell key={example.id} example={example} />
            ))}
          </ul>
        </div>
      ))}
    </div>
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

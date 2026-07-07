'use client'

import { useState, useEffect, useRef, useCallback, type RefObject } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { CircularProgress } from './circular-progress'

export interface TOCSection {
  id: string
  title: string
  level?: number
}

interface TableOfContentsProps {
  sections: TOCSection[]
  scrollOffset?: number
  showAfterScroll?: number
  scrollContainer?: RefObject<HTMLElement | null>
  className?: string
}

export function TableOfContents({
  sections,
  scrollOffset = 120,
  showAfterScroll = 300,
  scrollContainer,
  className,
}: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    let ticking = false
    const el = scrollContainer?.current

    const getScrollTop = () => (el ? el.scrollTop : window.scrollY)
    const getScrollHeight = () =>
      el ? el.scrollHeight - el.clientHeight : document.documentElement.scrollHeight - window.innerHeight

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          const scrollTop = getScrollTop()
          const height = getScrollHeight()
          const scrolled = height > 0 ? (scrollTop / height) * 100 : 0

          setScrollProgress(scrolled)
          setIsVisible(scrollTop > showAfterScroll)
          ticking = false
        })
        ticking = true
      }
    }

    const target = el || window
    target.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      target.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [showAfterScroll, scrollContainer])

  useEffect(() => {
    const root = scrollContainer?.current ?? null
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { root, rootMargin: '-10% 0% -60% 0%', threshold: 0 },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections, scrollContainer])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToSection = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      if (!element) return

      const el = scrollContainer?.current
      if (el) {
        const containerTop = el.getBoundingClientRect().top
        const elementTop = element.getBoundingClientRect().top
        const scrollTop = el.scrollTop + (elementTop - containerTop) - scrollOffset
        el.scrollTo({ top: scrollTop, behavior: 'smooth' })
      } else {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top: elementPosition - scrollOffset, behavior: 'smooth' })
      }
      setIsExpanded(false)
    },
    [scrollOffset, scrollContainer],
  )

  const activeSection = sections.find((s) => s.id === activeId) || sections[0]

  const entranceTransition = prefersReduced
    ? { duration: 0.01 }
    : { type: 'spring' as const, damping: 25, stiffness: 300 }

  const panelTransition = prefersReduced
    ? { duration: 0.01 }
    : { duration: 0.2, ease: 'easeOut' as const }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={entranceTransition}
          className={cn(
            'fixed bottom-8 end-8 z-[100] w-[calc(100%-2rem)] max-w-sm',
            className,
          )}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={panelTransition}
                className="mb-3 w-full overflow-hidden rounded-md bg-(--color-surface) p-2"
              >
                <div className="no-scrollbar max-h-[50vh] space-y-0.5 overflow-y-auto py-1">
                  {sections.map((section) => {
                    const isActive = activeId === section.id
                    const level = section.level ?? 2
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          'relative w-full rounded-xl px-4 py-2.5 text-left text-sm transition-colors',
                          isActive
                            ? 'bg-(--color-accent)/15 text-(--color-fg)'
                            : 'text-(--color-muted) hover:bg-(--color-surface-2) hover:text-(--color-fg)',
                          level > 2 ? 'pl-8 text-[13px]' : 'pl-4 font-medium',
                        )}
                      >
                        {section.title}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex h-14 w-full items-center justify-between rounded-md border border-(--color-border) bg-(--color-surface) px-6 transition-transform active:scale-[0.98]"
          >
            <span className="truncate text-sm font-semibold text-(--color-fg)">
              {activeSection?.title}
            </span>

            <div className="flex items-center gap-3">
              <div className="h-4 w-px bg-(--color-border)" />
              <CircularProgress progress={scrollProgress} />
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={prefersReduced ? { duration: 0.01 } : { duration: 0.2 }}
                className="text-(--color-muted) group-hover:text-(--color-fg)"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </motion.div>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

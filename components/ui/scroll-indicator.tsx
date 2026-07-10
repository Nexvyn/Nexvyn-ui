'use client'

import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react'
import { motion, useSpring, useMotionValue, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  title: ReactNode
  level: number
}

interface ScrollIndicatorProps {
  sections: Section[]
  activeIndex?: number
  onIndexChange?: (index: number) => void
  scrollRef?: React.RefObject<HTMLDivElement | null>
  className?: string
}

export function ScrollIndicator({
  sections,
  activeIndex: controlledIndex,
  onIndexChange,
  scrollRef: externalScrollRef,
  className,
}: ScrollIndicatorProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [trackHeight, setTrackHeight] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const activeIndex = controlledIndex ?? internalIndex

  const progressY = useMotionValue(0)
  const smoothY = useSpring(progressY, {
    stiffness: reduceMotion ? 1000 : 300,
    damping: reduceMotion ? 100 : 30,
  })

  const filteredSections = sections.filter((s) => s.level === 2 || s.level === 3)
  const totalTicks = 60

  const updateHeight = useCallback(() => {
    if (trackRef.current) {
      setTrackHeight(trackRef.current.clientHeight)
    }
  }, [])

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [updateHeight])

  useEffect(() => {
    if (trackHeight <= 0 || filteredSections.length === 0) return
    const targetY = (activeIndex / Math.max(filteredSections.length - 1, 1)) * trackHeight
    progressY.set(targetY)
  }, [activeIndex, trackHeight, filteredSections.length, progressY])

  const handleClick = (index: number) => {
    if (onIndexChange) {
      onIndexChange(index)
    } else {
      setInternalIndex(index)
    }

    const container = externalScrollRef?.current
    const sectionEl = container?.querySelector(`[data-section-index="${index}"]`)
    if (container && sectionEl) {
      const top = (sectionEl as HTMLElement).offsetTop - container.offsetTop + 8
      container.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className={cn('h-full', className)}>
      <div
        ref={trackRef}
        className="h-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0">
          {Array.from({ length: totalTicks }).map((_, i) => {
            const y = (i / (totalTicks - 1)) * trackHeight
            const isMajor = i % 5 === 0
            const isPast =
              i / (totalTicks - 1) <= activeIndex / Math.max(filteredSections.length - 1, 1)

            return (
              <div
                key={i}
                className="absolute inset-e-0 flex items-center"
                style={{ top: `${y}px` }}
              >
                <div
                  className={cn(
                    'h-px transition-colors duration-150 ease',
                    isMajor ? 'w-3' : 'w-1.5',
                    isPast
                      ? 'bg-(--color-fg)'
                      : isMajor
                        ? 'bg-(--color-fg)/50'
                        : 'bg-(--color-fg)/25',
                  )}
                />
              </div>
            )
          })}

          {filteredSections.map((section, i) => {
            const y = (i / Math.max(filteredSections.length - 1, 1)) * trackHeight
            const isActive = i === activeIndex

            return (
              <div key={section.id}>
                <div
                  className={cn(
                    'absolute inset-e-0 h-px transition-colors duration-200 ease',
                    section.level === 2 ? 'w-4' : 'w-3',
                    isActive ? 'bg-(--color-accent)' : 'bg-(--color-fg)/60',
                  )}
                  style={{ top: `${y}px` }}
                />

                <div
                  className={cn(
                    'absolute flex items-center',
                    reduceMotion
                      ? ''
                      : 'transition-[opacity,transform] duration-200 ease-(--motion-ease-out)',
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2',
                  )}
                  style={{
                    top: `${y - 7}px`,
                    right: '20px',
                    transitionDelay: isHovered ? `${i * 35}ms` : '0ms',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleClick(i)}
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-wider cursor-pointer bg-transparent border-0 p-0 whitespace-nowrap rounded-sm',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-(--color-accent) focus-visible:ring-offset-1 focus-visible:ring-offset-(--color-bg)',
                      isActive
                        ? 'text-(--color-accent)'
                        : 'text-(--color-muted) hover:text-(--color-fg)',
                    )}
                  >
                    {section.title}
                  </button>
                </div>
              </div>
            )
          })}

          <motion.div className="absolute inset-e-0 z-20" style={{ top: smoothY }}>
            <div className="h-px w-4 bg-(--color-accent)" />
            <div
              className={cn(
                'absolute top-0 -inset-s-8 -translate-y-1/2 transition-opacity duration-200',
                isHovered ? 'opacity-0' : 'opacity-100',
              )}
            >
              <span className="font-mono text-[10px] text-(--color-accent) tabular-nums">
                {filteredSections.length > 0
                  ? `${activeIndex + 1}/${filteredSections.length}`
                  : '0/0'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

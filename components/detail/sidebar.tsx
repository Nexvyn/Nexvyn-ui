'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { Fragment, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ComponentPreview } from '@/components/showcase/component-preview'
import { useSidebar } from '@/components/detail/sidebar-provider'
import { ScrollFade } from '@/components/detail/scroll-fade'
import { useClickOutside } from '@/hooks/use-click-outside'
import { useScreenSize } from '@/hooks/use-screen-size'
import { Tooltip } from './tooltip'
import {
  COLLECTIONS,
  COMPONENTS,
  formatComponentLabel,
  getComponentHref,
  getComponentNumber,
  type ComponentItem,
} from '@/lib/components-registry'
import { cn } from '@/lib/utils'

const SIDEBAR_EASE = [0.23, 0.88, 0.26, 0.92] as const
const LINE_SPRING = { stiffness: 250, damping: 30 }

function Separator({ count = 2 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="block h-px w-8 bg-foreground/20" />
      ))}
    </>
  )
}

function SortArrowIcon() {
  return (
    <svg
      className="rotate-180 opacity-70"
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M5.2168 11.2812L8.3418 8.15625L11.4668 11.2812"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.2168 6.90625L8.3418 3.78125L11.4668 6.90625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SidebarToggleIcon({ showSidebar }: { showSidebar: boolean }) {
  return (
    <div className="text-foreground/50 flex size-full cursor-pointer items-center justify-center">
      <div className="relative grid cursor-pointer items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.32698 2.63803C0 3.27976 0 4.11984 0 5.8V10.2C0 11.8802 0 12.7202 0.32698 13.362C0.614601 13.9265 1.07354 14.3854 1.63803 14.673C2.27976 15 3.11984 15 4.8 15H11.2C12.8802 15 13.7202 15 14.362 14.673C14.9265 14.3854 15.3854 13.9265 15.673 13.362C16 12.7202 16 11.8802 16 10.2V5.8C16 4.11984 16 3.27976 15.673 2.63803C15.3854 2.07354 14.9265 1.6146 14.362 1.32698C13.7202 1 12.8802 1 11.2 1H4.8C3.11984 1 2.27976 1 1.63803 1.32698C1.07354 1.6146 0.614601 2.07354 0.32698 2.63803Z"
            fill="currentColor"
          />
        </svg>
        <motion.div
          initial={false}
          animate={{ width: showSidebar ? 4.5 : 1.5 }}
          className="bg-background absolute left-0.75 h-2.5 rounded-[1px]"
        />
      </div>
    </div>
  )
}

function NavSectionHeader({ title, active, href }: { title: string; active?: boolean; href?: string }) {
  const lineWidth = useSpring(active ? 55 : 32, LINE_SPRING)
  const [widthValue, setWidthValue] = useState(active ? 55 : 32)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useRef(false)
  const pathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const waveStartTime = useRef<number | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    lineWidth.set(active ? 55 : 32)
  }, [active, lineWidth])

  useEffect(() => {
    const unsubscribe = lineWidth.on('change', (v) => setWidthValue(v))
    return unsubscribe
  }, [lineWidth])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const lineColor = active || isHovered ? 'var(--color-accent)' : 'var(--color-border)'

  const LINE_LENGTH = 54
  const CENTER_Y = 4
  const AMPLITUDE = 3.5
  const FREQUENCY = 0.8
  const WAVE_DURATION = 500
  const WAVE_HEAD_WIDTH = 20

  const generateWavePath = (progress: number): string => {
    const waveHead = progress * LINE_LENGTH
    const points: string[] = []
    for (let x = 0; x <= LINE_LENGTH; x += 1) {
      const distFromHead = waveHead - x
      const envelope = Math.max(0, 1 - Math.abs(distFromHead) / WAVE_HEAD_WIDTH)
      const decay = Math.max(0, 1 - (waveHead / LINE_LENGTH) * 0.3)
      const y = CENTER_Y + Math.sin((x - waveHead * 0.5) * FREQUENCY) * AMPLITUDE * envelope * decay
      points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`)
    }
    return points.join(' ')
  }

  const startWave = () => {
    if (prefersReducedMotion.current || isAnimating.current) return
    isAnimating.current = true
    waveStartTime.current = performance.now()
    const animate = (time: number) => {
      if (!waveStartTime.current || !pathRef.current) return
      const elapsed = time - waveStartTime.current
      const progress = Math.min(elapsed / WAVE_DURATION, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      pathRef.current.setAttribute('d', generateWavePath(easedProgress))
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        pathRef.current.setAttribute('d', `M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`)
        isAnimating.current = false
      }
    }
    animFrameRef.current = requestAnimationFrame(animate)
  }

  const stopWave = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    isAnimating.current = false
    waveStartTime.current = null
    if (pathRef.current) {
      pathRef.current.setAttribute('d', `M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`)
    }
  }

  return (
    <Link
      href={href ?? '/components'}
      className="group relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-3.5"
      onMouseEnter={() => {
        lineWidth.set(55)
        setIsHovered(true)
        startWave()
      }}
      onMouseLeave={() => {
        if (!active) lineWidth.set(32)
        setIsHovered(false)
        stopWave()
      }}
    >
      <svg
        viewBox={`0 0 ${LINE_LENGTH} 8`}
        className="h-2 overflow-visible"
        style={{ width: widthValue }}
        preserveAspectRatio="none"
      >
        {prefersReducedMotion.current ? (
          <path
            d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
            stroke={lineColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ transition: 'stroke 0.25s ease' }}
          />
        ) : (
          <>
            <path
              ref={pathRef}
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              stroke={lineColor}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ transition: 'stroke 0.25s ease' }}
            />
            <path
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              stroke="transparent"
              strokeWidth={8}
              fill="none"
            />
          </>
        )}
      </svg>
      <span
        className={cn(
          'text-foreground whitespace-nowrap transition-all ease-out group-hover:text-(--color-accent) group-hover:opacity-100',
          active ? 'text-(--color-accent) opacity-100' : 'opacity-60',
        )}
      >
        {title}
      </span>
    </Link>
  )
}

function NavItem({
  item,
  isActive,
  itemRef,
  onHover,
  onLeave,
}: {
  item: ComponentItem
  isActive: boolean
  itemRef?: RefObject<HTMLAnchorElement | null>
  onHover: () => void
  onLeave: () => void
}) {
  const lineWidth = useSpring(isActive ? 55 : 32, LINE_SPRING)
  const [widthValue, setWidthValue] = useState(isActive ? 55 : 32)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useRef(false)
  const pathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const waveStartTime = useRef<number | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    lineWidth.set(isActive ? 55 : 32)
  }, [isActive, lineWidth])

  useEffect(() => {
    const unsubscribe = lineWidth.on('change', (v) => setWidthValue(v))
    return unsubscribe
  }, [lineWidth])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const lineColor = isActive || isHovered ? 'var(--color-accent)' : 'var(--color-border)'

  const LINE_LENGTH = 54
  const CENTER_Y = 4
  const AMPLITUDE = 3.5
  const FREQUENCY = 0.8
  const WAVE_DURATION = 500
  const WAVE_HEAD_WIDTH = 20

  const generateWavePath = (progress: number): string => {
    const waveHead = progress * LINE_LENGTH
    const points: string[] = []

    for (let x = 0; x <= LINE_LENGTH; x += 1) {
      const distFromHead = waveHead - x
      const envelope = Math.max(0, 1 - Math.abs(distFromHead) / WAVE_HEAD_WIDTH)
      const decay = Math.max(0, 1 - (waveHead / LINE_LENGTH) * 0.3)
      const y = CENTER_Y + Math.sin((x - waveHead * 0.5) * FREQUENCY) * AMPLITUDE * envelope * decay
      points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`)
    }

    return points.join(' ')
  }

  const startWave = () => {
    if (prefersReducedMotion.current || isAnimating.current) return

    isAnimating.current = true
    waveStartTime.current = performance.now()

    const animate = (time: number) => {
      if (!waveStartTime.current || !pathRef.current) return

      const elapsed = time - waveStartTime.current
      const progress = Math.min(elapsed / WAVE_DURATION, 1)

      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const d = generateWavePath(easedProgress)
      pathRef.current.setAttribute('d', d)

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate)
      } else {
        pathRef.current.setAttribute('d', `M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`)
        isAnimating.current = false
      }
    }

    animFrameRef.current = requestAnimationFrame(animate)
  }

  const stopWave = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current)
      animFrameRef.current = null
    }
    isAnimating.current = false
    waveStartTime.current = null
    if (pathRef.current) {
      pathRef.current.setAttribute('d', `M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`)
    }
  }

  return (
    <Link
      ref={itemRef}
      href={getComponentHref(item.id)}
      className="group sidebar-nav-item relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-3.5"
      onMouseEnter={() => {
        lineWidth.set(55)
        setIsHovered(true)
        onHover()
        startWave()
      }}
      onMouseLeave={() => {
        if (!isActive) lineWidth.set(32)
        setIsHovered(false)
        stopWave()
        onLeave()
      }}
    >
      <svg
        viewBox={`0 0 ${LINE_LENGTH} 8`}
        className="h-2 overflow-visible"
        style={{ width: widthValue }}
        preserveAspectRatio="none"
      >
        {prefersReducedMotion.current ? (
          <path
            d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
            stroke={lineColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ transition: 'stroke 0.25s ease' }}
          />
        ) : (
          <>
            <path
              ref={pathRef}
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              stroke={lineColor}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ transition: 'stroke 0.25s ease' }}
            />
            <path
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              stroke="transparent"
              strokeWidth={8}
              fill="none"
            />
          </>
        )}
      </svg>
      <span
        className={cn(
          'text-foreground whitespace-nowrap transition-all ease-out group-hover:text-(--color-accent) group-hover:opacity-100',
          isActive ? 'text-(--color-accent) opacity-100' : 'opacity-40',
        )}
      >
        {formatComponentLabel(item)}
        {item.isNew && <sup className="text-[10px]"> New</sup>}
      </span>
    </Link>
  )
}

function SidebarNav() {
  const params = useParams()
  const pathname = usePathname()
  const activeId = typeof params?.component === 'string' ? params.component : null
  const [sortById, setSortById] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<ComponentItem | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLAnchorElement>(null)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const previewOpacity = useSpring(0, { stiffness: 400, damping: 30 })

  const sortedById = useMemo(
    () => [...COMPONENTS].sort((a, b) => getComponentNumber(a.id) - getComponentNumber(b.id)),
    [],
  )

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const timer = setTimeout(() => {
        activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [activeId, sortById])

  const isMcpPage = pathname === '/mcp'
  const isIllustrationPage = pathname === '/illustration'

  return (
    <>
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            className="bg-background pointer-events-none absolute z-20 hidden aspect-video w-52 overflow-hidden rounded-xl border border-foreground/10 shadow-lg md:block"
            style={{
              x: pointerX,
              y: pointerY,
              opacity: previewOpacity,
            }}
          >
            <ComponentPreview item={hoveredItem} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={scrollRef}
        className="bg-background scrollbar-hide no-scrollbar relative h-full w-full overflow-y-auto overflow-x-clip rounded-3xl pl-1 font-sans text-[15px] tracking-tight"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          pointerX.set(event.clientX - rect.left + 14)
          pointerY.set(event.clientY - rect.top + 14)
        }}
      >
        <ScrollFade side="top" background="var(--color-bg)" className="z-10" />
        <ScrollFade side="bottom" background="var(--color-bg)" className="z-10" />

        <div className="relative flex w-full flex-col gap-2 pb-[15vh] pt-[32vh]">
          <div className="mb-10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSortById((value) => !value)}
              className="text-foreground/80 hover:text-foreground flex items-center justify-center gap-2 transition-colors"
            >
              Sorted by {sortById ? 'Id' : 'Collection'}
              <SortArrowIcon />
            </button>
          </div>

          <NavSectionHeader title="MCP" active={isMcpPage} href="/mcp" />
          <Separator />
          <NavSectionHeader title="Illustration" active={isIllustrationPage} href="/illustration" />
          <Separator count={4} />

          {sortById ? (
            <>
              <NavSectionHeader title="All Components" active />
              <Separator />
              {sortedById.map((item, index) => {
                const isActive = activeId === item.id
                return (
                  <Fragment key={item.id}>
                    <NavItem
                      item={item}
                      isActive={isActive}
                      itemRef={isActive ? activeRef : undefined}
                      onHover={() => {
                        setHoveredItem(item)
                        previewOpacity.set(1)
                      }}
                      onLeave={() => {
                        setHoveredItem(null)
                        previewOpacity.set(0)
                      }}
                    />
                    {index !== sortedById.length - 1 && <Separator />}
                  </Fragment>
                )
              })}
            </>
          ) : (
            COLLECTIONS.filter((c) => c.components.length > 0).map(
              (collection, collectionIndex, filteredArray) => (
                <Fragment key={collection.id}>
                  <NavSectionHeader title={collection.name} active />
                  <Separator />
                  {collection.components.map((item, index) => {
                    const isActive = activeId === item.id
                    return (
                      <Fragment key={item.id}>
                        <NavItem
                          item={item}
                          isActive={isActive}
                          itemRef={isActive ? activeRef : undefined}
                          onHover={() => {
                            setHoveredItem(item)
                            previewOpacity.set(1)
                          }}
                          onLeave={() => {
                            setHoveredItem(null)
                            previewOpacity.set(0)
                          }}
                        />
                        {index !== collection.components.length - 1 && <Separator />}
                      </Fragment>
                    )
                  })}
                  {collectionIndex !== filteredArray.length - 1 && <Separator count={6} />}
                </Fragment>
              ),
            )
          )}
        </div>
      </div>
    </>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const shouldShowSidebar =
    (pathname.startsWith('/components/') && pathname !== '/components') ||
    pathname === '/mcp' ||
    pathname === '/illustration'
  const { showSidebar, toggleSidebar, setShowSidebar } = useSidebar()
  const screenSize = useScreenSize()
  const containerRef = useClickOutside<HTMLDivElement>(() => {
    if (showSidebar) setShowSidebar(false)
  })

  const isExpanded = showSidebar || screenSize.lessThan('md')

  if (!shouldShowSidebar) return null

  return (
    <div ref={containerRef} className="contents">
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-19 bg-black/50 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="detail-elevated-pill pointer-events-auto fixed left-5 top-5 z-21 flex items-center gap-2 rounded-2xl p-2 shadow-none"
        animate={{
          x: isExpanded && !screenSize.lessThan('md') ? 10 : 0,
          y: isExpanded && !screenSize.lessThan('md') ? -10 : 0,
        }}
        transition={{ duration: 0.35, ease: SIDEBAR_EASE }}
      >
        <Tooltip content="Toggle sidebar (Cmd+B)" side="bottom">
          <button
            type="button"
            className="detail-toolbar-btn cursor-pointer rounded-xl p-2.5"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <SidebarToggleIcon showSidebar={showSidebar} />
          </button>
        </Tooltip>
        <Link
          href="/components"
          className="text-lg sm:text-xl md:text-2xl font-normal no-underline hover:opacity-80 transition-opacity px-1"
          style={{
            fontFamily: 'var(--font-handwriting), cursive',
            color: 'var(--color-accent)',
          }}
        >
          Nexvyn/Ui (...)
        </Link>
      </motion.div>

      <motion.aside
        initial={false}
        animate={{
          x: showSidebar ? 0 : '-100%',
          opacity: showSidebar ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: SIDEBAR_EASE }}
        className="pointer-events-auto fixed left-0 top-0 z-20 h-dvh w-[85vw] sm:w-80 p-2"
        aria-hidden={!showSidebar}
        style={{ pointerEvents: showSidebar ? 'auto' : 'none' }}
      >
        <SidebarNav />
      </motion.aside>
    </div>
  )
}

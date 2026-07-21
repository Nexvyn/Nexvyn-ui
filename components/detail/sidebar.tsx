'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Fragment, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { ComponentPreview } from '@/components/showcase/component-preview'
import { useSidebar } from '@/components/detail/sidebar-provider'

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

const OUTER =
  'M11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.2288 21 5.3431 21 4.1716 19.8284C3 18.6569 3 16.7712 3 13V11C3 7.22876 3 5.34315 4.1716 4.17157C5.3431 3 7.2288 3 11 3Z'

const PANEL_CLOSED =
  'M10 5.5 C10 4.793 10 4.439 9.780 4.220 C9.560 4 9.207 4 8.5 4 H8.5 C6.379 4 5.318 4 4.659 4.659 C4 5.318 4 6.379 4 8.5 V15.5 C4 17.621 4 18.682 4.659 19.341 C5.318 20 6.379 20 8.5 20 H8.5 C9.207 20 9.561 20 9.780 19.780 C10 19.561 10 19.207 10 18.5 V5.5 Z'

const PANEL_OPEN =
  'M14 6 C14 5.057 14 4.586 13.707 4.293 C13.414 4 12.943 4 12 4 H10 C7.172 4 5.757 4 4.879 4.879 C4 5.757 4 7.172 4 10 V14 C4 16.828 4 18.243 4.879 19.121 C5.757 20 7.172 20 10 20 H12 C12.943 20 13.414 20 13.707 19.707 C14 19.414 14 18.943 14 18 V6 Z'

export function SidebarToggleIcon({
  showSidebar,
  strokeWidth = 1.5,
  className,
}: {
  showSidebar: boolean
  strokeWidth?: number
  className?: string
}) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={OUTER}
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />

      <motion.path
        animate={{ d: showSidebar ? PANEL_OPEN : PANEL_CLOSED }}
        d={showSidebar ? PANEL_OPEN : PANEL_CLOSED}
        style={{ fill: 'var(--background)' }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  )
}

function NavSectionHeader({
  title,
  active,
  href,
  isNew,
}: {
  title: string
  active?: boolean
  href?: string
  isNew?: boolean
}) {
  const lineWidth = useSpring(active ? 55 : 32, LINE_SPRING)
  const [widthValue, setWidthValue] = useState(active ? 55 : 32)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const waveStartTime = useRef<number | null>(null)
  const isAnimating = useRef(false)

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
    if (prefersReducedMotion || isAnimating.current) return
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
        {prefersReducedMotion ? (
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
          'text-foreground whitespace-nowrap transition-[color,opacity] duration-150 ease group-hover:text-(--color-accent) group-hover:opacity-100',
          active ? 'text-(--color-accent) opacity-100' : 'opacity-60',
        )}
      >
        {title}
        {isNew && <sup className="text-[10px]"> New</sup>}
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
  const prefersReducedMotion = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const waveStartTime = useRef<number | null>(null)
  const isAnimating = useRef(false)

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
    if (prefersReducedMotion || isAnimating.current) return

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
        {prefersReducedMotion ? (
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
          'text-foreground whitespace-nowrap transition-[color,opacity] duration-150 ease group-hover:text-(--color-accent) group-hover:opacity-100',
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
            <div className="flex h-full w-full scale-75 items-center justify-center">
              <ComponentPreview item={hoveredItem} />
            </div>
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

          <NavSectionHeader title="MCP" active={isMcpPage} href="/mcp" isNew />
          <Separator />
          <NavSectionHeader
            title="Illustration"
            active={isIllustrationPage}
            href="/illustration"
            isNew
          />
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

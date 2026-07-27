'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react'
import { ComponentPreview } from '@/components/showcase/component-preview'
import { useSidebar } from '@/components/detail/sidebar-provider'

import { useClickOutside } from '@/hooks/use-click-outside'
import { Tooltip } from './tooltip'
import {
  BASIC_COMPONENTS,
  COLLECTIONS,
  ILLUSTRATION_COMPONENTS,
  NORMAL_COMPONENTS,
  compareComponentsByCollection,
  compareComponentsById,
  formatComponentLabel,
  getComponentHref,
  type ComponentItem,
} from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import { playHoverSound, playClickSound } from '@/lib/sound'
import { NewStarIcon } from '@/components/layout/new-star'

const SIDEBAR_EASE = [0.23, 0.88, 0.26, 0.92] as const
const LINE_SPRING = { stiffness: 250, damping: 30 }
const PROXIMITY_SPRING = { stiffness: 400, damping: 30, mass: 0.6 }
const PROXIMITY_REACH = 4
const PROXIMITY_WIDTH_BOOST = 16

const NAV_LINE_BASE = 32
const NAV_LINE_ACTIVE = 55
const SEPARATOR_BASE = 24

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

const HoverPositionContext = createContext<{
  position: MotionValue<number>
  list: MotionValue<string>
} | null>(null)

function useProximity(listKey: string, position: number): MotionValue<number> {
  const ctx = useContext(HoverPositionContext)
  const fallback = useMotionValue(0)

  const raw = useTransform(() => {
    if (!ctx) return 0
    if (ctx.list.get() !== listKey) return 0
    const hovered = ctx.position.get()
    if (Number.isNaN(hovered)) return 0
    const dist = Math.abs(position - hovered)
    if (dist >= PROXIMITY_REACH) return 0
    return smoothstep(1 - dist / PROXIMITY_REACH)
  })

  const spring = useSpring(ctx ? raw : fallback, PROXIMITY_SPRING)
  return spring
}

function Separator({
  count = 2,
  listKey = '',
  position = Number.NaN,
}: {
  count?: number
  listKey?: string
  position?: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const proximity = useProximity(listKey, position)

  const width = useTransform(proximity, (p) =>
    prefersReducedMotion ? SEPARATOR_BASE : SEPARATOR_BASE + p * PROXIMITY_WIDTH_BOOST,
  )
  const backgroundColor = useTransform(proximity, (p) =>
    prefersReducedMotion || p <= 0.001
      ? 'var(--color-border)'
      : `color-mix(in oklab, var(--color-accent) ${Math.round(p * 60)}%, var(--color-border))`,
  )

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span key={i} className="block h-px" style={{ width, backgroundColor }} />
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
  const lineWidth = useSpring(active ? NAV_LINE_ACTIVE : NAV_LINE_BASE, LINE_SPRING)
  const hoverTint = useSpring(active ? 1 : 0, PROXIMITY_SPRING)
  const prefersReducedMotion = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const waveStartTime = useRef<number | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    lineWidth.set(active ? NAV_LINE_ACTIVE : NAV_LINE_BASE)
    hoverTint.set(active ? 1 : 0)
  }, [active, lineWidth, hoverTint])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const lineColor = useTransform(hoverTint, (t) =>
    t >= 0.999
      ? 'var(--color-accent)'
      : t <= 0.001
        ? 'var(--color-border)'
        : `color-mix(in oklab, var(--color-accent) ${Math.round(t * 100)}%, var(--color-border))`,
  )

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
        playHoverSound()
        lineWidth.set(NAV_LINE_ACTIVE)
        hoverTint.set(1)
        startWave()
      }}
      onMouseLeave={() => {
        if (!active) {
          lineWidth.set(NAV_LINE_BASE)
          hoverTint.set(0)
        }
        stopWave()
      }}
    >
      <motion.svg
        viewBox={`0 0 ${LINE_LENGTH} 8`}
        className="h-2 overflow-visible"
        style={{ width: lineWidth }}
        preserveAspectRatio="none"
      >
        {prefersReducedMotion ? (
          <motion.path
            d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
            style={{ stroke: lineColor }}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : (
          <>
            <motion.path
              ref={pathRef}
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              style={{ stroke: lineColor }}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              stroke="transparent"
              strokeWidth={8}
              fill="none"
            />
          </>
        )}
      </motion.svg>
      <span
        className={cn(
          'text-foreground inline-flex items-center gap-1 whitespace-nowrap transition-[color,opacity] duration-150 ease group-hover:text-(--color-accent) group-hover:opacity-100',
          active ? 'text-(--color-accent) opacity-100' : 'opacity-60',
        )}
      >
        {isNew && <NewStarIcon />}
        {title}
        {isNew && <span className="text-[10px] font-medium text-(--color-new)">New</span>}
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
  number,
  listKey,
  position,
}: {
  item: ComponentItem
  isActive: boolean
  itemRef?: RefObject<HTMLAnchorElement | null>
  onHover: () => void
  onLeave: () => void
  number?: number
  listKey: string
  position: number
}) {
  const baseWidth = isActive ? NAV_LINE_ACTIVE : NAV_LINE_BASE
  const lineWidth = useSpring(baseWidth, LINE_SPRING)
  const prefersReducedMotion = useReducedMotion()
  const pathRef = useRef<SVGPathElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const waveStartTime = useRef<number | null>(null)
  const isAnimating = useRef(false)

  const proximitySpring = useProximity(listKey, position)

  useEffect(() => {
    lineWidth.set(isActive ? NAV_LINE_ACTIVE : NAV_LINE_BASE)
  }, [isActive, lineWidth])

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  const proximityWidth = useTransform([lineWidth, proximitySpring], ([w, p]: number[]) =>
    prefersReducedMotion ? w : w + p * PROXIMITY_WIDTH_BOOST,
  )
  const lineColor = useTransform(proximitySpring, (p) => {
    if (isActive) return 'var(--color-accent)'
    if (prefersReducedMotion || p <= 0.001) return 'var(--color-border)'
    return `color-mix(in oklab, var(--color-accent) ${Math.round(p * 100)}%, var(--color-border))`
  })

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
      className="group sidebar-nav-item relative flex h-px cursor-pointer items-center gap-3"
      onMouseEnter={() => {
        playHoverSound()
        lineWidth.set(NAV_LINE_ACTIVE)
        onHover()
        startWave()
      }}
      onMouseLeave={() => {
        if (!isActive) lineWidth.set(NAV_LINE_BASE)
        stopWave()
        onLeave()
      }}
    >
      <motion.svg
        viewBox={`0 0 ${LINE_LENGTH} 8`}
        className="h-2 overflow-visible"
        style={{ width: proximityWidth }}
        preserveAspectRatio="none"
      >
        {prefersReducedMotion ? (
          <motion.path
            d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
            style={{ stroke: lineColor }}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : (
          <>
            <motion.path
              ref={pathRef}
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              style={{ stroke: lineColor }}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d={`M0 ${CENTER_Y}L${LINE_LENGTH} ${CENTER_Y}`}
              stroke="transparent"
              strokeWidth={8}
              fill="none"
            />
          </>
        )}
      </motion.svg>
      <span
        className={cn(
          'text-foreground inline-flex items-center gap-1 whitespace-nowrap transition-[color,opacity] duration-150 ease group-hover:text-(--color-accent) group-hover:opacity-100',
          isActive ? 'text-(--color-accent) opacity-100' : 'opacity-40',
        )}
      >
        {item.isNew && <NewStarIcon />}
        {typeof number === 'number' ? formatComponentLabel(number, item.name) : item.name}
        {item.isNew && <span className="text-[10px] font-medium text-(--color-new)">New</span>}
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

  const hoverPosition = useMotionValue(Number.NaN)
  const hoverList = useMotionValue('')
  const hoverCtx = useMemo(
    () => ({ position: hoverPosition, list: hoverList }),
    [hoverPosition, hoverList],
  )

  const normalSorted = useMemo(
    () =>
      NORMAL_COMPONENTS.filter((c) => c.collection !== 'illustration').sort(
        sortById ? compareComponentsById : compareComponentsByCollection,
      ),
    [sortById],
  )

  const basicSorted = useMemo(
    () => [...BASIC_COMPONENTS].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
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
  const isChangelogPage = pathname === '/changelog'
  const isStarsPage = pathname === '/stars'
  const isDesignPage = pathname === '/design'

  const hoverHandlers = (item: ComponentItem, listKey: string, position: number) => ({
    onHover: () => {
      hoverList.set(listKey)
      hoverPosition.set(position)
      setHoveredItem(item)
      previewOpacity.set(1)
    },
    onLeave: () => {
      hoverPosition.set(Number.NaN)
      setHoveredItem(null)
      previewOpacity.set(0)
    },
  })

  return (
    <HoverPositionContext.Provider value={hoverCtx}>
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

      <div className="bg-background relative h-full w-full overflow-hidden rounded-3xl">
        <div
          ref={scrollRef}
          className="scrollbar-hide no-scrollbar mt-16 h-[calc(100%-4rem)] w-full overflow-y-auto overflow-x-clip pl-1 font-sans text-[15px] tracking-tight"
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect()
            pointerX.set(event.clientX - rect.left + 14)
            pointerY.set(event.clientY - rect.top + 14)
          }}
        >
          <div className="relative flex w-full flex-col gap-2 pb-[15vh] pt-[32vh]">
            <div className="bg-background sticky top-0 z-10 mb-10 flex items-center justify-between py-2">
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
            <NavSectionHeader title="Illustration" isNew />
            {ILLUSTRATION_COMPONENTS.length > 0 && (
              <>
                <Separator listKey="illustration" position={-0.5} />
                {ILLUSTRATION_COMPONENTS.map((item, index) => {
                  const isActive = activeId === item.id
                  return (
                    <Fragment key={item.id}>
                      <NavItem
                        item={item}
                        isActive={isActive}
                        itemRef={isActive ? activeRef : undefined}
                        listKey="illustration"
                        position={index}
                        {...hoverHandlers(item, 'illustration', index)}
                      />
                      {index !== ILLUSTRATION_COMPONENTS.length - 1 && (
                        <Separator listKey="illustration" position={index + 0.5} />
                      )}
                    </Fragment>
                  )
                })}
              </>
            )}
            <Separator count={4} />

            {sortById ? (
              <>
                <NavSectionHeader title="All Components" active />
                <Separator listKey="all" position={-0.5} />
                {normalSorted.map((item, index) => {
                  const isActive = activeId === item.id
                  return (
                    <Fragment key={item.id}>
                      <NavItem
                        item={item}
                        isActive={isActive}
                        itemRef={isActive ? activeRef : undefined}
                        number={index}
                        listKey="all"
                        position={index}
                        {...hoverHandlers(item, 'all', index)}
                      />
                      {index !== normalSorted.length - 1 && (
                        <Separator listKey="all" position={index + 0.5} />
                      )}
                    </Fragment>
                  )
                })}
              </>
            ) : (
              COLLECTIONS.filter((c) => c.components.length > 0).map(
                (collection, collectionIndex, filteredArray) => (
                  <Fragment key={collection.id}>
                    <NavSectionHeader title={collection.name} active />
                    <Separator listKey={collection.id} position={-0.5} />
                    {collection.components.map((item, index) => {
                      const isActive = activeId === item.id
                      return (
                        <Fragment key={item.id}>
                          <NavItem
                            item={item}
                            isActive={isActive}
                            itemRef={isActive ? activeRef : undefined}
                            number={index}
                            listKey={collection.id}
                            position={index}
                            {...hoverHandlers(item, collection.id, index)}
                          />
                          {index !== collection.components.length - 1 && (
                            <Separator listKey={collection.id} position={index + 0.5} />
                          )}
                        </Fragment>
                      )
                    })}
                    {collectionIndex !== filteredArray.length - 1 && <Separator count={6} />}
                  </Fragment>
                ),
              )
            )}

            {basicSorted.length > 0 && (
              <>
                <Separator count={4} />
                <NavSectionHeader title="Basic" active />
                <Separator listKey="basic" position={-0.5} />
                {basicSorted.map((item, index) => {
                  const isActive = activeId === item.id
                  return (
                    <Fragment key={item.id}>
                      <NavItem
                        item={item}
                        isActive={isActive}
                        itemRef={isActive ? activeRef : undefined}
                        listKey="basic"
                        position={index}
                        {...hoverHandlers(item, 'basic', index)}
                      />
                      {index !== basicSorted.length - 1 && (
                        <Separator listKey="basic" position={index + 0.5} />
                      )}
                    </Fragment>
                  )
                })}
              </>
            )}

            <Separator count={4} />
            <NavSectionHeader title="Changelog" active={isChangelogPage} href="/changelog" />
            <Separator />
            <NavSectionHeader title="Stars" active={isStarsPage} href="/stars" />
            <Separator />
            <NavSectionHeader title="Design" active={isDesignPage} href="/design" />
          </div>
        </div>
      </div>
    </HoverPositionContext.Provider>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const shouldShowSidebar =
    (pathname.startsWith('/components/') && pathname !== '/components') ||
    pathname === '/mcp' ||
    pathname === '/illustration' ||
    pathname === '/changelog' ||
    pathname === '/stars' ||
    pathname === '/design'
  const { showSidebar, toggleSidebar, setShowSidebar } = useSidebar()
  const containerRef = useClickOutside<HTMLDivElement>(() => {
    if (showSidebar) setShowSidebar(false)
  })

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

      <div className="detail-elevated-pill pointer-events-auto fixed left-5 top-4 z-21 flex items-center gap-2 rounded-2xl p-2 shadow-none">
        <Tooltip content="Toggle sidebar (Cmd+B)" side="bottom">
          <button
            type="button"
            className="detail-toolbar-btn cursor-pointer rounded-xl p-2"
            style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-muted)' }}
            onMouseEnter={() => playHoverSound()}
            onClick={() => {
              playClickSound()
              toggleSidebar()
            }}
            aria-label="Toggle sidebar"
          >
            <SidebarToggleIcon showSidebar={showSidebar} className="h-5 w-5" />
          </button>
        </Tooltip>
        <Link
          href="/components"
          className="hidden text-lg font-normal no-underline hover:opacity-80 transition-opacity px-1 sm:inline-block sm:text-xl md:text-2xl"
          style={{
            fontFamily: 'var(--font-handwriting), cursive',
            color: 'var(--color-accent)',
          }}
        >
          Nexvyn/Ui (...)
        </Link>
      </div>

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

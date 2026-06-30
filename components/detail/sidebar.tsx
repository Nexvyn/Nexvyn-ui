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

function SidebarToggleIcon({ showSidebar }: { showSidebar: boolean }) {
  return (
    <div className="text-foreground/50 flex size-full cursor-pointer items-center justify-center">
      <div className="relative grid cursor-pointer items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          className="bg-background absolute left-[3px] h-2.5 rounded-[1px]"
        />
      </div>
    </div>
  )
}

function NavSectionHeader({ title, active }: { title: string; active?: boolean }) {
  return (
    <div className="group relative flex h-px cursor-default items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-3.5">
      <span className="bg-foreground inline-block h-px w-8" />
      <span
        className={cn(
          'text-foreground whitespace-nowrap transition-all ease-out',
          active ? 'opacity-100' : 'opacity-60',
        )}
      >
        {title}
      </span>
    </div>
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

  useEffect(() => {
    lineWidth.set(isActive ? 55 : 32)
  }, [isActive, lineWidth])

  return (
    <Link
      ref={itemRef}
      href={getComponentHref(item.id)}
      className="group relative flex h-px cursor-pointer items-center gap-3 after:absolute after:left-0 after:top-1/2 after:size-full after:-translate-y-1/2 after:p-3.5"
      onMouseEnter={() => {
        lineWidth.set(55)
        onHover()
      }}
      onMouseLeave={() => {
        if (!isActive) lineWidth.set(32)
        onLeave()
      }}
    >
      <motion.span
        className={cn(
          'inline-block h-px group-hover:bg-sky-500',
          isActive ? 'bg-sky-500' : 'bg-foreground/20',
        )}
        style={{ width: lineWidth }}
      />
      <span
        className={cn(
          'text-foreground whitespace-nowrap transition-all ease-out group-hover:text-sky-500 group-hover:opacity-100',
          isActive ? 'text-sky-500 opacity-100' : 'opacity-40',
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
            COLLECTIONS.map((collection, collectionIndex) => (
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
                {collectionIndex !== COLLECTIONS.length - 1 && <Separator count={6} />}
              </Fragment>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'
  const { showSidebar, toggleSidebar, setShowSidebar } = useSidebar()
  const screenSize = useScreenSize()
  const containerRef = useClickOutside<HTMLDivElement>(() => {
    if (showSidebar) setShowSidebar(false)
  })

  const isExpanded = showSidebar || screenSize.lessThan('md')

  return (
    <div ref={containerRef}>
      {!isLandingPage && (
        <motion.button
          type="button"
          initial={false}
          animate={{
            x: isExpanded ? 10 : 0,
            y: isExpanded ? -10 : 0,
            width: isExpanded ? 42 : 32,
            height: isExpanded ? 42 : 32,
          }}
          transition={{ duration: 0.35, ease: SIDEBAR_EASE }}
          className="bg-background fixed left-4 top-0 z-[21] mt-[35.5px] cursor-pointer rounded-xl"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar (Cmd+B)"
        >
          <SidebarToggleIcon showSidebar={showSidebar} />
        </motion.button>
      )}

      <motion.aside
        initial={false}
        animate={{
          x: showSidebar ? 0 : '-100%',
          opacity: showSidebar ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: SIDEBAR_EASE }}
        className="pointer-events-auto fixed left-0 z-20 h-dvh w-80 p-4 pl-2 pr-2"
        aria-hidden={!showSidebar}
        style={{ pointerEvents: showSidebar ? 'auto' : 'none' }}
      >
        <SidebarNav />
      </motion.aside>
    </div>
  )
}

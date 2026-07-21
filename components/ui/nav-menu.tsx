'use client'

import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { Slot } from '@radix-ui/react-slot'
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/motion-tokens'
import {
  useProximityHighlight,
  ProximityHighlight,
  type ItemRect,
} from '@/lib/hooks/use-proximity-highlight'
import { WeightShiftText } from '@/components/ui/weight-shift-text'


interface NavMenuContextValue {
  activeSlug: string | null
  nextIndex: () => number
  registerItem: (index: number, el: HTMLElement | null) => void
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null)

function useNavMenuCtx(componentName: string) {
  const ctx = useContext(NavMenuContext)
  if (!ctx) throw new Error(`${componentName} must be used within NavMenu`)
  return ctx
}

interface NavMenuContentContextValue {
  activeIndex: number | null
  setActiveIndex: (i: number | null) => void
  highlightX: ReturnType<typeof import('motion/react').useSpring>
  highlightSize: MotionValue<number>
  highlightOpacity: ReturnType<typeof import('motion/react').useSpring>
  axis: 'x' | 'y'
  registerItem: (index: number, el: HTMLElement | null) => void
}

const NavMenuContentContext = createContext<NavMenuContentContextValue | null>(null)

function useNavMenuContentCtx(componentName: string) {
  const ctx = useContext(NavMenuContentContext)
  if (!ctx) throw new Error(`${componentName} must be used within NavMenuContent`)
  return ctx
}


export interface NavMenuProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  activeSlug: string | null
  'aria-label'?: string
}

export const NavMenu = forwardRef<HTMLElement, NavMenuProps>(
  ({ children, activeSlug, 'aria-label': ariaLabel = 'Main', className, ...props }, ref) => {
    const navRef = useRef<HTMLElement>(null)
    const activeItemRectRef = useRef<ItemRect | null>(null)

    const {
      activeIndex,
      setActiveIndex,
      registerItem,
      handlers,
      highlightX,
      highlightSize,
      highlightOpacity,
      axis,
    } = useProximityHighlight(navRef, { axis: 'y' })

    const indexRef = useRef(0)
    const nextIndex = useCallback(() => {
      const idx = indexRef.current
      indexRef.current += 1
      return idx
    }, [])

    const rawActiveX = useMotionValue(0)
    const rawActiveSize = useMotionValue(0)
    const rawActiveOpacity = useMotionValue(0)
    const reduceMotion = useReducedMotion()
    const activeSpringOpts = reduceMotion ? { duration: 0 } : springs.moderate
    const activeX = useSpring(rawActiveX, activeSpringOpts)
    const activeSize = useSpring(rawActiveSize, activeSpringOpts)
    const activeOpacity = useSpring(rawActiveOpacity, activeSpringOpts)

    const isHoveringOther = activeIndex !== null

    useEffect(() => {
      if (!activeItemRectRef.current) return
      if (reduceMotion) {
        rawActiveOpacity.jump(isHoveringOther ? 0.8 : 1)
      } else {
        rawActiveOpacity.set(isHoveringOther ? 0.8 : 1)
      }
    }, [isHoveringOther, reduceMotion, rawActiveOpacity])

    useEffect(() => {
      const nav = navRef.current
      if (!nav) return
      const items = Array.from(nav.querySelectorAll<HTMLElement>('[data-nav-item]'))
      const found = items.find((el) => el.getAttribute('data-slug') === activeSlug)
      if (found) {
        const rect: ItemRect = {
          top: found.offsetTop,
          height: found.offsetHeight,
          left: found.offsetLeft,
          width: found.offsetWidth,
        }
        activeItemRectRef.current = rect
        if (reduceMotion) {
          rawActiveX.jump(rect.top)
          rawActiveSize.jump(rect.height)
          rawActiveOpacity.jump(1)
        } else {
          rawActiveX.set(rect.top)
          rawActiveSize.jump(rect.height)
          rawActiveOpacity.set(1)
        }
      } else {
        activeItemRectRef.current = null
        if (reduceMotion) rawActiveOpacity.jump(0)
        else rawActiveOpacity.set(0)
      }
    }, [activeSlug, reduceMotion, rawActiveX, rawActiveSize, rawActiveOpacity])

    useEffect(() => {
      const nav = navRef.current
      if (!nav) return
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!nav.contains(document.activeElement)) return
        const items = nav.querySelectorAll<HTMLElement>('[data-nav-item]:not([data-disabled])')
        if (!items.length) return
        const count = items.length
        const currentIdx = Array.from(items).indexOf(document.activeElement as HTMLElement)

        if (e.key === 'ArrowDown') {
          e.preventDefault()
          const next = currentIdx < 0 ? 0 : (currentIdx + 1) % count
          items[next]?.focus()
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          const next = currentIdx < 0 ? count - 1 : (currentIdx - 1 + count) % count
          items[next]?.focus()
        } else if (e.key === 'Home') {
          e.preventDefault()
          items[0]?.focus()
        } else if (e.key === 'End') {
          e.preventDefault()
          items[count - 1]?.focus()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        ;(navRef as React.MutableRefObject<HTMLElement | null>).current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref],
    )

    const contentCtx = useMemo<NavMenuContentContextValue>(
      () => ({
        activeIndex,
        setActiveIndex,
        highlightX,
        highlightSize,
        highlightOpacity,
        axis,
        registerItem,
      }),
      [
        activeIndex,
        setActiveIndex,
        highlightX,
        highlightSize,
        highlightOpacity,
        axis,
        registerItem,
      ],
    )

    return (
      <NavMenuContext.Provider value={{ activeSlug, nextIndex, registerItem }}>
        <NavMenuContentContext.Provider value={contentCtx}>
          <nav
            ref={setRefs}
            aria-label={ariaLabel}
            className={cn('relative flex flex-col gap-0.5', className)}
            {...handlers}
            {...props}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-1 rounded-md squircle-corners bg-(--color-accent)/12"
              style={{ y: activeX, height: activeSize, opacity: activeOpacity }}
            />
            <ProximityHighlight
              highlightX={highlightX}
              highlightSize={highlightSize}
              highlightOpacity={highlightOpacity}
              axis={axis}
              className="mx-1 rounded-md squircle-corners bg-(--color-fg)/8"
            />
            {children}
          </nav>
        </NavMenuContentContext.Provider>
      </NavMenuContext.Provider>
    )
  },
)
NavMenu.displayName = 'NavMenu'


export interface NavMenuItemProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  label: string
  icon?: ReactNode
  isNew?: boolean
  isUpdated?: boolean
  asChild?: boolean
}

export const NavMenuItem = forwardRef<HTMLAnchorElement, NavMenuItemProps>(
  (
    { href, label, icon, isNew, isUpdated, asChild = false, className, children, ...props },
    ref,
  ) => {
    const { activeSlug, nextIndex } = useNavMenuCtx('NavMenuItem')
    const { activeIndex, setActiveIndex, registerItem } = useNavMenuContentCtx('NavMenuItem')

    const itemRef = useRef<HTMLAnchorElement | null>(null)
    const indexRef = useRef<number | null>(null)
    if (indexRef.current === null) indexRef.current = nextIndex()
    // eslint-disable-next-line react-hooks/refs
    const index = indexRef.current
    const isActive = activeSlug === href
    const isHovered = activeIndex === index

    useEffect(() => {
      const el = itemRef.current
      if (index < 0 || !el) return
      registerItem(index, el)
      return () => registerItem(index, null)
    }, [index, registerItem])

    const setItemRef = useCallback(
      (node: HTMLAnchorElement | null) => {
        itemRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLAnchorElement | null>).current = node
      },
      [ref],
    )

    const weight = isActive ? 550 : isHovered ? 500 : 400

    const itemClassName = cn(
      'group relative flex min-h-11 items-center gap-2.5 rounded-md squircle-corners px-3 py-2 text-sm outline-none transition-colors duration-(--motion-dur-fast) motion-reduce:transition-none',
      'text-(--color-muted) hover:text-(--color-fg)',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)',
      isActive && 'text-(--color-fg)',
      className,
    )

    const sharedProps = {
      'data-nav-item': true,
      'data-slug': href,
      'aria-current': isActive ? ('page' as const) : undefined,
      tabIndex: isActive ? 0 : -1,
      onFocus: () => setActiveIndex(index),
    }

    const content = (
      <>
        {icon && (
          <span className="shrink-0 [&_svg]:size-4" aria-hidden="true">
            {icon}
          </span>
        )}
        <WeightShiftText
          baseWeight={400}
          activeWeight={weight}
          active={isActive || isHovered}
          duration="150ms"
          className="min-w-0"
        >
          {label}
        </WeightShiftText>
        {isNew && (
          <>
            <span
              className="size-1.5 shrink-0 rounded-full bg-(--color-accent)"
              aria-hidden="true"
            />
            <span className="sr-only">New</span>
          </>
        )}
        {isUpdated && !isNew && (
          <>
            <span
              className="size-1.5 shrink-0 rounded-full bg-(--color-subtle)"
              aria-hidden="true"
            />
            <span className="sr-only">Updated</span>
          </>
        )}
      </>
    )

    if (asChild && isValidElement(children)) {
      return (
        <Slot ref={setItemRef} className={itemClassName} {...sharedProps} {...props}>
          {cloneElement(children as React.ReactElement, undefined, content)}
        </Slot>
      )
    }

    return (
      <a ref={setItemRef} href={href} className={itemClassName} {...sharedProps} {...props}>
        {content}
      </a>
    )
  },
)
NavMenuItem.displayName = 'NavMenuItem'


export function NavMenuPreview() {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="w-48">
        <NavMenu activeSlug="/docs/install" aria-label="Docs">
          <NavMenuItem href="/docs" label="Overview" />
          <NavMenuItem href="/docs/install" label="Install" isNew />
          <NavMenuItem href="/docs/theming" label="Theming" />
          <NavMenuItem href="/docs/components" label="Components" isUpdated />
        </NavMenu>
      </div>
    </div>
  )
}
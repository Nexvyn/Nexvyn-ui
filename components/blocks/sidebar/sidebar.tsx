'use client'

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
} from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { useFocusTrap } from '@/lib/hooks/use-focus-trap'
import { cn } from '@/lib/utils'

export type SidebarIconGlyph = typeof Menu01Icon
export type SidebarItem = { id: string; label: string; href: string; icon?: ReactNode }
export type SidebarGroup = { id: string; label?: string; items: SidebarItem[] }

export function sidebarIcon(icon: SidebarIconGlyph) {
  return <HugeiconsIcon icon={icon} size={18} strokeWidth={1.5} />
}

export const SIDEBAR_FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent)'

const ROW = 'h-9 [@media(hover:none)]:h-11'

// Matches --motion-dur-base and --motion-ease-in-out, so the page moves with the panel.
const SHIFT = { duration: 0.2, ease: [0.65, 0, 0.35, 1] as const }

export const SIDEBAR_CLIP =
  'transition-[clip-path] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none'

export const SIDEBAR_CLIP_RAIL =
  '[clip-path:inset(0_calc(100%_-_3.5rem)_0_0)] rtl:[clip-path:inset(0_0_0_calc(100%_-_3.5rem))]'

export const SIDEBAR_CLIP_OPEN = '[clip-path:inset(0_0_0_0)]'

export interface SidebarLinkProps extends Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'href'> {
  item: SidebarItem
  active?: boolean
  compact?: boolean
}

export const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  ({ item, active, compact, onClick, className, ...props }, ref) => (
    <a
      ref={ref}
      href={item.href}
      aria-current={active ? 'page' : undefined}
      onClick={(event) => {
        onClick?.(event)
        if (item.href === '#') event.preventDefault()
      }}
      className={cn(
        'flex items-center gap-3 rounded-md px-2.5 text-sm transition-colors duration-(--motion-dur-fast) ease motion-reduce:transition-none',
        ROW,
        SIDEBAR_FOCUS,
        compact ? 'w-10' : 'w-full',
        active
          ? 'bg-(--color-fg)/8 text-(--color-fg)'
          : 'text-(--color-muted) hover:bg-(--color-fg)/4 hover:text-(--color-fg)',
        className,
      )}
      {...props}
    >
      {item.icon && (
        <span
          aria-hidden="true"
          className={cn(
            'flex size-5 shrink-0 items-center justify-center',
            active ? 'text-(--color-fg)' : 'opacity-80',
          )}
        >
          {item.icon}
        </span>
      )}
      <span className={compact ? 'sr-only' : 'truncate'}>{item.label}</span>
    </a>
  ),
)
SidebarLink.displayName = 'SidebarLink'

export interface SidebarNavListProps {
  label?: string
  items: SidebarItem[]
  activeId?: string
  compact?: boolean
  onSelect?: (id: string) => void
  className?: string
}

export function SidebarNavList({
  label,
  items,
  activeId,
  compact,
  onSelect,
  className,
}: SidebarNavListProps) {
  const headingId = useId()

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <h2 id={headingId} className="truncate px-2.5 pt-4 pb-1 text-xs text-(--color-muted)">
          {label}
        </h2>
      )}
      <ul aria-labelledby={label ? headingId : undefined} className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <SidebarLink
              item={item}
              active={item.id === activeId}
              compact={compact}
              onClick={() => onSelect?.(item.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export interface SidebarIconButtonProps extends ComponentPropsWithoutRef<'button'> {
  label: string
}

export const SidebarIconButton = forwardRef<HTMLButtonElement, SidebarIconButtonProps>(
  ({ label, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-md text-(--color-muted) transition-colors duration-(--motion-dur-fast) ease hover:bg-(--color-fg)/4 hover:text-(--color-fg) motion-reduce:transition-none [@media(hover:none)]:size-11',
        SIDEBAR_FOCUS,
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex">
        {children}
      </span>
    </button>
  ),
)
SidebarIconButton.displayName = 'SidebarIconButton'

export function SidebarMark({ letter = 'N', className }: { letter?: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-md bg-(--color-fg) text-xs text-(--color-bg)',
        className,
      )}
    >
      {letter}
    </span>
  )
}

export function SidebarAvatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <span
      aria-hidden="true"
      className={cn(
        'squircle flex size-8 shrink-0 items-center justify-center bg-(--color-fg)/8 text-xs text-(--color-fg)',
        className,
      )}
    >
      {initials}
    </span>
  )
}

export function SidebarTopbar({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex h-14 shrink-0 items-center gap-1 border-b border-(--color-border) px-2 sm:px-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SidebarTitle({ children }: { children: ReactNode }) {
  return <h1 className="min-w-0 truncate px-2 text-sm text-(--color-fg)">{children}</h1>
}

export function SidebarMain({ className, children }: { className?: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      layout={reduceMotion ? false : 'position'}
      transition={{ layout: SHIFT }}
      className={cn('flex min-w-0 flex-1 flex-col overflow-y-auto', className)}
    >
      {children}
    </motion.div>
  )
}

const FILL = 'rounded-md bg-(--color-fg)/7'

export function SidebarCanvas() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 px-4 py-6 sm:px-8">
      <div className="flex flex-col gap-3">
        <span className={cn(FILL, 'h-5 w-40')} />
        <span className={cn(FILL, 'h-2.5 w-64 max-w-full')} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex flex-col gap-3 rounded-md bg-(--color-fg)/4 p-4">
            <span className={cn(FILL, 'h-2 w-16')} />
            <span className={cn(FILL, 'h-5 w-24')} />
          </div>
        ))}
      </div>
      <span className={cn(FILL, 'block h-48')} />
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-3 rounded-md bg-(--color-fg)/4 p-3">
            <span className="squircle size-8 shrink-0 bg-(--color-fg)/7" />
            <span className={cn(FILL, 'h-2.5 w-40 max-w-[50%]')} />
            <span className={cn(FILL, 'ms-auto h-2.5 w-12')} />
          </div>
        ))}
      </div>
    </div>
  )
}

export interface SidebarMenuButtonProps {
  open: boolean
  controls: string
  label: string
  onOpen: () => void
}

export const SidebarMenuButton = forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ open, controls, label, onOpen }, ref) => (
    <SidebarIconButton
      ref={ref}
      label={label}
      aria-expanded={open}
      aria-controls={controls}
      aria-haspopup="dialog"
      onClick={onOpen}
      className="md:hidden"
    >
      {sidebarIcon(Menu01Icon)}
    </SidebarIconButton>
  ),
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

export function SidebarCloseButton({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <SidebarIconButton label={label} onClick={onClose} className="ms-auto">
      {sidebarIcon(Cancel01Icon)}
    </SidebarIconButton>
  )
}

export interface SidebarSheetProps {
  id: string
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: RefObject<HTMLElement | null>
  label: string
  children: ReactNode
}

export function SidebarSheet({
  id,
  open,
  onOpenChange,
  triggerRef,
  label,
  children,
}: SidebarSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const onOpenChangeRef = useRef(onOpenChange)

  useEffect(() => {
    onOpenChangeRef.current = onOpenChange
  })

  useFocusTrap(panelRef, open, triggerRef)

  useEffect(() => {
    if (!open) return
    const close = () => onOpenChangeRef.current(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      close()
    }
    const desktop = window.matchMedia('(min-width: 48rem)')
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }
    document.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleDesktop)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleDesktop)
    }
  }, [open])

  return (
    <div
      inert={!open}
      className={cn('absolute inset-0 z-10 md:hidden', !open && 'pointer-events-none')}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => onOpenChange(false)}
        className={cn(
          'absolute inset-0 cursor-default bg-(--color-bg)/70 transition-opacity ease-(--motion-ease-out) motion-reduce:transition-none',
          open
            ? 'opacity-100 duration-(--motion-dur-base)'
            : 'opacity-0 duration-(--motion-dur-fast)',
        )}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          'absolute inset-y-0 start-0 flex w-72 max-w-[85%] flex-col border-e border-(--color-border) bg-(--color-surface) transition-[translate] ease-(--motion-ease-out) motion-reduce:transition-none',
          open
            ? 'translate-x-0 duration-(--motion-dur-base)'
            : '-translate-x-full duration-(--motion-dur-fast) rtl:translate-x-full',
        )}
      >
        {children}
      </div>
    </div>
  )
}

'use client'

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  BookOpen01Icon,
  LibraryIcon,
  PencilEdit02Icon,
  Search01Icon,
  SidebarLeftIcon,
} from '@hugeicons/core-free-icons'
import {
  SIDEBAR_CLIP,
  SIDEBAR_CLIP_OPEN,
  SIDEBAR_CLIP_RAIL,
  SIDEBAR_FOCUS,
  SidebarAvatar,
  SidebarCanvas,
  SidebarCloseButton,
  SidebarIconButton,
  SidebarMain,
  SidebarMark,
  SidebarMenuButton,
  SidebarNavList,
  SidebarSheet,
  SidebarTitle,
  SidebarTopbar,
  sidebarIcon,
  type SidebarItem,
} from '@/components/blocks/sidebar/sidebar'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { cn } from '@/lib/utils'

export type SidebarUser = { name: string; detail?: string; href: string }

const DEFAULT_ACTIONS: SidebarItem[] = [
  { id: 'new', label: 'New draft', href: '#', icon: sidebarIcon(PencilEdit02Icon) },
  { id: 'search', label: 'Search', href: '#', icon: sidebarIcon(Search01Icon) },
  { id: 'library', label: 'Library', href: '#', icon: sidebarIcon(LibraryIcon) },
  { id: 'reviews', label: 'Reviews', href: '#', icon: sidebarIcon(BookOpen01Icon) },
]

const DEFAULT_RECENTS: SidebarItem[] = [
  { id: 'release-notes', label: 'Release notes 2.4', href: '#' },
  { id: 'dialog-motion', label: 'Dialog motion pass', href: '#' },
  { id: 'focus-audit', label: 'Focus ring audit', href: '#' },
  { id: 'token-rename', label: 'Token rename plan', href: '#' },
  { id: 'tooltip-delay', label: 'Tooltip delay study', href: '#' },
  { id: 'sidebar-review', label: 'Sidebar block review', href: '#' },
]

const DEFAULT_USER: SidebarUser = { name: 'Mira Tan', detail: 'mira@nexvyn.dev', href: '#' }

const SWAP =
  'absolute inset-0 flex items-center justify-center transition-[opacity,scale,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none'

export interface SidebarCollapsibleProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'defaultValue' | 'onChange'
> {
  actions?: SidebarItem[]
  recents?: SidebarItem[]
  recentsLabel?: string
  user?: SidebarUser
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  brand?: string
  brandHref?: string
  title?: ReactNode
  sidebarLabel?: string
  navLabel?: string
  expandLabel?: string
  collapseLabel?: string
  menuLabel?: string
  closeLabel?: string
  children?: ReactNode
}

export const SidebarCollapsible = forwardRef<HTMLDivElement, SidebarCollapsibleProps>(
  (
    {
      actions = DEFAULT_ACTIONS,
      recents = DEFAULT_RECENTS,
      recentsLabel = 'Recent',
      user = DEFAULT_USER,
      value,
      defaultValue = 'release-notes',
      onValueChange,
      open,
      defaultOpen = true,
      onOpenChange,
      brand = 'Nexvyn',
      brandHref = '#',
      title,
      sidebarLabel = 'Sidebar',
      navLabel = 'Main',
      expandLabel = 'Expand sidebar',
      collapseLabel = 'Collapse sidebar',
      menuLabel = 'Open navigation',
      closeLabel = 'Close navigation',
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId()
    const asideId = `${id}-aside`
    const sheetId = `${id}-sheet`
    const triggerRef = useRef<HTMLButtonElement>(null)
    const expandRef = useRef<HTMLButtonElement>(null)
    const collapseRef = useRef<HTMLButtonElement>(null)
    const moveFocus = useRef(false)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [expanded, setExpanded] = useControlledState(open, defaultOpen, onOpenChange)
    const [active, setActive] = useControlledState(value, defaultValue, onValueChange)
    const activeLabel = [...actions, ...recents].find((item) => item.id === active)?.label

    useEffect(() => {
      if (!moveFocus.current) return
      moveFocus.current = false
      ;(expanded ? collapseRef : expandRef).current?.focus()
    }, [expanded])

    const toggle = () => {
      moveFocus.current = true
      setExpanded(!expanded)
    }

    const brandLink = (hidden: boolean) => (
      <a
        href={brandHref}
        inert={hidden}
        className={cn(
          'flex h-10 items-center gap-2 rounded-md px-1.5 text-sm text-(--color-fg)',
          SIDEBAR_FOCUS,
        )}
      >
        <SidebarMark />
        <span
          className={cn(
            'transition-opacity duration-(--motion-dur-fast) ease motion-reduce:transition-none',
            hidden && 'opacity-0',
          )}
        >
          {brand}
        </span>
      </a>
    )

    const panel = (inSheet: boolean) => {
      const compact = !inSheet && !expanded
      const select = (next: string) => {
        setActive(next)
        if (inSheet) setSheetOpen(false)
      }

      return (
        <>
          <div className="relative flex h-14 shrink-0 items-center gap-1 px-2">
            {brandLink(compact)}
            {inSheet ? (
              <SidebarCloseButton label={closeLabel} onClose={() => setSheetOpen(false)} />
            ) : (
              <>
                <button
                  ref={expandRef}
                  type="button"
                  aria-label={expandLabel}
                  aria-expanded={false}
                  aria-controls={asideId}
                  inert={!compact}
                  onClick={toggle}
                  className={cn(
                    'group/expand absolute start-2 top-2 flex size-10 items-center justify-center rounded-md',
                    SIDEBAR_FOCUS,
                    !compact && 'invisible',
                  )}
                >
                  <span aria-hidden="true" className="relative size-7">
                    <span
                      className={cn(
                        SWAP,
                        'group-hover/expand:scale-90 group-hover/expand:opacity-0 group-hover/expand:blur-[2px] group-focus-visible/expand:scale-90 group-focus-visible/expand:opacity-0 group-focus-visible/expand:blur-[2px]',
                      )}
                    >
                      <SidebarMark />
                    </span>
                    <span
                      className={cn(
                        SWAP,
                        'scale-90 text-(--color-fg) opacity-0 blur-[2px] group-hover/expand:scale-100 group-hover/expand:opacity-100 group-hover/expand:blur-none group-focus-visible/expand:scale-100 group-focus-visible/expand:opacity-100 group-focus-visible/expand:blur-none',
                      )}
                    >
                      <HugeiconsIcon
                        icon={SidebarLeftIcon}
                        size={18}
                        strokeWidth={1.5}
                        className="rtl:-scale-x-100"
                      />
                    </span>
                  </span>
                </button>
                <SidebarIconButton
                  ref={collapseRef}
                  label={collapseLabel}
                  aria-expanded={true}
                  aria-controls={asideId}
                  inert={compact}
                  onClick={toggle}
                  className="ms-auto"
                >
                  <HugeiconsIcon
                    icon={SidebarLeftIcon}
                    size={18}
                    strokeWidth={1.5}
                    className="rtl:-scale-x-100"
                  />
                </SidebarIconButton>
              </>
            )}
          </div>
          <nav aria-label={navLabel} className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-3">
              <SidebarNavList
                items={actions}
                activeId={active}
                compact={compact}
                onSelect={select}
              />
              <div
                inert={compact}
                className={cn(
                  'transition-opacity duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none',
                  compact && 'opacity-0',
                )}
              >
                <SidebarNavList
                  label={recentsLabel}
                  items={recents}
                  activeId={active}
                  onSelect={select}
                />
              </div>
            </div>
          </nav>
          <div className="border-t border-(--color-border) p-2">
            <a
              href={user.href}
              className={cn(
                'flex h-11 items-center gap-3 rounded-md p-1 transition-colors duration-(--motion-dur-fast) ease hover:bg-(--color-fg)/4 motion-reduce:transition-none',
                SIDEBAR_FOCUS,
                compact ? 'w-10' : 'w-full',
              )}
            >
              <SidebarAvatar name={user.name} />
              <span className={cn('flex min-w-0 flex-col', compact && 'sr-only')}>
                <span className="truncate text-sm text-(--color-fg)">{user.name}</span>
                {user.detail && (
                  <span className="truncate text-xs text-(--color-muted)">{user.detail}</span>
                )}
              </span>
            </a>
          </div>
        </>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-full min-h-0 w-full overflow-hidden bg-(--color-bg)',
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className={cn('hidden shrink-0 md:block', expanded ? 'w-64' : 'w-14')}
        />
        <aside
          id={asideId}
          aria-label={sidebarLabel}
          className={cn(
            'absolute inset-y-0 start-0 z-1 hidden w-64 flex-col bg-(--color-surface) md:flex',
            SIDEBAR_CLIP,
            expanded ? SIDEBAR_CLIP_OPEN : SIDEBAR_CLIP_RAIL,
          )}
        >
          {panel(false)}
        </aside>
        <SidebarMain className="md:border-s md:border-(--color-border)">
          <SidebarTopbar className="border-b-0 sm:px-6">
            <SidebarMenuButton
              ref={triggerRef}
              open={sheetOpen}
              controls={sheetId}
              label={menuLabel}
              onOpen={() => setSheetOpen(true)}
            />
            <SidebarTitle>{title ?? activeLabel}</SidebarTitle>
          </SidebarTopbar>
          {children ?? <SidebarCanvas />}
        </SidebarMain>
        <SidebarSheet
          id={sheetId}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          triggerRef={triggerRef}
          label={sidebarLabel}
        >
          {panel(true)}
        </SidebarSheet>
      </div>
    )
  },
)
SidebarCollapsible.displayName = 'SidebarCollapsible'

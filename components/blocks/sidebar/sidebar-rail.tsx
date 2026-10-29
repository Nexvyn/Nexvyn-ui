'use client'

import {
  forwardRef,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Analytics01Icon,
  ComponentIcon,
  DashboardSquare01Icon,
  Layers01Icon,
  SidebarLeftIcon,
  Tag01Icon,
  UserGroupIcon,
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

const DEFAULT_ITEMS: SidebarItem[] = [
  { id: 'overview', label: 'Overview', href: '#', icon: sidebarIcon(DashboardSquare01Icon) },
  { id: 'components', label: 'Components', href: '#', icon: sidebarIcon(ComponentIcon) },
  { id: 'blocks', label: 'Blocks', href: '#', icon: sidebarIcon(Layers01Icon) },
  { id: 'releases', label: 'Releases', href: '#', icon: sidebarIcon(Tag01Icon) },
  { id: 'team', label: 'Team', href: '#', icon: sidebarIcon(UserGroupIcon) },
  { id: 'usage', label: 'Usage', href: '#', icon: sidebarIcon(Analytics01Icon) },
]

export interface SidebarRailProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'defaultValue' | 'onChange'
> {
  items?: SidebarItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  peek?: 'hover' | 'off'
  brand?: string
  brandHref?: string
  userName?: string
  accountHref?: string
  title?: ReactNode
  sidebarLabel?: string
  navLabel?: string
  expandLabel?: string
  collapseLabel?: string
  menuLabel?: string
  closeLabel?: string
  children?: ReactNode
}

export const SidebarRail = forwardRef<HTMLDivElement, SidebarRailProps>(
  (
    {
      items = DEFAULT_ITEMS,
      value,
      defaultValue = 'overview',
      onValueChange,
      open,
      defaultOpen = false,
      onOpenChange,
      peek = 'hover',
      brand = 'Nexvyn',
      brandHref = '#',
      userName = 'Mira Tan',
      accountHref = '#',
      title,
      sidebarLabel = 'Sidebar',
      navLabel = 'Main',
      expandLabel = 'Keep sidebar open',
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
    const [sheetOpen, setSheetOpen] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [pinned, setPinned] = useControlledState(open, defaultOpen, onOpenChange)
    const [active, setActive] = useControlledState(value, defaultValue, onValueChange)
    const expanded = pinned || (peek === 'hover' && hovered)
    const activeLabel = items.find((item) => item.id === active)?.label

    const togglePinned = () => {
      if (pinned) setHovered(false)
      setPinned(!pinned)
    }

    const brandLink = (
      <a
        href={brandHref}
        className={cn(
          'flex h-10 items-center gap-2 rounded-md px-1 text-sm text-(--color-fg)',
          SIDEBAR_FOCUS,
        )}
      >
        <SidebarMark />
        {brand}
      </a>
    )

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-(--color-bg)',
          className,
        )}
        {...props}
      >
        <SidebarTopbar className="md:px-2.5">
          <SidebarMenuButton
            ref={triggerRef}
            open={sheetOpen}
            controls={sheetId}
            label={menuLabel}
            onOpen={() => setSheetOpen(true)}
          />
          {brandLink}
          <a
            href={accountHref}
            aria-label={userName}
            className={cn(
              'ms-auto flex size-10 items-center justify-center rounded-md [@media(hover:none)]:size-11',
              SIDEBAR_FOCUS,
            )}
          >
            <SidebarAvatar name={userName} />
          </a>
        </SidebarTopbar>
        <div className="relative flex min-h-0 flex-1">
          <div
            aria-hidden="true"
            className={cn('hidden shrink-0 md:block', pinned ? 'w-56' : 'w-14')}
          />
          <aside
            id={asideId}
            aria-label={sidebarLabel}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') setHovered(true)
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') setHovered(false)
            }}
            onFocus={() => setHovered(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setHovered(false)
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape' && !pinned) setHovered(false)
            }}
            className={cn(
              'absolute inset-y-0 start-0 z-1 hidden w-56 flex-col border-e bg-(--color-surface) md:flex',
              SIDEBAR_CLIP,
              expanded ? SIDEBAR_CLIP_OPEN : SIDEBAR_CLIP_RAIL,
              expanded && !pinned ? 'border-(--color-border)' : 'border-transparent',
            )}
          >
            <nav aria-label={navLabel} className="flex min-h-0 flex-1 flex-col overflow-y-auto p-2">
              <SidebarNavList
                items={items}
                activeId={active}
                compact={!expanded}
                onSelect={setActive}
              />
            </nav>
            <div className="border-t border-(--color-border) p-2">
              <SidebarIconButton
                label={pinned ? collapseLabel : expandLabel}
                aria-expanded={pinned}
                aria-controls={asideId}
                onClick={togglePinned}
              >
                <HugeiconsIcon
                  icon={SidebarLeftIcon}
                  size={18}
                  strokeWidth={1.5}
                  className="rtl:-scale-x-100"
                />
              </SidebarIconButton>
            </div>
          </aside>
          <SidebarMain className="md:border-s md:border-(--color-border)">
            <SidebarTopbar className="h-12 border-b-0 sm:px-6">
              <SidebarTitle>{title ?? activeLabel}</SidebarTitle>
            </SidebarTopbar>
            {children ?? <SidebarCanvas />}
          </SidebarMain>
        </div>
        <SidebarSheet
          id={sheetId}
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          triggerRef={triggerRef}
          label={sidebarLabel}
        >
          <div className="flex h-14 items-center gap-1 border-b border-(--color-border) px-2">
            {brandLink}
            <SidebarCloseButton label={closeLabel} onClose={() => setSheetOpen(false)} />
          </div>
          <nav aria-label={navLabel} className="flex min-h-0 flex-1 flex-col overflow-y-auto p-2">
            <SidebarNavList
              items={items}
              activeId={active}
              onSelect={(next) => {
                setActive(next)
                setSheetOpen(false)
              }}
            />
          </nav>
        </SidebarSheet>
      </div>
    )
  },
)
SidebarRail.displayName = 'SidebarRail'

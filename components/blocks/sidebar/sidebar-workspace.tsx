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
  Delete02Icon,
  Home01Icon,
  InboxIcon,
  LibraryIcon,
  PencilEdit02Icon,
  Search01Icon,
  Settings01Icon,
  SidebarLeftIcon,
  UnfoldMoreIcon,
} from '@hugeicons/core-free-icons'
import {
  SIDEBAR_FOCUS,
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
  type SidebarGroup,
  type SidebarItem,
} from '@/components/blocks/sidebar/sidebar'
import { useControlledState } from '@/lib/hooks/use-controlled-state'
import { cn } from '@/lib/utils'

export type SidebarWorkspaceOption = { value: string; label: string }

const page = (id: string, label: string): SidebarItem => ({ id, label, href: '#' })

const DEFAULT_WORKSPACES: SidebarWorkspaceOption[] = [
  { value: 'nexvyn', label: 'Nexvyn UI' },
  { value: 'studio', label: 'Design studio' },
]

const DEFAULT_PRIMARY: SidebarItem[] = [
  { id: 'search', label: 'Search', href: '#', icon: sidebarIcon(Search01Icon) },
  { id: 'overview', label: 'Overview', href: '#', icon: sidebarIcon(Home01Icon) },
  { id: 'inbox', label: 'Inbox', href: '#', icon: sidebarIcon(InboxIcon) },
  { id: 'library', label: 'Library', href: '#', icon: sidebarIcon(LibraryIcon) },
]

const DEFAULT_GROUPS: SidebarGroup[] = [
  {
    id: 'recent',
    label: 'Recent',
    items: [
      page('release-notes', 'Release notes 2.4'),
      page('tooltip-delay', 'Tooltip delay study'),
      page('token-rename', 'Token rename plan'),
    ],
  },
  {
    id: 'favorites',
    label: 'Favorites',
    items: [page('principles', 'Design principles'), page('motion', 'Motion tokens')],
  },
]

const DEFAULT_SECONDARY: SidebarItem[] = [
  { id: 'settings', label: 'Settings', href: '#', icon: sidebarIcon(Settings01Icon) },
  { id: 'trash', label: 'Trash', href: '#', icon: sidebarIcon(Delete02Icon) },
]

export interface SidebarWorkspaceProps extends Omit<
  ComponentPropsWithoutRef<'div'>,
  'title' | 'defaultValue' | 'onChange'
> {
  workspaces?: SidebarWorkspaceOption[]
  workspace?: string
  defaultWorkspace?: string
  onWorkspaceChange?: (value: string) => void
  primary?: SidebarItem[]
  groups?: SidebarGroup[]
  secondary?: SidebarItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (id: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onNewPage?: () => void
  title?: ReactNode
  sidebarLabel?: string
  navLabel?: string
  workspaceLabel?: string
  newPageLabel?: string
  showLabel?: string
  hideLabel?: string
  menuLabel?: string
  closeLabel?: string
  children?: ReactNode
}

export const SidebarWorkspace = forwardRef<HTMLDivElement, SidebarWorkspaceProps>(
  (
    {
      workspaces = DEFAULT_WORKSPACES,
      workspace,
      defaultWorkspace = DEFAULT_WORKSPACES[0].value,
      onWorkspaceChange,
      primary = DEFAULT_PRIMARY,
      groups = DEFAULT_GROUPS,
      secondary = DEFAULT_SECONDARY,
      value,
      defaultValue = 'overview',
      onValueChange,
      open,
      defaultOpen = true,
      onOpenChange,
      onNewPage,
      title,
      sidebarLabel = 'Sidebar',
      navLabel = 'Main',
      workspaceLabel = 'Workspace',
      newPageLabel = 'New page',
      showLabel = 'Show sidebar',
      hideLabel = 'Hide sidebar',
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
    const [shown, setShown] = useControlledState(open, defaultOpen, onOpenChange)
    const [active, setActive] = useControlledState(value, defaultValue, onValueChange)
    const [current, setCurrent] = useControlledState(workspace, defaultWorkspace, onWorkspaceChange)

    const allItems = [...primary, ...groups.flatMap((group) => group.items), ...secondary]
    const activeLabel = allItems.find((item) => item.id === active)?.label
    const currentLabel = workspaces.find((option) => option.value === current)?.label ?? ''

    const panel = (inSheet: boolean) => {
      const select = (next: string) => {
        setActive(next)
        if (inSheet) setSheetOpen(false)
      }

      return (
        <>
          <div className="flex items-center gap-1 px-2 pt-3 pb-1">
            <div className="relative min-w-0 flex-1">
              <SidebarMark
                letter={currentLabel.charAt(0).toUpperCase() || 'N'}
                className="pointer-events-none absolute start-2 top-1/2 size-6 -translate-y-1/2"
              />
              <label htmlFor={`${id}-workspace-${inSheet ? 'sheet' : 'aside'}`} className="sr-only">
                {workspaceLabel}
              </label>
              <select
                id={`${id}-workspace-${inSheet ? 'sheet' : 'aside'}`}
                value={current}
                onChange={(event) => setCurrent(event.target.value)}
                className={cn(
                  'h-10 w-full cursor-pointer appearance-none truncate rounded-md bg-transparent ps-10 pe-8 text-sm text-(--color-fg) transition-colors duration-(--motion-dur-fast) ease hover:bg-(--color-fg)/4 motion-reduce:transition-none [@media(hover:none)]:h-11',
                  SIDEBAR_FOCUS,
                )}
              >
                {workspaces.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                size={16}
                strokeWidth={1.5}
                aria-hidden="true"
                className="pointer-events-none absolute end-2 top-1/2 -translate-y-1/2 text-(--color-muted)"
              />
            </div>
            <SidebarIconButton label={newPageLabel} onClick={onNewPage}>
              {sidebarIcon(PencilEdit02Icon)}
            </SidebarIconButton>
            {inSheet && (
              <SidebarCloseButton label={closeLabel} onClose={() => setSheetOpen(false)} />
            )}
          </div>
          <nav aria-label={navLabel} className="flex min-h-0 flex-1 flex-col">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-2 pb-3">
              <SidebarNavList items={primary} activeId={active} onSelect={select} />
              {groups.map((group) => (
                <SidebarNavList
                  key={group.id}
                  label={group.label}
                  items={group.items}
                  activeId={active}
                  onSelect={select}
                />
              ))}
            </div>
            <div className="border-t border-(--color-border) p-2">
              <SidebarNavList items={secondary} activeId={active} onSelect={select} />
            </div>
          </nav>
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
          className={cn('hidden shrink-0 md:block', shown ? 'w-64' : 'w-0')}
        />
        <aside
          id={asideId}
          aria-label={sidebarLabel}
          inert={!shown}
          className={cn(
            'absolute inset-y-0 start-0 z-1 hidden w-64 flex-col border-e border-(--color-border) bg-(--color-surface) transition-[translate] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none md:flex',
            !shown && '-translate-x-full rtl:translate-x-full',
          )}
        >
          {panel(false)}
        </aside>
        <SidebarMain>
          <SidebarTopbar>
            <SidebarMenuButton
              ref={triggerRef}
              open={sheetOpen}
              controls={sheetId}
              label={menuLabel}
              onOpen={() => setSheetOpen(true)}
            />
            <SidebarIconButton
              label={shown ? hideLabel : showLabel}
              aria-expanded={shown}
              aria-controls={asideId}
              onClick={() => setShown(!shown)}
              className="hidden md:flex"
            >
              <HugeiconsIcon
                icon={SidebarLeftIcon}
                size={18}
                strokeWidth={1.5}
                className="rtl:-scale-x-100"
              />
            </SidebarIconButton>
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
SidebarWorkspace.displayName = 'SidebarWorkspace'

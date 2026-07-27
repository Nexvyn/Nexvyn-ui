'use client'

import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { CommandPalette, type CommandAction } from '@/components/ui/command-palette'
import { COMPONENTS, getComponentHref, type ComponentItem } from '@/lib/components-registry'

const PAGES: { id: string; label: string; detail: string; href: string }[] = [
  {
    id: 'page-components',
    label: 'All components',
    detail: 'Browse the full showcase',
    href: '/components',
  },
  { id: 'page-mcp', label: 'MCP', detail: 'Model Context Protocol server', href: '/mcp' },
  { id: 'page-changelog', label: 'Changelog', detail: 'What shipped recently', href: '/changelog' },
  { id: 'page-stars', label: 'Stars', detail: 'Community and supporters', href: '/stars' },
  { id: 'page-design', label: 'Design', detail: 'The Nexvyn design language', href: '/design' },
]

function collectionHeading(collection: string): string {
  return collection
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}

function componentAction(item: ComponentItem, navigate: (href: string) => void): CommandAction {
  return {
    id: item.id,
    label: item.name,
    detail: item.description,
    section: collectionHeading(item.collection),
    keywords: [item.id, item.collection, ...(item.isNew ? ['new'] : [])],
    perform: () => navigate(getComponentHref(item.id)),
  }
}

const noopSubscribe = () => () => {}
const isAppleClient = () => /mac|iphone|ipad|ipod/i.test(window.navigator.userAgent)

export function useShortcutLabel(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => (isAppleClient() ? '⌘ K' : 'Ctrl K'),
    () => 'Ctrl K',
  )
}

interface ComponentSearchValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const ComponentSearchContext = createContext<ComponentSearchValue | null>(null)

export function useComponentSearch(): ComponentSearchValue | null {
  return useContext(ComponentSearchContext)
}

export function ComponentSearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const navigate = useCallback((href: string) => router.push(href), [router])

  const actions = useMemo<CommandAction[]>(
    () => [
      ...PAGES.map<CommandAction>((page) => ({
        id: page.id,
        label: page.label,
        detail: page.detail,
        section: 'Pages',
        perform: () => navigate(page.href),
      })),
      ...COMPONENTS.map((item) => componentAction(item, navigate)),
    ],
    [navigate],
  )

  const value = useMemo<ComponentSearchValue>(() => ({ open, setOpen }), [open])

  return (
    <ComponentSearchContext.Provider value={value}>
      {children}
      <CommandPalette
        actions={actions}
        open={open}
        onOpenChange={setOpen}
        placeholder="Search components…"
        emptyState="No components match that search."
        title="Search components"
        ungroupedHeading="Components"
        recentLimit={0}
      />
    </ComponentSearchContext.Provider>
  )
}

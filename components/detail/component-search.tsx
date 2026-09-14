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

const PAGES: { id: string; label: string; detail: string; href: string; keywords: string[] }[] = [
  { id: 'page-home', label: 'Home', detail: 'Start page', href: '/', keywords: ['index', 'start'] },
  {
    id: 'page-components',
    label: 'Components',
    detail: 'Browse the full library',
    href: '/components',
    keywords: ['library', 'showcase', 'all'],
  },
  {
    id: 'page-illustration',
    label: 'Illustration',
    detail: 'Illustrations and artwork',
    href: '/illustration',
    keywords: ['art', 'images'],
  },
  {
    id: 'page-design',
    label: 'Design',
    detail: 'The Nexvyn design language',
    href: '/design',
    keywords: ['tokens', 'language', 'system'],
  },
  {
    id: 'page-mcp',
    label: 'MCP',
    detail: 'Model Context Protocol server',
    href: '/mcp',
    keywords: ['ai', 'agent', 'server'],
  },
  {
    id: 'page-changelog',
    label: 'Changelog',
    detail: 'What shipped recently',
    href: '/changelog',
    keywords: ['releases', 'updates', 'news'],
  },
]

function componentAction(item: ComponentItem, navigate: (href: string) => void): CommandAction {
  return {
    id: item.id,
    label: item.name,
    detail: item.description,
    section: 'Components',
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

export interface ComponentSearchProviderProps {
  children: ReactNode
  placeholder?: string
  emptyState?: ReactNode
  title?: string
}

function SearchRoot({
  children,
  placeholder = 'Search pages and components…',
  emptyState = 'Nothing matches that search.',
  title = 'Search',
}: ComponentSearchProviderProps) {
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
        keywords: page.keywords,
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
        placeholder={placeholder}
        emptyState={emptyState}
        title={title}
        ungroupedHeading="Components"
        recentLimit={0}
      />
    </ComponentSearchContext.Provider>
  )
}

export function ComponentSearchProvider(props: ComponentSearchProviderProps) {
  const parent = useContext(ComponentSearchContext)
  if (parent) return <>{props.children}</>
  return <SearchRoot {...props} />
}

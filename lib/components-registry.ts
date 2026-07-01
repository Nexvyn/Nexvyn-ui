import { bounceSidebarMetadata } from '@/components/ui/Doc/bounce-sidebar-metadata'

export type ComponentItem = {
  id: string
  name: string
  collection: string
  preview?: string
  thumbnail?: string
  videoSrc?: string
  previewType?: 'video' | 'icons' | 'pixels' | 'toggle' | 'default'
  isNew?: boolean
  description?: string
  registry?: string
  dependencies?: { name: string; icon?: string }[]
  interaction?: string
  props?: ComponentProp[]
  usage?: string
}

export type ComponentProp = {
  name: string
  type: string
  description: string
  required?: boolean
  options?: string[]
  control?: 'swatch'
  optionColors?: Record<string, string>
  controlType?: 'swatch'
}

export type ComponentCollection = {
  id: string
  name: string
  components: ComponentItem[]
}

export const COMPONENTS: ComponentItem[] = [
  bounceSidebarMetadata,
]

export const COLLECTIONS: ComponentCollection[] = [
  {
    id: 'effects',
    name: 'Effects',
    components: COMPONENTS.filter((c) => c.collection === 'effects'),
  },
  {
    id: 'inputs',
    name: 'Inputs',
    components: COMPONENTS.filter((c) => c.collection === 'inputs'),
  },
  {
    id: 'navigation',
    name: 'Navigation',
    components: COMPONENTS.filter((c) => c.collection === 'navigation'),
  },
  {
    id: 'preloaders',
    name: 'Preloaders',
    components: COMPONENTS.filter((c) => c.collection === 'preloaders'),
  },
  {
    id: 'scroll',
    name: 'Scroll',
    components: COMPONENTS.filter((c) => c.collection === 'scroll'),
  },
]

export function getComponentNumber(id: string): number {
  const match = id.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

export function formatComponentLabel(item: ComponentItem): string {
  const num = getComponentNumber(item.id)
  const prefix = num < 10 ? `0${num}` : `${num}`
  return `${prefix} ${item.name}`
}

export function getComponentHref(id: string): string {
  return `/components/${id}`
}

export function activeComponent(pathname: string): ComponentItem | undefined {
  return COMPONENTS.find((c) => pathname.endsWith(c.id))
}

export function installCommand(item: ComponentItem): string | null {
  if (!item.registry) return null
  return `npx shadcn@latest add ${item.registry}`
}

export const PANEL_INFO = {
  sourceHint: 'Click the code icon in the top-right corner to view the source code.',
  keepInMind: 'These components are built with React, Tailwind CSS, and motion. They work with Next.js and any React framework.',
  contactEmail: 'hello@nexvyn.dev',
  contactNote: 'Questions or feedback? Reach out anytime.',
  license: [
    'Free for personal and commercial use',
    'No attribution required',
    'Cannot be resold as a standalone product',
  ],
}

export function swatchProp(item: ComponentItem | undefined): ComponentProp | undefined {
  return item?.props?.find((p) => p.control === 'swatch' && p.optionColors)
}

export function cleanDefault(prop: ComponentProp | undefined): string | undefined {
  return prop?.options?.[0]?.replace(/^["']|["']$/g, '')
}

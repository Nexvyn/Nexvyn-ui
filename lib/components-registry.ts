import { badgeMetadata } from '@/components/ui/Doc/badge-metadata'
import { barsThemeMetadata } from '@/components/ui/Doc/bars-theme-metadata'
import { bounceSidebarMetadata } from '@/components/ui/Doc/bounce-sidebar-metadata'
import { breadcrumbsMetadata } from '@/components/ui/Doc/breadcrumbs-metadata'
import { checkboxMetadata } from '@/components/ui/Doc/checkbox-metadata'
import { glowOrbMetadata } from '@/components/ui/Doc/glow-orb-metadata'
import { comboboxMetadata } from '@/components/ui/Doc/combobox-metadata'
import { contextMenuMetadata } from '@/components/ui/Doc/context-menu-metadata'
import { morphNavMetadata } from '@/components/ui/Doc/morph-nav-metadata'
import { mobileDrawerMetadata } from '@/components/ui/Doc/mobile-drawer-metadata'
import { clipboardFieldMetadata } from '@/components/ui/Doc/clipboard-field-metadata'
import { colorPickerMetadata } from '@/components/ui/Doc/color-picker-metadata'
import { faderMetadata } from '@/components/ui/Doc/fader-metadata'
import { fluidOrbMetadata } from '@/components/ui/Doc/fluid-orb-metadata'
import { dropdownMenuMetadata } from '@/components/ui/Doc/dropdown-menu-metadata'
import { navMenuMetadata } from '@/components/ui/Doc/nav-menu-metadata'
import { iconBarMetadata } from '@/components/ui/Doc/icon-bar-metadata'
import { gooDropdownMetadata } from '@/components/ui/Doc/goo-dropdown-metadata'
import { idReelMetadata } from '@/components/ui/Doc/id-reel-metadata'
import { inputMetadata } from '@/components/ui/Doc/input-metadata'
import { inputCopyMetadata } from '@/components/ui/Doc/input-copy-metadata'
import { inputMessageMetadata } from '@/components/ui/Doc/input-message-metadata'
import { passwordInputMetadata } from '@/components/ui/Doc/password-input-metadata'
import { radioGroupMetadata } from '@/components/ui/Doc/radio-group-metadata'
import { ratioSliderMetadata } from '@/components/ui/Doc/ratio-slider-metadata'
import { scrollIndicatorMetadata } from '@/components/ui/Doc/scroll-indicator-metadata'
import { selectMetadata } from '@/components/ui/Doc/select-metadata'
import { switchMetadata } from '@/components/ui/Doc/switch-metadata'
import { tableMetadata } from '@/components/ui/Doc/table-metadata'
import { tableOfContentsMetadata } from '@/components/ui/Doc/table-of-contents-metadata'
import { tabsSubtleMetadata } from '@/components/ui/Doc/tabs-subtle-metadata'

export type ComponentItem = {
  id: string
  name: string
  collection: string
  preview?: string
  thumbnail?: string
  videoSrc?: string
  previewType?: 'video' | 'icons' | 'pixels' | 'toggle' | 'default'
  isNew?: boolean
  basic?: boolean
  description?: string
  registry?: string
  dependencies?: { name: string; icon?: string }[]
  interaction?: string
  props?: ComponentProp[]
  usage?: string
  credits?: string
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
  badgeMetadata,
  barsThemeMetadata,
  bounceSidebarMetadata,
  breadcrumbsMetadata,
  checkboxMetadata,
  glowOrbMetadata,
  comboboxMetadata,
  contextMenuMetadata,
  morphNavMetadata,
  mobileDrawerMetadata,
  clipboardFieldMetadata,
  colorPickerMetadata,
  dropdownMenuMetadata,
  faderMetadata,
  fluidOrbMetadata,
  gooDropdownMetadata,
  iconBarMetadata,
  idReelMetadata,
  inputMetadata,
  inputCopyMetadata,
  inputMessageMetadata,
  navMenuMetadata,
  passwordInputMetadata,
  radioGroupMetadata,
  ratioSliderMetadata,
  scrollIndicatorMetadata,
  selectMetadata,
  switchMetadata,
  tableMetadata,
  tableOfContentsMetadata,
  tabsSubtleMetadata,
]

export const BASIC_COMPONENTS: ComponentItem[] = COMPONENTS.filter((c) => c.basic)

export const COLLECTIONS: ComponentCollection[] = [
  {
    id: 'effects',
    name: 'Effects',
    components: COMPONENTS.filter((c) => c.collection === 'effects' && !c.basic),
  },
  {
    id: 'inputs',
    name: 'Inputs',
    components: COMPONENTS.filter((c) => c.collection === 'inputs' && !c.basic),
  },
  {
    id: 'navigation',
    name: 'Navigation',
    components: COMPONENTS.filter((c) => c.collection === 'navigation' && !c.basic),
  },
  {
    id: 'preloaders',
    name: 'Preloaders',
    components: COMPONENTS.filter((c) => c.collection === 'preloaders' && !c.basic),
  },
  {
    id: 'scroll',
    name: 'Scroll',
    components: COMPONENTS.filter((c) => c.collection === 'scroll' && !c.basic),
  },
]

export function getComponentNumber(id: string): number {
  const index = COMPONENTS.findIndex((c) => c.id === id)
  return index >= 0 ? index : 0
}

export function formatComponentLabel(index: number, name: string): string {
  const prefix = index < 10 ? `0${index}` : `${index}`
  return `${prefix} ${name}`
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
  keepInMind:
    "All components here are original implementations, built from scratch with no copied code, assets, or content. We study UI/UX patterns we admire and craft our own versions, often with added features. If your work inspired something here and isn't credited, or a credit is incomplete, please open an issue - we'll fix it promptly.",
  contactEmail: 'hello@nexvyn.dev',
  contactNote: 'Questions or feedback? Reach out anytime.',
  license: [
    'Free for personal and commercial use',
    'No attribution required',
    'Cannot be resold as a standalone product',
    'Anatomy/blueprint diagrams are licensed separately (CC BY-NC 4.0) and are not for commercial use',
  ],
}

export function swatchProp(item: ComponentItem | undefined): ComponentProp | undefined {
  return item?.props?.find((p) => p.control === 'swatch' && p.optionColors)
}

export function cleanDefault(prop: ComponentProp | undefined): string | undefined {
  return prop?.options?.[0]?.replace(/^["']|["']$/g, '')
}

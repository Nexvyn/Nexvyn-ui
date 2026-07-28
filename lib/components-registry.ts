import { accordionMetadata } from '@/components/ui/Doc/accordion-metadata'
import { actionButtonMetadata } from '@/components/ui/Doc/action-button-metadata'
import { badgeMetadata } from '@/components/ui/Doc/badge-metadata'
import { buttonMetadata } from '@/components/ui/Doc/button-metadata'
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
import { phoneMockupMetadata } from '@/components/ui/Doc/phone-mockup-metadata'
import { laptopMockupMetadata } from '@/components/ui/Doc/laptop-mockup-metadata'
import { rocketLaunchMetadata } from '@/components/ui/Doc/rocket-launch-metadata'

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
  /**
   * Grid card sizing on the /components showcase. Defaults to a standard
   * single cell. 'lg' spans two rows (tall illustrations, e.g. a phone).
   * 'xl' spans two rows and two columns (wide + tall illustrations, e.g. a laptop).
   */
  size?: 'default' | 'lg' | 'xl'
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

/**
 * Display order for the catalog:
 * 1. Released showcase components (stable, not basic, not isNew)
 * 2. Latest / new showcase components (isNew)
 * 3. Basic components last
 *
 * Within each tier, sorted alphabetically by id so "Sort by Id" is stable.
 */
function catalogTier(item: ComponentItem): number {
  if (item.basic) return 2
  if (item.isNew) return 1
  return 0
}

/** Always use a fixed locale so server/client sort order cannot diverge. */
function cmpId(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0
}

export function compareComponentsByCatalog(a: ComponentItem, b: ComponentItem): number {
  const tier = catalogTier(a) - catalogTier(b)
  if (tier !== 0) return tier
  return cmpId(a.id, b.id)
}

export function compareComponentsById(a: ComponentItem, b: ComponentItem): number {
  const tier = catalogTier(a) - catalogTier(b)
  if (tier !== 0) return tier
  return cmpId(a.id, b.id)
}

export function compareComponentsByCollection(a: ComponentItem, b: ComponentItem): number {
  const tier = catalogTier(a) - catalogTier(b)
  if (tier !== 0) return tier
  const byCollection = cmpId(a.collection, b.collection)
  if (byCollection !== 0) return byCollection
  return cmpId(a.id, b.id)
}

const COMPONENTS_UNSORTED: ComponentItem[] = [
  accordionMetadata,
  actionButtonMetadata,
  badgeMetadata,
  buttonMetadata,
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
  phoneMockupMetadata,
  laptopMockupMetadata,
  rocketLaunchMetadata,
]

/** Canonical ordered list used by grid, sidebar, and numbering. */
export const COMPONENTS: ComponentItem[] = [...COMPONENTS_UNSORTED].sort(compareComponentsByCatalog)

export const BASIC_COMPONENTS: ComponentItem[] = COMPONENTS.filter((c) => c.basic)

/** Non-basic components only (released + latest). */
export const NORMAL_COMPONENTS: ComponentItem[] = COMPONENTS.filter((c) => !c.basic)

/**
 * Illustration items (e.g. phone-mockup). Shown on the /components showcase
 * grid, but kept out of the sidebar's flat/collection nav lists — there they
 * only ever appear nested under the dedicated "Illustration" link.
 */
export const ILLUSTRATION_COMPONENTS: ComponentItem[] = COMPONENTS.filter(
  (c) => c.collection === 'illustration',
)

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
    id: 'menus',
    name: 'Menus',
    components: COMPONENTS.filter((c) => c.collection === 'menus' && !c.basic),
  },
  {
    id: 'navigation',
    name: 'Navigation',
    components: COMPONENTS.filter((c) => c.collection === 'navigation' && !c.basic),
  },
  {
    id: 'overlays',
    name: 'Overlays',
    components: COMPONENTS.filter((c) => c.collection === 'overlays' && !c.basic),
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

"use client"

import { IconComponent } from "./types"
import { AccordionIcon } from "./icons/accordion"
import { AlertDialogIcon } from "./icons/alert-dialog"
import { AlertIcon } from "./icons/alert"
import { AspectRatioIcon } from "./icons/aspect-ratio"
import { AvatarIcon } from "./icons/avatar"
import { BadgeIcon } from "./icons/badge"
import { BookIcon } from "./icons/book"
import { BreadcrumbIcon } from "./icons/breadcrumb"
import { ButtonIcon } from "./icons/button"
import { ButtonGroupIcon } from "./icons/button-group"
import { CalendarIcon } from "./icons/calendar"
import { CardIcon } from "./icons/card"
import { CarouselIcon } from "./icons/carousel"
import { ChartIcon } from "./icons/chart"
import { CheckboxIcon } from "./icons/checkbox"
import { CollapsibleIcon } from "./icons/collapsible"
import { ComboboxIcon } from "./icons/combobox"
import { CommandIcon } from "./icons/command"
import { ContextMenuIcon } from "./icons/context-menu"
import { DataTableIcon } from "./icons/data-table"
import { DialogIcon } from "./icons/dialog"
import { InputIcon } from "./icons/input"
import { LayersIcon } from "./icons/layers"
import { MenuIcon } from "./icons/menu"
import { NotificationIcon } from "./icons/notification"
import { PaginationIcon } from "./icons/pagination"
import { ProgressIcon } from "./icons/progress"
import { RadioIcon } from "./icons/radio"
import { SearchIcon } from "./icons/search"
import { SelectIcon } from "./icons/select"
import { SettingsIcon } from "./icons/settings"
import { ShieldIcon } from "./icons/shield"
import { SliderIcon } from "./icons/slider"
import { SwitchIcon } from "./icons/switch"
import { TabsIcon } from "./icons/tabs"
import { TooltipIcon } from "./icons/tooltip"

/**
 * Icon Registry
 *
 * A centralized registry of all available animated icons.
 * Use this to dynamically render icons by name or to iterate over all icons.
 */

export interface IconRegistryEntry {
  name: string
  component: IconComponent
  category: "ui" | "navigation" | "data" | "feedback" | "layout"
  description: string
}

export const iconRegistry: IconRegistryEntry[] = [
  // UI Components
  {
    name: "accordion",
    component: AccordionIcon,
    category: "ui",
    description: "Expandable accordion sections",
  },
  { name: "alert", component: AlertIcon, category: "feedback", description: "Alert notifications" },
  {
    name: "alert-dialog",
    component: AlertDialogIcon,
    category: "feedback",
    description: "Alert dialog modal",
  },
  {
    name: "aspect-ratio",
    component: AspectRatioIcon,
    category: "layout",
    description: "Aspect ratio container",
  },
  { name: "avatar", component: AvatarIcon, category: "ui", description: "User avatar" },
  { name: "badge", component: BadgeIcon, category: "ui", description: "Status badge" },
  { name: "book", component: BookIcon, category: "navigation", description: "Documentation book" },
  {
    name: "breadcrumb",
    component: BreadcrumbIcon,
    category: "navigation",
    description: "Navigation breadcrumbs",
  },
  { name: "button", component: ButtonIcon, category: "ui", description: "Button component" },
  {
    name: "button-group",
    component: ButtonGroupIcon,
    category: "ui",
    description: "Grouped buttons",
  },
  {
    name: "calendar",
    component: CalendarIcon,
    category: "data",
    description: "Date picker calendar",
  },
  { name: "card", component: CardIcon, category: "layout", description: "Card container" },
  {
    name: "carousel",
    component: CarouselIcon,
    category: "ui",
    description: "Image/content carousel",
  },
  {
    name: "chart",
    component: ChartIcon,
    category: "data",
    description: "Data visualization chart",
  },
  { name: "checkbox", component: CheckboxIcon, category: "ui", description: "Checkbox input" },
  {
    name: "collapsible",
    component: CollapsibleIcon,
    category: "ui",
    description: "Collapsible section",
  },
  { name: "combobox", component: ComboboxIcon, category: "ui", description: "Searchable dropdown" },
  { name: "command", component: CommandIcon, category: "ui", description: "Command palette" },
  {
    name: "context-menu",
    component: ContextMenuIcon,
    category: "ui",
    description: "Right-click context menu",
  },
  {
    name: "data-table",
    component: DataTableIcon,
    category: "data",
    description: "Data table grid",
  },
  { name: "dialog", component: DialogIcon, category: "ui", description: "Modal dialog" },
  { name: "input", component: InputIcon, category: "ui", description: "Text input field" },
  { name: "layers", component: LayersIcon, category: "layout", description: "Stacked layers" },
  { name: "menu", component: MenuIcon, category: "navigation", description: "Navigation menu" },
  {
    name: "notification",
    component: NotificationIcon,
    category: "feedback",
    description: "Notification bell",
  },
  {
    name: "pagination",
    component: PaginationIcon,
    category: "navigation",
    description: "Page navigation",
  },
  {
    name: "progress",
    component: ProgressIcon,
    category: "feedback",
    description: "Progress indicator",
  },
  { name: "radio", component: RadioIcon, category: "ui", description: "Radio button" },
  { name: "search", component: SearchIcon, category: "ui", description: "Search input" },
  { name: "select", component: SelectIcon, category: "ui", description: "Dropdown select" },
  { name: "settings", component: SettingsIcon, category: "ui", description: "Settings gear" },
  { name: "shield", component: ShieldIcon, category: "ui", description: "Security shield" },
  { name: "slider", component: SliderIcon, category: "ui", description: "Range slider" },
  { name: "switch", component: SwitchIcon, category: "ui", description: "Toggle switch" },
  { name: "tabs", component: TabsIcon, category: "navigation", description: "Tab navigation" },
  { name: "tooltip", component: TooltipIcon, category: "ui", description: "Tooltip popup" },
]

/**
 * Get an icon component by name
 */
export function getIconByName(name: string): IconComponent | undefined {
  const entry = iconRegistry.find((icon) => icon.name === name)
  return entry?.component
}

/**
 * Get all icons in a specific category
 */
export function getIconsByCategory(category: IconRegistryEntry["category"]): IconRegistryEntry[] {
  return iconRegistry.filter((icon) => icon.category === category)
}

/**
 * Icon name to component map for quick lookup
 */
export const iconMap: Record<string, IconComponent> = Object.fromEntries(
  iconRegistry.map((entry) => [entry.name, entry.component])
)

/**
 * List of all icon names
 */
export const iconNames = iconRegistry.map((entry) => entry.name)

/**
 * Total number of icons
 */
export const iconCount = iconRegistry.length

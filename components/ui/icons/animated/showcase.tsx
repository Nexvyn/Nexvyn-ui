"use client"

import { useState } from "react"
import {
  AlertDialogIcon,
  AlertIcon,
  AspectRatioIcon,
  AvatarIcon,
  BadgeIcon,
  BreadcrumbIcon,
  ButtonIcon,
  ButtonGroupIcon,
  CalendarIcon,
  CardIcon,
  CarouselIcon,
  ChartIcon,
  CheckboxIcon,
  CollapsibleIcon,
  ComboboxIcon,
  CommandIcon,
  ContextMenuIcon,
  DataTableIcon,
  // New icons
  AccordionIcon,
  DialogIcon,
  InputIcon,
  MenuIcon,
  NotificationIcon,
  PaginationIcon,
  ProgressIcon,
  RadioIcon,
  SearchIcon,
  SelectIcon,
  SettingsIcon,
  SliderIcon,
  SwitchIcon,
  TabsIcon,
  TooltipIcon,
} from "./index"
import { BookIcon } from "./icons/book"
import { LayersIcon } from "./icons/layers"
import { ShieldIcon } from "./icons/shield"
import { cn } from "@/lib/utils"

interface IconShowcaseItem {
  name: string
  component: React.ComponentType<{ size?: number; isActive?: boolean }>
  description: string
}

const icons: IconShowcaseItem[] = [
  // Original set
  {
    name: "Alert Dialog",
    component: AlertDialogIcon,
    description: "Pop-rotate animation",
  },
  {
    name: "Alert",
    component: AlertIcon,
    description: "Bounce with stroke highlight",
  },
  {
    name: "Aspect Ratio",
    component: AspectRatioIcon,
    description: "Expanding corner brackets",
  },
  { name: "Avatar", component: AvatarIcon, description: "Stroke draw + scale" },
  {
    name: "Badge",
    component: BadgeIcon,
    description: "Pulsing notification dot",
  },
  {
    name: "Breadcrumb",
    component: BreadcrumbIcon,
    description: "Staggered chevron slide",
  },
  {
    name: "Button",
    component: ButtonIcon,
    description: "3D press depth effect",
  },
  {
    name: "Button Group",
    component: ButtonGroupIcon,
    description: "Center scale + outer compress",
  },
  {
    name: "Calendar",
    component: CalendarIcon,
    description: "Sequential grid fill",
  },
  { name: "Card", component: CardIcon, description: "Folded corner lift" },
  { name: "Carousel", component: CarouselIcon, description: "Sliding panels" },
  { name: "Chart", component: ChartIcon, description: "Staggered bar growth" },
  {
    name: "Checkbox",
    component: CheckboxIcon,
    description: "Checkmark draw animation",
  },
  {
    name: "Collapsible",
    component: CollapsibleIcon,
    description: "Chevron rotation",
  },
  {
    name: "Combobox",
    component: ComboboxIcon,
    description: "Dropdown bounce + search scale",
  },
  {
    name: "Command",
    component: CommandIcon,
    description: "Pulsing command symbol",
  },
  {
    name: "Context Menu",
    component: ContextMenuIcon,
    description: "Menu shift + arrow reveal",
  },
  {
    name: "Data Table",
    component: DataTableIcon,
    description: "Row highlight sweep",
  },
  // Extended set
  {
    name: "Accordion",
    component: AccordionIcon,
    description: "Panel expand + chevron rotate",
  },
  {
    name: "Dialog",
    component: DialogIcon,
    description: "Scale up + backdrop fade",
  },
  {
    name: "Input",
    component: InputIcon,
    description: "Blinking cursor animation",
  },
  {
    name: "Menu",
    component: MenuIcon,
    description: "Hamburger to X transform",
  },
  {
    name: "Notification",
    component: NotificationIcon,
    description: "Bell swing + pulsing dot",
  },
  {
    name: "Pagination",
    component: PaginationIcon,
    description: "Sliding arrows + dot scale",
  },
  {
    name: "Progress",
    component: ProgressIcon,
    description: "Expanding fill bar",
  },
  {
    name: "Radio",
    component: RadioIcon,
    description: "Dot scale from center",
  },
  {
    name: "Search",
    component: SearchIcon,
    description: "Glass rotate + handle extend",
  },
  {
    name: "Select",
    component: SelectIcon,
    description: "Chevron rotate + options reveal",
  },
  { name: "Settings", component: SettingsIcon, description: "Rotating gear" },
  {
    name: "Slider",
    component: SliderIcon,
    description: "Sliding handle + track fill",
  },
  {
    name: "Switch",
    component: SwitchIcon,
    description: "Toggle slide animation",
  },
  {
    name: "Tabs",
    component: TabsIcon,
    description: "Tab highlight + indicator slide",
  },
  {
    name: "Tooltip",
    component: TooltipIcon,
    description: "Upward bounce + fade",
  },
  {
    name: "Book",
    component: BookIcon,
    description: "Pages opening animation",
  },
  {
    name: "Layers",
    component: LayersIcon,
    description: "Layers floating/separating",
  },
  {
    name: "Shield",
    component: ShieldIcon,
    description: "Checkmark shimmy + shine",
  },
]

/**
 * Demo component showcasing all animated icons
 *
 * Use this to preview and test all icons in the system
 */
export function AnimatedIconShowcase() {
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const [iconSize, setIconSize] = useState(20)

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Animated Icon System</h1>
        <p className="text-muted-foreground">
          Motion-first sidebar icons built with Framer Motion. <strong>36 icons</strong> total.
          Hover to preview animations.
        </p>
      </div>

      {/* Controls */}
      <div className="bg-muted/50 flex items-center gap-4 rounded-lg p-4">
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium">Size:</span>
          <input
            type="range"
            min="16"
            max="32"
            value={iconSize}
            onChange={(e) => setIconSize(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-muted-foreground w-8 text-sm">{iconSize}px</span>
        </label>

        <button
          onClick={() => setActiveIcon(null)}
          className="bg-background hover:bg-muted ml-auto rounded-md px-3 py-1.5 text-sm transition-colors"
        >
          Clear Active
        </button>
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {icons.map((icon) => {
          const IconComponent = icon.component
          const isActive = activeIcon === icon.name

          return (
            <button
              key={icon.name}
              onClick={() => setActiveIcon(icon.name)}
              className={cn(
                "group relative flex items-start gap-4 rounded-lg border-2 p-4 transition-all",
                "hover:border-primary/50 hover:bg-muted/50",
                isActive ? "border-primary bg-primary/5" : "border-border"
              )}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                <IconComponent size={iconSize} isActive={isActive} />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-1 text-left">
                <h3 className="text-sm font-medium">{icon.name}</h3>
                <p className="text-muted-foreground text-xs">{icon.description}</p>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div className="bg-primary absolute top-2 right-2 h-2 w-2 rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {/* Usage Example */}
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-semibold">Usage Example</h2>
        <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
          <pre className="overflow-x-auto">
            {`import { ButtonIcon, ChartIcon } from '@/components/ui/icons/animated';

export function Sidebar() {
  const [active, setActive] = useState('button');

  return (
    <nav className="flex flex-col gap-1 p-2">
      <button onClick={() => setActive('button')}>
        <ButtonIcon isActive={active === 'button'} size={20} />
        <span>Button</span>
      </button>
      
      <button onClick={() => setActive('chart')}>
        <ChartIcon isActive={active === 'chart'} size={20} />
        <span>Chart</span>
      </button>
    </nav>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}

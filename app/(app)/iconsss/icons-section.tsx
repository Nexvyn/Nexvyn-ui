"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { IconsSearch } from "./components/icons-search"
import { IconGrid } from "./components/icon-grid"
import { IconModal } from "./components/icon-modal"
import { ExternalLink } from "lucide-react"
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
} from "@/components/ui/icons/animated"
import { BookIcon } from "@/components/ui/icons/animated/icons/book"
import { LayersIcon } from "@/components/ui/icons/animated/icons/layers"
import { ShieldIcon } from "@/components/ui/icons/animated/icons/shield"

// Define all icons with their display names (sorted alphabetically)
const allIcons = [
  { name: "Accordion", component: AccordionIcon },
  { name: "Alert", component: AlertIcon },
  { name: "Alert Dialog", component: AlertDialogIcon },
  { name: "Aspect Ratio", component: AspectRatioIcon },
  { name: "Avatar", component: AvatarIcon },
  { name: "Badge", component: BadgeIcon },
  { name: "Book", component: BookIcon },
  { name: "Breadcrumb", component: BreadcrumbIcon },
  { name: "Button", component: ButtonIcon },
  { name: "Button Group", component: ButtonGroupIcon },
  { name: "Calendar", component: CalendarIcon },
  { name: "Card", component: CardIcon },
  { name: "Carousel", component: CarouselIcon },
  { name: "Chart", component: ChartIcon },
  { name: "Checkbox", component: CheckboxIcon },
  { name: "Collapsible", component: CollapsibleIcon },
  { name: "Combobox", component: ComboboxIcon },
  { name: "Command", component: CommandIcon },
  { name: "Context Menu", component: ContextMenuIcon },
  { name: "Data Table", component: DataTableIcon },
  { name: "Dialog", component: DialogIcon },
  { name: "Input", component: InputIcon },
  { name: "Layers", component: LayersIcon },
  { name: "Menu", component: MenuIcon },
  { name: "Notification", component: NotificationIcon },
  { name: "Pagination", component: PaginationIcon },
  { name: "Progress", component: ProgressIcon },
  { name: "Radio", component: RadioIcon },
  { name: "Search", component: SearchIcon },
  { name: "Select", component: SelectIcon },
  { name: "Settings", component: SettingsIcon },
  { name: "Shield", component: ShieldIcon },
  { name: "Slider", component: SliderIcon },
  { name: "Switch", component: SwitchIcon },
  { name: "Tabs", component: TabsIcon },
  { name: "Tooltip", component: TooltipIcon },
]

export function IconsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return allIcons
    const query = searchQuery.toLowerCase()
    return allIcons.filter((icon) => icon.name.toLowerCase().includes(query))
  }, [searchQuery])

  // Get the selected icon component
  const selectedIconData = useMemo(() => {
    if (!selectedIcon) return null
    return allIcons.find((icon) => icon.name === selectedIcon) || null
  }, [selectedIcon])

  return (
    <section className="bg-background min-h-[calc(100vh-80px)] w-full rounded-3xl border border-dashed">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Beautifully crafted <span className="text-primary">animated icons</span>*
            </h1>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              an open-source collection of smooth animated icons for your projects. feel free to use
              them, share your feedback, and let&apos;s make this library awesome together
            </p>
          </div>

          {/* Badge */}
          <div className="flex items-center justify-center">
            <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs">
              Crafted with{" "}
              <Link
                href="https://motion.dev"
                target="_blank"
                className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
              >
                Motion <ExternalLink className="h-2.5 w-2.5" />
              </Link>{" "}
              &{" "}
              <Link
                href="https://lucide.dev"
                target="_blank"
                className="text-primary inline-flex items-center gap-0.5 font-medium hover:underline"
              >
                Lucide <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </span>
          </div>

          {/* Search */}
          <div className="flex justify-center pt-4">
            <IconsSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
        </header>

        {/* Icon Grid */}
        <IconGrid icons={filteredIcons} onSelectIcon={setSelectedIcon} />

        {/* Footer text */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            Click any icon to view details and copy code • {allIcons.length} icons available
          </p>
        </div>

        {/* Icon Modal */}
        <IconModal
          isOpen={selectedIcon !== null}
          onClose={() => setSelectedIcon(null)}
          iconName={selectedIcon || ""}
          icon={selectedIconData?.component || null}
        />
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  AlertIcon,
  ButtonIcon,
  CardIcon,
  ChartIcon,
  CheckboxIcon,
  DataTableIcon,
  CommandIcon,
  CalendarIcon,
  SettingsIcon,
  MenuIcon,
} from "./index"

import { BookIcon } from "./icons/book"
import { LayersIcon } from "./icons/layers"
import { ShieldIcon } from "./icons/shield"
import { AaveSidebarItem, AaveSubItem } from "./aave-sidebar-item"

interface SidebarItemData {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; isActive?: boolean }>
  badge?: number
}

const sidebarItems: SidebarItemData[] = [
  { id: "button", label: "Button", icon: ButtonIcon },
  { id: "card", label: "Card", icon: CardIcon },
  { id: "chart", label: "Chart", icon: ChartIcon },
  { id: "checkbox", label: "Checkbox", icon: CheckboxIcon },
  { id: "data-table", label: "Data Table", icon: DataTableIcon },
  { id: "calendar", label: "Calendar", icon: CalendarIcon },
  { id: "alert", label: "Alert", icon: AlertIcon, badge: 3 },
  { id: "command", label: "Command", icon: CommandIcon },
]

interface SidebarExampleProps {
  className?: string
}

/**
 * Example sidebar implementation using animated icons
 */
export function SidebarExample({ className }: SidebarExampleProps) {
  const [activeItem, setActiveItem] = useState<string>("button")

  return (
    <aside className={cn("bg-background h-full w-64 border-r", className)}>
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Components</h2>
        <p className="text-muted-foreground mt-1 text-xs">Motion-first UI library</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-2">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              )}
            >
              {/* Icon with animation */}
              <IconComponent size={18} isActive={isActive} />

              {/* Label */}
              <span className="flex-1 text-left">{item.label}</span>

              {/* Badge (if present) */}
              {item.badge && (
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                    isActive
                      ? "bg-primary-foreground text-primary"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-64 border-t p-4">
        <div className="text-muted-foreground space-y-1 text-xs">
          <p>
            Active: <span className="text-foreground font-medium">{activeItem}</span>
          </p>
          <p className="text-[10px] opacity-60">Hover over icons to see animations</p>
        </div>
      </div>
    </aside>
  )
}

/**
 * Compact sidebar variant (icon-only)
 */
export function CompactSidebarExample({ className }: SidebarExampleProps) {
  const [activeItem, setActiveItem] = useState<string>("button")

  return (
    <aside className={cn("bg-background flex h-full w-16 flex-col border-r", className)}>
      {/* Logo */}
      <div className="flex h-14 items-center justify-center border-b">
        <div className="bg-primary h-8 w-8 rounded-lg" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-2">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              title={item.label}
              className={cn(
                "relative flex aspect-square w-full items-center justify-center rounded-lg transition-colors",
                "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              )}
            >
              <IconComponent size={20} isActive={isActive} />

              {/* Badge indicator */}
              {item.badge && (
                <span className="bg-destructive absolute top-1 right-1 h-2 w-2 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

const aaveItems = [
  { id: "start", label: "Getting Started", icon: BookIcon },
  { id: "concepts", label: "Concepts", icon: LayersIcon },
  { id: "guides", label: "Guides", icon: DataTableIcon },
  { id: "security", label: "Security", icon: ShieldIcon },
  { id: "resources", label: "Resources", icon: SettingsIcon },
]

/**
 * Aave V4 Style Sidebar Replica
 * Replicates the visual style of the Aave documentation
 */
export function AaveSidebarExample({ className }: SidebarExampleProps) {
  const [activeSection, setActiveSection] = useState("start")

  return (
    <aside className={cn("flex h-full w-full border-r bg-[#fcfcfc]", className)}>
      {/* Primary Icon Navigation (Aave Style) */}
      <div className="flex h-full w-[100px] flex-col items-center gap-2 border-r bg-white py-6">
        <div className="mb-6">
          <div className="h-10 w-10 rounded-xl bg-[#6B46C1]" /> {/* Logo placeholder */}
        </div>

        {aaveItems.map((item) => (
          <AaveSidebarItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
          />
        ))}
      </div>

      {/* Secondary Sub-navigation */}
      <div className="hidden h-full w-64 bg-[#FAFAFA] px-0 pt-8 sm:block">
        <h3 className="mb-4 px-6 text-xs font-semibold tracking-wider text-[#8F8E8E] uppercase">
          {aaveItems.find((i) => i.id === activeSection)?.label || "Menu"}
        </h3>
        <div className="flex flex-col">
          <AaveSubItem label="Overview" isActive={true} />
          <AaveSubItem label="Architecture" />
          <AaveSubItem label="Smart Contracts" />
          <AaveSubItem label="Integration Guide" />
          <AaveSubItem label="FAQ" />
        </div>
      </div>
    </aside>
  )
}

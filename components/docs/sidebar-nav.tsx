"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  ChevronDown,
  BookOpen,
  LayoutGrid,
  Square,
  CreditCard,
  TextCursorInput,
  Layers,
  Wrench,
  LucideIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// Icon map for string-based icon names
const ICON_MAP: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  "layout-grid": LayoutGrid,
  square: Square,
  "credit-card": CreditCard,
  "text-cursor-input": TextCursorInput,
  layers: Layers,
  wrench: Wrench,
}

interface SidebarNavItem {
  title: string
  href?: string
  items?: SidebarNavItem[]
  iconName?: string
}

interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6 py-4">
      {items.map((item, index) => (
        <SidebarNavSection key={index} item={item} pathname={pathname} />
      ))}
    </nav>
  )
}

function SidebarNavSection({ item, pathname }: { item: SidebarNavItem; pathname: string }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const hasChildren = item.items && item.items.length > 0

  if (hasChildren) {
    return (
      <div className="flex flex-col">
        {/* Section Header - non-clickable visual anchor */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex w-full items-center justify-between px-3 py-2",
            "text-[11px] font-semibold tracking-wider uppercase",
            "text-muted-foreground/70 hover:text-muted-foreground",
            "transition-colors duration-200"
          )}
        >
          <span>{item.title}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ChevronDown className="text-muted-foreground/50 size-3.5" />
          </motion.div>
        </button>

        {/* Children with animation */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-1 flex flex-col gap-0.5">
                {item.items?.map((subItem, index) => (
                  <SidebarNavLink key={index} item={subItem} pathname={pathname} level={1} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return <SidebarNavLink item={item} pathname={pathname} level={0} />
}

function SidebarNavLink({
  item,
  pathname,
  level = 0,
}: {
  item: SidebarNavItem
  pathname: string
  level?: number
}) {
  const isActive = item.href === pathname
  const hasChildren = item.items && item.items.length > 0
  const [isExpanded, setIsExpanded] = useState(true)

  // Get icon from map
  const IconComponent = item.iconName ? ICON_MAP[item.iconName] : null

  // Indentation based on level - using margin only, no borders
  const marginLeft = level === 0 ? "ml-0" : level === 1 ? "ml-3" : "ml-6"

  if (hasChildren) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex w-full items-center justify-between px-3 py-1.5",
            marginLeft,
            "text-sm",
            "text-muted-foreground hover:text-foreground/80",
            "transition-colors duration-200"
          )}
        >
          <span className="flex items-center gap-2">
            {/* {IconComponent && <IconComponent className="size-4 shrink-0" />} */}
            {item.title}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ChevronDown className="text-muted-foreground/50 size-3.5" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-0.5">
                {item.items?.map((subItem, index) => (
                  <SidebarNavLink
                    key={index}
                    item={subItem}
                    pathname={pathname}
                    level={level + 1}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (!item.href) {
    return (
      <span
        className={cn(
          "text-muted-foreground/60 flex items-center gap-2 px-3 py-1.5 text-sm",
          marginLeft
        )}
      >
        {/* {IconComponent && <IconComponent className="size-4 shrink-0" />} */}
        {item.title}
      </span>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-sm",
        marginLeft,
        "transition-colors duration-200",
        isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground/80"
      )}
    >
      {/* {IconComponent && <IconComponent className="size-4 shrink-0" />} */}
      <span>{item.title}</span>
    </Link>
  )
}

export type { SidebarNavItem }

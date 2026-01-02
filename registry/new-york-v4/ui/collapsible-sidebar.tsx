"use client"

import { useState, useEffect, useCallback } from "react"
import { ScrollArea } from "@/components/ui/core/scroll-area"
import { ScrollMaskContainer } from "@/components/ui/our/common/scroll-mask-container"
import { DocsSidebarNav, type SidebarNavItem } from "@/components/ui/our/docs/sidebar-nav"
import { cn } from "@/lib/utils"
import { Menu, SidebarClose, SidebarOpen, X } from "lucide-react"
import { Button } from "@/components/ui/core/button"

interface CollapsibleSidebarProps {
  items: SidebarNavItem[]
}

export function CollapsibleSidebar({ items }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B to toggle desktop sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      }
      // Escape to close mobile sidebar
      if (e.key === "Escape" && isMobileOpen) {
        closeMobileSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, isMobileOpen, closeMobileSidebar])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleMobileSidebar}
        className={cn(
          "fixed top-16 left-4 z-50 flex lg:hidden",
          "size-10 items-center justify-center rounded-md",
          "border-border bg-background/95 border backdrop-blur-sm",
          "text-foreground hover:bg-muted",
          "shadow-sm transition-all duration-200"
        )}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[100] w-[280px] lg:hidden",
          "bg-background border-border border-r",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile sidebar header */}
        <div className="border-border bg-background relative z-10 flex items-center justify-between border-b p-4">
          <span className="text-sm font-semibold">Navigation</span>
          <button
            onClick={closeMobileSidebar}
            className="hover:bg-muted text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile sidebar content */}
        <ScrollArea className="h-[calc(100vh-57px)] px-4 py-4">
          {/* Main Navigation Links */}
          <div className="border-border mb-6 border-b pb-4">
            <a
              href="/docs"
              className="text-foreground hover:text-primary block py-2 text-sm font-medium transition-colors"
            >
              Docs
            </a>
            <a
              href="/docs/components"
              className="text-foreground hover:text-primary block py-2 text-sm font-medium transition-colors"
            >
              Components
            </a>
            <a
              href="/sponsors"
              className="text-foreground hover:text-primary block py-2 text-sm font-medium transition-colors"
            >
              Sponsors
            </a>
          </div>

          {/* Docs Navigation */}
          <DocsSidebarNav items={items} />
        </ScrollArea>
      </aside>

      {/* Desktop toggle button */}
      <Button
        variant={"ghost"}
        onClick={toggleSidebar}
        className={cn(
          "absolute top-0 left-4 z-40 hidden lg:flex",
          "size-8 items-center justify-center",
          "text-muted-foreground hover:text-foreground",
          "transition-all duration-200",
          isOpen && "left-[230px]"
        )}
        title={isOpen ? "Hide sidebar (Ctrl+B)" : "Show sidebar (Ctrl+B)"}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {isOpen ? <SidebarOpen /> : <SidebarClose />}
      </Button>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "z-30 hidden h-full lg:block",
          "border-border/40 bg-background border-r",
          "overflow-hidden transition-all duration-200 ease-out",
          isOpen ? "w-[260px]" : "w-0 border-r-0"
        )}
      >
        <div
          className={cn(
            "h-full w-[260px]",
            "transition-opacity duration-150",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <ScrollMaskContainer className="h-full px-2">
            <DocsSidebarNav items={items} />
          </ScrollMaskContainer>
        </div>
      </aside>
    </>
  )
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsSidebarNav, type SidebarNavItem } from "@/components/sidebar-nav";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";

interface CollapsibleSidebarProps {
  items: SidebarNavItem[];
}

export function CollapsibleSidebar({ items }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B to toggle desktop sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
      // Escape to close mobile sidebar
      if (e.key === "Escape" && isMobileOpen) {
        closeMobileSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar, isMobileOpen, closeMobileSidebar]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleMobileSidebar}
        className={cn(
          "fixed left-4 top-20 z-50 flex lg:hidden",
          "size-10 items-center justify-center rounded-md",
          "border border-border bg-background/95 backdrop-blur-sm",
          "text-foreground hover:bg-muted",
          "transition-all duration-200 shadow-sm"
        )}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden",
          "bg-background border-r border-border",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-semibold text-sm">Navigation</span>
          <button
            onClick={closeMobileSidebar}
            className="size-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile sidebar content */}
        <ScrollArea className="h-[calc(100vh-57px)] px-4 py-4">
          <DocsSidebarNav items={items} />
        </ScrollArea>
      </aside>

      {/* Desktop toggle button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          "absolute left-4 top-4 z-40 hidden lg:flex",
          "size-8 items-center justify-center rounded-md",
          "border border-border bg-background/80 backdrop-blur-sm",
          "text-muted-foreground hover:text-foreground hover:bg-muted",
          "transition-all duration-200",
          isOpen && "left-[310px] "
        )}
        title={isOpen ? "Hide sidebar (Ctrl+B)" : "Show sidebar (Ctrl+B)"}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.245 2.5H14.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5H6.245V2.5ZM4.995 2.5H1.5V12.5C1.5 13.0523 1.94772 13.5 2.5 13.5H4.995V2.5ZM0 1H1.5H14.5H16V2.5V12.5C16 13.8807 14.8807 15 13.5 15H2.5C1.11929 15 0 13.8807 0 12.5V2.5V1Z"
          />
        </svg>
      </button>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "sticky top-0 z-30 hidden h-screen lg:block py-4 border-r border-border/50",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "w-[280px]" : "w-0 border-r-0"
        )}
      >
        <div
          className={cn(
            "backdrop-blur-sm h-full relative w-[280px]",
            "transition-opacity duration-200",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <ScrollArea className="h-full px-4">
            <DocsSidebarNav items={items} />
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}

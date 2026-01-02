"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsSidebarNav, type SidebarNavItem } from "@/components/sidebar-nav";
import { cn } from "@/lib/cn";
import { Menu, SidebarClose, SidebarOpen, X } from "lucide-react";
import { Button } from "./ui/button";

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
      <Button
        variant={"ghost"}
        onClick={toggleSidebar}
        className={cn(
          "absolute left-4 top-0 z-40 hidden lg:flex",
          "size-8 items-center justify-center ",
          "text-muted-foreground hover:text-foreground ",
          "transition-all duration-200",
          isOpen && "left-[230px] "
        )}
        title={isOpen ? "Hide sidebar (Ctrl+B)" : "Show sidebar (Ctrl+B)"}
        aria-label={isOpen ? "Hide sidebar" : "Show sidebar"}
      >
        {isOpen ? <SidebarOpen /> : <SidebarClose />}
      </Button>

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

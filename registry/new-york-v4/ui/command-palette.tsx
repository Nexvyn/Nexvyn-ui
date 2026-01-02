"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Book, FileCode, Home, Palette, LayoutGrid, Heart, Search, Command } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/core/command"
import { Button } from "@/components/ui/core/button"

// Page navigation items
const PAGES = [
  { name: "Home", href: "/", icon: Home },
  { name: "Documentation", href: "/docs", icon: Book },
  { name: "Icons", href: "/icons", icon: Palette },
  { name: "Sponsors", href: "/sponsors", icon: Heart },
]

// Component items - add your components here
const COMPONENTS = [
  { name: "Button", href: "/docs/components/button" },
  { name: "Card", href: "/docs/components/card" },
  { name: "Input", href: "/docs/components/input" },
  { name: "Dialog", href: "/docs/components/dialog" },
  { name: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
  { name: "Toast", href: "/docs/components/toast" },
  { name: "Tabs", href: "/docs/components/tabs" },
  { name: "Avatar", href: "/docs/components/avatar" },
]

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [isMac, setIsMac] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const router = useRouter()

  // Toggle on ⌘K or Ctrl+K
  React.useEffect(() => {
    setIsMac(typeof window !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform))

    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)
    setSearch("")
    router.push(href)
  }

  return (
    <>
      <Button variant="ghost" className="btn-3d gap-2" onClick={() => setOpen(true)}>
        <Search className="size-4" />
        <span className="text-muted-foreground hidden text-sm sm:inline">Search...</span>
        <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none sm:inline-flex">
          {isMac ? (
            <>
              <Command className="size-3" />K
            </>
          ) : (
            <>Ctrl+K</>
          )}
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search pages, components..."
          value={search}
          onValueChange={setSearch}
        />

        <CommandList>
          <CommandEmpty>No results found for "{search}"</CommandEmpty>

          {/* Pages */}
          <CommandGroup heading="Pages">
            {PAGES.map((page) => (
              <CommandItem
                key={page.href}
                value={page.name}
                onSelect={() => handleSelect(page.href)}
                className="cursor-pointer"
              >
                <page.icon className="mr-2 size-4" />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Components */}
          <CommandGroup heading="Components">
            {COMPONENTS.map((comp) => (
              <CommandItem
                key={comp.href}
                value={comp.name}
                onSelect={() => handleSelect(comp.href)}
                className="cursor-pointer"
              >
                <LayoutGrid className="mr-2 size-4" />
                <span>{comp.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

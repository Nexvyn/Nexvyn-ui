"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Book, FileCode, Home, Palette, LayoutGrid, Heart, Search, Command as CommandIcon, MessageSquarePlus } from "lucide-react"
import { submitFeedback } from "@/app/actions/submit-feedback"
import { toast } from "sonner"
import { useCommandPalette } from "./command-palette-context"
import { useOs } from "@/hooks/use-os"
import { FeedbackForm } from "@/components/ui/our/home/contact-form"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/core/command"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/core/dialog"
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
  const { open, setOpen, page, setPage } = useCommandPalette()
  const { isMac } = useOs()
  const [search, setSearch] = React.useState("")
  const [feedback, setFeedback] = React.useState("")
  const router = useRouter()

  // Toggle on ⌘K or Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen, open])

  // Reset state when closing
  React.useEffect(() => {
    if (!open) {
      // Delay resetting page to allow exit animation to finish if needed, 
      // but for now immediate reset is fine or we can leave it to keep state
      const t = setTimeout(() => {
        setPage("main")
        setSearch("")
        setFeedback("")
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open, setPage])

  const handleSelect = (href: string) => {
    setOpen(false)
    setSearch("")
    router.push(href)
  }

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleFeedbackSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    const result = await submitFeedback(feedback)
    setIsSubmitting(false)

    if (result.success) {
      toast.success("Feedback submitted! Thank you.")
      setOpen(false)
      setPage("main")
      setFeedback("")
    } else {
      toast.error(result.error || "Something went wrong.")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (page === "feedback") {
      e.stopPropagation()

      if (e.key === "Backspace" && feedback === "") {
        e.preventDefault()
        setPage("main")
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleFeedbackSubmit(e)
      }
    }
  }

  return (
    <>
      <Button variant="ghost" className="btn-3d gap-2" onClick={() => setOpen(true)}>
        <Search className="size-4" />
        <span className="text-muted-foreground hidden text-sm sm:inline">Search...</span>
        <kbd className="bg-muted text-muted-foreground pointer-events-none hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none sm:inline-flex">
          {isMac ? (
            <>
              <CommandIcon className="size-3" />K
            </>
          ) : (
            <>Ctrl+K</>
          )}
        </kbd>
      </Button>



      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-[425px]">
          {page === "main" ? (
            <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
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
                      className="cursor-pointer group"
                    >
                      <page.icon className="mr-2 size-4 transition-transform duration-200 group-data-[selected=true]:scale-110 group-data-[selected=true]:text-foreground" />
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
                      className="cursor-pointer group"
                    >
                      <LayoutGrid className="mr-2 size-4 transition-transform duration-200 group-data-[selected=true]:scale-110 group-data-[selected=true]:text-foreground" />
                      <span>{comp.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="General">
                  <CommandItem
                    onSelect={() => {
                      setPage("feedback")
                      setSearch("")
                    }}
                    className="cursor-pointer group"
                  >
                    <MessageSquarePlus className="mr-2 size-4 transition-transform duration-200 group-data-[selected=true]:scale-110 group-data-[selected=true]:text-foreground" />
                    <span>Feedback</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ) : (
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="bg-muted px-1.5 py-0.5 rounded text-xs">Esc</span> to close
              </div>
              <FeedbackForm
                onSuccess={() => {
                  setPage("main")
                  setOpen(false)
                }}
                autoFocus
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

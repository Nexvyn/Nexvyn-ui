import Link from "next/link"
import { cn } from "@/lib/utils"

// Hardcoded list of components - more reliable than parsing page tree
const componentsList = [
  {
    name: "Button",
    href: "/docs/components/button",
    description: "Interactive button with multiple variants",
  },
  {
    name: "Card",
    href: "/docs/components/card",
    description: "Container component for content grouping",
  },
  {
    name: "Cards Stack",
    href: "/docs/components/cards",
    description: "Animated card stack with GSAP",
  },
  {
    name: "Input",
    href: "/docs/components/input",
    description: "Form input with validation states",
  },
  {
    name: "Parallax",
    href: "/docs/components/parallax",
    description: "Parallax scrolling effects",
  },
]

export function ComponentsList() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {componentsList.map((component) => (
        <Link
          key={component.href}
          href={component.href}
          className={cn(
            "group flex flex-col rounded-lg p-4",
            "border-border/50 bg-card border",
            "hover:border-primary/30 hover:bg-muted/30",
            "transition-all duration-200"
          )}
        >
          <span className="text-foreground group-hover:text-primary font-medium transition-colors">
            {component.name}
          </span>
          <span className="text-muted-foreground mt-1 text-sm">{component.description}</span>
        </Link>
      ))}
    </div>
  )
}

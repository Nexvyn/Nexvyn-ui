"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComponentCard {
  title: string
  description: string
  href: string
  preview?: React.ReactNode
}

const featuredComponents: ComponentCard[] = [
  {
    title: "Button",
    description: "Interactive button component with multiple variants and states.",
    href: "/docs/components/button",
  },
  {
    title: "Card Stack",
    description: "Animated card stack with smooth GSAP-powered transitions.",
    href: "/docs/components/cards",
  },
  {
    title: "Parallax",
    description: "Create depth and motion with parallax scrolling effects.",
    href: "/docs/components/parallax",
  },
  {
    title: "Input",
    description: "Form input components with validation and styling options.",
    href: "/docs/components/input",
  },
]

export function FeaturedComponents() {
  return (
    <section className="bg-background w-full overflow-hidden rounded-3xl border border-dashed">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Featured Components
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Explore our collection of beautifully crafted, production-ready components.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {featuredComponents.map((component) => (
            <Link
              key={component.title}
              href={component.href}
              className={cn(
                "group relative flex flex-col rounded-xl p-6",
                "bg-card border-border/50 border",
                "hover:border-primary/30 hover:bg-muted/30",
                "transition-all duration-200"
              )}
            >
              {/* Preview Area */}
              <div className="bg-muted/50 border-border/30 mb-4 flex h-32 items-center justify-center rounded-lg border">
                <span className="text-muted-foreground text-sm">Preview</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="group-hover:text-primary mb-2 text-lg font-medium transition-colors">
                  {component.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {component.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-muted-foreground group-hover:text-primary mt-4 flex items-center text-sm transition-colors">
                <span>View component</span>
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/docs/components"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-6 py-3",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
              "font-medium"
            )}
          >
            View All Components
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

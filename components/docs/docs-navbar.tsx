"use client"

import Link from "next/link"
import { LightDarkMode } from "@/components/ui/icons/animated/light-dark-mode"
import { Button } from "@/components/ui/core/button"
import { CommandPalette } from "@/components/ui/our/common/command-palette"
import { GithubIcon } from "@/components/ui/icons/animated/github"
import { StarsCount } from "@/components/ui/our/home/stars-count"
import { SequentialLogo } from "@/components/ui/our/home/nexvyn-logo"
import { cn } from "@/lib/utils"

export function DocsNavbar() {
  return (
    <nav
      className={cn(
        // Sticky positioning with high z-index
        "z-50 w-full",
        // // Solid opaque background - no glassmorphism
        // "bg-background",
        // Fixed dimensions to match main navbar
        "h-10 sm:p-2",
        // Matching landing page style
        "noise-overlay font-Inter Tight rounded-xl",
        "flex items-center justify-between"
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <div className="font-sans-serif flex items-center text-xl">
          <SequentialLogo size={44} className="text-foreground" />
          <span className="-ml-1 inline-flex items-center gap-1.5">
            <span className="font-inktopia text-lg font-semibold tracking-tight">nexvyn/ui</span>
            <span className="bg-primary/10 text-primary border-primary/20 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
              beta
            </span>
          </span>
        </div>
      </Link>

      {/* Navigation Links - matching landing page style */}
      <div className="hidden gap-1 sm:gap-2 md:flex">
        <Button
          variant="ghost"
          className="bg-background/30 border-border/50 hover:bg-background/50 border backdrop-blur-sm transition-shadow hover:shadow-md h-8 px-2 sm:h-9 sm:px-4"
          asChild
        >
          <Link href="/docs">Docs</Link>
        </Button>
        <Button
          variant="ghost"
          className="bg-background/30 border-border/50 hover:bg-background/50 border backdrop-blur-sm transition-shadow hover:shadow-md h-8 px-2 sm:h-9 sm:px-4"
          asChild
        >
          <Link href="/icons">Icons</Link>
        </Button>
        <Button
          variant="ghost"
          className="bg-background/30 border-border/50 hover:bg-background/50 border backdrop-blur-sm transition-shadow hover:shadow-md h-8 px-2 sm:h-9 sm:px-4"
          asChild
        >
          <Link href="/sponsors">Sponsors</Link>
        </Button>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <CommandPalette />
        <Link href="https://github.com/Nexvyn/Nexvyn-ui" target="_blank">
          <Button variant="ghost" aria-label="GitHub" className="btn-3d">
            <GithubIcon />
            <StarsCount />
          </Button>
        </Link>
        <LightDarkMode />
      </div>
    </nav>
  )
}

"use client"

import { LightDarkMode } from "@/components/ui/icons/animated/light-dark-mode"
import { Button } from "@/components/ui/core/button"
import { CommandPalette } from "@/components/ui/our/common/command-palette"
import Link from "next/link"
import { GithubIcon } from "@/components/ui/icons/animated/github"
import { StarsCount } from "@/components/ui/our/home/stars-count"
import { SequentialLogo } from "@/components/ui/our/home/nexvyn-logo"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/core/dropdown-menu"

export function Navbar() {
  return (
    <header
      className="noise-overlay font-Inter Tight relative z-50 flex h-10 w-full items-center justify-between rounded-xl sm:p-2"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <Link href={"/"} className="flex items-center">
        <SequentialLogo size={44} className="text-foreground" />
        <span className="-ml-1 flex items-center gap-1.5">
          <span className="font-inktopia text-lg font-semibold tracking-tight">nexvyn/ui</span>
          <span className="bg-primary/10 text-primary border-primary/20 rounded-sm border px-1 py-0.5 text-[8px] font-semibold tracking-wide uppercase sm:px-1.5 sm:text-[10px]">
            beta
          </span>
        </span>
      </Link>

      <nav className="flex items-center gap-1 sm:gap-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 sm:gap-2">
          <Button
            variant={"ghost"}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 h-8 px-3 sm:h-9 sm:px-4 transition-colors"
          >
            <Link href={"/docs"}>Docs</Link>
          </Button>
          <Button
            variant={"ghost"}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 h-8 px-3 sm:h-9 sm:px-4 transition-colors"
          >
            <Link href={"/icons/"}>Icons</Link>
          </Button>
          <Button
            variant={"ghost"}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/50 h-8 px-3 sm:h-9 sm:px-4 transition-colors"
          >
            <Link href={"/sponsors"}>Sponsors</Link>
          </Button>
        </div>

        {/* Mobile Navigation (3 dots) */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <Link href="/docs" className="w-full cursor-pointer">Docs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/icons/" className="w-full cursor-pointer">Icons</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sponsors" className="w-full cursor-pointer">Sponsors</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="flex items-center gap-1 sm:gap-2">
        <CommandPalette />
        <Link href={"https://github.com/Nexvyn/Nexvyn-ui"} target="_blank">
          <Button variant="ghost" aria-label="GitHub" className="btn-3d">
            <GithubIcon />
            <StarsCount />
          </Button>
        </Link>
        <LightDarkMode />
      </div>
    </header >
  )
}

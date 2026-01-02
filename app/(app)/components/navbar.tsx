"use client"

import { LightDarkMode } from "@/components/ui/our/common/light-dark-mode"
import { Button } from "@/components/ui/core/button"
import { CommandPalette } from "@/components/ui/our/common/command-palette"
import Link from "next/link"
import { GithubIcon } from "@/components/ui/our/common/github"
import { StarsCount } from "@/components/ui/our/home/stars-count"
import { SequentialLogo } from "@/components/ui/our/home/nexvyn-logo"

export function Navbar() {
  return (
    <header
      className="noise-overlay font-Inter Tight z-50 flex h-10 w-full items-center justify-between rounded-xl sm:p-2"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <Link href={"/"} className="flex items-center">
        <SequentialLogo size={44} className="text-foreground" />
        <span className="-ml-1 hidden items-center gap-1.5 sm:inline-flex">
          <span className="font-inktopia text-lg font-semibold tracking-tight">nexvyn/ui</span>
          <span className="bg-primary/10 text-primary border-primary/20 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
            beta
          </span>
        </span>
      </Link>

      {/* Centered Navigation */}
      <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-2 md:flex">
        <Button
          variant={"ghost"}
          className="bg-background/30 border-border/50 hover:bg-background/50 border backdrop-blur-sm transition-shadow hover:shadow-md"
        >
          <Link href={"/docs"}>Docs</Link>
        </Button>

        {/* <Button
          variant={"ghost"}
          className="bg-background/30 backdrop-blur-sm border border-border/50 hover:bg-background/50 hover:shadow-md transition-shadow"
        >
          <Link href={"/docs/components/"}>Components</Link>
        </Button> */}
        <Button
          variant={"ghost"}
          className="bg-background/30 border-border/50 hover:bg-background/50 border backdrop-blur-sm transition-shadow hover:shadow-md"
        >
          <Link href={"/icons/"}>Icons</Link>
        </Button>
        <Button
          variant={"ghost"}
          className="bg-background/30 border-border/50 hover:bg-background/50 border backdrop-blur-sm transition-shadow hover:shadow-md"
        >
          <Link href={"/sponsors"}>Sponsors</Link>
        </Button>
        {/* <Button
          variant={"ghost"}
          className="bg-background/30 backdrop-blur-sm border border-border/50 hover:bg-background/50 hover:shadow-md transition-shadow"
        >
          Blocks
        </Button> */}
      </nav>
      <div className="flex items-center gap-2">
        <CommandPalette />
        <Link href={"https://github.com/Nexvyn/Nexvyn-ui"} target="_blank">
          <Button variant="ghost" aria-label="GitHub" className="btn-3d">
            <GithubIcon />
            <StarsCount />
          </Button>
        </Link>
        <LightDarkMode />
      </div>
    </header>
  )
}

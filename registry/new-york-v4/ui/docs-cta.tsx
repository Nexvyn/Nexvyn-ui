"use client"

import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/core/button"

export function DocsCta({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group border-border/70 bg-surface text-surface-foreground relative flex flex-col gap-2 rounded-lg border p-5 text-sm [&_svg]:size-3.5",
        className
      )}
    >
      <div className="text-base leading-tight font-semibold text-balance group-hover:underline">
        Support Pixel Perfect
      </div>
      <div className="text-muted-foreground">Star us on GitHub to show your support!</div>
      <Button
        size="sm"
        variant="default"
        className="mt-2 flex w-full items-center justify-between rounded !text-[13.5px]"
      >
        Star on GitHub
        <Star />
      </Button>
      <a
        href="https://github.com/Nexvyn/pixel-perfect"
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0"
      >
        <span className="sr-only">Star on GitHub</span>
      </a>
    </div>
  )
}

"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/core/collapsible"

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-4", className)}
      {...props}
    >
      <CollapsibleContent
        forceMount
        className={cn(
          "relative overflow-hidden [&>figure]:mt-0 [&>figure]:md:!mx-0",
          !isOpened && "max-h-48"
        )}
      >
        {children}
      </CollapsibleContent>

      {/* Bottom expand/collapse button with gradient fade */}
      {!isOpened && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white dark:from-zinc-950" />
      )}
      <CollapsibleTrigger className="relative z-10 flex w-full items-center justify-center py-2">
        <div className="bg-background hover:bg-muted/50 text-muted-foreground flex h-8 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors">
          {isOpened ? "Collapse" : "Expand"}
        </div>
      </CollapsibleTrigger>
    </Collapsible>
  )
}

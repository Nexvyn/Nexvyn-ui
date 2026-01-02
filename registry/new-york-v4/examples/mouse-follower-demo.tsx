"use client"

import MouseFollower from "@/registry/new-york-v4/ui/mouse-follower"

export default function MouseFollowerDemo() {
  return (
    <div className="relative min-h-[400px] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <p className="text-muted-foreground px-4 text-center text-sm">
          Move your mouse around this area to see the image trail effect
        </p>
      </div>
      <div className="absolute inset-0">
        <MouseFollower />
      </div>
    </div>
  )
}

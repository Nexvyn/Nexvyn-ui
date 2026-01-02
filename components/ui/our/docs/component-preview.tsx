import { Suspense } from "react"
import Image from "next/image"

import { ComponentPreviewTabs } from "@/components/ui/our/docs/component-preview-tabs"
import { ComponentSource } from "@/components/ui/our/docs/component-source"
import { Index } from "@/registry/__index__"

// Map component names to their full-page playground URLs
const EXPAND_URLS: Record<string, string> = {
  "cards-demo": "/playground/cards",
  "parallax-demo": "/playground/parallax",
}

// Loading skeleton for lazy components
function ComponentSkeleton() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <div className="flex animate-pulse flex-col items-center gap-2">
        <div className="bg-muted h-8 w-8 rounded-full" />
        <div className="bg-muted h-4 w-24 rounded" />
      </div>
    </div>
  )
}

export function ComponentPreview({
  name,
  type,
  className,
  align = "center",
  hideCode = false,
  replayable = false,
  expandUrl,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  replayable?: boolean
  expandUrl?: string
}) {
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  if (type === "block") {
    return (
      <div className="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border md:-mx-4">
        <Image
          src={`/r/styles/new-york-v4/${name}-light.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
        />
        <Image
          src={`/r/styles/new-york-v4/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="bg-background absolute top-0 left-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
        />
        <div className="bg-background absolute inset-0 hidden w-[1600px] md:block">
          <iframe src={`/view/${name}`} className="size-full" />
        </div>
      </div>
    )
  }

  // Use provided expandUrl or look up from mapping
  const finalExpandUrl = expandUrl || EXPAND_URLS[name]

  return (
    <ComponentPreviewTabs
      className={className}
      align={align}
      hideCode={hideCode}
      replayable={replayable}
      expandUrl={finalExpandUrl}
      componentName={name}
      component={
        <Suspense fallback={<ComponentSkeleton />}>
          <Component />
        </Suspense>
      }
      source={<ComponentSource name={name} collapsible={false} />}
      {...props}
    />
  )
}

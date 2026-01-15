"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon, TerminalIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { useConfig } from "@/hooks/use-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/core/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/core/tooltip"

// Package Manager Icons
const NpmIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" fill="#D40001" />
      <path
        fill="#FFF"
        d="M16.7179487,7.92840493 L12.2051282,7.92840493 L12.2051282,20.2494172 L4,20.2494172 L4,3 L12.2051282,3 L20,3 L20,7.92840493 L20,20.2494172 L16.7179487,20.2494172 L16.7179487,7.92840493 Z"
      />
    </g>
  </svg>
)

const PnpmIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
  </svg>
)

const YarnIcon = () => (
  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm4.283 10.283c-.117 1.05-.633 2.317-1.317 3.667-.85 1.683-1.95 3.05-3.05 4.233-.267.283-.533.55-.8.783a.527.527 0 0 1-.35.15c-.15 0-.267-.067-.367-.183l-.283-.35c-.75-.967-1.317-1.883-1.717-2.75-.35-.767-.533-1.45-.533-2.05 0-.283.05-.533.15-.767.1-.233.25-.433.433-.6.183-.167.4-.283.633-.35.233-.067.483-.1.75-.1.233 0 .45.033.65.1.2.067.383.167.55.3.167.133.3.3.417.5.117.2.183.433.217.7.033.267.017.55-.05.85-.067.3-.167.617-.3.95l-.417 1.05c-.05.133-.083.267-.1.4 0 .15.033.283.1.4.067.117.167.2.3.25.133.05.3.067.5.05.2-.017.433-.083.7-.2.267-.117.567-.283.9-.5.333-.217.7-.5 1.1-.85.4-.35.817-.767 1.25-1.25.433-.483.867-1.033 1.3-1.65.433-.617.85-1.3 1.25-2.05.4-.75.75-1.55 1.05-2.4.3-.85.533-1.75.7-2.7.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35.017-.117.033-.233.05-.35z" />
  </svg>
)

const BunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-4"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.966 22.566c6.609 0 11.966-4.326 11.966-9.661 0-3.308-2.051-6.23-5.204-7.963-1.283-.713-2.291-1.353-3.13-1.885-1.58-1.004-2.555-1.623-3.632-1.623-1.094 0-2.327.783-3.955 1.816a49.78 49.78 0 0 1-2.808 1.692C2.051 6.675 0 9.597 0 12.905c0 5.335 5.357 9.66 11.966 9.66Zm-1.397-17.83a5.885 5.885 0 0 0 .497-2.403c0-.144.201-.186.229-.028.656 2.775-.9 4.15-2.051 4.61-.124.048-.199-.12-.103-.208a5.748 5.748 0 0 0 1.428-1.971Zm2.052-.102a5.795 5.795 0 0 0-.78-2.3v-.015c-.068-.123.086-.263.185-.172 1.956 2.105 1.303 4.055.554 5.037-.082.102-.229-.003-.188-.126a5.837 5.837 0 0 0 .229-2.424Zm1.771-.559a5.708 5.708 0 0 0-1.607-1.801V2.26c-.112-.085-.024-.274.113-.218 2.588 1.084 2.766 3.171 2.452 4.395a.116.116 0 0 1-.048.071.11.11 0 0 1-.153-.026.118.118 0 0 1-.022-.083 5.864 5.864 0 0 0-.735-2.324Zm-5.072.559c-.616.544-1.279.758-2.058.997-.116 0-.194-.078-.155-.18 1.747-.907 2.369-1.645 2.99-2.771 0 0 .155-.117.188.085 0 .303-.348 1.325-.965 1.869Zm4.931 11.205a2.949 2.949 0 0 1-.935 1.549 2.16 2.16 0 0 1-1.282.618 2.167 2.167 0 0 1-1.323-.618 2.95 2.95 0 0 1-.923-1.549.243.243 0 0 1 .064-.197.23.23 0 0 1 .192-.069h3.954a.226.226 0 0 1 .19.07.239.239 0 0 1 .063.196Zm-5.443-2.17a1.85 1.85 0 0 1-2.377-.244 1.969 1.969 0 0 1-.233-2.44c.207-.318.502-.565.846-.711a1.84 1.84 0 0 1 1.089-.11c.365.075.701.26.964.53.264.27.443.616.515.99a1.98 1.98 0 0 1-.108 1.118 1.923 1.923 0 0 1-.696.866Zm8.471.005a1.849 1.849 0 0 1-2.374-.252 1.956 1.956 0 0 1-.546-1.362c0-.383.11-.758.319-1.076.207-.318.502-.566.847-.711a1.84 1.84 0 0 1 1.09-.108c.366.076.702.261.965.533s.44.617.512.993a1.98 1.98 0 0 1-.113 1.118 1.922 1.922 0 0 1-.7.865Z" />
  </svg>
)

const packageManagerIcons: Record<string, React.ComponentType> = {
  npm: NpmIcon,
  pnpm: PnpmIcon,
  yarn: YarnIcon,
  bun: BunIcon,
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const packageManager = config.packageManager || "pnpm"
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    let slug = ""
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean)
      slug = parts[parts.length - 1] || ""
      slug = slug.toLowerCase().replace(/[^a-z0-9]/g, "_")
    }
    const goalName = `copied_command_${slug}`.substring(0, 32)

    navigator.clipboard.writeText(command)
    if (typeof window !== "undefined" && window.datafast) {
      window.datafast(goalName)
    }
    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="border-border/50 bg-background relative max-w-full min-w-0 overflow-hidden rounded-lg border">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          })
        }}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-4 py-2">
          <TabsList className="bg-muted/50 h-8 rounded-md p-1">
            {Object.entries(tabs).map(([key]) => {
              const IconComponent = packageManagerIcons[key]
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-background inline-flex h-6 items-center gap-1.5 rounded-sm px-3 text-xs font-medium data-[state=active]:shadow-sm"
                >
                  {IconComponent && <IconComponent />}
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar max-w-full min-w-0 overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent
                key={key}
                value={key}
                className="bg-muted/30 mt-0 max-w-full min-w-0 rounded-b-lg border-0 px-4 py-3.5"
              >
                <pre className="scrollbar-none min-w-0 overflow-x-auto">
                  <code
                    className="relative font-mono text-sm leading-none whitespace-pre-wrap"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            data-slot="copy-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground/70 hover:text-foreground/70 hover:bg-muted absolute top-3 right-3 z-10 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-70 transition-colors outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={copyCommand}
          >
            <span className="sr-only">Copy</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={hasCopied ? "check" : "copy"}
                data-slot="copy-button-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>{hasCopied ? "Copied" : "Copy to Clipboard"}</TooltipContent>
      </Tooltip>
    </div>
  )
}

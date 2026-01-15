"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { RotateCcw, Maximize2, X, Minimize2, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/core/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/core/tabs"
import { V0Icon, TerminalIcon } from "@/components/ui/icons/animated/action-icons"

// Fullscreen Modal Component - Uses iframe for scroll-triggered components
function FullscreenModal({
  isOpen,
  onClose,
  iframeSrc,
}: {
  isOpen: boolean
  onClose: () => void
  iframeSrc?: string
}) {
  const [mounted, setMounted] = React.useState(false)
  const [isBrowserFullscreen, setIsBrowserFullscreen] = React.useState(false)
  const modalRef = React.useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isBrowserFullscreen) {
          document.exitFullscreen()
        } else {
          onClose()
        }
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose, isBrowserFullscreen])

  // Handle fullscreen change
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleBrowserFullscreen = async () => {
    if (!modalRef.current) return

    if (isBrowserFullscreen) {
      await document.exitFullscreen()
    } else {
      await modalRef.current.requestFullscreen()
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted || !iframeSrc) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative overflow-hidden rounded-2xl border bg-background shadow-2xl",
              isBrowserFullscreen ? "h-screen w-screen max-h-screen max-w-none rounded-none" : "h-full w-full max-w-6xl max-h-[85vh]"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Control Buttons */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-foreground" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground" />
                )}
              </button>

              {/* Browser Fullscreen Toggle */}
              <button
                onClick={toggleBrowserFullscreen}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted"
                aria-label={isBrowserFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isBrowserFullscreen ? (
                  <Minimize2 className="h-5 w-5 text-foreground" />
                ) : (
                  <Maximize2 className="h-5 w-5 text-foreground" />
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm transition-colors hover:bg-muted"
                aria-label="Close fullscreen"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>

            {/* Iframe for full component with its own scroll context */}
            <iframe
              src={iframeSrc}
              className="h-full w-full border-0 bg-background scrollbar-none"
              title="Component Preview"
              style={{ scrollbarWidth: 'none' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}


// Map component names to their playground URLs for iframe
const PLAYGROUND_URLS: Record<string, string> = {
  "cards-demo": "/playground/cards",
  "parallax-demo": "/playground/parallax",
  "mouse-follower-demo": "/playground/mouse-follower",
}

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  replayable = false,
  expandUrl,
  componentName,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  replayable?: boolean
  expandUrl?: string
  componentName?: string
  component: React.ReactNode
  source: React.ReactNode
}) {
  const [tab, setTab] = React.useState("preview")
  const [key, setKey] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const handleReplay = () => {
    setKey((prev) => prev + 1)
  }

  // Get the iframe URL for fullscreen modal
  const iframeUrl = expandUrl || (componentName ? PLAYGROUND_URLS[componentName] : undefined)
  const hasFullscreen = Boolean(iframeUrl)

  return (
    <>
      <div className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)} {...props}>
        <Tabs className="relative mr-auto w-full" value={tab} onValueChange={setTab}>
          <div className="flex items-center justify-between">
            {!hideCode && (
              <TabsList className="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
                <TabsTrigger
                  value="preview"
                  className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            )}
            {/* V0 and action buttons in tabs row */}
            <div className="flex items-center gap-2">
              {componentName && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-md"
                  onClick={() => {
                    const pascalCase = componentName
                      .split("-")
                      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                      .join("")
                    window.open(
                      `https://v0.dev/chat?q=Create a ${pascalCase} component similar to nexvyn-ui`,
                      "_blank"
                    )
                  }}
                  title="Open in V0"
                >
                  <V0Icon className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
        </Tabs>
        <div
          data-tab={tab}
          className="data-[tab=code]:border-code relative rounded-lg border md:-mx-4"
        >
          <div
            data-slot="preview"
            data-active={tab === "preview"}
            className="invisible data-[active=true]:visible"
          >
            {/* Action buttons container */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              {hasFullscreen && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-md [&_svg]:!size-3.5"
                  onClick={() => setIsFullscreen(true)}
                  title="Open fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
              {replayable && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-md [&_svg]:!size-3.5"
                  onClick={handleReplay}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div
              data-align={align}
              className={cn(
                "preview flex h-[400px] w-full justify-center data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start"
              )}
              key={key}
            >
              {component}
            </div>
          </div>
          <div
            data-slot="code"
            data-active={tab === "code"}
            className="component-preview-code absolute inset-0 hidden overflow-hidden rounded-[inherit] data-[active=true]:block **:[figure]:!m-0 **:[pre]:h-[400px]"
          >
            {source}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal with iframe */}
      <FullscreenModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        iframeSrc={iframeUrl}
      />
    </>
  )
}

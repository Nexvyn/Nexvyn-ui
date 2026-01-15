"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { TerminalIcon, TerminalIconHandle } from "@/components/ui/icons/animated/terminal-icon"
import { AnimatedClipboardIcon, AnimatedIconHandle } from "@/components/ui/icons/animated/animated-clipboard-icon"
import { AnimatedCheckIcon } from "@/components/ui/icons/animated/animated-check-icon"

interface CliCopyBoxProps {
  command?: string
  className?: string
}

export function CliCopyBox({
  command = "Working on this feature",
  className = "",
}: CliCopyBoxProps) {
  const [copied, setCopied] = useState(false)
  const terminalIconRef = useRef<TerminalIconHandle>(null)
  const clipboardIconRef = useRef<AnimatedIconHandle>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`group relative ${className}`}
      onMouseEnter={() => terminalIconRef.current?.startAnimation()}
      onMouseLeave={() => terminalIconRef.current?.stopAnimation()}
    >
      {/* Terminal-style box */}
      <div className="bg-code border-border/50 flex items-center justify-between rounded-lg border px-4 py-1 backdrop-blur-sm">
        {/* Terminal icon */}
        <div className="text-muted-foreground mr-3 flex items-center">
          <TerminalIcon ref={terminalIconRef} size={20} className="" />
        </div>

        {/* Command text */}
        <code className="flex-1 font-mono text-sm font-medium">{command}</code>

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          onMouseEnter={() => clipboardIconRef.current?.startAnimation()}
          onMouseLeave={() => clipboardIconRef.current?.stopAnimation()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-muted-foreground hover:text-foreground hover:bg-muted ml-3 grid size-8 place-items-center rounded-md transition-colors"
        >
          <AnimatePresence>
            <motion.div
              key={copied ? "check" : "copy"}
              initial={{ scale: 0.9, opacity: 0, filter: "blur(4px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="col-start-1 row-start-1"
            >
              {copied ? (
                <AnimatedCheckIcon className="size-4 text-green-500" />
              ) : (
                <AnimatedClipboardIcon ref={clipboardIconRef} className="size-4" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Subtle glow effect on hover */}
      <div className="from-primary/10 to-accent/10 absolute inset-0 -z-10 rounded-lg bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}

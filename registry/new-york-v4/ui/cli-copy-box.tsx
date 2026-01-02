"use client"

import { useState } from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

interface CliCopyBoxProps {
  command?: string
  className?: string
}

export function CliCopyBox({
  command = "npx nexvyn-ui@latest init",
  className = "",
}: CliCopyBoxProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`group relative ${className}`}>
      {/* Terminal-style box */}
      <div className="bg-code border-border/50 flex items-center justify-between rounded-lg border px-4 py-1 backdrop-blur-sm">
        {/* Terminal icon */}
        <div className="text-muted-foreground mr-3 flex items-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-70">
            <path
              d="M5.5 4.5L8.5 7.5L5.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M10 10.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Command text */}
        <code className="flex-1 font-mono text-sm font-medium">{command}</code>

        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-muted-foreground hover:text-foreground hover:bg-muted ml-3 flex size-8 items-center justify-center rounded-md transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={copied ? "check" : "copy"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? (
                <CheckIcon className="size-4 text-green-500" />
              ) : (
                <ClipboardIcon className="size-4" />
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

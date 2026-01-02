"use client"

import { useState } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"
import { Check, Copy } from "lucide-react"

// Smooth scale variants for icon transitions
const iconVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  },
}

// Button hover/tap animations
const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export function CopyButton({ textToCopy, size = 14 }: { textToCopy: string; size?: number }) {
  const [copying, setCopying] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy)
    setCopying(true)
    setTimeout(() => setCopying(false), 1500)
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="bg-muted hover:bg-accent focus:ring-ring rounded-lg p-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
      onClick={handleCopy}
    >
      <AnimatePresence mode="wait">
        {copying ? (
          <motion.div
            key="check"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Check width={size} height={size} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Copy width={size} height={size} strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function CopyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
    </svg>
  )
}

// Named export for compatibility
export { CopyIcon }

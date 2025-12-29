"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Command Icon
 * Visual: Terminal window with command symbol (⌘)
 * Animation: Command symbol glows with pulse
 */
export function CommandIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.pulse} {...props}>
      {/* Terminal window */}
      <rect x="3" y="5" width="18" height="14" rx="2" />

      {/* Window top bar */}
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1" />

      {/* Command symbol (⌘) - simplified as overlapping loops */}
      <motion.g
        variants={{
          idle: { opacity: 1, scale: 1 },
          hover: {
            opacity: [1, 0.6, 1],
            scale: [1, 1.1, 1],
            transition: { duration: 0.4 },
          },
          active: {
            opacity: [1, 0.8, 1],
            scale: 1,
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      >
        {/* Vertical part */}
        <path d="M12 11 L12 17" strokeWidth="2" />
        {/* Horizontal part */}
        <path d="M9 14 L15 14" strokeWidth="2" />
        {/* Corner loops */}
        <circle cx="9" cy="11" r="1.5" fill="none" strokeWidth="1.5" />
        <circle cx="15" cy="11" r="1.5" fill="none" strokeWidth="1.5" />
        <circle cx="9" cy="17" r="1.5" fill="none" strokeWidth="1.5" />
        <circle cx="15" cy="17" r="1.5" fill="none" strokeWidth="1.5" />
      </motion.g>
    </MotionIcon>
  )
}

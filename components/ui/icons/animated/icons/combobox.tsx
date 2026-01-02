"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Combobox Icon
 * Visual: Rectangle with dropdown arrow + search icon
 * Animation: Dropdown arrow bounces while search icon scales
 */
export function ComboboxIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Input box */}
      <rect x="3" y="7" width="18" height="10" rx="2" />

      {/* Search icon (magnifying glass) */}
      <motion.g
        variants={{
          idle: { scale: 1, opacity: 0.7 },
          hover: { scale: 1.1, opacity: 1 },
          active: { scale: 1.05, opacity: 0.9 },
        }}
        transition={{ duration: 0.2 }}
      >
        <circle cx="8" cy="11" r="2" strokeWidth="1.5" />
        <line x1="9.5" y1="12.5" x2="11" y2="14" strokeWidth="1.5" />
      </motion.g>

      {/* Dropdown chevron */}
      <motion.path
        d="M15 10 L17 12 L19 10"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { y: 0 },
          hover: { y: [0, 2, 0] },
          active: { y: 0 },
        }}
        transition={{ duration: 0.3 }}
      />
    </MotionIcon>
  )
}

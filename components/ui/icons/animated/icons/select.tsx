"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Select/Dropdown Icon
 * Visual: Select box with chevron
 * Animation: Chevron bounces + options appear
 */
export function SelectIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Select box */}
      <rect x="4" y="8" width="16" height="6" rx="1.5" />

      {/* Selected value line */}
      <line x1="6" y1="11" x2="13" y2="11" strokeWidth="1" opacity="0.5" />

      {/* Chevron */}
      <motion.path
        d="M16 10 L18 12 L16 14"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={{
          idle: { rotate: 0, y: 0 },
          hover: { rotate: 90, y: [0, 1, 0] },
          active: { rotate: 90, y: 0 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.3 }}
      />

      {/* Dropdown options (appear on hover) */}
      <motion.g
        variants={{
          idle: { opacity: 0, y: -5 },
          hover: { opacity: 1, y: 0 },
          active: { opacity: 0.7, y: 0 },
        }}
        transition={{ duration: 0.2 }}
      >
        <rect x="4" y="15" width="16" height="2" rx="0.5" opacity="0.3" />
        <rect x="4" y="18" width="16" height="2" rx="0.5" opacity="0.3" />
      </motion.g>
    </MotionIcon>
  )
}

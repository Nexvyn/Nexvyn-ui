"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Collapsible Icon
 * Visual: Rounded rectangle with chevron down
 * Animation: Chevron rotates 180deg
 */
export function CollapsibleIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Container rectangle */}
      <rect x="4" y="6" width="16" height="12" rx="2" />

      {/* Horizontal line separator */}
      <line x1="4" y1="11" x2="20" y2="11" strokeWidth="1" opacity="0.5" />

      {/* Chevron that rotates */}
      <motion.path
        d="M9 14 L12 17 L15 14"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { rotate: 0 },
          hover: { rotate: 180 },
          active: { rotate: 180 },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </MotionIcon>
  )
}

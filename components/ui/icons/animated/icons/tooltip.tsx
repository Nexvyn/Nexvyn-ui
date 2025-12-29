"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Tooltip Icon
 * Visual: Speech bubble
 * Animation: Bounce up from element
 */
export function TooltipIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.bounce} {...props}>
      {/* Base element */}
      <rect x="9" y="16" width="6" height="2" rx="1" opacity="0.5" />

      {/* Tooltip bubble */}
      <motion.g
        variants={{
          idle: { y: 0, opacity: 0.7 },
          hover: { y: -2, opacity: 1 },
          active: { y: -1, opacity: 0.9 },
        }}
      >
        <rect x="6" y="6" width="12" height="6" rx="1.5" />

        {/* Text lines */}
        <line x1="8" y1="8.5" x2="16" y2="8.5" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="10.5" x2="13" y2="10.5" strokeWidth="0.5" opacity="0.5" />

        {/* Arrow pointer */}
        <path d="M10 12 L12 14 L14 12" strokeWidth="1" />
      </motion.g>
    </MotionIcon>
  )
}

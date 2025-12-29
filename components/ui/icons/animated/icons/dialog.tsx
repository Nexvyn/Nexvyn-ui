"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Dialog/Modal Icon
 * Visual: Layered window
 * Animation: Front layer scales up with backdrop fade
 */
export function DialogIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.scaleUp} {...props}>
      {/* Backdrop/overlay */}
      <motion.rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        opacity="0.1"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { opacity: 0 },
          hover: { opacity: 0.2 },
          active: { opacity: 0.15 },
        }}
      />

      {/* Dialog window */}
      <motion.g
        variants={{
          idle: { scale: 0.9 },
          hover: { scale: 1 },
          active: { scale: 0.95 },
        }}
      >
        <rect x="6" y="7" width="12" height="10" rx="1.5" />

        {/* Header */}
        <line x1="6" y1="10" x2="18" y2="10" strokeWidth="1" opacity="0.3" />

        {/* Content lines */}
        <line x1="8" y1="12" x2="16" y2="12" strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="14" x2="14" y2="14" strokeWidth="0.5" opacity="0.5" />
      </motion.g>
    </MotionIcon>
  )
}

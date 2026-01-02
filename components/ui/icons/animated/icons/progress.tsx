"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Progress Bar Icon
 * Visual: Horizontal bar with fill
 * Animation: Fill expands left to right
 */
export function ProgressIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Container */}
      <rect x="4" y="10" width="16" height="4" rx="2" opacity="0.3" />

      {/* Progress fill */}
      <motion.rect
        x="4"
        y="10"
        width="8"
        height="4"
        rx="2"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { scaleX: 0.5, originX: 0 },
          hover: { scaleX: 1, originX: 0 },
          active: { scaleX: 0.75, originX: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Percentage indicators */}
      <g opacity="0.5">
        <line x1="8" y1="8" x2="8" y2="9" strokeWidth="0.5" />
        <line x1="12" y1="8" x2="12" y2="9" strokeWidth="0.5" />
        <line x1="16" y1="8" x2="16" y2="9" strokeWidth="0.5" />
      </g>
    </MotionIcon>
  )
}

"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Pagination Icon
 * Visual: Page numbers with arrows
 * Animation: Numbers cycle + arrows slide
 */
export function PaginationIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.slideRight} {...props}>
      {/* Left arrow */}
      <motion.path
        d="M8 12 L5 9 L8 6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { x: 0, opacity: 0.5 },
          hover: { x: -2, opacity: 1 },
          active: { x: -1, opacity: 0.8 },
        }}
      />

      {/* Page indicators */}
      <circle cx="10" cy="12" r="1" fill="currentColor" opacity="0.3" />
      <motion.circle
        cx="12"
        cy="12"
        r="1.5"
        fill="currentColor"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.3 },
          active: { scale: 1.2 },
        }}
      />
      <circle cx="14" cy="12" r="1" fill="currentColor" opacity="0.3" />

      {/* Right arrow */}
      <motion.path
        d="M16 6 L19 9 L16 12"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { x: 0, opacity: 0.5 },
          hover: { x: 2, opacity: 1 },
          active: { x: 1, opacity: 0.8 },
        }}
      />
    </MotionIcon>
  )
}

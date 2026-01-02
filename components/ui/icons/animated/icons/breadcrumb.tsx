"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Breadcrumb Icon
 * Visual: Three circles connected by chevrons
 * Animation: Chevrons slide right sequentially
 */
export function BreadcrumbIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.slideRight} {...props}>
      {/* First circle */}
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />

      {/* First chevron */}
      <motion.path
        d="M8 10 L10 12 L8 14"
        strokeWidth="1.5"
        variants={{
          idle: { x: 0, opacity: 0.7 },
          hover: { x: 3, opacity: 1 },
          active: { x: 2, opacity: 0.9 },
        }}
        transition={{ duration: 0.2, delay: 0 }}
      />

      {/* Second circle */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />

      {/* Second chevron */}
      <motion.path
        d="M15 10 L17 12 L15 14"
        strokeWidth="1.5"
        variants={{
          idle: { x: 0, opacity: 0.7 },
          hover: { x: 3, opacity: 1 },
          active: { x: 2, opacity: 0.9 },
        }}
        transition={{ duration: 0.2, delay: 0.05 }}
      />

      {/* Third circle */}
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </MotionIcon>
  )
}

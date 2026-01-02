"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Alert Dialog Icon
 * Visual: Rounded square with exclamation mark
 * Animation: Scale pulse + slight rotate on hover
 */
export function AlertDialogIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.popRotate} {...props}>
      {/* Rounded square container */}
      <motion.rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05 },
          active: { scale: 1.02 },
        }}
      />
      {/* Exclamation line */}
      <motion.line x1="12" y1="8" x2="12" y2="13" strokeWidth="2" />
      {/* Exclamation dot */}
      <motion.circle cx="12" cy="16" r="0.8" fill="currentColor" stroke="none" />
    </MotionIcon>
  )
}

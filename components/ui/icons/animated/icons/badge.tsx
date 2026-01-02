"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Badge Icon
 * Visual: Rounded pill shape with pulsing dot
 * Animation: Dot pulses with scale
 */
export function BadgeIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.bounce} {...props}>
      {/* Badge pill shape */}
      <rect x="4" y="10" width="16" height="4" rx="2" />

      {/* Notification dot */}
      <motion.circle
        cx="18"
        cy="8"
        r="2"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { scale: 1, opacity: 1 },
          hover: {
            scale: [1, 1.3, 1],
            opacity: [1, 0.8, 1],
            transition: { duration: 0.3 },
          },
          active: {
            scale: [1, 1.2, 1],
            opacity: [1, 0.85, 1],
            transition: { duration: 1.5, repeat: Infinity },
          },
        }}
      />
    </MotionIcon>
  )
}

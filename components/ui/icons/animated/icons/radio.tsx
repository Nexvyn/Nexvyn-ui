"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Radio Button Icon
 * Visual: Circle with inner dot + ripple
 * Animation: Inner dot scales + outer ripple ring
 */
export function RadioIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.pulse} {...props}>
      {/* Ripple ring */}
      <motion.circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0"
        variants={{
          idle: { scale: 0.8, opacity: 0 },
          hover: { scale: 1, opacity: 0.1 },
          active: {
            scale: [0.8, 1.2],
            opacity: [0.3, 0],
            transition: { duration: 0.6, repeat: 0 },
          },
        }}
      />

      {/* Outer circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        strokeWidth="1.5"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05 },
          active: { scale: 0.95 },
        }}
      />

      {/* Inner dot (appears on hover) */}
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { scale: 0, opacity: 0 },
          hover: { scale: 1, opacity: 0.5 },
          active: { scale: 1, opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      />
    </MotionIcon>
  )
}

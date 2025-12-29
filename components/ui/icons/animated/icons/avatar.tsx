"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Avatar Icon
 * Visual: Circle with user silhouette
 * Animation: Circle stroke draws clockwise + scale + glow
 */
export function AvatarIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} variants={iconVariants.scaleUp} {...props}>
      {/* Glow background */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke="none"
        fill="currentColor"
        opacity="0.1"
        variants={{
          idle: { scale: 0.8, opacity: 0 },
          hover: { scale: 1, opacity: 0.1 },
          active: { scale: 0.9, opacity: 0.15 },
        }}
      />

      {/* Outer circle */}
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        strokeWidth="1.5"
        variants={{
          idle: { strokeDasharray: "0 100", strokeDashoffset: 0, scale: 1 },
          hover: { strokeDasharray: "100 0", strokeDashoffset: 0, scale: 1.05 },
          active: {
            strokeDasharray: "100 0",
            strokeDashoffset: 0,
            scale: 0.95,
          },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* User head */}
      <motion.circle
        cx="12"
        cy="10"
        r="3"
        strokeWidth="1.5"
        variants={{
          idle: { y: 0 },
          hover: { y: -1 },
          active: { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />

      {/* User body (shoulders) */}
      <motion.path
        d="M6.5 19.5 C6.5 16 8.5 14.5 12 14.5 C15.5 14.5 17.5 16 17.5 19.5"
        strokeWidth="1.5"
        variants={{
          idle: { scale: 1, originY: 1, originX: 0.5 },
          hover: { scale: 1.1, originY: 1, originX: 0.5 },
          active: { scale: 1.05, originY: 1, originX: 0.5 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />
    </MotionIcon>
  )
}

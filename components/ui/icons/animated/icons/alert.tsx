"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { iconVariants } from "../icon-variants"
import { BaseIconProps } from "../types"

/**
 * Alert Icon
 * Visual: Triangle with exclamation mark
 * Animation: Vertical bounce + stroke highlight + pulsing ring
 */
export function AlertIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon
      size={size}
      isActive={isActive}
      variants={iconVariants.bounce}
      strokeWidth={1.5}
      {...props}
    >
      {/* Pulsing ring */}
      <motion.path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0"
        variants={{
          idle: { scale: 1, opacity: 0 },
          hover: { scale: 1.2, opacity: 0.2 },
          active: {
            scale: [1, 1.3],
            opacity: [0.3, 0],
            transition: { duration: 1, repeat: Infinity },
          },
        }}
        style={{ originX: 0.5, originY: 0.5 }}
      />

      {/* Warning triangle */}
      <motion.path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        variants={{
          idle: { y: 0 },
          hover: { y: -2 },
          active: { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      />

      {/* Exclamation mark group */}
      <motion.g
        variants={{
          idle: { y: 0, opacity: 1 },
          hover: { y: -2, opacity: 1 },
          active: { y: 0, opacity: 0.8 },
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 12,
          delay: 0.05,
        }}
      >
        <motion.line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" strokeLinecap="round" />
        <motion.circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </motion.g>
    </MotionIcon>
  )
}

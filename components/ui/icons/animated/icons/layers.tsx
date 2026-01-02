"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Layers Icon (for Liquidity Model)
 * Visual: Stacked layers
 * Animation: Layers separating/floating
 */
export function LayersIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      <motion.path
        d="M12 2L2 7l10 5 10-5-10-5z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { y: 0 },
          hover: { y: -2 },
          active: { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />
      <motion.path
        d="M2 17l10 5 10-5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { y: 0 },
          hover: { y: 2 },
          active: { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />
      <motion.path
        d="M2 12l10 5 10-5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionIcon>
  )
}

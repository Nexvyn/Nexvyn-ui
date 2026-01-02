"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Shield Icon (for Security/Audits)
 * Visual: Shield shape with checkmark
 * Animation: Shimmy/Shine effect
 */
export function ShieldIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Shield Body */}
      <motion.path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05 },
          active: { scale: 1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      />

      {/* Checkmark inside */}
      <motion.path
        d="M9 12l2 2 4-4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          idle: { pathLength: 1, opacity: 1 },
          hover: { pathLength: 1, opacity: 1 },
          active: { pathLength: 1, opacity: 1 },
        }}
      />
    </MotionIcon>
  )
}

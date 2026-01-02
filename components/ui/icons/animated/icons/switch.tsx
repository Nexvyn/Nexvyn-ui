"use client"

import { motion } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

/**
 * Switch/Toggle Icon
 * Visual: Toggle switch with sliding circle + track glow
 * Animation: Circle slides elasticly + track color shift
 */
export function SwitchIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Switch track */}
      <motion.rect
        x="6"
        y="10"
        width="12"
        height="4"
        rx="2"
        variants={{
          idle: { opacity: 0.6, fillOpacity: 0 },
          hover: { opacity: 1, fillOpacity: 0.1 },
          active: { opacity: 1, fillOpacity: 1 },
        }}
        fill="currentColor"
        transition={{ duration: 0.3 }}
      />

      {/* Track glow (active) */}
      <motion.rect
        x="5"
        y="9"
        width="14"
        height="6"
        rx="3"
        fill="currentColor"
        stroke="none"
        opacity="0"
        variants={{
          idle: { opacity: 0 },
          active: { opacity: 0.2 },
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Switch handle (slides) */}
      <motion.circle
        cx="9"
        cy="12"
        r="2.5"
        fill="currentColor"
        stroke="none"
        variants={{
          idle: { x: 0, scale: 1 },
          hover: { x: 6, scale: 1.1 },
          active: { x: 6, scale: 1 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
    </MotionIcon>
  )
}

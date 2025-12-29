"use client"

import { motion, Variants } from "framer-motion"
import { MotionIcon } from "../motion-icon"
import { BaseIconProps } from "../types"

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.5, ease: "easeOut" },
      opacity: { delay, duration: 0.01 },
    },
  }),
}

/**
 * Search Icon (Lucide-Animated Style)
 * Animation: Smooth line-drawing effect with staggered paths
 */
export function SearchIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Magnifying glass circle */}
      <motion.circle
        cx="11"
        cy="11"
        r="8"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      />

      {/* Handle */}
      <motion.path
        d="m21 21-4.3-4.3"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0.3}
        whileHover={{
          x: 1,
          y: 1,
          transition: { duration: 0.2 },
        }}
      />
    </MotionIcon>
  )
}

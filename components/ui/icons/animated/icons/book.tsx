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
 * Book Icon (Lucide-Animated Style)
 * Animation: Line-drawing effect with page flip on hover
 */
export function BookIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Book cover */}
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0}
        whileHover={{
          rotateY: -15,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        style={{ originX: 0 }}
      />

      {/* Bookmark line */}
      <motion.path
        d="M8 6h8"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0.3}
      />

      {/* Second line */}
      <motion.path
        d="M8 10h5"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0.4}
      />
    </MotionIcon>
  )
}

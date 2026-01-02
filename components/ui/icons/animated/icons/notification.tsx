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
 * Notification Bell Icon (Lucide-Animated Style)
 * Animation: Line-drawing + bell swing on hover
 */
export function NotificationIcon({ size = 20, isActive = false, ...props }: BaseIconProps) {
  return (
    <MotionIcon size={size} isActive={isActive} {...props}>
      {/* Bell body */}
      <motion.path
        d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0}
        whileHover={{
          rotate: [0, -10, 8, -5, 3, 0],
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
        style={{ originX: "50%", originY: 0 }}
      />

      {/* Bell clapper */}
      <motion.path
        d="M10.3 21a1.94 1.94 0 0 0 3.4 0"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={draw}
        custom={0.3}
      />
    </MotionIcon>
  )
}

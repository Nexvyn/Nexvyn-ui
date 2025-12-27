"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimation } from "motion/react"
import type { Variants } from "motion/react"

// V0 Icon animation variants
const V0_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

// Animated V0 Icon component
export function V0Icon({ className }: { className?: string }) {
  const controls = useAnimation()

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <motion.svg
        aria-label="v0 logomark"
        viewBox="0 0 147 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        variants={V0_VARIANTS}
        animate={controls}
        initial="normal"
      >
        <path
          d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z"
          fill="currentColor"
        />
        <path
          d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z"
          fill="currentColor"
        />
      </motion.svg>
    </div>
  )
}

// Terminal line animation variants
const LINE_VARIANTS: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

// Animated Terminal Icon component
export function TerminalIcon({ className, size = 14 }: { className?: string; size?: number }) {
  const controls = useAnimation()

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="4 17 10 11 4 5" />
        <motion.line
          x1="12"
          x2="20"
          y1="19"
          y2="19"
          variants={LINE_VARIANTS}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  )
}

"use client"

import type { Variants } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedWavesIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number
}

const pathVariants: Variants = {
    hidden: {
        pathLength: 0,
        opacity: 0,
    },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
}

const AnimatedWavesIcon = forwardRef<HTMLDivElement, AnimatedWavesIconProps>(
    ({ className, size = 20, ...props }, ref) => {
        const controls = useAnimation()

        useEffect(() => {
            controls.start("visible")
        }, [controls])

        return (
            <div
                ref={ref}
                className={cn("select-none flex items-center justify-center", className)}
                {...props}
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
                    <motion.path
                        d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                    <motion.path
                        d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                    <motion.path
                        d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                </svg>
            </div>
        )
    }
)

AnimatedWavesIcon.displayName = "AnimatedWavesIcon"

export { AnimatedWavesIcon }

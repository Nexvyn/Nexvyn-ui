"use client"

import type { Variants } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedImageIconProps extends HTMLAttributes<HTMLDivElement> {
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

const AnimatedImageIcon = forwardRef<HTMLDivElement, AnimatedImageIconProps>(
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
                    <motion.rect
                        x="3" y="3" width="18" height="18" rx="2" ry="2"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                    <motion.circle
                        cx="8.5" cy="8.5" r="1.5"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                    <motion.polyline
                        points="21 15 16 10 5 21"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                </svg>
            </div>
        )
    }
)

AnimatedImageIcon.displayName = "AnimatedImageIcon"

export { AnimatedImageIcon }

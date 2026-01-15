"use client"

import type { Variants } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCheckIconProps extends HTMLAttributes<HTMLDivElement> {
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
            duration: 0.3,
            ease: "easeOut",
        },
    },
}

const AnimatedCheckIcon = forwardRef<HTMLDivElement, AnimatedCheckIconProps>(
    ({ className, size = 28, ...props }, ref) => {
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
                    <motion.polyline
                        points="20 6 9 17 4 12"
                        variants={pathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                </svg>
            </div>
        )
    }
)

AnimatedCheckIcon.displayName = "AnimatedCheckIcon"

export { AnimatedCheckIcon }

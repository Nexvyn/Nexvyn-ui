"use client"

import type { Variants } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"
import { motion, useAnimation } from "motion/react"

import { cn } from "@/lib/utils"

export interface TwitterIconHandle {
    startAnimation: () => void
    stopAnimation: () => void
}

interface TwitterIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number
}

const bodyVariants: Variants = {
    normal: {
        opacity: 1,
        pathLength: 1,
        scale: 1,
        transition: {
            duration: 0.3,
        },
    },
    animate: {
        opacity: [0, 1],
        pathLength: [0, 1],
        scale: [0.9, 1],
        transition: {
            duration: 0.4,
        },
    },
}

const TwitterIcon = forwardRef<TwitterIconHandle, TwitterIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation()
        const isControlledRef = useRef(false)

        useImperativeHandle(ref, () => {
            isControlledRef.current = true

            return {
                startAnimation: () => controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            }
        })

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start("animate")
                } else {
                    onMouseEnter?.(e)
                }
            },
            [controls, onMouseEnter]
        )

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start("normal")
                } else {
                    onMouseLeave?.(e)
                }
            },
            [controls, onMouseLeave]
        )

        return (
            <div
                className={cn("select-none", className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <motion.path
                        variants={bodyVariants}
                        initial="normal"
                        animate={controls}
                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                    />
                </svg>
            </div>
        )
    }
)

TwitterIcon.displayName = "TwitterIcon"

export { TwitterIcon }

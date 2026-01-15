"use client"

import type { Variants } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"
import { motion, useAnimation } from "motion/react"

import { cn } from "@/lib/utils"

export interface FeedbackIconHandle {
    startAnimation: () => void
    stopAnimation: () => void
}

interface FeedbackIconProps extends HTMLAttributes<HTMLDivElement> {
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

const FeedbackIcon = forwardRef<FeedbackIconHandle, FeedbackIconProps>(
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <motion.path
                        variants={bodyVariants}
                        initial="normal"
                        animate={controls}
                        d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    />
                </svg>
            </div>
        )
    }
)

FeedbackIcon.displayName = "FeedbackIcon"

export { FeedbackIcon }

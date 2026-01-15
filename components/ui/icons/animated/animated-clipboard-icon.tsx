"use client"

import type { Variants } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedIconHandle {
    startAnimation: () => void
    stopAnimation: () => void
}

interface AnimatedIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number
}

const pathVariants: Variants = {
    normal: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
        }
    },
    animate: {
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 0.4,
            ease: "easeInOut",
        },
    },
}

const rectVariants: Variants = {
    normal: {
        pathLength: 1,
        opacity: 1,
        transition: {
            duration: 0.3,
        }
    },
    animate: {
        pathLength: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            delay: 0.1
        },
    },
}

const AnimatedClipboardIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
                className={cn("select-none flex items-center justify-center", className)}
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
                    <motion.rect
                        width="8" height="4" x="8" y="2" rx="1" ry="1"
                        variants={rectVariants}
                        initial="normal"
                        animate={controls}
                    />
                    <motion.path
                        d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
                        variants={pathVariants}
                        initial="normal"
                        animate={controls}
                    />
                </svg>
            </div>
        )
    }
)

AnimatedClipboardIcon.displayName = "AnimatedClipboardIcon"

export { AnimatedClipboardIcon }

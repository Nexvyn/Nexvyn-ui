"use client"

import Link from "next/link"
import { motion } from "motion/react"
import Image from "next/image"

const MotionLink = motion.create(Link)

export function HeaderCard() {
    return (
        <motion.header
            className="w-full bg-gradient-to-r from-[#e8f4ff]/95 via-[#c5e3ff]/95 to-[#e8f4ff]/95 md:rounded-xl px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 flex items-center justify-between z-50 shadow-[0_2px_8px_rgba(90,159,212,0.12),0_4px_16px_rgba(90,159,212,0.08),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-lg border border-white/20"
            style={{
                transform: "translateZ(0)",
                transformStyle: "preserve-3d",
            }}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-shrink">
                <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Pixel Perfect Logo"
                        width={32}
                        height={32}
                        className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                    />
                </Link>
                <Link
                    href="/"
                    className="text-xs sm:text-sm md:text-base lg:text-lg font-calendas tracking-tight hover:opacity-80 color-black transition-opacity truncate"
                >
                    Pixel Perfect
                </Link>
            </div>

            <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-shrink-0">
                <MotionLink
                    href="/docs/introduction"
                    className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight text-background bg-foreground px-1.5 py-1 sm:px-2 sm:py-1 md:px-2.5 md:py-1.5 lg:px-3 lg:py-1.5 rounded-md sm:rounded-lg z-20 whitespace-nowrap cursor-pointer inline-block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground shadow-[0_1px_2px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1),inset_0_-1px_1px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    style={{
                        transform: "translateZ(10px)",
                    }}
                    whileTap={{ scale: 0.95, translateZ: "5px" }}
                    whileHover={{
                        scale: 1.03,
                        translateZ: "15px",
                        transition: { type: "spring", damping: 30, stiffness: 400 },
                    }}
                >
                    <span className="hidden sm:inline">Check docs</span>
                    <span className="inline sm:hidden">Docs</span>
                </MotionLink>
                <MotionLink
                    href="https://github.com/danielpetho/fancy"
                    className="text-[10px] sm:text-xs md:text-sm font-medium tracking-tight text-white bg-blue dark:bg-blue-500 px-1.5 py-1 sm:px-2 sm:py-1 md:px-2.5 md:py-1.5 lg:px-3 lg:py-1.5 rounded-md sm:rounded-lg z-20 whitespace-nowrap cursor-pointer inline-block text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue shadow-[0_1px_2px_rgba(0,0,255,0.2),0_2px_4px_rgba(0,0,255,0.15),0_4px_8px_rgba(0,0,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]"
                    style={{
                        transform: "translateZ(10px)",
                    }}
                    whileTap={{ scale: 0.95, translateZ: "5px" }}
                    whileHover={{
                        scale: 1.03,
                        translateZ: "15px",
                        transition: { type: "spring", damping: 30, stiffness: 400 },
                    }}
                >
                    <span className="hidden sm:inline">★ on GitHub</span>
                    <span className="inline sm:hidden">★</span>
                </MotionLink>
            </nav>
        </motion.header>
    )
}

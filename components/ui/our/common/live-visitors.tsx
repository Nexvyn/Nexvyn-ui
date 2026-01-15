"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Users } from "lucide-react"

export function LiveVisitors() {
    const [visitors, setVisitors] = useState(12)

    useEffect(() => {
        // Simulate live visitor fluctuation
        const interval = setInterval(() => {
            setVisitors(prev => {
                const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
                const newValue = prev + change
                return newValue < 5 ? 5 : newValue // Minimum 5 visitors
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/50 backdrop-blur-sm px-3 py-1.5 shadow-sm">
            <div className="relative flex size-2 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
            </div>

            <AnimatePresence mode="popLayout">
                <motion.span
                    key={visitors}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs font-medium font-mono text-muted-foreground tabular-nums flex items-center gap-1.5"
                >
                    {visitors}
                    <span className="hidden sm:inline">people viewing</span>
                    <span className="sm:hidden">live</span>
                </motion.span>
            </AnimatePresence>
        </div>
    )
}

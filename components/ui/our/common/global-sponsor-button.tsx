"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/core/button"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function GlobalSponsorButton() {
    const pathname = usePathname()
    const isHome = pathname === "/"

    return (
        <div className={cn(
            "fixed z-[9999] pointer-events-none transition-all duration-300",
            isHome
                ? "right-4 bottom-4 sm:right-6 sm:bottom-24"
                : "right-4 bottom-4 sm:right-10 sm:bottom-10"
        )}>
            <Link href="/sponsors" className="pointer-events-auto block">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button className="rounded-md btn-3d-primary size-10 p-0 group overflow-hidden" variant="default">
                        <div className="relative size-5">
                            {/* Layer 1: White Outline (Background) */}
                            <Heart className="absolute inset-0 size-5 text-red-500 fill-transparent z-10 pointer-events-none" strokeWidth={2} />

                            {/* Layer 2: Red Liquid Fill (Foreground, masked) */}
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 overflow-hidden w-full"
                                initial={{ height: "0%" }}
                                whileHover={{ height: "50%" }}
                                whileTap={{ height: "100%" }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <Heart className="absolute bottom-0 left-0 size-5 text-transparent fill-red-500" strokeWidth={0} />
                            </motion.div>
                        </div>
                    </Button>
                </motion.div>
            </Link>
        </div>
    )
}

"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { motion } from "motion/react"
import VoronoiBackground from "./voronoi-background"

const MotionLink = motion.create(Link)

export function FooterCard() {
  return (
    <footer className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 rounded-2xl gradient-blue-cinematic grain">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(1920px 100% at 50% 100%, rgba(37, 99, 235, 0.3) 0%, rgba(30, 58, 95, 0.2) 50%, transparent 100%)",
          maskImage:
            "radial-gradient(1920px 100% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(1920px 100% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)",
        }}
      />
      {/* <VoronoiBackground /> */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 mx-auto translate-y-[5%] select-none text-center font-bold leading-none tracking-tighter text-white/20 text-[80px] lg:text-[140px]">
          pixel perfect
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-[1400px] space-y-16 lg:space-y-20">
        <motion.div
          className="flex flex-col items-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row absolute bottom-1 left-0 right-0 z-10 justify-between items-center gap-6 md:gap-8 w-full pb-8">
            <p className="text-xs sm:text-sm text-white/80 text-center md:text-left">
              Created by{" "}
              <a href="#" className="font-semibold text-white hover:text-[#e8f4ff] transition-colors">
                Aman (Nexvyn)
              </a>
              {" "}and{" "}
              <a href="#" className="font-semibold text-white hover:text-[#e8f4ff] transition-colors">
                Vansh
              </a>
              .{" "}
              <MotionLink
                href="https://github.com/Nexvyn/ui.git"
                className="inline-flex items-center gap-2 font-semibold text-white hover:text-[#e8f4ff] transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Source code on GitHub
                <Github className="h-4 w-4" />
              </MotionLink>
            </p>

            <p className="text-xs sm:text-sm text-white/70 text-center md:text-right">
              Copyright © 2025 pixel perfect ·{" "}
              <a href="#" className="text-[#c5e3ff] hover:text-white transition-colors font-semibold">
                Terms of Service
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

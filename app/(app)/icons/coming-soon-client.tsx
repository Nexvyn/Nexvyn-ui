"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SequentialLogo } from "@/components/ui/our/home/nexvyn-logo"
import Link from "next/link"
import { Navbar } from "../Home/navbar"
import { Footer } from "../Home/footer"


export function IconsComingSoonClient() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      <Navbar />
      <main className="noise-over border-border bg-background relative flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center rounded-3xl border px-4">
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="border-border bg-muted/30 mb-8 flex h-16 w-16 items-center justify-center rounded-lg border"
          >
            <SequentialLogo className="text-foreground" size={56} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
          >
            Icons. <span className="text-muted-foreground">Coming Soon.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground mb-10 max-w-[460px] text-lg leading-relaxed"
          >
            We are crafting a collection of high-quality icons designed to integrate seamlessly into
            your workflow. Quality takes time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <div className="text-muted-foreground border-border bg-muted/10 flex items-center gap-2 rounded-full border border-dashed px-4 py-2 font-mono text-xs">
              <span className="relative flex h-2 w-2">
                <span className="bg-green-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-green-500 relative inline-flex h-2 w-2 rounded-full"></span>
              </span>
              In Development
            </div>
          </motion.div>
        </div>

        {/* Technical Detail Footer */}
        <div className="text-muted-foreground/40 absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 font-mono text-[10px] tracking-widest uppercase">
          <span>Nexvyn UI</span>
          <span>•</span>
          <span>v0.1.0-alpha</span>
        </div>
      </main>
      <Footer />
    </div>
  )
}

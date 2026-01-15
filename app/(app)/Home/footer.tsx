"use client"

import { Button } from "@/components/ui/core/button"
import { Heart, MessageSquarePlus } from "lucide-react"
import { GithubIcon } from "@/components/ui/icons/animated/github"
import { FaDiscord } from "react-icons/fa6"
import { motion } from "motion/react"
import FlowBackground from "@/components/ui/our/home/flow-background"
import Link from "next/link"
import { useCommandPalette } from "@/components/ui/our/common/command-palette-context"
import { ContactFormExample } from "@/components/ui/our/home/contact-form"

export function Footer() {
  const { setOpen, setPage } = useCommandPalette()
  return (
    <footer className="grain dark:bg-background/80 relative overflow-hidden p-4 sm:p-6 md:p-8 dark:backdrop-blur-sm">
      {/* FlowBackground - Waveform Aesthetic */}
      <FlowBackground barCount={64} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none ">
        <div className="text-muted absolute right-0 bottom-0 left-0 mx-auto translate-y-[16%] text-center text-[clamp(2rem,8vw,9rem)] leading-none font-bold tracking-tighter select-none">
          nexvyn/ui
        </div>
      </div>

      {/* Main content container with better spacing */}
      <div className="relative z-10 flex flex-col gap-8 sm:gap-10 md:gap-12">
        {/* Bottom section - Credits on left, Social icons on right */}
        <div className="mt-8 flex w-full flex-row items-end justify-between gap-4 sm:mt-12 md:mt-16 lg:mt-20">
          {/* Credits - left side on all screens */}
          <span className="text-muted-foreground flex flex-wrap items-center justify-start gap-1 text-xs sm:text-sm">
            Designed and built by{" "}
            <a
              href="https://x.com/Nexvyn"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1"
            >
              <span className="hover:text-accent-foreground cursor-pointer transition-colors">
                Nexvyn
              </span>
              <svg
                className="text-primary h-2.5 w-2.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
              <svg
                className="link__graphic link__graphic--slide absolute top-full right-0 left-0 z-0 rotate-180"
                width="100%"
                height="8"
                viewBox="0 0 1200 60"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
                  className="stroke-primary fill-none stroke-[3px] transition-[stroke-dashoffset] duration-200 ease-in-out [stroke-dashoffset:1200] group-hover:[stroke-dashoffset:0]"
                  strokeDasharray="1200"
                ></path>
              </svg>
            </a>
          </span>

          {/* Social media icons - right side on all screens */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2.5">
            <motion.a
              href="https://github.com/Nexvyn/nexvyn-ui"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4 sm:size-[18px]" />
              </Button>
            </motion.a>
            <motion.a
              href="https://discord.gg/gEdZg3637C"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="Discord"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaDiscord className="size-4 sm:size-[18px]" />
                </motion.div>
              </Button>
            </motion.a>

            {/* Feedback Modal */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ContactFormExample />
            </motion.div>

            {/* Sponsor Button */}
            <motion.a
              href="/sponsors"
              aria-label="Sponsor"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="Sponsor"
              >
                <Heart className="size-4 sm:size-[18px]" />
              </Button>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}

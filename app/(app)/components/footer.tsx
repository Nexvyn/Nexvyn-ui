"use client"

import { Button } from "@/components/ui/core/button"
import { Github, Heart } from "lucide-react"
import { GithubIcon } from "@/components/ui/our/common/github"
import { FaDiscord, FaXTwitter } from "react-icons/fa6"
import FlowBackground from "@/components/ui/our/home/flow-background"
import { ContactFormExample } from "@/components/ui/our/home/contact-form"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="grain dark:bg-background/80 relative overflow-hidden p-4 sm:p-6 md:p-8 dark:backdrop-blur-sm">
      {/* FlowBackground - Audio Waveform Aesthetic */}
      <FlowBackground />
      <div className="text-muted absolute right-0 bottom-0 left-0 mx-auto translate-y-[16%] text-center text-[clamp(2rem,8vw,9rem)] leading-none font-bold tracking-tighter select-none">
        nexvyn/ui
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
                  className="stroke-primary fill-none stroke-[3px] transition-[stroke-dashoffset] duration-500 ease-in-out [stroke-dashoffset:1200] group-hover:[stroke-dashoffset:0]"
                  strokeDasharray="1200"
                ></path>
              </svg>
            </a>
          </span>

          {/* Social media icons - right side on all screens */}
          <div className="flex gap-2 sm:gap-2.5">
            <a href="https://github.com/Nexvyn/nexvyn-ui" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4 sm:size-[18px]" />
              </Button>
            </a>
            <a href="https://twitter.com/Nexvyn" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="Twitter/X"
              >
                <FaXTwitter className="size-4 sm:size-[18px]" />
              </Button>
            </a>
            <a href="https://discord.gg/gEdZg3637C" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="Discord"
              >
                <FaDiscord className="size-4 sm:size-[18px]" />
              </Button>
            </a>

            {/* Feedback Modal */}
            <ContactFormExample />

            {/* Sponsor Button */}
            <a href="/sponsors" aria-label="Sponsor">
              <Button
                variant="ghost"
                size="icon"
                className="btn-3d bg-muted/50 hover:bg-muted size-9 sm:size-10"
                aria-label="Sponsor"
              >
                <Heart className="size-4 sm:size-[18px]" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      {/* <span className="border-primary absolute -left-px -top-px block size-2 rounded-tl-full border-l-2 border-t-2"></span>
      <span className="border-primary absolute -right-px -top-px block size-2 rounded-tr-full border-r-2 border-t-2"></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 rounded-bl-full border-b-2 border-l-2"></span>
      <span className="border-primary absolute -bottom-px -right-px block size-2 rounded-br-full border-b-2 border-r-2"></span> */}
    </footer>
  )
}

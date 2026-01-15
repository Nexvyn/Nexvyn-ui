"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/core/button"
import VoronoiBackground from "@/components/ui/our/home/voronoi-background"
import HeroBackground from "@/components/ui/our/home/hero-background"
import { CliCopyBox } from "@/components/docs/cli-copy-box"
import { HeroImages } from "@/components/ui/our/home/hero-images"
import { GithubIcon } from "@/components/ui/icons/animated/github"
import { AnimatedImageIcon } from "@/components/ui/icons/animated/animated-image-icon"
import { AnimatedWavesIcon } from "@/components/ui/icons/animated/animated-waves-icon"
import { AnimatePresence, motion } from "motion/react"
import TextRotate from "@/components/ui/our/home/text-rotate"
import { cn } from "@/lib/utils"

type BackgroundType = "image" | "voronoi"

const FLIP_WORDS = ["Lovely", "Stunning", "Pixel Perfect", "Beautiful"]

export function HeroSection({ allComps = [] }: { allComps?: any[] }) {
  const [background, setBackground] = useState<BackgroundType>("image")

  const cycleBackground = () => {
    setBackground((prev) => (prev === "image" ? "voronoi" : "image"))
  }

  return (
    <section className="font-pixelify dash from-background to-muted/10 dark:from-background dark:to-background relative flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden overscroll-none rounded-3xl border-1 border-dashed bg-gradient-to-b px-4 sm:px-6 md:overflow-clip md:px-8">
      {/* Image + Stripes Background */}
      {background === "image" && (
        <>
          <img
            src="/backgrounds/light.webp"
            alt=""
            className="absolute inset-0 z-0 h-full w-full rounded-3xl object-cover dark:hidden"
          />
          <img
            src="/backgrounds/dark.webp"
            alt=""
            className="absolute inset-0 z-0 hidden h-full w-full rounded-3xl object-cover dark:block"
          />
          <HeroBackground className="z-[1] rounded-3xl" stripeCount={20} opacity={0.5} />
        </>
      )}

      {/* Voronoi Background */}
      {background === "voronoi" && (
        <VoronoiBackground className="absolute inset-0 z-0 h-full w-full rounded-3xl" />
      )}

      {/* Background Toggle Button with proper icons */}
      <motion.button
        onClick={cycleBackground}
        whileTap={{ scale: 0.97 }}
        className="group absolute left-4 bottom-4 z-20 grid place-items-center rounded-lg border border-white/20 bg-black/20 p-2.5 backdrop-blur-sm transition-colors duration-200 hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/20 sm:left-auto sm:right-4"
        aria-label={`Switch background (current: ${background})`}
        title={background === "image" ? "Switch to Voronoi" : "Switch to Image"}
      >
        <AnimatePresence>
          {background === "image" ? (
            <motion.div
              key="waves"
              initial={{ opacity: 0, scale: 0.9, rotate: -90, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, rotate: 90, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="col-start-1 row-start-1"
            >
              <AnimatedWavesIcon className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.9, rotate: -90, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, rotate: 90, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="col-start-1 row-start-1"
            >
              <AnimatedImageIcon className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <HeroImages allComps={allComps} />

      <div className="pointer-events-auto relative z-10 flex w-full max-w-[280px] flex-col items-center justify-center sm:max-w-[350px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
        <h1 className="font-pixelify flex w-full flex-col items-center justify-center text-center text-2xl leading-tight font-medium tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
          <span
            className={cn(
              "transition-colors duration-300",
              background === "voronoi" ? "text-foreground" : "text-white dark:text-white"
            )}
          >
            Make your
          </span>
          <div className="flex flex-row flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-4">
            <span
              className={cn(
                "transition-colors duration-300",
                background === "voronoi" ? "text-foreground" : "text-white dark:text-white"
              )}
            >
              website
            </span>
            <TextRotate
              texts={FLIP_WORDS}
              rotationInterval={2500}
              mainClassName={cn(
                "h-12 sm:h-16 md:h-20 inline-flex",
                background === "voronoi" ? "text-primary" : "text-white dark:text-white"
              )}
            />
          </div>
        </h1>

        <p
          className={cn(
            "md:text-md mt-2 px-2 text-center text-xs leading-relaxed transition-colors duration-300 sm:mt-3 sm:px-4 sm:text-sm md:mt-4 lg:text-lg",
            background === "voronoi"
              ? "text-muted-foreground"
              : "text-neutral-300 dark:text-neutral-300"
          )}
        >
          Build beautiful, responsive interfaces in minutes. A pixel-perfect
          <br className="hidden md:block" />
          React component library for modern web apps.
        </p>

        <div className="mt-10 flex w-full flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link href="/docs">
            <Button className="btn-3d-primary rounded-md" size="default">
              Browse Components
            </Button>
          </Link>
          <Link href="https://github.com/Nexvyn/Nexvyn-ui" target="_blank" rel="noreferrer">
            <Button variant="secondary" className="btn-3d rounded-md" size="default">
              <GithubIcon className="mr-2 size-4" />
              Star on GitHub
            </Button>
          </Link>
        </div>
        <CliCopyBox className="mt-10" />
      </div>

      <span className="border-primary absolute -top-px -left-px block size-2 rounded-tl-full border-t-2 border-l-2"></span>
      <span className="border-primary absolute -top-px -right-px block size-2 rounded-tr-full border-t-2 border-r-2"></span>
      <span className="border-primary absolute -bottom-px -left-px block size-2 rounded-bl-full border-b-2 border-l-2"></span>
      <span className="border-primary absolute -right-px -bottom-px block size-2 rounded-br-full border-r-2 border-b-2"></span>
    </section >
  )
}

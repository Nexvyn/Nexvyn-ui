"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/core/button"
import VoronoiBackground from "@/components/ui/our/home/voronoi-background"
import HeroBackground from "@/components/ui/our/home/hero-background"
import { CliCopyBox } from "@/components/ui/our/docs/cli-copy-box"
import { HeroImages } from "@/components/ui/our/home/hero-images"
import { Github, Image, Sparkles } from "lucide-react"
import TextRotate from "@/app/(app)/components/text-rotate"
import { cn } from "@/lib/utils"

type BackgroundType = "image" | "voronoi"

const FLIP_WORDS = ["minutes", "seconds", "no time", "a flash"]

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
      <button
        onClick={cycleBackground}
        className="group absolute right-4 bottom-4 z-20 rounded-lg border border-white/20 bg-black/20 p-2.5 backdrop-blur-sm transition-colors duration-200 hover:bg-black/30 dark:bg-white/10 dark:hover:bg-white/20"
        aria-label={`Switch background (current: ${background})`}
        title={background === "image" ? "Switch to Voronoi" : "Switch to Image"}
      >
        {background === "image" ? (
          <Sparkles className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
        ) : (
          <Image className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
        )}
      </button>

      <HeroImages allComps={allComps} />

      <div className="pointer-events-auto relative z-10 flex w-full max-w-[280px] flex-col items-center justify-center sm:max-w-[350px] md:max-w-[550px] lg:max-w-[750px] xl:max-w-[850px]">
        <h1 className="font-pixelify flex w-full flex-col items-center justify-center text-center text-2xl leading-tight font-medium tracking-tight whitespace-pre sm:text-4xl md:text-7xl">
          <span
            className={cn(
              "transition-colors duration-300",
              background === "voronoi" ? "text-foreground" : "text-white dark:text-white"
            )}
          >
            Build Stunning Websites in{" "}
          </span>
          {/* Flip text animation on LAST word */}
          <TextRotate
            texts={FLIP_WORDS}
            rotationInterval={2500}
            mainClassName={cn(
              "h-12 sm:h-16 md:h-20 inline-flex",
              background === "voronoi" ? "text-primary" : "text-white dark:text-white"
            )}
          />
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
            <Button className="btn-3d rounded-md" size="default">
              Browse Components
            </Button>
          </Link>
          <Link href="https://github.com/Nexvyn/Nexvyn-ui" target="_blank" rel="noreferrer">
            <Button variant="secondary" className="btn-3d" size="default">
              <Github className="mr-2 size-4" />
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
    </section>
  )
}

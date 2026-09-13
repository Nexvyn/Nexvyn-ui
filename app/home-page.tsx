'use client'
import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { GooeyFilter } from '@/components/layout/gooey-filter'
import { PixelTrail } from '@/components/layout/pixel-trail'
import { useScreenSize } from '@/hooks/use-screen-size'
import { Button } from '@/components/layout/button'
import { HomeFeaturedShowcase } from '@/components/home/home-featured-showcase'
import { HomeNote } from '@/components/home/home-note'
import { HomeBuiltWith } from '@/components/home/home-built-with'
import { HeroDiagramRails } from '@/components/home/hero-diagram-rails'
import { HomeSponsors } from '@/components/home/home-sponsors'
import { PageWaveProvider } from '@/components/home/page-wave'
import { springs } from '@/lib/motion-tokens'
import Link from 'next/link'

function HeroCtaArrowIcon({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion()
  const transition = reduceMotion ? { duration: 0 } : springs.fast

  return (
    <span
      aria-hidden="true"
      className="relative inline-flex size-3.5 shrink-0 items-center justify-center overflow-hidden translate-y-[0.5px]"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 size-full"
        initial={false}
        animate={
          reduceMotion
            ? { opacity: active ? 0 : 1 }
            : active
              ? { opacity: 0, x: -5, scale: 0.92 }
              : { opacity: 1, x: 0, scale: 1 }
        }
        transition={transition}
      >
        <path d="m9 18 6-6-6-6" />
      </motion.svg>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 size-full"
        initial={false}
        animate={
          reduceMotion
            ? { opacity: active ? 1 : 0 }
            : active
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: -7, scale: 0.92 }
        }
        transition={reduceMotion ? transition : { ...transition, delay: active ? 0.05 : 0 }}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
    </span>
  )
}

function ArrowCtaLink({ href, label }: { href: string; label: string }) {
  const [active, setActive] = useState(false)

  return (
    <Button
      asChild
      className="h-9 rounded-2xl squircle-corners px-4 duration-(--motion-dur-fast) ease-(--motion-ease-out) active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100"
    >
      <Link
        href={href}
        className="gap-1.5"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onPointerEnter={() => setActive(true)}
        onPointerLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        {/* size lives here, not on Button: tailwind-merge reads text-cta as a color and would drop text-primary-foreground */}
        <span className="text-cta text-center font-medium leading-none">{label}</span>
        <HeroCtaArrowIcon active={active} />
      </Link>
    </Button>
  )
}

export default function HomePage() {
  const screenSize = useScreenSize()

  return (
    <PageWaveProvider>
      <div
        className="w-full font-sans"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-fg)',
        }}
      >
        <div className="relative flex h-dvh w-full flex-col overflow-hidden">
          <GooeyFilter id="gooey-filter-pixel-trail" strength={8} />

          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ filter: 'url(#gooey-filter-pixel-trail)' }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan(`md`) ? 20 : 28}
              fadeDuration={800}
              delay={200}
              pixelClassName="bg-(--color-fg) opacity-60"
            />
          </div>

          <HeroDiagramRails />

          <Header />

          <section className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-8 sm:px-6">
            <h1 className="sr-only">
              Nexvyn UI — a polished React UI library for design engineers
            </h1>
            <p
              className="mx-auto max-w-70 animate-in fade-in slide-in-from-bottom-4 px-2 text-center text-base font-normal leading-relaxed duration-1000 sm:max-w-md sm:text-lg md:text-xl"
              style={{ color: 'var(--color-fg)' }}
            >
              library for design engineers clean components, smooth motion, and interfaces that feel
              built, not assembled.
            </p>

            <div className="mt-8 flex w-full items-center justify-center gap-3 sm:mt-10">
              <ArrowCtaLink href="/components" label="Components" />
            </div>
          </section>
        </div>

        <div
          className="w-full px-4 pb-16 sm:px-6 sm:pb-20 lg:px-42"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          <HomeNote />
          <HomeFeaturedShowcase />
          <div className="mt-8 flex justify-center sm:mt-10">
            <ArrowCtaLink href="/components" label="Browse all components" />
          </div>
          <HomeBuiltWith />
          <HomeSponsors />
        </div>

        <Footer />
      </div>
    </PageWaveProvider>
  )
}

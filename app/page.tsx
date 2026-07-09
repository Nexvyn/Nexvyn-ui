'use client'
import { useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { GooeyFilter } from '@/components/layout/gooey-filter'
import { PixelTrail } from '@/components/layout/pixel-trail'
import { useScreenSize } from '@/hooks/use-screen-size'
import { Button } from '@/components/layout/button'
import Link from 'next/link'

export default function HomePage() {
  const screenSize = useScreenSize()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      const previous = history.scrollRestoration
      history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
      return () => {
        history.scrollRestoration = previous
      }
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      className="h-dvh w-full font-sans overflow-hidden flex flex-col"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-fg)',
      }}
    >
      <GooeyFilter id="gooey-filter-pixel-trail" strength={8} />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ filter: 'url(#gooey-filter-pixel-trail)' }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 20 : 28}
          fadeDuration={800}
          delay={200}
          pixelClassName="bg-(--color-fg) opacity-60"
        />
      </div>

      <Header />

      <section className="flex-1 w-full flex flex-col justify-end pb-8 px-4 sm:px-6 relative z-10">
        <p
          className="mx-auto max-w-70 sm:max-w-md text-center text-base sm:text-lg md:text-xl leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-4 duration-1000 px-2"
          style={{ color: 'var(--color-fg)' }}
        >
          library for design engineers clean components, smooth motion, and interfaces that feel
          built, not assembled.
        </p>

        <div className="w-full flex items-center justify-center gap-3 mt-8 sm:mt-10">
          <Button
            asChild
            className="rounded-2xl squircle-corners active:scale-[0.97] duration-150 group"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <Link
              href="/components"
              className="gap-0.5"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="text-center">Components</span>
              <span className="w-0 opacity-0 group-hover:w-3.5 group-hover:opacity-100 transition-[width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

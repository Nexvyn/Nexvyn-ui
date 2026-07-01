'use client'
import { useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { GooeyFilter } from '@/components/layout/gooey-filter'
import { PixelTrail } from '@/components/layout/pixel-trail'
import { useScreenSize } from '@/hooks/use-screen-size'

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
      className="h-screen w-full font-sans overflow-hidden flex flex-col"
      style={{ 
        backgroundColor: 'var(--color-bg)', 
        color: 'var(--color-fg)' 
      }}
    >
      <GooeyFilter id="gooey-filter-pixel-trail" strength={8} />

      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 20 : 28}
          fadeDuration={800}
          delay={200}
          pixelClassName="bg-[var(--color-fg)] opacity-60"
        />
      </div>

      <Header />

      <section className="flex-1 w-full flex flex-col justify-end pb-8 px-4 sm:px-6 relative z-10">
        <p
            className="mx-auto max-w-70 sm:max-w-md text-center text-base sm:text-lg md:text-xl leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-4 duration-1000 px-2"
            style={{ color: 'var(--color-fg)' }}
          >
           library for design engineers clean components, smooth motion, and interfaces that feel built, not assembled.
          </p>

        <div className="w-full flex items-center justify-center gap-3 mt-8 sm:mt-10">
          <Link
            href="/components"
            className="inline-flex items-center h-10 px-5 rounded-md bg-(--color-fg) text-(--color-bg) text-sm font-medium active:scale-[0.97] duration-150"
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            components
          </Link>
        </div>
      </section>
    </div>
  )
}

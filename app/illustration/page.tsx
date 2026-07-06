'use client'

import { ThemeToggle } from '@/components/layout/theme-toggle'
import { AnimatedTitle } from '@/components/showcase/animated-title'

export default function IllustrationPage() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle showShortcut={false} />
      </div>
      <div
        id="illustration-scroll-viewport"
        className="min-h-0 flex-1 overflow-y-auto h-full relative"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `#illustration-scroll-viewport::-webkit-scrollbar { display: none; }`,
          }}
        />
        <div className="max-w-xl mx-auto py-4 md:py-6 px-3 sm:px-4">
          <AnimatedTitle
            title="Illustration"
            className="text-2xl sm:text-3xl font-normal tracking-tight mb-4"
          />

          <p className="text-sm text-(--color-muted) mb-8 max-w-2xl">
            Illustrations and visual assets for your projects.
          </p>

          <div className="h-16 md:h-25" />
        </div>
      </div>
    </div>
  )
}

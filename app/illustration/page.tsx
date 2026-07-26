'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { PhoneMockupCard } from '@/components/illustration/phone-mockup'
import { LaptopMockupCard } from '@/components/illustration/laptop-mockup'
import { ILLUSTRATION_COMPONENTS, getComponentHref } from '@/lib/components-registry'

function IllustrationThumbnail({ id }: { id: string }) {
  if (id === 'phone-mockup') {
    return (
      <PhoneMockupCard variant="accent" className="pointer-events-none scale-75">
        <div className="h-full w-full bg-(--color-accent)/10" />
      </PhoneMockupCard>
    )
  }
  if (id === 'laptop-mockup') {
    return (
      <LaptopMockupCard variant="titanium" className="pointer-events-none scale-75">
        <div className="h-full w-full bg-(--color-accent)/10" />
      </LaptopMockupCard>
    )
  }
  return null
}

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
        <div className="max-w-4xl mx-auto py-4 md:py-6 px-3 sm:px-4 flex flex-col items-center min-h-full gap-8">
          <AnimatedTitle
            title="Illustration"
            className="text-2xl sm:text-3xl font-normal tracking-tight"
          />

          <p className="text-sm text-(--color-muted) max-w-2xl text-center">
            Illustrations and visual assets for your projects.
          </p>

          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {ILLUSTRATION_COMPONENTS.map((item) => (
              <Link
                key={item.id}
                href={getComponentHref(item.id)}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-surface-2) p-6 transition-colors duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:border-(--color-accent)/40 motion-reduce:transition-none"
              >
                <div className="flex h-40 items-center justify-center">
                  <IllustrationThumbnail id={item.id} />
                </div>
                <span className="text-sm text-(--color-fg) group-hover:text-(--color-accent) transition-colors duration-(--motion-dur-fast) ease motion-reduce:transition-none">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

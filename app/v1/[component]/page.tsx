'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { GooeyFilter } from '@/components/ui/gooey-filter'
import { PixelTrail } from '@/components/ui/pixel-trail'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useScreenSize } from '@/hooks/use-screen-size'
import { COMPONENTS } from '@/lib/components-registry'

function PixelTrailDemo() {
  const screenSize = useScreenSize()

  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
      <GooeyFilter id="gooey-filter-demo" strength={8} />
      <div className="absolute inset-0" style={{ filter: 'url(#gooey-filter-demo)' }}>
        <PixelTrail
          pixelSize={screenSize.lessThan('md') ? 20 : 28}
          fadeDuration={800}
          delay={200}
          pixelClassName="bg-[var(--color-fg)] opacity-60"
        />
      </div>
      <p
        className="absolute inset-x-0 bottom-6 text-center text-sm"
        style={{ color: 'var(--color-muted)' }}
      >
        Move your cursor to paint pixels
      </p>
    </div>
  )
}

function ComponentDemo({ id }: { id: string }) {
  switch (id) {
    case 'nexvyn1':
      return <PixelTrailDemo />
    case 'nexvyn2':
      return (
        <div className="flex h-40 items-center justify-center rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
          <ThemeToggle />
        </div>
      )
    case 'nexvyn3':
      return (
        <div
          className="flex h-40 items-center justify-center rounded-2xl border text-sm"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
        >
          Gooey filter powers the pixel trail effect
        </div>
      )
    case 'nexvyn4':
      return (
        <div className="flex h-40 items-center justify-center gap-3 rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      )
    case 'nexvyn5':
      return (
        <div
          className="grid h-[50vh] grid-cols-5 gap-3 rounded-2xl border p-6"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
        >
          {['🧑', '🌸', '☀️', '🍷', '🐤', '🐤', '🍞', '⭐', '🐟', '🐸', '🐤', '🐻', '🗑️', '🏠', '🍬'].map((icon) => (
            <div
              key={icon}
              className="flex aspect-square cursor-grab items-center justify-center rounded-xl border text-2xl active:cursor-grabbing"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
            >
              {icon}
            </div>
          ))}
        </div>
      )
    default:
      return (
        <div
          className="flex h-48 items-center justify-center rounded-2xl border text-sm"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
        >
          Coming soon
        </div>
      )
  }
}

export default function ComponentPage() {
  const params = useParams()
  const componentId = typeof params.component === 'string' ? params.component : ''
  const component = COMPONENTS.find((item) => item.id === componentId)

  if (!component) {
    return (
      <div className="flex min-h-dvh items-center justify-center" style={{ color: 'var(--color-muted)' }}>
        Component not found
      </div>
    )
  }

  const index = COMPONENTS.findIndex((item) => item.id === componentId)
  const next = COMPONENTS[index + 1]

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6 md:px-12">
        <Link
          href="/v1"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-60"
          style={{ color: 'var(--color-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All components
        </Link>

        <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
          Component {String(index + 1).padStart(2, '0')}
        </p>
        <h1 className="mb-8 text-3xl font-normal tracking-tight">{component.name}</h1>

        <ComponentDemo id={component.id} />

        {next && (
          <div className="mt-16 flex justify-end border-t pt-10" style={{ borderColor: 'var(--color-border)' }}>
            <Link href={`/v1/${next.id}`} className="group text-right">
              <span
                className="mb-2 flex items-center justify-end gap-2 font-mono text-xs font-medium uppercase tracking-tight opacity-50 transition-colors group-hover:opacity-30"
                style={{ color: 'var(--color-fg)' }}
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-base tracking-tight">{next.name}</p>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
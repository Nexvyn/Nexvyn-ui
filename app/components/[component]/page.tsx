'use client'

import { useParams } from 'next/navigation'
import { motion } from 'motion/react'
import { Button } from '@/components/layout/button'
import { GooeyFilter } from '@/components/layout/gooey-filter'
import { PixelTrail } from '@/components/layout/pixel-trail'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { AnimatedTitle } from '@/components/showcase/animated-title'
import { ScrollFade } from '@/components/detail/scroll-fade'
import { NotFoundCard } from '@/components/layout/not-found-card'
import { useScreenSize } from '@/hooks/use-screen-size'
import { COMPONENTS } from '@/lib/components-registry'
import { cn } from '@/lib/utils'
import {
  BounceSidebarPreview,
  ColorPickerPreview,
  GooDropdownPreview,
  PasswordInputPreview,
  RatioSliderPreview,
  ScrollIndicatorPreview,
} from '@/components/ui/previews'

function DemoFrame({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cn('h-full w-full flex items-center justify-center', className)} style={style}>
      {children}
    </div>
  )
}

function PixelTrailDemo() {
  const screenSize = useScreenSize()

  return (
    <DemoFrame className="relative">
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
        className="absolute inset-x-0 bottom-6 text-center text-sm pointer-events-none"
        style={{ color: 'var(--color-muted)' }}
      >
        Move your cursor to paint pixels
      </p>
    </DemoFrame>
  )
}

function GooeyFilterDemo() {
  return (
    <DemoFrame className="flex items-center justify-center bg-(--color-surface-2)">
      <GooeyFilter id="gooey-demo-filter" strength={10} />
      <div
        className="relative flex w-48 h-24 items-center justify-center"
        style={{ filter: 'url(#gooey-demo-filter)' }}
      >
        <motion.div
          animate={{ x: [-30, 30, -30] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute size-16 rounded-full bg-sky-400"
        />
        <motion.div
          animate={{ x: [30, -30, 30] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute size-16 rounded-full bg-sky-500"
        />
      </div>
    </DemoFrame>
  )
}

function ScrollFadeDemo() {
  return (
    <DemoFrame className="flex items-center justify-center p-6">
      <div className="relative h-48 w-64 overflow-hidden rounded-xl border border-border/60 bg-(--color-bg)">
        <ScrollFade side="top" background="var(--color-bg)" className="z-10" />
        <ScrollFade side="bottom" background="var(--color-bg)" className="z-10" />
        <div className="h-full overflow-y-auto p-4 space-y-3 no-scrollbar">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-full rounded-md border border-border/40 flex items-center px-3 text-xs text-(--color-muted)"
            >
              Scroll Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </DemoFrame>
  )
}

export function ComponentDemo({ id }: { id: string }) {
  switch (id) {
    case 'bounce-sidebar':
      return <BounceSidebarPreview />
    case 'color-picker':
      return (
        <DemoFrame className="flex items-center justify-center p-6">
          <ColorPickerPreview />
        </DemoFrame>
      )
    case 'goo-dropdown':
      return (
        <DemoFrame className="flex items-center justify-center p-6">
          <GooDropdownPreview />
        </DemoFrame>
      )
    case 'password-input':
      return (
        <DemoFrame className="flex items-center justify-center p-6">
          <PasswordInputPreview />
        </DemoFrame>
      )
    case 'ratio-slider':
      return (
        <DemoFrame className="flex items-center justify-center p-6">
          <RatioSliderPreview />
        </DemoFrame>
      )
    case 'scroll-indicator':
      return <ScrollIndicatorPreview />
    case 'button':
      return (
        <DemoFrame className="flex flex-wrap items-center justify-center gap-3 p-4">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </DemoFrame>
      )
    case 'theme-toggle':
      return (
        <DemoFrame className="flex items-center justify-center">
          <ThemeToggle />
        </DemoFrame>
      )
    case 'animated-title':
      return (
        <DemoFrame className="flex items-center justify-center p-6">
          <AnimatedTitle
            title="Nexvyn/UI"
            right="Staggered"
            className="text-2xl sm:text-3xl font-normal tracking-tight"
          />
        </DemoFrame>
      )
    case 'pixel-trail':
      return <PixelTrailDemo />
    case 'gooey-filter':
      return <GooeyFilterDemo />
    case 'scroll-fade':
      return <ScrollFadeDemo />
    case 'not-found-card':
      return (
        <DemoFrame className="flex items-center justify-center p-6">
          <NotFoundCard />
        </DemoFrame>
      )
    default:
      return (
        <DemoFrame
          className="flex items-center justify-center text-sm"
          style={{ color: 'var(--color-muted)' }}
        >
          Coming soon
        </DemoFrame>
      )
  }
}

export default function ComponentPage() {
  const params = useParams()
  const componentId = typeof params.component === 'string' ? params.component : ''
  const component = COMPONENTS.find((item) => item.id === componentId)

  if (!component) {
    return (
      <div
        className="flex h-full items-center justify-center"
        style={{ color: 'var(--color-muted)' }}
      >
        Component not found
      </div>
    )
  }

  return (
    <div className="detail-preview-enter h-full w-full">
      <ComponentDemo id={component.id} />
    </div>
  )
}

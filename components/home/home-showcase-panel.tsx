'use client'
import Link from 'next/link'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { BlueprintLens } from './blueprint-lens'

export function HomeShowcasePanel({
  children,
  className,
  href,
  title,
  tag,
  lens = true,
  bleed = false,
  diagram,
}: {
  children: ReactNode
  className?: string
  href: string
  title: string
  tag?: string
  lens?: boolean
  bleed?: boolean
  diagram?: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [inspect, setInspect] = useState(false)
  const [pressed, setPressed] = useState(false)
  const moveQueued = useRef(false)
  const bobControls = useAnimationControls()
  const reduceMotion = useReducedMotion()

  const setLensVars = (clientX: number, clientY: number) => {
    const panel = panelRef.current
    if (!panel) return
    const r = panel.getBoundingClientRect()
    panel.style.setProperty('--lx', `${clientX - r.left}px`)
    panel.style.setProperty('--ly', `${clientY - r.top}px`)
  }

  // Panels react to the water wave: bob once, staggered by distance from splash
  useEffect(() => {
    if (reduceMotion) return
    const onSplash = (e: Event) => {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail
      const el = panelRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.bottom < -300 || r.top > window.innerHeight + 300) return
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dist = Math.hypot(cx - x, cy - y)
      const delay = Math.min(dist / 820, 1.6)
      const amp = Math.max(0.25, 1 - dist / 2200)
      bobControls.start({
        scale: [1, 1 - 0.008 * amp, 1 + 0.004 * amp, 1],
        y: [0, 3.5 * amp, -1.5 * amp, 0],
        transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
      })
    }
    window.addEventListener('nexvyn:splash', onSplash)
    return () => window.removeEventListener('nexvyn:splash', onSplash)
  }, [bobControls, reduceMotion])

  return (
    <motion.div
      ref={panelRef}
      animate={bobControls}
      onPointerEnter={(e) => {
        if (window.matchMedia('(hover: none)').matches) return
        setPressed(false)
        if (lens) {
          setLensVars(e.clientX, e.clientY)
          setInspect(true)
        }
      }}
      onPointerLeave={() => {
        if (lens) setInspect(false)
      }}
      onPointerMove={(e) => {
        if (!lens || !inspect) return
        if (moveQueued.current) return
        moveQueued.current = true
        const { clientX, clientY } = e
        requestAnimationFrame(() => {
          moveQueued.current = false
          setLensVars(clientX, clientY)
        })
      }}
      onPointerDownCapture={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={cn(
        'group/panel relative flex min-h-[240px] flex-col justify-center rounded-2xl overflow-hidden bg-(--color-surface) border border-(--panel-border) outline-none transition-[border-color,box-shadow] duration-(--motion-dur-fast) ease-(--motion-ease-out) hover:border-(--panel-border-hover) hover:shadow-(--shadow-panel-ambient) motion-reduce:transition-none has-focus-visible:ring-2 has-focus-visible:ring-(--color-accent) has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background md:min-h-[300px]',
        bleed ? 'p-0' : 'p-6',
        className,
      )}
    >
      {lens && (
        <BlueprintLens
          panelRef={panelRef}
          contentRef={contentRef}
          active={inspect && !pressed}
          diagram={diagram}
        />
      )}
      {tag && (
        <div className="pointer-events-none absolute end-6 top-3.5 z-20">
          <span className="font-mono text-[10px] tracking-[0.25em] text-(--color-muted)/60">
            {tag}
          </span>
        </div>
      )}
      <div className="absolute bottom-3.5 start-6 z-30 backdrop-blur-[6px]">
        <Link
          prefetch={false}
          href={href}
          className="text-[12px] font-normal tracking-tight text-(--color-muted)/70 transition-colors hover:text-(--color-fg) focus-visible:text-(--color-fg) outline-none"
        >
          {title}
        </Link>
      </div>
      <div className="relative z-20 flex size-full items-center justify-center">
        <div
          data-panel-content
          ref={contentRef}
          className="flex size-full max-h-full min-w-0 items-center justify-center"
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

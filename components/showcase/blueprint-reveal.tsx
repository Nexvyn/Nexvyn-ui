'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

const loadingSlot = (w: number, h: number) =>
  function Loading() {
    return <div className="shrink-0" style={{ width: w, height: h }} aria-hidden />
  }

const Badge = dynamic(() => import('@/components/ui/badge').then((m) => m.Badge), {
  ssr: false,
  loading: loadingSlot(92, 26),
})
const BounceSidebar = dynamic(
  () => import('@/components/ui/bounce-sidebar').then((m) => m.BounceSidebar),
  { ssr: false, loading: loadingSlot(80, 140) },
)
const ColorPicker = dynamic(
  () => import('@/components/ui/color-picker-standalone').then((m) => m.ColorPicker),
  { ssr: false, loading: loadingSlot(80, 80) },
)
const Fader = dynamic(() => import('@/components/ui/fader').then((m) => m.Fader), {
  ssr: false,
  loading: loadingSlot(180, 40),
})
const GooDropdown = dynamic(
  () => import('@/components/ui/goo-dropdown').then((m) => m.GooDropdown),
  {
    ssr: false,
    loading: loadingSlot(100, 128),
  },
)
const PasswordInput = dynamic(
  () => import('@/components/ui/password-input').then((m) => m.PasswordInput),
  { ssr: false, loading: loadingSlot(160, 36) },
)
const RatioSlider = dynamic(
  () => import('@/components/ui/ratio-slider').then((m) => m.RatioSlider),
  {
    ssr: false,
    loading: loadingSlot(140, 24),
  },
)

function FaderStatic() {
  const [volume, setVolume] = useState(65)
  return (
    <div className="w-45">
      <Fader label="Volume" value={volume} onValueChange={setVolume} unit="%" size="sm" />
    </div>
  )
}

const LIVE: Record<string, () => ReactNode> = {
  'badge-blueprint': () => <Badge>Early Access</Badge>,
  'fader-blueprint': () => <FaderStatic />,
  'bounce-sidebar-blueprint': () => (
    <BounceSidebar items={['Dashboard', 'Projects', 'Team']} defaultValue={0} className="w-20" />
  ),
  'color-picker-blueprint': () => <ColorPicker coreSize={40} petalSize={28} />,
  'goo-dropdown-blueprint': () => <GooDropdown width={100} gap={10} itemHeight={24} />,
  'password-input-blueprint': () => (
    <PasswordInput placeholder="Password" containerClassName="w-40" />
  ),
  'ratio-slider-blueprint': () => <RatioSlider className="w-35" />,
}

const STAGE =
  'absolute inset-0 flex items-center justify-center contain-[layout_paint_size] transform-[translateZ(0)]'

function afterPaint(callback: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}

export function BlueprintReveal({ id, children }: { id: string; children: ReactNode }) {
  const live = LIVE[id]
  const rootRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)
  const mountedRef = useRef(false)
  const swappedRef = useRef(false)
  const liveReadyRef = useRef(false)

  const [mounted, setMounted] = useState(false)
  const [showLive, setShowLive] = useState(false)

  const trySwap = useCallback(() => {
    if (swappedRef.current || !liveReadyRef.current) return
    swappedRef.current = true
    afterPaint(() => setShowLive(true))
  }, [])

  const onLiveReady = useCallback(() => {
    liveReadyRef.current = true
    trySwap()
  }, [trySwap])

  const reset = useCallback(() => {
    activeRef.current = false
    swappedRef.current = false
    setShowLive(false)
  }, [])

  const startSequence = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true

    setShowLive(false)
    swappedRef.current = false
    liveReadyRef.current = mountedRef.current

    if (!mountedRef.current) {
      mountedRef.current = true
      setMounted(true)
    } else {
      liveReadyRef.current = true
      trySwap()
    }
  }, [trySwap])

  useEffect(() => {
    const group = rootRef.current?.closest('.group')
    if (!group) return
    const onFocusIn = () => startSequence()
    group.addEventListener('focusin', onFocusIn)
    return () => group.removeEventListener('focusin', onFocusIn)
  }, [startSequence])

  if (!live) {
    return <>{children}</>
  }

  return (
    <div
      ref={rootRef}
      className="relative h-35 w-55 bg-transparent contain-[layout_paint_size]"
      onMouseEnter={startSequence}
      onMouseLeave={reset}
      onTouchStart={startSequence}
    >
      {mounted && (
        <div
          inert={!showLive}
          aria-hidden={!showLive}
          className={cn(
            STAGE,
            'pointer-events-none origin-center transform-gpu transition-[opacity,transform,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:transform-none motion-reduce:filter-none',
            showLive ? 'z-10 scale-100 opacity-100 blur-none' : 'z-0 scale-95 opacity-0 blur-[2px]',
          )}
        >
          <LiveWarmup onReady={onLiveReady}>{live()}</LiveWarmup>
        </div>
      )}

      <div
        aria-hidden={showLive}
        className={cn(
          STAGE,
          'origin-center transform-gpu transition-[opacity,transform,filter] duration-(--motion-dur-base) ease-(--motion-ease-in-out) motion-reduce:transition-none motion-reduce:transform-none motion-reduce:filter-none',
          showLive
            ? 'z-0 scale-105 opacity-0 blur-[2px] pointer-events-none'
            : 'z-10 scale-100 opacity-100 blur-none',
        )}
      >
        {children}
      </div>
    </div>
  )
}

function LiveWarmup({ onReady, children }: { onReady: () => void; children: ReactNode }) {
  useEffect(() => {
    let cancelled = false
    afterPaint(() => {
      if (!cancelled) onReady()
    })
    return () => {
      cancelled = true
    }
  }, [onReady])

  return <>{children}</>
}

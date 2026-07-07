'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { ComponentItem } from '@/lib/components-registry'

const BounceSidebar = dynamic(
  () => import('@/components/ui/bounce-sidebar').then((m) => m.BounceSidebar),
  { ssr: false },
)

const ColorPicker = dynamic(
  () => import('@/components/ui/color-picker-standalone').then((m) => m.ColorPicker),
  { ssr: false },
)

const GooDropdown = dynamic(
  () => import('@/components/ui/goo-dropdown').then((m) => m.GooDropdown),
  { ssr: false },
)

const PasswordInput = dynamic(
  () => import('@/components/ui/password-input').then((m) => m.PasswordInput),
  { ssr: false },
)

const RatioSlider = dynamic(
  () => import('@/components/ui/ratio-slider').then((m) => m.RatioSlider),
  { ssr: false },
)

function LivePreview({ item }: { item: ComponentItem }) {
  switch (item.id) {
    case 'bounce-sidebar':
      return (
        <div className="flex size-full items-center justify-center p-2 sm:p-4">
          <BounceSidebar
            items={['Dashboard', 'Analytics', 'Projects', 'Team', 'Messages']}
            defaultValue={0}
            className="w-28 sm:w-36"
          />
        </div>
      )
    case 'color-picker':
      return (
        <div className="flex size-full items-center justify-center p-2 sm:p-4">
          <ColorPicker coreSize={40} petalSize={40} />
        </div>
      )
    case 'goo-dropdown':
      return (
        <div className="flex size-full items-center justify-center p-2 sm:p-4">
          <GooDropdown width={140} />
        </div>
      )
    case 'password-input':
      return (
        <div className="flex size-full items-center justify-center p-2 sm:p-4">
          <PasswordInput placeholder="Enter password" />
        </div>
      )
    case 'ratio-slider':
      return (
        <div className="flex size-full items-center justify-center p-2 sm:p-4">
          <RatioSlider className="w-48" />
        </div>
      )
    case 'table-of-contents':
      return (
        <div className="flex size-full items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-[180px] space-y-1.5">
            {['Introduction', 'Getting Started', 'API Reference'].map((label, i) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-[10px]"
                style={{
                  backgroundColor: i === 0 ? 'var(--color-accent)' : 'transparent',
                  color: i === 0 ? 'var(--color-bg)' : 'var(--color-muted)',
                }}
              >
                <div
                  className="size-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: i === 0 ? 'var(--color-bg)' : 'var(--color-border)',
                  }}
                />
                {label}
              </div>
            ))}
          </div>
          <div
            className="mt-2 flex h-8 w-full max-w-[180px] items-center justify-between rounded-md border px-3"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <span className="text-[10px] font-medium" style={{ color: 'var(--color-fg)' }}>
              Introduction
            </span>
            <svg className="size-3" style={{ color: 'var(--color-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </div>
      )
    default:
      return null
  }
}

function MediaPreview({ thumbnail, videoSrc }: { thumbnail: string; videoSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (hovered && videoRef.current) {
      videoRef.current.play().catch(() => {})
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [hovered])

  return (
    <div
      className="size-full relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {thumbnail && !loaded && <img src={thumbnail} alt="" className="size-full object-cover" />}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          className="size-full object-cover"
          muted
          loop
          playsInline
          onLoadedData={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

import { COMPONENT_MEDIA } from '@/lib/component-media'

const LIVE_PREVIEW_IDS = [
  'bounce-sidebar',
  'color-picker',
  'goo-dropdown',
  'password-input',
  'ratio-slider',
  'table-of-contents',
]

export function ComponentPreview({ item }: { item: ComponentItem }) {
  if (LIVE_PREVIEW_IDS.includes(item.id)) {
    return <LivePreview item={item} />
  }

  const media = COMPONENT_MEDIA[item.id]
  const thumbnail = media?.thumbnail || item.thumbnail || `/thumbnails/${item.id}.png`
  const videoSrc = media?.videoSrc || item.videoSrc || `/videos/${item.id}.mp4`

  return <MediaPreview thumbnail={thumbnail} videoSrc={videoSrc} />
}

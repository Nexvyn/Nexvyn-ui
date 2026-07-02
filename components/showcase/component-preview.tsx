'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import type { ComponentItem } from '@/lib/components-registry'

const BounceSidebar = dynamic(
  () => import('@/components/ui/bounce-sidebar').then((m) => m.BounceSidebar),
  { ssr: false },
)

const GooDropdown = dynamic(
  () => import('@/components/ui/goo-dropdown').then((m) => m.GooDropdown),
  { ssr: false },
)

function LivePreview({ item }: { item: ComponentItem }) {
  switch (item.id) {
    case 'bounce-sidebar':
      return (
        <div className="flex size-full items-center justify-center p-4">
          <BounceSidebar
            items={['Dashboard', 'Analytics', 'Projects', 'Team', 'Messages']}
            defaultValue={0}
            className="w-36"
          />
        </div>
      )
    case 'goo-dropdown':
      return (
        <div className="flex size-full items-center justify-center p-4">
          <GooDropdown width={180} />
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

const LIVE_PREVIEW_IDS = ['bounce-sidebar', 'goo-dropdown']

export function ComponentPreview({ item }: { item: ComponentItem }) {
  if (LIVE_PREVIEW_IDS.includes(item.id)) {
    return <LivePreview item={item} />
  }

  const media = COMPONENT_MEDIA[item.id]
  const thumbnail = media?.thumbnail || item.thumbnail || `/thumbnails/${item.id}.png`
  const videoSrc = media?.videoSrc || item.videoSrc || `/videos/${item.id}.mp4`

  return <MediaPreview thumbnail={thumbnail} videoSrc={videoSrc} />
}

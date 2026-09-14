'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { GlowOrbPreview } from './glow-orb-preview'

const GlowOrbAnatomy = dynamic(() =>
  import('@/components/diagrams/glow-orb-diagram').then((mod) => mod.GlowOrbAnatomy),
)

export function GlowOrbDemo() {
  const [view] = usePreviewControl('glow-orb-view', 'preview')

  return view === 'anatomy' ? <GlowOrbAnatomy /> : <GlowOrbPreview />
}

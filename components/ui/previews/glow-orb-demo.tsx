'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { GlowOrbAnatomy } from '@/components/diagrams/glow-orb-diagram'
import { GlowOrbPreview } from './glow-orb-preview'

export function GlowOrbDemo() {
  const [view] = usePreviewControl('glow-orb-view', 'preview')

  return view === 'anatomy' ? <GlowOrbAnatomy /> : <GlowOrbPreview />
}

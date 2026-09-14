'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { FluidOrbPreview } from './fluid-orb-preview'

const FluidOrbAnatomy = dynamic(() =>
  import('@/components/diagrams/fluid-orb-diagram').then((mod) => mod.FluidOrbAnatomy),
)

export function FluidOrbDemo() {
  const [view] = usePreviewControl('fluid-orb-view', 'preview')

  return view === 'anatomy' ? <FluidOrbAnatomy /> : <FluidOrbPreview />
}

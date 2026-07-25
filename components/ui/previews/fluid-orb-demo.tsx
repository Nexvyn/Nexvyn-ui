'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { FluidOrbAnatomy } from '@/components/diagrams/fluid-orb-diagram'
import { FluidOrbPreview } from './fluid-orb-preview'

export function FluidOrbDemo() {
  const [view] = usePreviewControl('fluid-orb-view', 'preview')

  return view === 'anatomy' ? <FluidOrbAnatomy /> : <FluidOrbPreview />
}

'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { FaderPreview } from './fader-preview'

const FaderAnatomy = dynamic(() =>
  import('@/components/diagrams/fader-diagram').then((mod) => mod.FaderAnatomy),
)

export function FaderDemo() {
  const [view] = usePreviewControl('fader-view', 'preview')

  return view === 'anatomy' ? <FaderAnatomy /> : <FaderPreview />
}

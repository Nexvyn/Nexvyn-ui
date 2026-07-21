'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { FaderAnatomy } from '@/components/diagrams/fader-diagram'
import { FaderPreview } from './fader-preview'

export function FaderDemo() {
  const [view] = usePreviewControl('fader-view', 'preview')

  return view === 'anatomy' ? <FaderAnatomy /> : <FaderPreview />
}

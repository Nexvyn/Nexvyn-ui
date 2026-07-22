'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { MorphNavAnatomy } from '@/components/diagrams/morph-nav-diagram'
import { MorphNavPreview } from './morph-nav-preview'

export function MorphNavDemo() {
  const [view] = usePreviewControl('morph-nav-view', 'preview')

  return view === 'anatomy' ? <MorphNavAnatomy /> : <MorphNavPreview />
}

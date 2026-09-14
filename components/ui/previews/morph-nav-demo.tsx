'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { MorphNavPreview } from './morph-nav-preview'

const MorphNavAnatomy = dynamic(() =>
  import('@/components/diagrams/morph-nav-diagram').then((mod) => mod.MorphNavAnatomy),
)

export function MorphNavDemo() {
  const [view] = usePreviewControl('morph-nav-view', 'preview')

  return view === 'anatomy' ? <MorphNavAnatomy /> : <MorphNavPreview />
}

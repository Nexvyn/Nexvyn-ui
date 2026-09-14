'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { DiaTextPreview } from './dia-text-preview'

const DiaTextAnatomy = dynamic(() =>
  import('@/components/diagrams/dia-text-diagram').then((mod) => mod.DiaTextAnatomy),
)

export function DiaTextDemo() {
  const [view] = usePreviewControl('dia-text-view', 'preview')

  return view === 'anatomy' ? <DiaTextAnatomy /> : <DiaTextPreview />
}

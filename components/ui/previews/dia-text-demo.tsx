'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { DiaTextAnatomy } from '@/components/diagrams/dia-text-diagram'
import { DiaTextPreview } from './dia-text-preview'

export function DiaTextDemo() {
  const [view] = usePreviewControl('dia-text-view', 'preview')

  return view === 'anatomy' ? <DiaTextAnatomy /> : <DiaTextPreview />
}

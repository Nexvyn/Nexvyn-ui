'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { SelectBreakdown } from '@/components/diagrams/select-diagram'
import { SelectPreview } from './select-preview'

export function SelectDemo() {
  const [view] = usePreviewControl('select-view', 'preview')

  return view === 'anatomy' ? <SelectBreakdown /> : <SelectPreview />
}

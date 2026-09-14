'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { SelectPreview } from './select-preview'

const SelectBreakdown = dynamic(() =>
  import('@/components/diagrams/select-diagram').then((mod) => mod.SelectBreakdown),
)

export function SelectDemo() {
  const [view] = usePreviewControl('select-view', 'preview')

  return view === 'anatomy' ? <SelectBreakdown /> : <SelectPreview />
}

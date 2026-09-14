'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { ColorPickerPreview } from './color-picker-preview'

const ColorPickerBreakdown = dynamic(() =>
  import('@/components/diagrams/color-picker-diagram').then((mod) => mod.ColorPickerBreakdown),
)

export function ColorPickerDemo() {
  const [view] = usePreviewControl('color-picker-view', 'preview')

  return view === 'anatomy' ? <ColorPickerBreakdown /> : <ColorPickerPreview />
}

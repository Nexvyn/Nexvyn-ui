'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ColorPickerBreakdown } from '@/components/diagrams/color-picker-diagram'
import { ColorPickerPreview } from './color-picker-preview'

export function ColorPickerDemo() {
  const [view] = usePreviewControl('color-picker-view', 'preview')

  return view === 'anatomy' ? <ColorPickerBreakdown /> : <ColorPickerPreview />
}

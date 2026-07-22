'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ComboboxAnatomy } from '@/components/diagrams/combobox-diagram'
import { ComboboxPreview } from './combobox-preview'

export function ComboboxDemo() {
  const [view] = usePreviewControl('combobox-view', 'preview')

  return view === 'anatomy' ? <ComboboxAnatomy /> : <ComboboxPreview />
}

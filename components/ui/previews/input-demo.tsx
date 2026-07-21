'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { InputAnatomy } from '@/components/diagrams/input-diagram'
import { InputPreview } from './input-preview'

export function InputDemo() {
  const [view] = usePreviewControl('input-view', 'preview')

  return view === 'anatomy' ? <InputAnatomy /> : <InputPreview />
}

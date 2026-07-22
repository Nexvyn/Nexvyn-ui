'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { InputCopyAnatomy } from '@/components/diagrams/input-copy-diagram'
import { InputCopyPreview } from './input-copy-preview'

export function InputCopyDemo() {
  const [view] = usePreviewControl('input-copy-view', 'preview')

  return view === 'anatomy' ? <InputCopyAnatomy /> : <InputCopyPreview />
}

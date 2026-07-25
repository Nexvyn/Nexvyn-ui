'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { InputMessageAnatomy } from '@/components/diagrams/input-message-diagram'
import { InputMessagePreview } from './input-message-preview'

export function InputMessageDemo() {
  const [view] = usePreviewControl('input-message-view', 'preview')

  return view === 'anatomy' ? <InputMessageAnatomy /> : <InputMessagePreview />
}

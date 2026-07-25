'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ClipboardFieldAnatomy } from '@/components/diagrams/clipboard-field-diagram'
import { ClipboardFieldPreview } from './clipboard-field-preview'

export function ClipboardFieldDemo() {
  const [view] = usePreviewControl('clipboard-field-view', 'preview')

  return view === 'anatomy' ? <ClipboardFieldAnatomy /> : <ClipboardFieldPreview />
}

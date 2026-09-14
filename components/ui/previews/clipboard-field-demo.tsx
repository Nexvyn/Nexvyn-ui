'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { ClipboardFieldPreview } from './clipboard-field-preview'

const ClipboardFieldAnatomy = dynamic(() =>
  import('@/components/diagrams/clipboard-field-diagram').then((mod) => mod.ClipboardFieldAnatomy),
)

export function ClipboardFieldDemo() {
  const [view] = usePreviewControl('clipboard-field-view', 'preview')

  return view === 'anatomy' ? <ClipboardFieldAnatomy /> : <ClipboardFieldPreview />
}

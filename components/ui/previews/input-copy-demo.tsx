'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { InputCopyPreview } from './input-copy-preview'

const InputCopyAnatomy = dynamic(() =>
  import('@/components/diagrams/input-copy-diagram').then((mod) => mod.InputCopyAnatomy),
)

export function InputCopyDemo() {
  const [view] = usePreviewControl('input-copy-view', 'preview')

  return view === 'anatomy' ? <InputCopyAnatomy /> : <InputCopyPreview />
}

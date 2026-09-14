'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { AiInputPreview } from './ai-input-preview'

const AiInputAnatomy = dynamic(() =>
  import('@/components/diagrams/ai-input-diagram').then((mod) => mod.AiInputAnatomy),
)

export function AiInputDemo() {
  const [view] = usePreviewControl('ai-input-view', 'preview')

  return view === 'anatomy' ? <AiInputAnatomy /> : <AiInputPreview />
}

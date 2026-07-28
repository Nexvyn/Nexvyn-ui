'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { AiInputAnatomy } from '@/components/diagrams/ai-input-diagram'
import { AiInputPreview } from './ai-input-preview'

export function AiInputDemo() {
  const [view] = usePreviewControl('ai-input-view', 'preview')

  return view === 'anatomy' ? <AiInputAnatomy /> : <AiInputPreview />
}

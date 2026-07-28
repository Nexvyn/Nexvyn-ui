'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ActionButtonDiagram } from '@/components/diagrams/action-button-diagram'
import { ActionButtonPreview } from './action-button-preview'

export function ActionButtonDemo() {
  const [view] = usePreviewControl('action-button-view', 'preview')

  return view === 'anatomy' ? <ActionButtonDiagram /> : <ActionButtonPreview />
}

'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { ActionButtonPreview } from './action-button-preview'

const ActionButtonDiagram = dynamic(() =>
  import('@/components/diagrams/action-button-diagram').then((mod) => mod.ActionButtonDiagram),
)

export function ActionButtonDemo() {
  const [view] = usePreviewControl('action-button-view', 'preview')

  return view === 'anatomy' ? <ActionButtonDiagram /> : <ActionButtonPreview />
}

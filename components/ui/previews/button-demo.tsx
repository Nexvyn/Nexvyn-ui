'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { ButtonDiagram } from '@/components/diagrams/button-diagram'
import { ButtonPreview } from './button-preview'

export function ButtonDemo() {
  const [view] = usePreviewControl('button-view', 'preview')

  return view === 'anatomy' ? <ButtonDiagram /> : <ButtonPreview />
}

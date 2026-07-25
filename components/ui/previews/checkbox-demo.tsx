'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { CheckboxAnatomy } from '@/components/diagrams/checkbox-diagram'
import { CheckboxPreview } from './checkbox-preview'

export function CheckboxDemo() {
  const [view] = usePreviewControl('checkbox-view', 'preview')

  return view === 'anatomy' ? <CheckboxAnatomy /> : <CheckboxPreview />
}

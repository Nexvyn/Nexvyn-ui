'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { RadioGroupAnatomy } from '@/components/diagrams/radio-group-diagram'
import { RadioGroupPreview } from './radio-group-preview'

export function RadioGroupDemo() {
  const [view] = usePreviewControl('radio-group-view', 'preview')

  return view === 'anatomy' ? <RadioGroupAnatomy /> : <RadioGroupPreview />
}

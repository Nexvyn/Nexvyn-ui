'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { RadioGroupPreview } from './radio-group-preview'

const RadioGroupAnatomy = dynamic(() =>
  import('@/components/diagrams/radio-group-diagram').then((mod) => mod.RadioGroupAnatomy),
)

export function RadioGroupDemo() {
  const [view] = usePreviewControl('radio-group-view', 'preview')

  return view === 'anatomy' ? <RadioGroupAnatomy /> : <RadioGroupPreview />
}

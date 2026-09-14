'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { CheckboxPreview } from './checkbox-preview'

const CheckboxAnatomy = dynamic(() =>
  import('@/components/diagrams/checkbox-diagram').then((mod) => mod.CheckboxAnatomy),
)

export function CheckboxDemo() {
  const [view] = usePreviewControl('checkbox-view', 'preview')

  return view === 'anatomy' ? <CheckboxAnatomy /> : <CheckboxPreview />
}

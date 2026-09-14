'use client'

import dynamic from 'next/dynamic'
import { usePreviewControl } from '@/components/detail/preview-controls'
import { AccordionPreview } from './accordion-preview'

const AccordionAnatomy = dynamic(() =>
  import('@/components/diagrams/accordion-diagram').then((mod) => mod.AccordionAnatomy),
)

export function AccordionDemo() {
  const [view] = usePreviewControl('accordion-view', 'preview')

  return view === 'anatomy' ? <AccordionAnatomy /> : <AccordionPreview />
}

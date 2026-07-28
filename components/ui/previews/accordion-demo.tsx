'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { AccordionAnatomy } from '@/components/diagrams/accordion-diagram'
import { AccordionPreview } from './accordion-preview'

export function AccordionDemo() {
  const [view] = usePreviewControl('accordion-view', 'preview')

  return view === 'anatomy' ? <AccordionAnatomy /> : <AccordionPreview />
}

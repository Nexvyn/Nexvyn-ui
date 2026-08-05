'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export function AccordionPreview() {
  return (
    <div className="flex w-full max-w-md items-center justify-center p-6">
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern with proper aria-expanded, aria-controls,
            and role=&quot;region&quot; attributes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It uses a grid-rows transition with a subtle y-settle for a polished unfold effect.
            Respects prefers-reduced-motion.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I use it controlled?</AccordionTrigger>
          <AccordionContent>
            Yes. Pass value and onValueChange for full controlled state, or use defaultValue for
            uncontrolled.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

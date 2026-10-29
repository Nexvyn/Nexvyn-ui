'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqItem } from '@/components/blocks/faq/faq'
import { cn } from '@/lib/utils'

export function FaqList({
  items,
  headingLevel = 3,
  className,
}: {
  items: FaqItem[]
  headingLevel?: 3 | 4
  className?: string
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('gap-0 border-t border-(--color-border)', className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="rounded-none border-0 border-b border-(--color-border) bg-transparent"
        >
          <AccordionTrigger
            headingLevel={headingLevel}
            className="gap-6 px-0 py-5 text-base hover:bg-transparent focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="max-w-xl px-0 pb-6 text-sm text-pretty text-(--color-muted) md:text-base">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

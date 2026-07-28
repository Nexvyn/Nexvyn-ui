import type { ComponentItem } from '@/lib/components-registry'

export const accordionMetadata: ComponentItem = {
  id: 'accordion',
  name: 'Accordion',
  collection: 'overlays',
  previewType: 'default',
  isNew: true,
  description:
    'A vertically stacked set of interactive headings that each reveal a section of content. Supports single/multiple expand modes, controlled and uncontrolled state, and a signature grid-rows unfold animation with y-settle.',
  registry: 'accordion',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click a trigger to expand/collapse its panel. Keyboard: Enter or Space to toggle, Tab to move between triggers.',
  props: [
    {
      name: 'type',
      type: "'single' | 'multiple'",
      description: 'Whether one or multiple items can be expanded at the same time.',
      required: true,
    },
    {
      name: 'collapsible',
      type: 'boolean',
      description:
        'When type is "single", allows closing all items. Has no effect in "multiple" mode.',
    },
    {
      name: 'value',
      type: 'string | string[]',
      description: 'Controlled expanded value(s).',
    },
    {
      name: 'defaultValue',
      type: 'string | string[]',
      description: 'Initial expanded value(s) for uncontrolled usage.',
    },
    {
      name: 'onValueChange',
      type: '(value: string | string[]) => void',
      description: 'Called when the expanded state changes.',
    },
  ],
  usage: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export function Demo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. Full WAI-ARIA accordion pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Grid-rows transition with reduced-motion support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
}

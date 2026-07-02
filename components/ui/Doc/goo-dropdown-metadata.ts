import type { ComponentItem } from '@/lib/components-registry'

export const gooDropdownMetadata: ComponentItem = {
  id: 'goo-dropdown',
  name: 'Gooey Dropdown',
  collection: 'inputs',
  previewType: 'default',
  description:
    'A dropdown menu with a gooey SVG filter effect that morphs a trigger pill into the panel using spring physics and CSS shape interpolation.',
  registry: 'goo-dropdown',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click the trigger button to expand the dropdown. Click outside or press Escape to close.',
  props: [
    {
      name: 'trigger',
      type: 'string',
      description: 'Text label for the trigger button.',
    },
    {
      name: 'items',
      type: 'DropdownItem[]',
      description: 'Array of menu items with label and optional onClick.',
    },
    {
      name: 'width',
      type: 'number',
      description: 'Width of the dropdown in pixels (default: 240).',
    },
    {
      name: 'align',
      type: '"start" | "end"',
      description: 'Horizontal alignment of the trigger button.',
    },
    {
      name: 'gap',
      type: 'number',
      description: 'Vertical gap between trigger and panel (default: 18).',
    },
    {
      name: 'itemHeight',
      type: 'number',
      description: 'Height of each menu item (default: 40).',
    },
    {
      name: 'buttonRadius',
      type: 'number',
      description: 'Border radius of the trigger button (default: 12).',
    },
    {
      name: 'panelRadius',
      type: 'number',
      description: 'Border radius of the expanded panel (default: 20).',
    },
    {
      name: 'fill',
      type: 'string',
      description: 'Background fill color for the goo blob.',
    },
    {
      name: 'gooStrength',
      type: 'number',
      description: 'Strength of the SVG goo blur filter (default: 8).',
    },
    {
      name: 'spring',
      type: 'SpringConfig',
      description: 'Spring configuration for the open/close animation.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root container.',
    },
  ],
  usage: `import { GooDropdown } from "@/components/ui/goo-dropdown"

export function Demo() {
  return (
    <GooDropdown
      trigger="Share"
      items={[
        { label: "Copy link", onClick: () => {} },
        { label: "Share on X", onClick: () => {} },
        { label: "Embed", onClick: () => {} },
      ]}
    />
  )
}`,
  credits: 'Inspired by aave.com/design',
}

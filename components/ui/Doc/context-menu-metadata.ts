import type { ComponentItem } from '@/lib/components-registry'

export const contextMenuMetadata: ComponentItem = {
  id: 'context-menu',
  name: 'Context Menu',
  collection: 'menus',
  previewType: 'default',

  description:
    'A right-click (or long-press) menu that opens at the pointer position with origin-aware unfurl, proximity highlight, and keyboard-shortcut hints.',
  registry: 'context-menu',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Right-click or long-press to open. The menu unfurls from the cursor position. Arrow keys navigate, Enter selects, Escape closes.',
  props: [
    { name: 'items', type: 'ContextMenuItem[]', description: 'The menu items.', required: true },
    { name: 'children', type: 'ReactNode', description: 'The trigger region.', required: true },
    { name: 'disabled', type: 'boolean', description: 'Disable the context menu.' },
  ],
  usage: `<ContextMenu items={[{ label: 'Copy', shortcut: '⌘C' }, { label: 'Delete', destructive: true }]}>
  <div>Right-click me</div>
</ContextMenu>`,
}

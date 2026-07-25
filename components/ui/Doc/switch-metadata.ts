import type { ComponentItem } from '@/lib/components-registry'

export const switchMetadata: ComponentItem = {
  id: 'switch',
  name: 'Switch',
  collection: 'inputs',
  previewType: 'default',
  isNew: true,
  basic: true,
  description: 'A toggle switch with thumb travel animation and hidden checkbox for forms.',
  registry: 'switch',
  dependencies: [],
  interaction: 'Click to toggle. Thumb slides between on/off positions.',
  props: [
    { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
    {
      name: 'onCheckedChange',
      type: '(checked: boolean) => void',
      description: 'Called on change.',
    },
    { name: 'label', type: 'string', description: 'Label text.' },
  ],
  usage: `<Switch checked={notifications} onCheckedChange={setNotifications} label="Notifications" />`,
}

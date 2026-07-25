import type { ComponentItem } from '@/lib/components-registry'

export const iconBarMetadata: ComponentItem = {
  id: 'icon-bar',
  name: 'Icon Bar',
  collection: 'menus',
  previewType: 'default',
  isNew: true,
  description:
    'A horizontal toolbar of icon buttons with bloom-open label reveal on hover/selection, accent dot indicator, and roving tabindex.',
  registry: 'icon-bar',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click an icon to select it. Hover or focus to bloom open the label. Click selected again to deselect.',
  props: [
    {
      name: 'value',
      type: 'string | null',
      description: 'Controlled selected value.',
    },
    {
      name: 'defaultValue',
      type: 'string | null',
      description: 'Initial selected value.',
    },
    {
      name: 'onValueChange',
      type: '(value: string | null) => void',
      description: 'Called when selection changes. null = deselected.',
    },
  ],
  usage: `<IconBar value={tool} onValueChange={setTool} aria-label="Drawing tools">
  <IconBarItem value="pen" label="Pen" icon={<PenIcon />} />
  <IconBarItem value="eraser" label="Eraser" icon={<EraserIcon />} />
  <IconBarItem value="fill" label="Fill" icon={<FillIcon />} disabled />
</IconBar>`,
}

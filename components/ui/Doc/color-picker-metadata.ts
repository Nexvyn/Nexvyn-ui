import type { ComponentItem } from '@/lib/components-registry'

export const colorPickerMetadata: ComponentItem = {
  id: 'color-picker',
  name: 'Blossom Picker',
  collection: 'inputs',
  previewType: 'default',
  description:
    'A blossom-style color picker with 3 variants: petal-only, petals with arc lightness slider, and an animated ring picker with spring-physics cursor repulsion.',
  registry: 'color-picker',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Click the core button to expand/collapse. Click a petal or dot to select its color. Drag the arc slider to adjust lightness. Use the variant prop to switch between blossom, blossom-arc, and ring modes.',
  credits: 'Original implementation inspired by blossom color picker patterns.',
  props: [
    {
      name: 'variant',
      type: "'blossom' | 'blossom-arc' | 'ring'",
      description: 'Picker style. blossom = petals only, blossom-arc = petals + arc slider, ring = animated dot ring.',
    },
    {
      name: 'value',
      type: 'BlossomColorPickerValue',
      description: 'Controlled color value for the picker.',
    },
    {
      name: 'defaultValue',
      type: 'BlossomColorPickerValue',
      description: 'Initial color value for uncontrolled usage.',
    },
    {
      name: 'colors',
      type: 'ColorInput[]',
      description: 'Custom color palette. Accepts hex strings or {h, s, l} objects.',
    },
    {
      name: 'onChange',
      type: '(color: BlossomColorPickerColor) => void',
      description: 'Called with the full color object when a color is selected or adjusted.',
    },
    {
      name: 'onCollapse',
      type: '(color: BlossomColorPickerColor) => void',
      description: 'Called with the current color when the picker collapses.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables all interactions.',
    },
    {
      name: 'openOnHover',
      type: 'boolean',
      description: 'Expands the picker on mouse hover instead of click.',
    },
    {
      name: 'initialExpanded',
      type: 'boolean',
      description: 'Starts the picker in expanded state.',
    },
    {
      name: 'animationDuration',
      type: 'number',
      description: 'Duration of expand/collapse animations in ms.',
    },
    {
      name: 'showAlphaSlider',
      type: 'boolean',
      description: 'Shows the arc slider for lightness adjustment.',
    },
    {
      name: 'coreSize',
      type: 'number',
      description: 'Size of the core button in pixels.',
    },
    {
      name: 'petalSize',
      type: 'number',
      description: 'Size of each petal in pixels.',
    },
    {
      name: 'collapsible',
      type: 'boolean',
      description: 'Whether the picker can be collapsed.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes for the root element.',
    },
  ],
  usage: `import { BlossomPicker } from "@/components/ui/color-picker-standalone"

export function Demo() {
  return (
    <div className="flex gap-8">
      <BlossomPicker variant="blossom" initialExpanded coreSize={48} petalSize={48} />
      <BlossomPicker variant="blossom-arc" initialExpanded coreSize={48} petalSize={48} />
    </div>
  )
}`,
}

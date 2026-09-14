import type { ComponentItem } from '@/lib/components-registry'

export const fluidOrbMetadata: ComponentItem = {
  id: 'fluid-orb',
  name: 'Fluid Orb',
  collection: 'effects',
  previewType: 'default',
  description:
    'A calm, monochrome WebGL fluid orb drawn from neutral design tokens with a subtle accent tint in its highlights and core. Colors are resolved from CSS variables and follow light and dark theme.',
  registry: 'fluid-orb',
  dependencies: [],
  interaction:
    'The orb pulses automatically with a simulated speaking cadence. Pass an audioLevel (0-1) to drive it with real microphone amplitude. Switch neutral tones in the preview (foreground / muted / subtle).',
  credits: 'Inspired by OpenAI ChatGPT Advanced Voice Mode orb',
  props: [
    {
      name: 'size',
      type: 'number',
      description: 'Diameter of the orb in pixels. Defaults to 280.',
    },
    {
      name: 'color',
      type: 'string',
      description:
        'Base tone as any CSS color, including a token such as var(--color-fg). Defaults to var(--color-muted).',
    },
    {
      name: 'accentColor',
      type: 'string',
      description:
        'Tint mixed into the fluid highlights and pulsing core. Defaults to var(--color-accent).',
    },
    {
      name: 'audioLevel',
      type: 'number',
      description:
        'Real microphone amplitude from 0 to 1. When provided, overrides the built-in sine wave simulation.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS classes.',
    },
  ],
  usage: `import { FluidOrb } from "@/components/ui/fluid-orb"

export function Demo() {
  return <FluidOrb size={300} />
}`,
}

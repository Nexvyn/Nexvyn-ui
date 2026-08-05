import type { ComponentItem } from '@/lib/components-registry'

export const fluidOrbMetadata: ComponentItem = {
  id: 'fluid-orb',
  name: 'Fluid Orb',
  collection: 'effects',
  previewType: 'default',
  description:
    'A WebGL fluid orb in muted/neutral design tokens (follows light and dark theme). Sphere normals, fBm noise, glass highlights, and a pulsing core driven by audio level.',
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
        'Optional hex override. When omitted, uses --color-muted so the orb stays neutral and theme-aware.',
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

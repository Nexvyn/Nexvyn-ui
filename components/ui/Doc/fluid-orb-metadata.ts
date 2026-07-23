import type { ComponentItem } from '@/lib/components-registry'

export const fluidOrbMetadata: ComponentItem = {
  id: 'fluid-orb',
  name: 'Fluid Orb',
  collection: 'effects',
  previewType: 'default',
  description:
    'A WebGL-rendered fluid orb with real-time GLSL shaders, 3D sphere normals, fBm noise, glass specular highlights, and a pulsing dark core. Reacts to audio input.',
  registry: 'fluid-orb',
  dependencies: [],
  interaction:
    'The orb pulses automatically with a simulated speaking cadence. Pass an audioLevel (0-1) to drive it with real microphone amplitude.',
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
      description: 'Base hex color for the orb. Defaults to OpenAI signature off-white (#E8EDF3).',
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
  return <FluidOrb size={300} color="#E8EDF3" />
}`,
}

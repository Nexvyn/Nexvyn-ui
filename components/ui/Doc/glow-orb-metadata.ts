import type { ComponentItem } from '@/lib/components-registry'

export const glowOrbMetadata: ComponentItem = {
  id: 'glow-orb',
  name: 'Glow Orb',
  collection: 'effects',
  previewType: 'default',
  isNew: true,
  description:
    'A WebGL fbm-noise glow orb with state-driven colors, volume-responsive scale and glow, idle and connecting pulse animations, and a settle-back transition.',
  registry: 'glow-orb',
  dependencies: [],
  interaction:
    'Switch between idle, listening, speaking, connecting, thinking, and error states. The orb scales and glows based on volume. Hover to see a subtle scale and brightness boost.',
  credits: 'Port of alexanderqchen/orb-ui CircleTheme with FluidOrb shader',
  props: [
    {
      name: 'state',
      type: "'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error'",
      description:
        'The current orb state. Controls color palette, animation behavior, scale, and glow.',
      options: ['idle', 'connecting', 'listening', 'thinking', 'speaking', 'error'],
    },
    {
      name: 'volume',
      type: 'number',
      description: 'Audio volume level from 0 to 1. Drives scale and glow intensity.',
    },
    {
      name: 'size',
      type: 'number',
      description: 'Width and height of the orb container in pixels.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      description: 'Disables hover and click interactions.',
    },
    {
      name: 'interactive',
      type: 'boolean',
      description: 'Renders as a button instead of a div for click support.',
    },
  ],
  usage: `import { GlowOrb } from "@/components/ui/glow-orb"

export function Demo() {
  return <GlowOrb state="listening" volume={0.4} size={200} />
}`,
}

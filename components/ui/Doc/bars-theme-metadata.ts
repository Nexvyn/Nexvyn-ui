import type { ComponentItem } from '@/lib/components-registry'

export const barsThemeMetadata: ComponentItem = {
  id: 'bars-theme',
  name: 'Bars Theme',
  collection: 'effects',
  previewType: 'default',
  description:
    'A traveling-wave bars visualization with 5 vertical bars sharing a sine-wave frequency, evenly phase-shifted left to right so the wave appears to travel across. Volume scales bar heights with a diamond-shaped idle boost.',
  registry: 'bars-theme',
  dependencies: [],
  interaction:
    'Switch between idle, listening, speaking, connecting, and thinking states. Hover over the bars to see the diamond-shaped boost effect. Volume drives bar height reactively.',
  credits: 'Faithful port of alexanderqchen/orb-ui BarsTheme',
  props: [
    {
      name: 'state',
      type: "'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error'",
      description:
        'The current orb state. Controls bar color, animation pattern, and wave behavior.',
      options: ['idle', 'connecting', 'listening', 'thinking', 'speaking', 'error'],
    },
    {
      name: 'volume',
      type: 'number',
      description: 'Audio volume level from 0 to 1. Drives bar height scaling.',
    },
    {
      name: 'size',
      type: 'number',
      description: 'Width and height of the bars container in pixels.',
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
  usage: `import { BarsTheme } from "@/components/ui/bars-theme"

export function Demo() {
  return <BarsTheme state="listening" volume={0.4} size={200} />
}`,
}

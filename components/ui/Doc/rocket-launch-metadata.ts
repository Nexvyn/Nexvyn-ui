import type { ComponentItem } from '@/lib/components-registry'

export const rocketLaunchMetadata: ComponentItem = {
  id: 'rocket-launch',
  name: 'Rocket Launch',
  collection: 'illustration',
  previewType: 'default',
  size: 'lg',
  description:
    'A hand-drawn rocket illustration that ignites its engines and lifts off the pad on demand, with a reset back to rest.',
  registry: 'rocket-launch',
  dependencies: [],
  interaction:
    'Click Launch to ignite the engines and lift off; Reset returns the rocket to the pad.',
  props: [
    {
      name: 'launchLabel',
      type: 'string',
      description: 'Label for the button that starts the launch sequence. Defaults to "Launch".',
    },
    {
      name: 'resetLabel',
      type: 'string',
      description: 'Label for the button that resets the rocket to the pad. Defaults to "Reset".',
    },
    {
      name: 'onLaunch',
      type: '() => void',
      description: 'Called once the rocket leaves the pad, after the ignition delay.',
    },
    {
      name: 'onReset',
      type: '() => void',
      description: 'Called when the reset button returns the rocket to the pad.',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root element.',
    },
  ],
  usage: `import { RocketLaunchIllustration } from "@/components/illustration/rocket-launch"

export function Example() {
  return <RocketLaunchIllustration />
}`,
}

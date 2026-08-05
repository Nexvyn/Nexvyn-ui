import type { ComponentItem } from '@/lib/components-registry'

export const navigationCompassMetadata: ComponentItem = {
  id: 'navigation-compass',
  name: 'Navigation Compass',
  collection: 'illustration',
  previewType: 'default',
  size: 'lg',
  isNew: true,
  description:
    'A draggable compass dial that doubles as a nav menu — scroll rotates it with physical lag, and links entering the active zone scale up and light with the accent.',
  registry: 'navigation-compass',
  dependencies: [{ name: 'motion' }],
  interaction:
    'Drag the dial to spin it with momentum, or scroll the page to rotate it. Links passing through the active zone scale up and highlight.',
  props: [
    {
      name: 'links',
      type: 'CompassNavLink[]',
      required: true,
      description:
        'Nav entries placed around the dial. Each has an `angle` (0 = top, clockwise), a `label`, and an `href`.',
    },
    {
      name: 'activeZoneAngle',
      type: 'number',
      required: true,
      description:
        'Angle in degrees (0 = top, clockwise) of the active-zone pointer. Links near it get the highlight treatment.',
    },
    {
      name: 'activeZoneThreshold',
      type: 'number',
      description: 'Half-width of the active-zone cone in degrees. Defaults to 15.',
    },
    {
      name: 'roseRotation',
      type: 'number',
      description:
        "Extra rotation of the compass rose in degrees. The artwork's spikes already sit on the diagonals, so the default of 0 keeps them aligned to the 45/135/225/315 marks.",
    },
    {
      name: 'tickCount',
      type: 'number',
      description: 'Number of tick marks around the dial. Defaults to 180.',
    },
    {
      name: 'size',
      type: 'number',
      description:
        'SVG viewBox size in px (square); all radii scale from it. The rendered element stays fluid. Defaults to 756.',
    },
    {
      name: 'showDetails',
      type: 'boolean',
      description:
        'Renders the active-zone cone plus a live rotation and active-link readout. Defaults to false.',
    },
    {
      name: 'label',
      type: 'string',
      description: 'Accessible name for the navigation landmark. Defaults to "Navigation compass".',
    },
    {
      name: 'className',
      type: 'string',
      description: 'Extra classes merged onto the root element.',
    },
  ],
  usage: `import { NavigationCompass } from "@/components/illustration/navigation-compass"

const links = [
  { angle: 0, label: "Home", href: "/" },
  { angle: 90, label: "Studio", href: "/studio" },
  { angle: 180, label: "About", href: "/about" },
  { angle: 270, label: "Contact", href: "/contact" },
]

export function Example() {
  return <NavigationCompass links={links} activeZoneAngle={0} />
}`,
}

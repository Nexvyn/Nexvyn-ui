'use client'

import { usePreviewControl } from '@/components/detail/preview-controls'
import { NavigationCompassAnatomy } from '@/components/diagrams/navigation-compass-diagram'
import {
  NavigationCompass,
  type CompassNavLink,
} from '@/components/illustration/navigation-compass'

const LINKS: CompassNavLink[] = [
  { angle: 0, label: 'Home', href: '#' },
  { angle: 45, label: 'Work', href: '#' },
  { angle: 90, label: 'Studio', href: '#' },
  { angle: 135, label: 'Journal', href: '#' },
  { angle: 180, label: 'About', href: '#' },
  { angle: 225, label: 'Archive', href: '#' },
  { angle: 270, label: 'Contact', href: '#' },
  { angle: 315, label: 'Index', href: '#' },
]

export function NavigationCompassDemo() {
  const [view] = usePreviewControl('navigation-compass-view', 'preview')
  const [details] = usePreviewControl('navigation-compass-details', 'off')

  if (view === 'anatomy') return <NavigationCompassAnatomy />

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <NavigationCompass
        links={LINKS}
        activeZoneAngle={75}
        showDetails={details === 'on'}
        className="w-[min(100%,32rem)]"
      />
    </div>
  )
}

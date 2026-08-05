'use client'

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

export function NavigationCompassPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      {/* 75deg matches the fixed spike (arms at 45 + roseRotation 30). */}
      <NavigationCompass links={LINKS} activeZoneAngle={75} className="w-[min(100%,32rem)]" />
    </div>
  )
}

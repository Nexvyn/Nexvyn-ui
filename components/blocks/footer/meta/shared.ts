import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const footerBaseProps: ComponentProp[] = [
  {
    name: 'brand',
    type: 'ReactNode',
    description: 'Wordmark or logo. Defaults to the "Nexvyn UI" wordmark.',
  },
  {
    name: 'copyright',
    type: 'ReactNode',
    description: 'Small print line. Defaults to "© 2026 Nexvyn". Pass null to hide it.',
  },
  { name: 'className', type: 'string', description: 'Merged onto the footer with cn().' },
]

export const footerSocialProp: ComponentProp = {
  name: 'socials',
  type: '{ label: string; href: string; icon: ReactNode }[]',
  description:
    'Icon links with 44px targets. The label becomes the aria-label. Defaults to GitHub and X.',
}

export const FOOTER_DEPENDENCIES = [
  { name: '@radix-ui/react-slot' },
  { name: '@hugeicons/react' },
  { name: '@hugeicons/core-free-icons' },
]

export const footerShared: Pick<
  ComponentItem,
  'collection' | 'previewType' | 'dependencies' | 'interaction'
> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: FOOTER_DEPENDENCIES,
  interaction:
    'A footer landmark with labelled nav regions. Links brighten from muted to foreground on hover and keyboard focus, with the accent focus ring. Links grow to 44px targets on touch screens, and icon links always are.',
}

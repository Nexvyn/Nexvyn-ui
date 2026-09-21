import type { ComponentItem } from '@/lib/components-registry'
import {
  footerBaseProps,
  footerShared,
  footerSocialProp,
} from '@/components/blocks/footer/meta/shared'

export const footerSignatureMetadata: ComponentItem = {
  ...footerShared,
  dependencies: [...(footerShared.dependencies ?? []), { name: 'motion' }],
  id: 'footer-signature',
  name: 'Signature',
  parent: 'footer',
  href: '/blocks/footer/signature',
  registry: 'footer-signature',
  interaction:
    'A minimal footer landmark. The first time it scrolls into view, the handwritten signature traces its outline and then fills in, once. It is an image with its own label, and reduced motion shows it already signed.',
  description:
    'A one row footer for personal sites: copyright, a handwritten signature in the middle and icon links. On mobile the signature sits above the row.',
  props: [
    { name: 'signature', type: 'string', description: 'Signed text. Defaults to "Nexvyn".' },
    {
      name: 'signatureLabel',
      type: 'string',
      description: 'Accessible name of the signature image. Defaults to "Signed, Nexvyn".',
    },
    {
      name: 'signatureFont',
      type: 'string',
      description:
        'CSS font family of the signature. Defaults to var(--font-handwriting) with a cursive fallback.',
    },
    footerSocialProp,
    ...footerBaseProps.filter((prop) => prop.name !== 'brand'),
  ],
  usage: `<FooterSignature signature="Ada Park" signatureLabel="Signed, Ada Park" />`,
}

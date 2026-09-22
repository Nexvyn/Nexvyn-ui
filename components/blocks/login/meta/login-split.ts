import type { ComponentItem } from '@/lib/components-registry'
import { loginFormProps, loginShared, loginImageProps } from '@/components/blocks/login/meta/shared'

export const loginSplitMetadata: ComponentItem = {
  ...loginShared,
  id: 'login-split',
  name: 'Split',
  parent: 'login',
  href: '/blocks/login/split',
  registry: 'login-split',
  description:
    'A two column sign in page: the form with a home mark on the start side, a full height photo on the end side from the large breakpoint. The photo dims and turns gray in dark mode.',
  props: [
    ...loginImageProps,
    {
      name: 'mark',
      type: 'ReactNode',
      description: 'Logo above the heading. Pass null to hide it.',
    },
    ...loginFormProps,
  ],
  usage: `<LoginSplit imageSrc="/images/login.jpg" onSubmit={handleSignIn} />`,
}

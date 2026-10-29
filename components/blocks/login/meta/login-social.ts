import type { ComponentItem } from '@/lib/components-registry'
import { loginFormProps, loginShared } from '@/components/blocks/login/meta/shared'

export const loginSocialMetadata: ComponentItem = {
  ...loginShared,
  id: 'login-social',
  name: 'Social first',
  parent: 'login',
  href: '/blocks/login/social',
  registry: 'login-social',
  description:
    'A centered sign in page that leads with full width Google and Apple buttons, then the email and password form under a divider.',
  props: [...loginFormProps],
  usage: `<LoginSocial
  onProvider={(id) => signInWith(id)}
  onSubmit={({ email, password }) => signIn(email, password)}
/>`,
}

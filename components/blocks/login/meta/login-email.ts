import type { ComponentItem } from '@/lib/components-registry'
import { loginFormProps, loginShared } from '@/components/blocks/login/meta/shared'

export const loginEmailMetadata: ComponentItem = {
  ...loginShared,
  id: 'login-email',
  name: 'Email first',
  parent: 'login',
  href: '/blocks/login/email',
  registry: 'login-email',
  description:
    'A centered sign in page that leads with the email and password form, with Google and Apple side by side under the divider.',
  props: [...loginFormProps],
  usage: `<LoginEmail onSubmit={({ email, password }) => signIn(email, password)} />`,
}

import type { ComponentItem } from '@/lib/components-registry'
import { loginFormProps, loginShared } from '@/components/blocks/login/meta/shared'

export const loginMetadata: ComponentItem = {
  ...loginShared,
  id: 'login',
  name: 'Login',
  href: '/blocks/login',
  registry: 'login',
  description:
    'Sign in pages built from one LoginForm: provider buttons before or after the email form, centered on its own or beside a photo panel.',
  props: [
    {
      name: 'providerPlacement',
      type: '"before" | "after"',
      description: 'Where the provider buttons sit relative to the email form.',
      options: ['"before"', '"after"'],
    },
    {
      name: 'providerLayout',
      type: '"stack" | "grid"',
      description: 'Full width stacked buttons, or two side by side.',
      options: ['"stack"', '"grid"'],
    },
    ...loginFormProps,
  ],
  usage: `<LoginForm
  providerPlacement="after"
  providerLayout="grid"
  onSubmit={({ email, password }) => signIn(email, password)}
/>`,
}

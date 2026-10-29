import type { ComponentItem, ComponentProp } from '@/lib/components-registry'

export const loginFormProps: ComponentProp[] = [
  { name: 'title', type: 'ReactNode', description: 'Page heading. Defaults to "Welcome back".' },
  { name: 'description', type: 'ReactNode', description: 'Line under the heading.' },
  {
    name: 'onSubmit',
    type: '(values: { email: string; password: string }) => void',
    description: 'Called with the email and password when the form is submitted.',
  },
  {
    name: 'onProvider',
    type: '(providerId: string) => void',
    description: 'Called with the provider id when a sign in button is pressed.',
  },
  {
    name: 'providers',
    type: '{ id: string; label: string; icon: ReactNode }[]',
    description: 'Sign in providers. Defaults to Google and Apple. Pass [] to hide them.',
  },
  {
    name: 'error',
    type: 'ReactNode',
    description:
      'Error under the fields. Sets aria-invalid on both inputs, links them with aria-describedby and is announced as an alert.',
  },
  { name: 'forgotHref', type: 'string', description: 'Where the forgot password link points.' },
  { name: 'signupHref', type: 'string', description: 'Where the create account link points.' },
  {
    name: 'emailLabel, passwordLabel, submitLabel',
    type: 'string',
    description: 'Visible labels, all overridable for localization.',
  },
  {
    name: 'showPasswordLabel, hidePasswordLabel',
    type: 'string',
    description: 'Accessible names of the password toggle in each state.',
  },
]

export const loginImageProps: ComponentProp[] = [
  {
    name: 'imageSrc',
    type: 'string',
    description:
      'Photo on the end side from the large breakpoint. Without it the panel is a quiet surface.',
  },
  {
    name: 'imageAlt',
    type: 'string',
    description: 'Alt text of the photo. Defaults to empty, since the photo is decorative.',
  },
]

export const LOGIN_DEPENDENCIES = [
  { name: '@hugeicons/react' },
  { name: '@hugeicons/core-free-icons' },
]

export const loginShared: Pick<
  ComponentItem,
  'collection' | 'previewType' | 'dependencies' | 'interaction'
> = {
  collection: 'blocks',
  previewType: 'default',
  dependencies: LOGIN_DEPENDENCIES,
  interaction:
    'Every field has a visible label and the right autocomplete, so password managers fill it. The password toggle is a 44px button with aria-pressed and a label for each state; its eye icons crossfade instead of cutting. Errors set aria-invalid and are announced as an alert. All controls are 44px tall with the accent focus ring.',
}

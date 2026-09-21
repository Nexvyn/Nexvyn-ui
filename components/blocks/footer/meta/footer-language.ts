import type { ComponentItem } from '@/lib/components-registry'
import {
  footerBaseProps,
  footerShared,
  footerSocialProp,
} from '@/components/blocks/footer/meta/shared'

export const footerLanguageMetadata: ComponentItem = {
  ...footerShared,
  id: 'footer-language',
  name: 'Language',
  parent: 'footer',
  href: '/blocks/footer/language',
  registry: 'footer-language',
  interaction:
    'A footer landmark with a native language select, so keyboard, screen reader and mobile pickers all work as the platform expects. The select has a hidden label, a 44px height and the accent focus ring. Icon links and the cookie link follow the shared footer link styles.',
  description:
    'A footer with a utility column: wordmark, icon links, a language select, cookie settings and copyright on the start side, four link columns on the end side.',
  props: [
    {
      name: 'languages',
      type: '{ value: string; label: string }[]',
      description: 'Options in the select. Write each label in its own language.',
    },
    { name: 'language', type: 'string', description: 'Controlled language value.' },
    {
      name: 'defaultLanguage',
      type: 'string',
      description: 'Initial language when uncontrolled. Defaults to "en".',
    },
    {
      name: 'onLanguageChange',
      type: '(value: string) => void',
      description: 'Called when a language is picked.',
    },
    {
      name: 'languageLabel',
      type: 'string',
      description: 'Hidden label of the select. Defaults to "Language".',
    },
    footerSocialProp,
    {
      name: 'columns',
      type: '{ title: string; links: { label: string; href: string }[] }[]',
      description: 'Titled link columns.',
    },
    {
      name: 'cookieLabel',
      type: 'string',
      description: 'Cookie settings link text. Empty hides it.',
    },
    { name: 'cookieHref', type: 'string', description: 'Where the cookie link points.' },
    ...footerBaseProps,
  ],
  usage: `<FooterLanguage
  language={locale}
  onLanguageChange={setLocale}
  languages={[
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
  ]}
/>`,
}

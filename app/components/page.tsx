import { pageMetadata } from '@/lib/seo'
import ComponentsPage from './components-page'

export const metadata = pageMetadata({
  title: 'Components',
  description:
    'Browse every Nexvyn/UI component — inputs, menus, sliders, overlays and illustrations with live previews, props and install commands.',
  path: '/components',
})

export default function Page() {
  return <ComponentsPage />
}

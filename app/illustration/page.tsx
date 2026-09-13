import { pageMetadata } from '@/lib/seo'
import IllustrationPage from './illustration-page'

export const metadata = pageMetadata({
  title: 'Illustration',
  description:
    'Animated React illustrations from Nexvyn/UI — device mockups, orbs and motion pieces ready to drop into your product.',
  path: '/illustration',
})

export default function Page() {
  return <IllustrationPage />
}

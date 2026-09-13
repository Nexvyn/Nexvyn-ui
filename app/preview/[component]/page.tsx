import type { Metadata } from 'next'
import { COMPONENTS } from '@/lib/components-registry'
import PreviewPage from './preview-page'

export const dynamicParams = false

export function generateStaticParams() {
  return COMPONENTS.map((item) => ({ component: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>
}): Promise<Metadata> {
  const { component } = await params
  const item = COMPONENTS.find((entry) => entry.id === component)

  return {
    title: item ? `${item.name} Preview` : 'Preview',
    alternates: item ? { canonical: `/components/${item.id}` } : undefined,
    robots: { index: false, follow: true },
  }
}

export default function Page() {
  return <PreviewPage />
}

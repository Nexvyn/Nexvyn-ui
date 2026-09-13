import type { MetadataRoute } from 'next'
import { COMPONENTS, getComponentHref } from '@/lib/components-registry'
import { SITE_URL } from '@/lib/seo'

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/components', priority: 0.9 },
  { path: '/illustration', priority: 0.7 },
  { path: '/design', priority: 0.6 },
  { path: '/mcp', priority: 0.6 },
  { path: '/changelog', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority,
    })),
    ...COMPONENTS.map((item) => ({
      url: `${SITE_URL}${getComponentHref(item.id)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}

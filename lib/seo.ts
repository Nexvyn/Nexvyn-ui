import type { Metadata } from 'next'

export const SITE_URL = 'https://ui.nexvyn.dev'
export const SITE_NAME = 'Nexvyn/UI'
export const SITE_SEARCH_NAME = 'Nexvyn UI'
export const SITE_ALTERNATE_NAMES = ['Nexvyn UI', 'Nexvyn', 'NexvynUI', 'Nexvyn UI Library']
export const SITE_HOME_TITLE = 'Nexvyn UI: Polished React UI Library for Design Engineers'
export const SITE_DESCRIPTION =
  'Nexvyn UI is a polished, free React UI library for design engineers. Accessible components with smooth motion, built with TypeScript and Tailwind CSS. Install any component with the shadcn CLI.'

export const SITE_KEYWORDS = [
  'nexvyn',
  'nexvyn ui',
  'nexvyn/ui',
  'nexvyn ui library',
  'polished ui library',
  'react ui library',
  'react component library',
  'animated react components',
  'ui library for design engineers',
  'nextjs ui library',
  'tailwind css components',
  'shadcn registry',
  'shadcn components',
  'accessible react components',
  'typescript ui components',
  'motion ui components',
]

const OG_IMAGE = {
  url: '/opengraph-image.png',
  type: 'image/png',
  width: 1200,
  height: 630,
  alt: 'Nexvyn UI: polished React UI library for design engineers',
}

interface PageMetadataOptions {
  title?: string
  description?: string
  path: string
}

export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
}: PageMetadataOptions): Metadata {
  const socialTitle = title ? `${title} | ${SITE_SEARCH_NAME}` : SITE_HOME_TITLE

  return {
    title: title ?? { absolute: SITE_HOME_TITLE },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Nexvyn',
      creator: '@Nexvyn',
      title: socialTitle,
      description,
      images: ['/twitter-image.png'],
    },
  }
}

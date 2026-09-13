import type { Metadata, Viewport } from 'next'
import { Caveat, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Script from 'next/script'
import { Agentation } from 'agentation'
import {
  SITE_ALTERNATE_NAMES,
  SITE_DESCRIPTION,
  SITE_HOME_TITLE,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_SEARCH_NAME,
  SITE_URL,
} from '@/lib/seo'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-loaded',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_HOME_TITLE,
    template: `%s | ${SITE_SEARCH_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  authors: [{ name: 'Nexvyn', url: 'https://github.com/Nexvyn' }],
  creator: 'Nexvyn',
  publisher: 'Nexvyn',
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: '/',
    title: SITE_HOME_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Nexvyn',
    creator: '@Nexvyn',
    title: SITE_HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

const JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
      author: { '@id': `${SITE_URL}/#organization` },
      creator: { '@id': `${SITE_URL}/#organization` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}/#library`,
      name: SITE_SEARCH_NAME,
      alternateName: SITE_ALTERNATE_NAMES,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      codeRepository: 'https://github.com/Nexvyn/Nexvyn-ui',
      programmingLanguage: ['TypeScript', 'React'],
      keywords: SITE_KEYWORDS.join(', '),
      author: { '@id': `${SITE_URL}/#organization` },
      creator: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Nexvyn',
      alternateName: SITE_ALTERNATE_NAMES,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      sameAs: ['https://github.com/Nexvyn', 'https://x.com/Nexvyn'],
    },
  ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${jetbrainsMono.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON_LD }} />
        <Script
          id="theme-setup"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (stored !== 'light' && !stored && systemDark);
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                  } else {
                    root.classList.remove('dark');
                  }
                  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-dvh bg-(--color-bg) text-(--color-fg) font-sans antialiased no-scrollbar"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'development' && <Agentation />}
        <svg
          width="0"
          height="0"
          style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
        >
          <defs>
            <clipPath id="squircle-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.5 C 0,0.22 0.22,0 0.5,0 C 0.78,0 1,0.22 1,0.5 C 1,0.78 0.78,1 0.5,1 C 0.22,1 0,0.78 0,0.5 Z" />
            </clipPath>
          </defs>
        </svg>
        <Analytics />
      </body>
    </html>
  )
}

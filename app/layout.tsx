import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Script from 'next/script'
import { Agentation } from 'agentation'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ui.nexvyn.dev'),
  title: {
    default: 'Nexvyn/UI',
    template: '%s | Nexvyn/UI',
  },
  description: 'A modern React component library built with Next.js, TypeScript, and Tailwind CSS.',
  keywords: [
    'react component library',
    'nextjs ui library',
    'tailwind css components',
    'typescript ui',
    'nexvyn',
  ],
  authors: [{ name: 'Nexvyn' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Nexvyn/UI',
    description:
      'A modern React component library built with Next.js, TypeScript, and Tailwind CSS.',
    url: 'https://ui.nexvyn.dev',
    siteName: 'Nexvyn/UI',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  other: {
    'twitter:card': 'summary_large_image',
    'twitter:title': 'Nexvyn/UI',
    'twitter:description':
      'A modern React component library built with Next.js, TypeScript, and Tailwind CSS.',
    'twitter:image': '/og.png',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={caveat.variable} suppressHydrationWarning>
      <head>
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

        <Analytics />
      </body>
    </html>
  )
}

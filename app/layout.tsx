import { Caveat } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Agentation } from 'agentation'
import Script from 'next/script'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-handwriting',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Nexvyn/UI',
    template: '%s | Nexvyn/UI',
  },
  description: 'A modern React component library built with Next.js, TypeScript, and Tailwind CSS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={caveat.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
        className="min-h-dvh bg-(--color-bg) text-(--color-fg) font-sans antialiased"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Analytics />
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  )
}

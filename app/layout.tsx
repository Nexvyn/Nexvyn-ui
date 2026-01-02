import { RootProvider } from "fumadocs-ui/provider"
import "./global.css"
import { Inter_Tight, Pixelify_Sans, Meow_Script } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "./providers/theme-provider"
import { SearchRegistryProvider } from "@/hooks/use-search-registry"
import { ConfigProvider } from "@/hooks/use-config"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.nexvyn.dev"),
  title: {
    default: "Nexvyn UI",
    template: "%s | Nexvyn UI",
  },
  description:
    "Nexvyn UI — A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
  keywords: [
    "react",
    "ui library",
    "tailwindcss",
    "documentation",
    "nexvyn",
    "components",
    "nextjs",
  ],
  authors: [{ name: "Nexvyn" }],
  creator: "Nexvyn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ui.nexvyn.dev",
    title: "Nexvyn/ui",
    description:
      "A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
    siteName: "Nexvyn/ui",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexvyn UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexvyn/ui",
    description:
      "A modern, lightweight, and copy-paste React UI library for building stunning documentation and landing pages.",
    images: ["/og-image.png"],
    creator: "@nexvyn",
  },
  icons: {
    icon: "/logo/static/logo.svg",
    icon: "/logo/static/logo.svg",
  },
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchRegistryProvider>
            <ConfigProvider>
              <RootProvider search={{ enabled: false }}>{children}</RootProvider>
            </ConfigProvider>
          </SearchRegistryProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

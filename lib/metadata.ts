import type { Metadata } from "next"

const siteConfig = {
  name: "nexvyn/ui",
  description: "Beautiful components. Infinite customization.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
}

export function createStaticOGMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  }
}

import { IconsComingSoonClient } from "./coming-soon-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Icons | Coming Soon – Nexvyn UI",
  description:
    "We are crafting high-quality icons to help you build even faster. Stay tuned for updates.",
  keywords: [
    "Nexvyn UI icons",
    "React icons",
    "animated icons",
    "UI icons",
    "icon library",
    "SVG icons",
    "coming soon",
  ],
  openGraph: {
    title: "Icons – Coming Soon | Nexvyn UI",
    description:
      "High-quality, beautifully crafted icons are on the way. Be the first to know when they launch.",
    type: "website",
    url: "/icons",
    siteName: "Nexvyn UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Icons – Coming Soon | Nexvyn UI",
    description:
      "High-quality, beautifully crafted icons are on the way. Stay tuned for updates.",
  },
  alternates: {
    canonical: "/icons",
  },
}

export default function IconsPage() {
  return <IconsComingSoonClient />
}

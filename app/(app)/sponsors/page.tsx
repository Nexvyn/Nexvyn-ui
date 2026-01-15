import { Navbar } from "../Home/navbar"
import { Footer } from "../Home/footer"
import { SponsorsSection } from "./sponsors-section"

export const metadata = {
  title: "Sponsors – Nexvyn UI",
  description:
    "Support Nexvyn UI development. Our sponsors help us build and maintain beautiful animated components.",
  keywords: [
    "Nexvyn UI sponsors",
    "open source sponsorship",
    "support development",
    "animated components",
    "React components",
    "UI library funding",
  ],
  openGraph: {
    title: "Become a Sponsor – Nexvyn UI",
    description:
      "Support the development of beautiful, animated React components. Join our sponsors and help shape the future of Nexvyn UI.",
    type: "website",
    url: "/sponsors",
    siteName: "Nexvyn UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Sponsor – Nexvyn UI",
    description:
      "Support the development of beautiful, animated React components. Join our sponsors today.",
  },
  alternates: {
    canonical: "/sponsors",
  },
}

export default function SponsorsPage() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      <Navbar />
      <SponsorsSection />
      <Footer />
    </div>
  )
}

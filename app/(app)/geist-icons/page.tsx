import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { GeistIconsSection } from "./geist-icons-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Animated Geist Icons | Nexvyn UI",
  description:
    "All 641 Geist icons from Vercel with beautiful Framer Motion animations. Copy-paste animated icons for your Next.js project.",
  openGraph: {
    title: "Animated Geist Icons | Nexvyn UI",
    description: "All 641 Geist icons from Vercel with beautiful Framer Motion animations.",
    images: [
      {
        url: "/og-icons.png",
        width: 1200,
        height: 630,
        alt: "Animated Geist Icons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animated Geist Icons",
    description: "All 641 Geist icons from Vercel with beautiful Framer Motion animations.",
    images: ["/og-icons.png"],
  },
}

export default function GeistIconsPage() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      <Navbar />
      <GeistIconsSection />
      <Footer />
    </div>
  )
}

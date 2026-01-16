import { Navbar } from "../Home/navbar"
import { Footer } from "../Home/footer"
import { IconsSection } from "./icons-section"
import { SvgLoadersSection } from "./svg-loaders-section"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nexvyn Icons | Beautiful Animated & Static Icons",
  description:
    "A collection of copy-paste animated and static icons for your Next.js project. Built with Framer Motion and SVG for smooth interactions.",
  openGraph: {
    title: "Nexvyn Icons | Beautiful Animated & Static Icons",
    description: "A collection of copy-paste animated and static icons for your Next.js project.",
    images: [
      {
        url: "/og-icons.png",
        width: 1200,
        height: 630,
        alt: "Nexvyn Icons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexvyn Icons",
    description: "A collection of copy-paste animated and static icons for your Next.js project.",
    images: ["/og-icons.png"],
  },
}

export default function IconsPage() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      <Navbar />
      <IconsSection />
      <SvgLoadersSection />
      <Footer />
    </div>
  )
}

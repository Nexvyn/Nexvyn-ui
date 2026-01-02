import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { SponsorsSection } from "./sponsors-section"

export const metadata = {
  title: "Sponsors – Nexvyn UI",
  description:
    "Support Nexvyn UI development. Our sponsors help us build and maintain beautiful animated components.",
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

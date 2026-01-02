import { Navbar } from "./components/navbar"
import { HeroSection } from "./components/hero-section"
import { Footer } from "./components/footer"

export default async function Home() {
  return (
    <div className="flex w-full flex-col gap-2 p-2 dark:bg-[#181818]">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  )
}

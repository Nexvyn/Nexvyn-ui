import { getAllComponents } from "@/lib/get-components"
import { LandingHero } from "./components/landing-hero"
import { HeaderCard } from "./components/header-card"

export default async function Home() {
  const allComps = await getAllComponents()

  return (
    <div className="h-screen w-full flex flex-col md:p-1 md:pb-1 gap-1 max-w-(--breakpoint-2xl)">
      <HeaderCard />

      <main className="flex-1 bg-white md:rounded-xl shadow-card-inset overflow-hidden relative">
        <LandingHero allComps={allComps} />
      </main>
    </div>
  )
}

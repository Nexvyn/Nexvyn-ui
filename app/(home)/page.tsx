import { getAllComponents } from "@/lib/get-components";
import { LandingHero } from "./components/landing-hero";
import { HeaderCard } from "./components/header-card";

export default async function Home() {
  const allComps = await getAllComponents();

  return (
  <div className="h-screen w-full flex flex-col md:p-2 gap-1 max-w-(--breakpoint-2xl)">
      <HeaderCard />

      <LandingHero allComps={allComps} />
    </div>
  );
}

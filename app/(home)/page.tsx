import { getAllComponents } from "@/lib/get-components";
import { LandingHero } from "./components/landing-hero";
import { Navbar } from "./components/navbar";
import { FooterCard } from "./components/footer";

export default async function Home() {
  const allComps = await getAllComponents();

  return (
    <div className=" w-full flex flex-col md:p-2 gap-1 max-w-(--breakpoint-2xl) dark:bg-[#181818]">
      <Navbar />
      <LandingHero allComps={allComps} />
      <FooterCard />
    </div>
  );
}

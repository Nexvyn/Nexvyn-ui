import { getAllComponents } from "@/lib/get-components";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { Footer } from "./components/footer";

export default async function Home() {
  const allComps = await getAllComponents();

  return (
    <div className=" w-full flex flex-col gap-2 md:p-2  max-w-(--breakpoint-2xl) dark:bg-[#181818]">
      <HeroSection allComps={allComps} />
      <Footer />
    </div>
  );
}

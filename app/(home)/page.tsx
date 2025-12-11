import { Navbar } from "./components/navbar";
import { HeroSection } from "@/app/(home)/components/hero-section";
import { Footer } from "@/app/(home)/components/footer";

export default async function Home() {
  return (
    <div className=" w-full flex flex-col  p-2  gap-2  dark:bg-[#181818]">
      <Navbar />
      <HeroSection />
      {/* <ComponentsPreview />
      <SocialProofs /> */}
      <Footer />
    </div>
  );
}

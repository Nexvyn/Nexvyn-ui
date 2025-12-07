import { getAllComponents } from "@/lib/get-components";
import dynamic from "next/dynamic";
import { Navbar } from "./components/navbar";

const HeroSection = dynamic(
  () =>
    import("@/app/(home)/components/hero-section").then((mod) => ({
      default: mod.HeroSection,
    })),
  {
    loading: () => (
      <div className="w-full h-[calc(100vh-64px)] mt-12 rounded-2xl flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    ),
    ssr: true,
  }
);

const Footer = dynamic(
  () =>
    import("@/app/(home)/components/footer").then((mod) => ({
      default: mod.Footer,
    })),
  {
    ssr: true,
  }
);

export default async function Home() {
  const allComps = await getAllComponents();
  return (
    <div className=" w-full flex flex-col  p-2  gap-2  dark:bg-[#181818]">
      <Navbar />
      <HeroSection allComps={allComps} />
      <Footer />
    </div>
  );
}

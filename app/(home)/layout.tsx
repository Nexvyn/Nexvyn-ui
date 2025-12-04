import { Navbar } from "./components/navbar";
import { SearchRegistryProvider } from "@/hooks/use-search-registry";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SearchRegistryProvider>
      {children}
    </SearchRegistryProvider>
  );
}

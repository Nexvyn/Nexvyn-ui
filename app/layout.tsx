import { RootProvider } from "fumadocs-ui/provider";
import "./global.css";
import { Inter_Tight, Pixelify_Sans } from "next/font/google";
import { ThemeProvider } from "./providers/theme-provider";
import { SearchRegistryProvider } from "@/hooks/use-search-registry";
import type { Metadata } from "next";
import { LenisProvider } from "./providers/lenis-provider";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixel Perfect UI",
  description: "Pixel Perfect UI — a lightweight documentation UI library",
  icons: {
    icon: "/logo/static/logo.svg",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.className} ${pixelify.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <LenisProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SearchRegistryProvider>
              <RootProvider search={{ enabled: false }}>
                {children}
              </RootProvider>
            </SearchRegistryProvider>
          </ThemeProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

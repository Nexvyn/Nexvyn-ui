import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter_Tight, Pixelify_Sans } from "next/font/google";
import { ThemeProvider } from "./providers/theme-provider";
import type { Metadata } from "next";

const interTight = Inter_Tight({
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pixel Perfect UI",
  description: "Pixel Perfect UI — a lightweight documentation UI library",
  icons: {
    icon: "/logo/final-light.png",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RootProvider>{children}</RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

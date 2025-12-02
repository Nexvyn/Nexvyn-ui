import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter_Tight } from "next/font/google";
import { ThemeProvider } from "./providers/theme-provider";
const interTight = Inter_Tight({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={interTight.className} suppressHydrationWarning>
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

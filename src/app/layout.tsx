import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { Cursor } from "@/components/interactive/cursor";
import { Nav } from "@/components/layout/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextGiant — Premium Kreativagentur",
  description:
    "Wir bauen keine gewöhnlichen Websites. Wir machen Sie zum Giganten. NextGiant entwickelt Premium-Websites, interaktive digitale Erlebnisse, Web-Anwendungen und KI-Automatisierung für Marken, die unübersehbar sein wollen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

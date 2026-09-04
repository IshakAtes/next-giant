import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Cursor } from "@/components/interactive/cursor";
import { Nav } from "@/components/layout/nav";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const geist = localFont({
  src: "./fonts/geist-latin.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextGiant — Websites, Webanwendungen & KI-Automatisierung",
  description:
    "NextGiant entwickelt hochwertige Websites, individuelle Webanwendungen und KI-Automatisierungen für ambitionierte Unternehmen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${geist.variable} h-full antialiased`}>
      <body className="bg-bg text-fg flex min-h-full flex-col">
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

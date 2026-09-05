import Link from "next/link";

import { BrandLogo } from "@/components/ui/brand-logo";

const footerColumns = [
  {
    title: "Leistungen",
    links: [
      { label: "Websites", href: "#leistungen" },
      { label: "Webanwendungen", href: "#leistungen" },
      { label: "KI-Automatisierung", href: "#leistungen" },
      { label: "Wachstum", href: "#ueber-uns" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "#ueber-uns" },
      { label: "Projekte", href: "#projekte" },
      { label: "Einblicke", href: "#prozess" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      {
        label: "Impressum",
        href: "mailto:hello@nextgiant.de?subject=Impressum",
      },
      {
        label: "Datenschutz",
        href: "mailto:hello@nextgiant.de?subject=Datenschutz",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-line border-t bg-white">
      <div className="container-edge grid gap-14 py-16 md:grid-cols-[1.4fr_2fr] md:py-20 lg:gap-24">
        <div>
          <Link
            href="#top"
            className="inline-flex"
            aria-label="NextGiant – Startseite"
          >
            <BrandLogo className="text-[2rem]" />
          </Link>
          <p className="text-muted mt-5 max-w-xs text-sm leading-6">
            Digitale Lösungen für ambitionierte Unternehmen – von der starken
            Website bis zum automatisierten Geschäftsprozess.
          </p>
          <a
            href="mailto:office@nextgiant.de"
            className="decoration-accent/40 hover:text-accent mt-8 inline-block text-sm font-semibold underline transition-colors"
          >
            office@nextgiant.de
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mb-5 text-xs font-semibold tracking-[0.14em] uppercase">
                {column.title}
              </p>
              <ul className="text-muted space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-fg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-line container-edge text-muted-2 flex flex-col gap-2 border-t py-6 text-[11px] tracking-[0.08em] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} NextGiant GmbH</span>
        <span>Strategie · Design · Technologie</span>
      </div>
    </footer>
  );
}

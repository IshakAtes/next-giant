import Link from "next/link";

export function Footer() {
  return (
    <footer className="on-flash border-line border-t">
      <div className="container-edge flex flex-col gap-12 pt-16 pb-10 md:flex-row md:items-end md:justify-between md:pt-24">
        <div>
          <p className="font-display text-fg text-3xl leading-[0.92] font-semibold tracking-tight sm:text-5xl">
            Machen wir Sie
            <br />
            zum <span className="text-accent">Giganten</span>.
          </p>
          <p className="text-muted mt-5 max-w-xs text-sm">
            Premium-Kreativagentur — Websites, digitale Erlebnisse,
            Web-Anwendungen und KI-Automatisierung.
          </p>
        </div>

        <nav className="text-muted flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-widest uppercase">
          <Link href="#work" className="hover:text-fg transition-colors">
            Arbeiten
          </Link>
          <Link href="#services" className="hover:text-fg transition-colors">
            Leistungen
          </Link>
          <Link href="#why" className="hover:text-fg transition-colors">
            Über uns
          </Link>
          <Link href="#contact" className="hover:text-fg transition-colors">
            Kontakt
          </Link>
        </nav>
      </div>

      <div className="border-line container-edge text-muted-2 flex flex-col gap-2 border-t py-6 font-mono text-[11px] tracking-widest uppercase md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} NextGiant. Alle Rechte vorbehalten.</span>
        <span>Gestaltet &amp; entwickelt von NextGiant</span>
      </div>
    </footer>
  );
}

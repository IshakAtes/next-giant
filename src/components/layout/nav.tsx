"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Magnetic } from "@/components/interactive/magnetic";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#work", label: "Arbeiten" },
  { href: "#services", label: "Leistungen" },
  { href: "#why", label: "Über uns" },
  { href: "#contact", label: "Kontakt" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || open
            ? "border-line bg-bg/85 border-b backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-edge flex h-18 items-center justify-between py-5">
          <Link
            href="#top"
            className="font-display text-lg font-semibold tracking-tight"
            data-cursor="Start"
          >
            NEXT<span className="text-accent">GIANT</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group text-muted hover:text-fg relative font-mono text-xs tracking-wide uppercase transition-colors"
              >
                {link.label}
                <span className="bg-accent ease-out-quart absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic strength={0.3}>
              <Link
                href="#contact"
                data-cursor="Los"
                className="border-line-strong hover:border-fg inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-wide uppercase transition-colors"
              >
                Projekt starten
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={cn(
                "bg-fg h-px w-6 transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "bg-fg h-px w-6 transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </header>

      {/* Rendered as a header sibling, not a descendant: the header's
          backdrop-blur (once scrolled) establishes a containing block for
          fixed descendants, which would otherwise hijack this panel's
          viewport-relative positioning. */}
      <div
        className={cn(
          "bg-bg ease-out-expo fixed inset-0 top-18 z-50 flex flex-col justify-between px-6 pt-10 pb-10 transition-transform duration-500 lg:hidden",
          open ? "translate-y-0" : "-translate-y-[110%]",
        )}
      >
        <nav className="flex flex-col gap-2">
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-line font-display border-b py-5 text-4xl"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#contact"
          onClick={() => setOpen(false)}
          className="bg-accent text-accent-fg flex items-center justify-center py-4 font-mono text-sm tracking-wide uppercase"
        >
          Projekt starten
        </Link>
      </div>
    </>
  );
}

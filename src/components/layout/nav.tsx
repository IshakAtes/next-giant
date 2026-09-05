"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#projekte", label: "Projekte" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#einblicke", label: "Einblicke" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateNavSurface = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>("#top");
      const nextSection = document.querySelector<HTMLElement>("#leistungen");
      const navHeight = 72;
      const heroTravel = hero
        ? Math.max(hero.offsetHeight - window.innerHeight, 1)
        : 1;
      const heroProgress = hero
        ? -hero.getBoundingClientRect().top / heroTravel
        : 0;
      const foregroundBehindNav =
        heroProgress >= 0.55 &&
        (hero?.getBoundingClientRect().bottom ?? 0) > navHeight;

      setScrolled(
        foregroundBehindNav ||
          (nextSection
            ? nextSection.getBoundingClientRect().top <= navHeight
            : false),
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateNavSurface);
    };

    updateNavSurface();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
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
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:duration-0",
          scrolled || open
            ? "border-line bg-bg/92 shadow-[0_8px_30px_rgba(28,28,28,0.04)] backdrop-blur-xl"
            : "border-transparent bg-transparent shadow-none backdrop-blur-none",
        )}
      >
        <div className="container-edge flex h-18 items-center justify-between">
          <Link
            href="#top"
            className="group"
            aria-label="NextGiant – Startseite"
          >
            <BrandLogo className="text-[1.75rem] transition-transform duration-500 group-hover:translate-x-0.5" />
          </Link>

          <nav
            className="hidden items-center gap-7 lg:flex xl:gap-10"
            aria-label="Hauptnavigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group text-fg/75 hover:text-fg relative py-2 text-[13px] font-medium transition-colors"
              >
                {link.label}
                <span className="bg-accent absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <Button
            href="#kontakt"
            size="compact"
            className="hidden lg:block"
            opensContactDialog
          >
            Projekt starten
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="border-line-strong hover:border-accent relative flex h-11 w-11 items-center justify-center border bg-white/70 transition-[border-color,transform] duration-300 [clip-path:polygon(0_0,calc(100%_-_9px)_0,100%_9px,100%_100%,0_100%)] active:scale-[0.97] lg:hidden"
          >
            <span
              className={cn(
                "bg-accent absolute h-px w-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "bg-fg absolute h-px w-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={cn(
          "bg-bg fixed inset-0 z-40 flex flex-col px-4 pt-24 pb-6 transition-all duration-500 lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="border-line border-t" aria-label="Mobile Navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-line font-display flex min-h-16 items-center justify-between border-b text-[clamp(1.75rem,8vw,2.5rem)]"
            >
              {link.label}
              <Arrow className="text-accent h-5 w-5" />
            </Link>
          ))}
        </nav>
        <Button
          href="#kontakt"
          onClick={() => setOpen(false)}
          opensContactDialog
          className="mt-auto block w-full lg:hidden [&>a]:w-full"
        >
          Projekt starten
        </Button>
      </div>
    </>
  );
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={className} fill="none">
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

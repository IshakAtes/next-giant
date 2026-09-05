"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const HeroAtmosphere = dynamic(
  () =>
    import("@/components/visuals/hero-atmosphere").then(
      (module) => module.HeroAtmosphere,
    ),
  { ssr: false },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const foreground = foregroundRef.current;
    const content = contentRef.current;
    if (!section || !foreground || !content) return;

    const context = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        return;
      }

      gsap.from("[data-hero-reveal]", {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.15,
      });

      const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

      heroTimeline.fromTo(
          foreground,
          {
            y: 0,
          },
          {
            y: () => -window.innerHeight,
            ease: "none",
            duration: 0.7,
          },
          0,
        );

      const scrims = Array.from(
        section.querySelectorAll<HTMLElement>("[data-hero-scrim]"),
      );
      const mistLayers = Array.from(
        section.querySelectorAll<HTMLElement>("[data-hero-mist]"),
      );
      const darkCopy = Array.from(
        section.querySelectorAll<HTMLElement>("[data-hero-on-dark]"),
      );

      heroTimeline
        .to(
          mistLayers,
          { autoAlpha: 0, ease: "power1.out", duration: 0.26 },
          0.02,
        )
        .to(
          darkCopy,
          { color: "#f7f8f6", ease: "power1.out", duration: 0.24 },
          0.12,
        )
        .to(
          content,
          { autoAlpha: 0, y: -24, ease: "power1.in", duration: 0.16 },
          0.83,
        )
        .to(
          scrims,
          { autoAlpha: 0, ease: "power1.in", duration: 0.16 },
          0.83,
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="bg-bg relative h-[205svh] motion-reduce:h-[100svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-[#f7f8f6]">
          <div className="absolute inset-0">
            <Image
              src="/images/nextgiant/hero-city-background.webp"
              alt="Unternehmer blickt von einem Berg auf eine moderne Stadt"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
            />
            <div
              ref={foregroundRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[2] will-change-transform"
            >
              <div className="hero-foreground absolute inset-0">
                <Image
                  src="/images/nextgiant/hero-city.webp"
                  alt=""
                  fill
                  preload
                  sizes="100vw"
                  className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
                />
              </div>
              <div className="hero-jacket-breeze absolute inset-0" />
              <div className="hero-rock-fill absolute inset-x-0 top-[calc(100%-22svh)] h-[132svh]" />
            </div>
          </div>

          <div
            aria-hidden
            data-hero-scrim
            data-hero-mist
            className="pointer-events-none absolute inset-y-0 left-0 z-[3] hidden w-[68%] bg-gradient-to-r from-[#f7f8f6]/98 via-[#f7f8f6]/78 to-transparent sm:block"
          />

          <div data-hero-mist className="pointer-events-none absolute inset-0">
            <HeroAtmosphere className="absolute inset-0 opacity-70" />
          </div>

          <div
            ref={contentRef}
            className="container-edge relative z-10 flex h-full items-start pt-[clamp(8.5rem,18svh,12rem)] sm:items-center sm:pt-18"
          >
            <div className="w-full max-w-[47rem] sm:max-w-[72%] lg:max-w-[70%] xl:max-w-[63rem]">
              <p
                data-hero-reveal
                className="text-accent mb-4 text-[10px] font-bold tracking-[0.19em] uppercase sm:mb-6 sm:text-xs"
              >
                Digitale Lösungen für ambitionierte Unternehmen
              </p>

              <h1
                data-hero-reveal
                data-hero-on-dark
                className="font-display text-hero leading-[0.91] tracking-[-0.065em] text-balance sm:text-[clamp(3.4rem,7vw,4.5rem)] lg:text-hero"
              >
                <span className="block sm:hidden">Wir bauen</span>
                <span className="block sm:hidden">Websites,</span>
                <span className="hidden sm:block sm:whitespace-nowrap">
                  Wir bauen Websites,
                </span>
                <span className="block">Webanwendungen</span>
                <span className="block lg:whitespace-nowrap">
                  &amp; <span className="text-accent">KI-Automatisierung.</span>
                </span>
              </h1>

              <p
                data-hero-reveal
                data-hero-on-dark
                className="text-muted mt-5 max-w-[34rem] text-[0.9rem] leading-6 sm:mt-7 sm:text-base sm:leading-7 lg:text-lg"
              >
                NextGiant hilft Unternehmen, sichtbar zu werden, Prozesse zu
                digitalisieren und nachhaltig zu wachsen – mit digitalen
                Lösungen, die Ergebnisse liefern.
              </p>

              <div
                data-hero-reveal
                className="mt-14 flex flex-col items-stretch gap-3 min-[560px]:flex-row min-[560px]:items-center sm:mt-11"
              >
                <Button
                  href="#kontakt"
                  opensContactDialog
                  className="w-full min-[560px]:w-auto [&>a]:w-full"
                >
                  Projekt starten
                </Button>
                <Button
                  href="#leistungen"
                  variant="secondary"
                  className="w-full min-[560px]:w-auto [&>a]:w-full"
                >
                  Leistungen ansehen
                </Button>
              </div>
            </div>
          </div>

          <div className="absolute right-5 bottom-5 z-10 hidden items-center gap-3 text-[10px] font-semibold tracking-[0.17em] text-white uppercase drop-shadow sm:flex">
            <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/70 pt-1.5">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
            Scrollen und entdecken
          </div>
        </div>
      </div>
    </section>
  );
}

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
  const imageRef = useRef<HTMLDivElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const giant = giantRef.current;
    const content = contentRef.current;
    if (!section || !image || !giant || !content) return;

    const context = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set(giant, { opacity: 0.16, scale: 0.92, yPercent: 0 });
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

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
          },
        })
        .fromTo(
          image,
          { scale: 1, xPercent: 0 },
          { scale: 1.075, xPercent: -1.2, ease: "none" },
          0,
        )
        .fromTo(
          giant,
          { opacity: 0, scale: 0.68, yPercent: 13 },
          { opacity: 0.38, scale: 1.08, yPercent: -4, ease: "power1.inOut" },
          0.12,
        )
        .to(content, { opacity: 0.2, y: -24, ease: "power1.in" }, 0.74);
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="bg-bg relative h-[165svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-[#f7f8f6]">
          <div
            ref={imageRef}
            className="absolute inset-x-0 top-[54%] bottom-0 origin-center will-change-transform sm:inset-0"
          >
            <Image
              src="/images/nextgiant/hero-city.webp"
              alt="Unternehmer blickt von einem Berg auf eine moderne Stadt"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[68%_center] sm:object-[62%_center] lg:object-center"
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 hidden w-[68%] bg-gradient-to-r from-[#f7f8f6]/98 via-[#f7f8f6]/78 to-transparent sm:block"
          />

          <div
            ref={giantRef}
            aria-hidden
            className="absolute top-[40%] right-[-3%] h-[56%] w-[50%] origin-bottom opacity-0 mix-blend-multiply will-change-transform sm:top-[3%] sm:right-[5%] sm:h-[90%] sm:w-[40%] lg:right-[7%] lg:w-[37%]"
          >
            <Image
              src="/images/nextgiant/giant-silhouette.webp"
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 40vw"
              className="object-contain object-bottom"
            />
          </div>

          <HeroAtmosphere className="pointer-events-none absolute inset-0 opacity-70" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[38%] h-[19%] bg-gradient-to-b from-[#f7f8f6] via-[#f7f8f6]/88 to-transparent sm:hidden"
          />

          <div
            ref={contentRef}
            className="container-edge relative z-10 flex h-full items-start pt-24 sm:items-center sm:pt-18"
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
                className="font-display text-hero leading-[0.91] tracking-[-0.065em] text-balance"
              >
                <span className="block sm:whitespace-nowrap">
                  Wir bauen Websites,
                </span>
                <span className="block">Webanwendungen</span>
                <span className="block lg:whitespace-nowrap">
                  &amp; <span className="text-accent">KI-Automatisierung.</span>
                </span>
              </h1>

              <p
                data-hero-reveal
                className="text-muted mt-5 max-w-[34rem] text-[0.9rem] leading-6 sm:mt-7 sm:text-base sm:leading-7 lg:text-lg"
              >
                NextGiant hilft Unternehmen, sichtbar zu werden, Prozesse zu
                digitalisieren und nachhaltig zu wachsen – mit digitalen
                Lösungen, die Ergebnisse liefern.
              </p>

              <div
                data-hero-reveal
                className="mt-6 flex flex-col items-stretch gap-3 min-[560px]:flex-row min-[560px]:items-center sm:mt-8"
              >
                <Button
                  href="#kontakt"
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

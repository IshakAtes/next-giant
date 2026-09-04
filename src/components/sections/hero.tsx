"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { MonolithScene } from "@/components/visuals/monolith-scene";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set([".hero-eyebrow", ".hero-fade", ".hero-line-inner"], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return;
      }

      const split = new SplitText(headline, {
        type: "lines",
        linesClass: "hero-line-inner",
      });
      gsap.set(split.lines, { yPercent: 115 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        .to(split.lines, { yPercent: 0, duration: 1.2, stagger: 0.1 }, 0.45)
        .to(".hero-fade", { opacity: 1, y: 0, stagger: 0.1, duration: 0.9 }, "-=0.55");

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        animation: gsap.timeline().to(".hero-scroll-fade", { opacity: 0, y: -30 }, 0),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-32 pb-10"
    >
      <MonolithScene
        sceneRef={sectionRef}
        className="pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 15%, rgba(255,106,46,0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="from-bg to-bg/0 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent"
      />
      <div
        aria-hidden
        className="from-bg pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent"
      />

      <div className="container-edge hero-scroll-fade relative z-10">
        <div className="hero-eyebrow mb-6 flex translate-y-3 items-center gap-3 opacity-0 md:mb-10">
          <span className="bg-accent h-px w-8" />
          <span className="text-muted font-mono text-xs tracking-[0.2em] uppercase md:text-sm">
            Premium-Kreativagentur für digitale Erlebnisse
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="font-display text-hero text-fg max-w-5xl leading-[0.92] font-semibold tracking-tight"
        >
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">
              Gewöhnliche Websites
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block">
              verschwinden lautlos.{" "}
              <span className="text-molten">Wir machen Sie zum Giganten.</span>
            </span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade text-muted max-w-md translate-y-4 text-lg opacity-0 md:text-xl">
            Hochwertige Websites und digitale Erlebnisse — entwickelt mit der
            Präzision und dem Gewicht von etwas, das Bestand hat.
          </p>

          <div className="hero-fade flex translate-y-4 flex-wrap items-center gap-4 opacity-0">
            <Button href="#contact" cursorLabel="Los">
              Projekt starten
            </Button>
            <Button href="#work" variant="secondary" cursorLabel="Ansehen">
              Unsere Arbeiten entdecken
            </Button>
          </div>
        </div>

        <div className="hero-fade border-line mt-14 flex translate-y-4 items-center justify-between border-t pt-5 opacity-0 md:mt-20">
          <span className="text-muted-2 font-mono text-[11px] tracking-widest uppercase">
            Websites — Erlebnisse — Anwendungen — KI
          </span>
          <span className="text-muted-2 hidden font-mono text-[11px] tracking-widest uppercase md:inline">
            Scrollen zum Entdecken
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.fromTo(
        ".cta-copy > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".cta-mountain",
        { scale: 1.08, xPercent: 2 },
        {
          scale: 1,
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="border-line relative overflow-hidden border-y bg-[#121412] text-white"
    >
      <div className="cta-mountain absolute inset-y-0 right-0 w-full">
        <Image
          src="/images/nextgiant/cta-giants.webp"
          alt="Ein Mann geht auf die freie Stelle zwischen vier Giganten am Berggipfel zu"
          fill
          sizes="100vw"
          className="object-cover object-[76%_center] opacity-70 sm:object-center sm:opacity-80"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,#121412_0%,rgba(18,20,18,.98)_34%,rgba(18,20,18,.72)_58%,rgba(18,20,18,.12)_100%)] max-sm:bg-[linear-gradient(180deg,#121412_0%,rgba(18,20,18,.94)_48%,rgba(18,20,18,.35)_100%)]"
      />
      <div
        aria-hidden
        className="border-accent/70 absolute top-0 left-[var(--container-pad)] h-24 border-l"
      />

      <div className="container-edge relative z-10 flex min-h-[40rem] items-center py-20 sm:min-h-[38rem] lg:min-h-[42rem]">
        <div className="cta-copy max-w-[49rem]">
          <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
            Ihr nächster Schritt
          </p>
          <h2 className="font-display mt-7 text-[clamp(3.25rem,7.1vw,7.8rem)] leading-[0.86] tracking-[-0.06em]">
            Wir machen Sie
            <br />
            zum <span className="text-accent">Giganten.</span>
          </h2>
          <p className="mt-8 max-w-lg text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
            Ob Website, Webanwendung oder KI-Automatisierung – wir entwickeln
            digitale Lösungen, die Ihr Unternehmen sichtbar größer machen.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-4 min-[430px]:flex-row min-[430px]:items-center">
            <Button
              href="mailto:hello@nextgiant.de"
              className="w-full min-[430px]:w-auto [&>a]:w-full"
            >
              Projekt unverbindlich besprechen
            </Button>
            <a
              href="mailto:hello@nextgiant.de"
              className="hover:text-accent text-sm text-white/72 underline decoration-white/25 transition-colors"
            >
              hello@nextgiant.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

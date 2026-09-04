"use client";

import { useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const disciplines = [
  { index: "01", name: "Website", outcome: "Sichtbarkeit" },
  { index: "02", name: "Software", outcome: "Verbindung" },
  { index: "03", name: "KI", outcome: "Intelligenz" },
  { index: "04", name: "Automation", outcome: "Effizienz" },
];

export function WhyNextGiant() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .fromTo(
          ".system-rule",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
        )
        .fromTo(
          ".system-row",
          { opacity: 0, x: 42 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.11,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .fromTo(
          ".system-result",
          { opacity: 0, y: 24, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.25",
        );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      className="section-shell border-line border-y bg-white"
    >
      <div className="container-edge grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="section-kicker">Der NextGiant-Moment</p>
          <h2 className="font-display text-h1 mt-5 max-w-xl leading-[1.01] tracking-[-0.035em]">
            Vier Disziplinen. Ein System, das Sie größer macht.
          </h2>
          <p className="text-muted mt-6 max-w-lg text-base leading-7">
            Website, Software, KI und Automation entfalten ihre volle Wirkung
            nicht allein, sondern im Zusammenspiel – als ein System für
            nachhaltiges Wachstum.
          </p>
        </Reveal>

        <div className="relative">
          <span
            aria-hidden
            className="system-rule bg-accent absolute top-0 left-0 h-px w-full origin-left"
          />
          <ol>
            {disciplines.map((discipline) => (
              <li
                key={discipline.index}
                className="system-row border-line group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 border-b py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:py-9"
              >
                <span className="text-muted-2 text-[11px] font-semibold tracking-[0.16em]">
                  {discipline.index}
                </span>
                <span className="font-display text-[clamp(1.9rem,3.6vw,3.8rem)] leading-none tracking-[-0.04em] transition-transform duration-500 ease-out group-hover:translate-x-2">
                  {discipline.name}
                </span>
                <span className="text-accent text-right text-[10px] font-bold tracking-[0.15em] uppercase sm:text-xs">
                  {discipline.outcome}
                </span>
              </li>
            ))}
          </ol>

          <div className="system-result grid items-end gap-5 pt-9 sm:grid-cols-[auto_1fr] sm:pt-12">
            <span className="text-muted-2 pb-2 text-[11px] font-bold tracking-[0.16em] uppercase">
              Das Ergebnis
            </span>
            <div className="flex items-end justify-between gap-4 sm:justify-end">
              <span className="font-display text-accent text-[clamp(2.75rem,14vw,7.5rem)] leading-[0.78] tracking-[-0.065em] sm:text-[clamp(3.3rem,7vw,7.5rem)]">
                Wachstum
              </span>
              <svg
                aria-hidden
                viewBox="0 0 48 48"
                className="text-accent h-9 w-9 shrink-0 sm:h-12 sm:w-12"
                fill="none"
              >
                <path
                  d="M10 38 38 10M17 10h21v21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

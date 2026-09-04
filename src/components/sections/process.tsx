"use client";

import { useRef, useState } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { process } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 767px)").matches
      ) {
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * (process.length - 1) * 0.85}`,
        scrub: 0.6,
        pin: true,
        onUpdate: (self) => {
          const idx = Math.min(
            process.length - 1,
            Math.floor(self.progress * process.length),
          );
          setActive(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-line relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden items-center justify-end select-none lg:flex"
      >
        {process.map((step, i) => (
          <span
            key={step.index}
            className={cn(
              "font-display text-fg/[0.035] absolute text-[42vw] leading-none font-semibold transition-opacity duration-700",
              i === active ? "opacity-100" : "opacity-0",
            )}
            style={{ right: "-4vw" }}
          >
            {step.index}
          </span>
        ))}
      </div>

      <div className="container-edge relative z-10 w-full">
        <div className="text-muted mb-14 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase md:mb-20">
          <span className="bg-accent h-px w-8" />
          Ablauf
        </div>

        <div className="grid gap-14 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-24">
          {/* level bar */}
          <div className="hidden flex-col-reverse gap-1.5 lg:flex">
            {process.map((step, i) => (
              <div
                key={step.index}
                className={cn(
                  "h-10 w-3 transition-colors duration-500",
                  i <= active ? "bg-accent" : "bg-line-strong",
                )}
              />
            ))}
          </div>

          <div>
            {/* mobile: static stacked list */}
            <ol className="divide-line border-line flex flex-col divide-y border-y lg:hidden">
              {process.map((step) => (
                <li key={step.index} className="py-6">
                  <div className="mb-2 flex items-baseline gap-4">
                    <span className="text-accent font-mono text-sm">
                      {step.index}
                    </span>
                    <span className="font-display text-2xl font-semibold">
                      {step.name}
                    </span>
                  </div>
                  <p className="text-muted max-w-md">{step.description}</p>
                </li>
              ))}
            </ol>

            {/* desktop: crossfading active step */}
            <div className="relative hidden min-h-[220px] lg:block">
              {process.map((step, i) => (
                <div
                  key={step.index}
                  className={cn(
                    "ease-out-quart absolute inset-0 transition-all duration-500",
                    i === active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-4 opacity-0",
                  )}
                >
                  <span className="text-accent mb-4 block font-mono text-sm">
                    {step.index} / {String(process.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-h1 mb-5 leading-[0.95] font-semibold tracking-tight">
                    {step.name}
                  </h3>
                  <p className="text-muted max-w-lg text-lg">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-10 hidden gap-2 lg:flex">
              {process.map((step, i) => (
                <li
                  key={step.index}
                  className={cn(
                    "h-1 flex-1 transition-colors duration-500",
                    i <= active ? "bg-accent" : "bg-line-strong",
                  )}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

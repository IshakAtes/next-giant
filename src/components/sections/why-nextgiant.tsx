"use client";

import { useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

export function WhyNextGiant() {
  const sectionRef = useRef<HTMLElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const after = afterRef.current;
    const handle = handleRef.current;
    if (!section || !after || !handle) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(after, { clipPath: "inset(0 0% 0 0)" });
        gsap.set(handle, { left: "100%" });
        return;
      }

      gsap.set(after, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(handle, { left: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=90%",
          scrub: 0.6,
          pin: true,
        },
      });

      tl.to(after, { clipPath: "inset(0 0% 0 0)", ease: "none" }, 0).to(
        handle,
        { left: "100%", ease: "none" },
        0,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="border-line relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-t py-24"
    >
      <div className="container-edge">
        <Reveal className="text-muted mb-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase md:mb-14">
          <span className="bg-accent h-px w-8" />
          Warum NextGiant
        </Reveal>

        <Reveal className="max-w-3xl">
          <h2 className="font-display text-h1 leading-[0.98] font-semibold tracking-tight text-balance">
            Die meisten Unternehmen bleiben lange{" "}
            <span className="text-molten">klein</span> — obwohl sie längst
            das Zeug zum Giganten haben.
          </h2>
          <p className="text-muted mt-6 max-w-xl text-lg">
            Großartige Produkte und großartiger Service verdienen einen
            digitalen Auftritt mit demselben Gewicht. Genau diese Lücke
            schließen wir — visuell und technisch.
          </p>
        </Reveal>
      </div>

      <div className="container-edge mt-14 md:mt-16">
        <div className="border-line-strong relative min-h-[440px] w-full overflow-hidden border sm:min-h-[480px] md:aspect-[16/8] md:h-auto md:min-h-0">
          {/* BEFORE layer — deliberately generic. Content is confined to
              the top band so it can never collide with the AFTER layer's
              content (bottom band) at any mid-wipe scroll position. */}
          <div className="absolute inset-0 bg-[#e9e7e1] font-sans text-[#3a3a3a]">
            <div className="absolute inset-x-6 top-6 flex items-center justify-between sm:inset-x-10 sm:top-10">
              <div className="h-6 w-24 rounded bg-[#3a3a3a]/20" />
              <div className="flex gap-3">
                <div className="h-3 w-10 rounded bg-[#3a3a3a]/20" />
                <div className="h-3 w-10 rounded bg-[#3a3a3a]/20" />
                <div className="h-3 w-10 rounded bg-[#3a3a3a]/20" />
              </div>
            </div>
            <div className="absolute top-20 right-6 left-6 max-w-xs sm:top-28 sm:left-10">
              <p className="text-xl font-bold text-[#3a3a3a] sm:text-3xl">
                Willkommen bei unserem Unternehmen
              </p>
              <p className="mt-3 text-sm text-[#3a3a3a]/70">
                Wir bieten hochwertige Dienstleistungen für all Ihre
                geschäftlichen Anforderungen seit 2010.
              </p>
            </div>
          </div>

          {/* AFTER layer — clipped, revealed on scroll. Content is confined
              to the bottom band (mirrors the BEFORE split). */}
          <div
            ref={afterRef}
            className="bg-bg-raised absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(80% 80% at 85% 10%, rgba(255,106,46,0.22), transparent 60%)",
            }}
          >
            <div className="absolute inset-x-6 top-6 flex items-center justify-between sm:inset-x-10 sm:top-10">
              <span className="font-display text-fg text-lg font-semibold tracking-tight">
                NEXT<span className="text-accent">GIANT</span>
              </span>
              <span className="text-muted font-mono text-[11px] tracking-widest uppercase">
                Arbeiten — Leistungen — Kontakt
              </span>
            </div>
            <div className="absolute right-6 bottom-20 left-6 max-w-sm sm:bottom-28 sm:left-10">
              <p className="font-display text-fg mb-3 text-3xl leading-[0.95] font-semibold sm:text-5xl">
                Unübersehbar.
              </p>
              <p className="text-muted mb-5 text-sm sm:text-base">
                Präzise Typografie, echte Bewegung und ein System, das mit
                der Marke wächst.
              </p>
              <div className="bg-accent text-accent-fg inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-wide uppercase">
                Projekt starten
              </div>
            </div>
          </div>

          {/* wipe handle */}
          <div
            ref={handleRef}
            className="bg-accent absolute top-0 bottom-0 z-10 w-px -translate-x-1/2"
          >
            <div className="bg-accent text-accent-fg absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[9px] tracking-wide uppercase">
              Weiter
            </div>
          </div>

          <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-[#3a3a3a]/60 uppercase sm:top-6 sm:left-6">
            Vorher
          </span>
          <span className="text-muted absolute top-4 right-4 font-mono text-[10px] tracking-widest uppercase sm:top-6 sm:right-6">
            Nachher
          </span>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, SplitText } from "@/lib/gsap";

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const ctx = gsap.context(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.set(text, { opacity: 1 });
        return;
      }

      const split = new SplitText(text, { type: "words" });

      gsap.set(split.words, { opacity: 0.12 });

      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.4,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg-raised border-line relative border-t py-32 md:py-48"
    >
      <div className="container-edge">
        <span className="text-muted mb-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase md:mb-14">
          <span className="bg-accent h-px w-8" />
          Der Punkt
        </span>

        <p
          ref={textRef}
          className="font-display text-display max-w-6xl leading-[1.02] font-semibold tracking-tight text-balance"
        >
          Durchschnittliche Websites werden ignoriert.{" "}
          <span className="text-molten">Giganten</span> bleiben in
          Erinnerung — und werden geteilt.
        </p>
      </div>
    </section>
  );
}

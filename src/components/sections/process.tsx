"use client";

import { useRef } from "react";

import { Reveal } from "@/components/ui/reveal";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { process } from "@/lib/data";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        desktopLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            end: "bottom 58%",
            scrub: 0.5,
          },
        },
      );

      gsap.fromTo(
        mobileLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );

      gsap.from(".process-step", {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 78%",
          once: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="einblicke"
      className="section-shell border-line border-t bg-white"
    >
      <div className="container-edge">
        <Reveal>
          <p className="section-kicker">Unser Prozess</p>
          <h2 className="font-display text-h1 mt-5 max-w-4xl leading-[1.02] tracking-[-0.035em]">
            Von der Idee zur erfolgreichen Lösung.
          </h2>
        </Reveal>

        <div className="process-grid relative mt-14 md:mt-20">
          <div className="border-line absolute top-6 right-[12.5%] left-[12.5%] hidden border-t lg:block">
            <div
              ref={desktopLineRef}
              className="bg-accent absolute -top-px left-0 h-[2px] w-full origin-left"
            />
          </div>

          <div className="border-line absolute top-0 bottom-0 left-6 border-l lg:hidden">
            <div
              ref={mobileLineRef}
              className="bg-accent absolute top-0 -left-px h-full w-[2px] origin-top"
            />
          </div>

          <ol className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {process.map((step, index) => (
              <li
                key={step.index}
                className="process-step relative grid grid-cols-[3rem_1fr] gap-5 lg:block"
              >
                <div className="bg-bg text-accent relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#ffc2b1] text-xs font-bold shadow-[0_8px_24px_rgba(255,79,31,0.1)] lg:mb-8">
                  {step.index}
                </div>
                <div className="pb-5 lg:pb-0">
                  <ProcessIcon index={index} />
                  <h3 className="font-display mt-4 text-2xl tracking-[-0.025em]">
                    {step.name}
                  </h3>
                  <p className="text-muted mt-3 max-w-xs text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessIcon({ index }: { index: number }) {
  const paths = [
    <path
      key="users"
      d="M7 18v-1.5A3.5 3.5 0 0 1 10.5 13h3a3.5 3.5 0 0 1 3.5 3.5V18M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 8.5a2.4 2.4 0 0 1 1.5 4.2M7 8.5a2.4 2.4 0 0 0-1.5 4.2"
    />,
    <path key="plan" d="M6 3h9l3 3v15H6V3Zm9 0v4h4M9 11h6M9 15h6" />,
    <path key="code" d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
    <path
      key="launch"
      d="M14 5c2-2 4.5-2 6-2-.1 1.8-.3 4.1-2.2 6L14 12.8 9.2 8 14 5Zm-5 5-3 .5L3.5 13 8 14M14 15l-.5 3-2.5 2.5L10 16M14 7h.01"
    />,
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="text-muted-2 h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[index]}
    </svg>
  );
}

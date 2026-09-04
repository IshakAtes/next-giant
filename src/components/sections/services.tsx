"use client";

import { useRef, useState } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";

const PANEL_ACCENTS = ["#ffb066", "#ff6a2e", "#c9432a", "#7a1f0b"];

export function Services() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [active]);

  const current = services[active]!;

  return (
    <section
      id="services"
      className="relative border-t border-line py-24 md:py-32"
    >
      <div className="container-edge">
        <div className="mb-14 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase md:mb-20">
          <span className="h-px w-8 bg-accent" />
          Was wir tun
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ul className="border-t border-line">
            {services.map((service, i) => (
              <li key={service.index} className="border-b border-line">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  data-cursor="Auswählen"
                  aria-pressed={active === i}
                  className="group flex w-full items-baseline gap-4 py-6 text-left transition-colors md:py-8"
                >
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors",
                      active === i ? "text-accent" : "text-muted-2",
                    )}
                  >
                    {service.index}
                  </span>
                  <span
                    className={cn(
                      "font-display text-3xl font-semibold tracking-tight transition-colors sm:text-4xl md:text-5xl",
                      active === i ? "text-fg" : "text-muted-2 group-hover:text-fg/70",
                    )}
                  >
                    {service.name}
                  </span>
                </button>

                <div
                  className="grid overflow-hidden transition-all duration-500 ease-out-quart lg:hidden"
                  style={{
                    gridTemplateRows: active === i ? "1fr" : "0fr",
                  }}
                >
                  <div className="min-h-0">
                    <p className="max-w-md pb-6 text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div
            ref={panelRef}
            className="border-line relative hidden aspect-[4/5] overflow-hidden border lg:block"
            style={{
              background: `radial-gradient(120% 100% at 100% 0%, ${PANEL_ACCENTS[active]}26, transparent 60%), var(--bg-raised)`,
            }}
          >
            <div className="flex h-full flex-col justify-between p-10">
              <span
                className="font-mono text-6xl font-semibold"
                style={{ color: PANEL_ACCENTS[active] }}
              >
                {current.index}
              </span>
              <div>
                <p className="mb-6 text-lg text-fg/90">
                  {current.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {current.tools.map((tool) => (
                    <li
                      key={tool}
                      className="border-line-strong text-muted border px-3 py-1 font-mono text-[11px] tracking-wide uppercase"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

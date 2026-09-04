"use client";

import { useRef, useState } from "react";

import { ProjectVisual } from "@/components/visuals/project-visual";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";
import { work } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SelectedWork() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
    );
  }, [active]);

  return (
    <section id="work" className="border-line relative border-t">
      <div className="container-edge flex items-center justify-between pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="text-muted flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
          <span className="bg-accent h-px w-8" />
          Ausgewählte Arbeiten
        </div>
        <span className="text-muted-2 font-mono text-xs tracking-widest">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(work.length).padStart(2, "0")}
        </span>
      </div>

      <div className="container-edge grid gap-12 pb-20 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-28">
        {/* index list */}
        <ul className="border-line border-t lg:sticky lg:top-24 lg:self-start">
          {work.map((item, i) => (
            <li key={item.index} className="border-line border-b">
              <a
                href="#"
                data-cursor="Projekt ansehen"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex w-full items-baseline gap-4 py-6 md:py-7"
              >
                <span
                  className={cn(
                    "font-mono text-sm transition-colors",
                    active === i ? "text-accent" : "text-muted-2",
                  )}
                >
                  {item.index}
                </span>
                <span className="flex-1">
                  <span
                    className={cn(
                      "font-display block text-3xl font-semibold tracking-tight transition-colors sm:text-4xl md:text-5xl",
                      active === i ? "text-fg" : "text-muted-2 group-hover:text-fg/70",
                    )}
                  >
                    {item.name}
                  </span>
                  <span className="text-muted mt-1 block font-mono text-[11px] tracking-widest uppercase">
                    {item.industry} — {item.category}
                  </span>
                </span>
                <span className="text-muted-2 hidden font-mono text-xs sm:block">
                  {item.year}
                </span>
              </a>

              {/* mobile preview, inline under each row */}
              <div className="pb-6 lg:hidden">
                <ProjectVisual
                  item={item}
                  className="aspect-[4/3] w-full border border-line"
                />
              </div>
            </li>
          ))}
        </ul>

        {/* sticky preview */}
        <div
          ref={panelRef}
          className="border-line relative hidden aspect-[4/5] overflow-hidden border lg:sticky lg:top-24 lg:block lg:self-start"
        >
          <ProjectVisual item={work[active]!} className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}

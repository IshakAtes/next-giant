"use client";

import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="leistungen" className="section-shell bg-bg">
      <div className="container-edge">
        <Reveal>
          <p className="section-kicker">Unsere Leistungen</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.25fr_0.6fr] lg:items-end">
            <h2 className="font-display text-h1 max-w-4xl leading-[1.02] tracking-[-0.035em] text-balance">
              Digitale Lösungen, die Ihr Unternehmen voranbringen.
            </h2>
            <p className="text-muted max-w-md text-base leading-7 lg:justify-self-end">
              Von der ersten Idee bis zum laufenden System – strategisch
              gedacht, hochwertig gestaltet und sauber entwickelt.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.index} delay={index * 0.06}>
              <ServiceCard
                service={service}
                tone={index === 1 || index === 3 ? "tech" : "gold"}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  tone,
}: {
  service: (typeof services)[number];
  tone: "gold" | "tech";
}) {
  const color = tone === "gold" ? "text-accent" : "text-tech";

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 4.5}deg) translateY(-4px)`;
  }

  function reset(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.transform = "";
  }

  return (
    <article
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className="surface-card group hover:border-line-strong flex min-h-[22rem] flex-col rounded-[1.15rem] p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:shadow-[0_20px_55px_rgba(39,36,29,0.1)] sm:min-h-[24rem] sm:p-7"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            tone === "gold" ? "bg-accent/8" : "bg-tech/8"
          } ${color}`}
        >
          <ServiceIcon index={service.index} />
        </span>
        <span className="text-muted-2 text-xs font-semibold tracking-[0.16em]">
          {service.index}
        </span>
      </div>

      <div className="mt-auto pt-12">
        <h3 className="font-display text-[1.65rem] leading-tight tracking-[-0.025em]">
          {service.name}
        </h3>
        <p className="text-muted mt-4 text-sm leading-6">
          {service.description}
        </p>
        <a
          href="#kontakt"
          className={`group/link relative mt-6 inline-flex min-h-11 items-center gap-2 pb-1 text-sm font-semibold ${color} after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(.22,1,.36,1)] hover:after:origin-left hover:after:scale-x-100`}
        >
          Mehr erfahren
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/link:translate-x-1 motion-reduce:transform-none"
            fill="none"
          >
            <path
              d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

function ServiceIcon({ index }: { index: string }) {
  const common = {
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (index === "01") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" {...common} />
        <path d="M3 9h18M7 7h.01M10 7h.01" {...common} />
      </svg>
    );
  }

  if (index === "02") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" {...common} />
        <path d="m4 12 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" {...common} />
      </svg>
    );
  }

  if (index === "03") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M12 3c.6 4.8 3.2 7.4 8 8-4.8.6-7.4 3.2-8 8-.6-4.8-3.2-7.4-8-8 4.8-.6 7.4-3.2 8-8Z"
          {...common}
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path d="M4 17 9 12l3 3 7-8" {...common} />
      <path d="M14 7h5v5" {...common} />
    </svg>
  );
}

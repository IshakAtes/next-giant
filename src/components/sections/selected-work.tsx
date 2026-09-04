import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { work } from "@/lib/data";

export function SelectedWork() {
  return (
    <section
      id="projekte"
      className="section-shell border-line border-t bg-white"
    >
      <div className="container-edge">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker">Ausgewählte Projekte</p>
            <h2 className="font-display text-h1 mt-5 max-w-4xl leading-[1.02] tracking-[-0.035em]">
              Echte Projekte.
              <br />
              Echte digitale Lösungen.
            </h2>
          </div>
          <p className="text-muted max-w-sm text-sm leading-6 lg:text-right">
            Unterschiedliche Branchen, eine Haltung: klare Nutzerführung,
            präzise Gestaltung und Technik, die im Alltag funktioniert.
          </p>
        </Reveal>

        <div className="mt-12 grid min-w-0 gap-5 lg:grid-cols-3">
          {work.slice(0, 3).map((item, index) => (
            <Reveal
              key={item.index}
              delay={index * 0.07}
              className="h-full min-w-0"
            >
              <article className="surface-card group relative flex h-full w-full max-w-full min-w-0 flex-col overflow-hidden rounded-[1.15rem] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_55px_rgba(39,36,29,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={`${item.name} – ${item.category}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  ) : null}
                  <span className="text-fg absolute top-4 left-4 rounded-full bg-white/88 px-3 py-1.5 text-[10px] font-bold tracking-[0.13em] uppercase shadow-sm backdrop-blur">
                    {item.year}
                  </span>
                </div>

                <div className="flex flex-1 items-start justify-between gap-5 p-5 sm:p-6">
                  <div className="min-w-0">
                    <p className="text-muted text-[11px] font-semibold tracking-[0.12em] uppercase">
                      {item.industry}
                    </p>
                    <h3 className="font-display mt-2 text-2xl tracking-[-0.025em] sm:text-3xl">
                      {item.name}
                    </h3>
                    <p className="text-muted mt-3 text-sm leading-6 break-words">
                      {item.category}
                    </p>
                  </div>
                  <a
                    href="#kontakt"
                    aria-label={`${item.name} besprechen`}
                    className="group/action border-line-strong text-accent hover:border-accent focus-visible:outline-accent relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border bg-white transition-colors duration-500 [clip-path:polygon(0_0,calc(100%_-_9px)_0,100%_9px,100%_100%,0_100%)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3"
                  >
                    <span
                      aria-hidden
                      className="bg-accent absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/action:scale-y-100 motion-reduce:transition-none"
                    />
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="relative z-10 h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/action:translate-x-0.5 motion-reduce:transform-none"
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
                <span
                  aria-hidden
                  className="bg-accent absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

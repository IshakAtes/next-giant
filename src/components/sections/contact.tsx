"use client";

import { useState } from "react";

import { Magnetic } from "@/components/interactive/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { projectTypes } from "@/lib/data";
import { cn } from "@/lib/utils";

const fieldClass =
  "peer w-full border-b border-line bg-transparent py-3 text-lg text-fg placeholder-transparent outline-none transition-colors focus:border-accent";
const labelClass =
  "pointer-events-none absolute left-0 top-3 font-mono text-xs uppercase tracking-widest text-muted transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 0%, rgba(255,106,46,0.16), transparent 70%)",
        }}
      />

      <div className="container-edge relative">
        <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase md:mb-8">
          <span className="h-px w-8 bg-accent" />
          Kontakt
        </Reveal>

        <Reveal className="max-w-4xl">
          <h2 className="font-display text-display leading-[0.95] font-semibold tracking-tight text-balance">
            Bereit, zum{" "}
            <span className="text-molten">Giganten zu werden?</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-muted">
            Erzählen Sie uns von Ihrer Marke und wohin sie sich entwickeln
            soll. Wir melden uns innerhalb eines Werktags.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.6fr] lg:gap-24">
          <Reveal>
            {status === "sent" ? (
              <div className="flex min-h-[320px] flex-col justify-center border-t border-line">
                <p className="font-display text-3xl font-semibold">
                  Nachricht erhalten.
                </p>
                <p className="mt-3 max-w-sm text-muted">
                  Danke für Ihre Nachricht — wir melden uns in Kürze, um Ihr
                  Projekt zu besprechen.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 border-t border-line pt-10"
              >
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Unternehmen" name="company" />
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field label="E-Mail" name="email" type="email" required />
                  <Field label="Aktuelle Website" name="website" type="url" />
                </div>

                <div className="relative">
                  <span className="mb-3 block font-mono text-xs tracking-widest text-muted uppercase">
                    Projektart
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <label
                        key={type}
                        className="border-line-strong text-muted has-checked:border-accent has-checked:bg-accent has-checked:text-accent-fg cursor-pointer border px-4 py-2 font-mono text-xs tracking-wide uppercase transition-colors"
                      >
                        <input
                          type="radio"
                          name="projectType"
                          value={type}
                          className="sr-only"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    placeholder=" "
                    className={cn(fieldClass, "resize-none")}
                  />
                  <label htmlFor="message" className={labelClass}>
                    Nachricht
                  </label>
                </div>

                <Magnetic strength={0.25} className="mt-4 self-start">
                  <button
                    type="submit"
                    data-cursor="Senden"
                    className="bg-accent text-accent-fg hover:bg-fg inline-flex items-center gap-3 px-8 py-4 font-mono text-xs tracking-wide uppercase transition-colors"
                  >
                    Nachricht senden
                    <span aria-hidden>→</span>
                  </button>
                </Magnetic>
              </form>
            )}
          </Reveal>

          <Reveal
            delay={0.15}
            className="flex flex-col justify-between gap-14 border-t border-line pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16"
          >
            <div>
              <p className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">
                E-Mail
              </p>
              <a
                href="mailto:hello@nextgiant.de"
                className="font-display text-2xl font-medium hover:text-accent"
              >
                hello@nextgiant.de
              </a>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">
                Folgen
              </p>
              <ul className="flex flex-col gap-1">
                {["Instagram", "LinkedIn", "X / Twitter"].map((social) => (
                  <li key={social}>
                    <a
                      href="#"
                      className="inline-block py-1 text-lg text-muted transition-colors hover:text-fg"
                    >
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs tracking-widest text-muted uppercase">
                Verfügbarkeit
              </p>
              <p className="flex items-center gap-2 text-lg">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Verfügbar für Projekte ab Q1 2026
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder=" "
        className={fieldClass}
      />
      <label htmlFor={name} className={labelClass}>
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}

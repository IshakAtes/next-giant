"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const contactEmail = "office@nextgiant.de";
const whatsappUrl =
  "https://wa.me/491739995710?text=Hallo%20NextGiant%2C%20ich%20m%C3%B6chte%20ein%20Projekt%20besprechen.";

export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousOverflowRef = useRef({ html: "", body: "" });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  useEffect(() => {
    const openDialog = () => {
      setFormStatus("idle");
      previousOverflowRef.current = {
        html: document.documentElement.style.overflow,
        body: document.body.style.overflow,
      };
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      dialogRef.current?.showModal();
    };

    const restoreScroll = () => {
      document.documentElement.style.overflow =
        previousOverflowRef.current.html;
      document.body.style.overflow = previousOverflowRef.current.body;
    };

    window.addEventListener("open-contact-dialog", openDialog);
    const dialog = dialogRef.current;
    dialog?.addEventListener("close", restoreScroll);

    return () => {
      window.removeEventListener("open-contact-dialog", openDialog);
      dialog?.removeEventListener("close", restoreScroll);
      restoreScroll();
    };
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) closeDialog();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      onClick={handleBackdropClick}
      className="text-fg border-line-strong m-auto max-h-[calc(100svh-2rem)] w-[min(92vw,46rem)] overflow-hidden border bg-white p-0 shadow-[0_32px_90px_rgba(18,20,18,.24)] backdrop:bg-[#121412]/58 backdrop:backdrop-blur-sm [clip-path:polygon(0_0,calc(100%_-_22px)_0,100%_22px,100%_100%,0_100%)]"
    >
      <button
        type="button"
        onClick={closeDialog}
        aria-label="Dialog schließen"
        className="border-line-strong text-muted hover:border-accent hover:text-accent absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center border bg-white/95 text-2xl transition-colors"
      >
        ×
      </button>

      <div
        data-lenis-prevent
        className="max-h-[calc(100svh-2rem)] overflow-y-auto overscroll-contain p-6 sm:p-9"
      >

        <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
          Projekt starten
        </p>
        <h2
          id="contact-dialog-title"
          className="font-display mt-4 pr-12 text-[clamp(2rem,6vw,3.7rem)] leading-[0.95] tracking-[-0.05em]"
        >
          Wie möchten Sie uns kontaktieren?
        </h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href={`mailto:${contactEmail}?subject=Projektanfrage`}
            className="border-accent bg-accent flex min-h-14 items-center justify-between border px-5 text-sm font-semibold transition-colors hover:bg-[#e94418]"
          >
            Per E-Mail
            <span aria-hidden>↗</span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="border-line-strong hover:border-fg flex min-h-14 items-center justify-between border bg-white px-5 text-sm font-semibold transition-colors hover:bg-[#f1f3f0]"
          >
            Per WhatsApp
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="text-muted-2 my-7 flex items-center gap-3 text-[10px] font-bold tracking-[0.16em] uppercase">
          <span className="bg-line flex-1 h-px" />
          oder Kontaktformular
          <span className="bg-line flex-1 h-px" />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-muted grid gap-2 text-xs font-semibold">
              Name
              <input
                required
                name="name"
                autoComplete="name"
                className="border-line-strong bg-bg min-h-12 border px-4 text-sm text-fg outline-none transition-colors focus:border-accent"
              />
            </label>
            <label className="text-muted grid gap-2 text-xs font-semibold">
              E-Mail
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="border-line-strong bg-bg min-h-12 border px-4 text-sm text-fg outline-none transition-colors focus:border-accent"
              />
            </label>
          </div>
          <label className="text-muted grid gap-2 text-xs font-semibold">
            Worum geht es?
            <textarea
              required
              name="message"
              rows={4}
              className="border-line-strong bg-bg resize-y border p-4 text-sm text-fg outline-none transition-colors focus:border-accent"
            />
          </label>
          <label className="text-muted grid gap-2 text-xs font-semibold">
            Inspirationswebsites
            <textarea
              name="inspirationswebsites"
              rows={2}
              placeholder="Links zu Websites, die Ihnen gefallen (optional)"
              className="border-line-strong bg-bg placeholder:text-muted-2 resize-y border p-4 text-sm text-fg outline-none transition-colors focus:border-accent"
            />
          </label>
          <button
            type="submit"
            disabled={formStatus === "sending"}
            className="bg-accent mt-1 min-h-13 px-6 text-sm font-semibold text-white transition-colors hover:bg-[#e94418]"
          >
            {formStatus === "sending" ? "Wird gesendet …" : "Anfrage senden"}
          </button>
          {formStatus === "sent" ? (
            <p className="text-xs leading-5 text-[#16743a]" role="status">
              Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.
            </p>
          ) : null}
          {formStatus === "error" ? (
            <p className="text-accent-deep text-xs leading-5" role="alert">
              Das hat leider nicht funktioniert. Bitte schreiben Sie direkt an{" "}
              <a className="underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </p>
          ) : null}
        </form>
      </div>
    </dialog>
  );
}

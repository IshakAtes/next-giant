"use client";

import { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor: a small dot plus a trailing ring. Listens for
 * [data-cursor="view"|"drag"] on hovered elements to swap the label.
 * Only activates on fine-pointer (mouse) devices — untouched on touch.
 */
export function Cursor() {
  const isFine = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = isFine && !reducedMotion;

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("has-fine-pointer");

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      if (target) {
        setLabel(target.dataset.cursor || null);
        gsap.to(ring, {
          scale: target.dataset.cursorScale
            ? Number(target.dataset.cursorScale)
            : 2.6,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      if (target) {
        setLabel(null);
        gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("has-fine-pointer");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
    >
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/40 mix-blend-difference"
      >
        {label ? (
          <span className="font-mono text-[9px] tracking-wider text-fg uppercase">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

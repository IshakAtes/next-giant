"use client";

import { useEffect, useRef } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const isFine = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = isFine && !reducedMotion;

  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const glow = glowRef.current;
    if (!glow) return;

    gsap.set(glow, { x: -80, y: -80 });

    const glowX = gsap.quickTo(glow, "x", {
      duration: 0.28,
      ease: "power3.out",
    });
    const glowY = gsap.quickTo(glow, "y", {
      duration: 0.28,
      ease: "power3.out",
    });
    let visible = false;

    const onMove = (e: PointerEvent) => {
      glowX(e.clientX);
      glowY(e.clientY);

      if (!visible) {
        visible = true;
        gsap.to(glow, { opacity: 0.2, duration: 0.45, ease: "power2.out" });
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [role='button']",
      );
      if (!target) return;
      if (e.relatedTarget instanceof Node && target.contains(e.relatedTarget)) {
        return;
      }

      gsap.to(glow, {
        opacity: 0.27,
        scale: 0.78,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [role='button']",
      );
      if (!target) return;
      if (e.relatedTarget instanceof Node && target.contains(e.relatedTarget)) {
        return;
      }

      gsap.to(glow, {
        opacity: 0.2,
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const hide = () => {
      visible = false;
      gsap.to(glow, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden
      data-cursor-glow
      className="pointer-events-none fixed inset-0 z-[90]"
    >
      <div
        ref={glowRef}
        className="fixed top-0 left-0 h-0 w-0 opacity-0 will-change-transform"
      >
        <span className="absolute top-0 left-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,79,31,0.72)_0%,rgba(255,79,31,0.24)_38%,transparent_72%)] mix-blend-multiply blur-[3px]" />
      </div>
    </div>
  );
}

import Image from "next/image";
import type { WorkItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const SHAPES = [
  // 01 — warm concentric arcs (restaurant / hospitality warmth)
  (id: string, c: string) => (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {[...Array(6)].map((_, i) => (
        <circle
          key={i}
          cx="320"
          cy="80"
          r={40 + i * 55}
          fill="none"
          stroke={c}
          strokeOpacity={0.9 - i * 0.12}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  ),
  // 02 — precise horizontal speed lines (automotive)
  (id: string, c: string) => (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {[...Array(9)].map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={40 + i * 40}
          x2="400"
          y2={20 + i * 40}
          stroke={c}
          strokeOpacity={0.5}
          strokeWidth="1"
        />
      ))}
    </svg>
  ),
  // 03 — architectural grid + diagonal (real estate)
  (id: string, c: string) => (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {[...Array(5)].map((_, i) => (
        <rect
          key={`v${i}`}
          x={i * 90}
          y="0"
          width="1"
          height="400"
          fill={c}
          fillOpacity={0.4}
        />
      ))}
      <line
        x1="0"
        y1="400"
        x2="400"
        y2="0"
        stroke={c}
        strokeOpacity={0.7}
        strokeWidth="1.5"
      />
    </svg>
  ),
  // 04 — soft organic blobs (beauty)
  (id: string, c: string) => (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      <circle cx="260" cy="140" r="130" fill={c} fillOpacity={0.35} />
      <circle cx="150" cy="280" r="90" fill={c} fillOpacity={0.25} />
    </svg>
  ),
  // 05 — technical circuit grid (technology)
  (id: string, c: string) => (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
      {[...Array(4)].map((_, i) => (
        <rect
          key={i}
          x={40 + i * 80}
          y={40 + ((i * 47) % 260)}
          width="26"
          height="26"
          fill="none"
          stroke={c}
          strokeOpacity={0.7}
          strokeWidth="1.5"
        />
      ))}
      <line
        x1="52"
        y1="66"
        x2="360"
        y2="66"
        stroke={c}
        strokeOpacity={0.4}
        strokeWidth="1"
      />
    </svg>
  ),
];

interface ProjectVisualProps {
  item: WorkItem;
  className?: string;
}

export function ProjectVisual({ item, className }: ProjectVisualProps) {
  const [base, mid, hi] = item.palette;
  const shapeIndex = (Number(item.index) - 1) % SHAPES.length;
  const Shape = SHAPES[shapeIndex]!;

  return (
    <div
      className={cn("group/visual relative overflow-hidden", className)}
      style={{ background: base }}
    >
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/visual:scale-105"
            preload={Number(item.index) <= 2}
          />
          {/* Subtle brand tint gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
            style={{
              background: `radial-gradient(120% 90% at 80% 15%, ${mid}, transparent 65%)`,
            }}
          />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 80% 15%, ${mid}66, transparent 60%), radial-gradient(90% 70% at 10% 95%, ${mid}44, transparent 55%)`,
            }}
          />
          {Shape(item.index, hi)}
        </>
      )}

      {/* Subtle film grain texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Atmospheric depth vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 45%, rgba(5,6,10,0.8) 100%)`,
        }}
      />

      {/* Project badge overlay in bottom corner */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex items-center justify-between">
        <span className="border-line bg-bg/75 text-fg/80 border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase backdrop-blur-md">
          {item.industry}
        </span>
        <span className="text-muted-2 font-mono text-[10px] tracking-widest">
          {item.year}
        </span>
      </div>
    </div>
  );
}

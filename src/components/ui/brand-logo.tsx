import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.55em] leading-none",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-[1.16em] w-[2em] shrink-0 bg-[url('/images/nextgiant/brand-lockup-reference.png')] bg-no-repeat mix-blend-multiply"
        style={{
          backgroundPosition: "-0.838em -0.612em",
          backgroundSize: "8.829em 2.417em",
        }}
      />
      <span className="font-display text-[0.86em] font-extrabold tracking-[-0.055em]">
        NextGiant
      </span>
    </span>
  );
}

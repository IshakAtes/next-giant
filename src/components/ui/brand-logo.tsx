import Image from "next/image";

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
      <Image
        src="/images/nextgiant/brand-mark.png"
        alt=""
        width={72}
        height={51}
        className="h-[1.16em] w-auto shrink-0"
      />
      <span className="font-display text-[0.86em] font-extrabold tracking-[-0.055em]">
        NextGiant
      </span>
    </span>
  );
}

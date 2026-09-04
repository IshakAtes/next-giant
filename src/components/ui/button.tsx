import Link from "next/link";

import { Magnetic } from "@/components/interactive/magnetic";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  cursorLabel?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  cursorLabel,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Magnetic strength={0.3} className={className}>
      <Link
        href={href}
        data-cursor={cursorLabel}
        className={cn(
          "group relative inline-flex items-center gap-3 overflow-hidden px-7 py-3.5 font-mono text-xs tracking-wide uppercase transition-colors duration-300",
          isPrimary
            ? "bg-accent text-accent-fg hover:bg-fg"
            : "border-line-strong text-fg hover:border-fg border",
        )}
      >
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden
          className="ease-out-quart relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </Magnetic>
  );
}

import Link from "next/link";

import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "compact";
  className?: string;
  cursorLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  opensContactDialog?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  cursorLabel,
  onClick,
  opensContactDialog = false,
}: ButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <div className={cn("inline-block", className)}>
      <Link
        href={href}
        data-cursor={cursorLabel}
        data-contact-dialog={opensContactDialog ? "true" : undefined}
        onClick={(event) => {
          if (opensContactDialog) {
            event.preventDefault();
            window.dispatchEvent(new CustomEvent("open-contact-dialog"));
          }
          onClick?.(event);
        }}
        className={cn(
          "group focus-visible:outline-accent relative isolate inline-flex items-center justify-center overflow-hidden border text-[13px] font-semibold tracking-[0.01em] transition-[color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [clip-path:polygon(0_0,calc(100%_-_11px)_0,100%_11px,100%_100%,0_100%)] focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.985]",
          size === "compact"
            ? "min-h-11 px-5 py-2.5"
            : "min-h-13 px-6 py-3.5 sm:px-7",
          isPrimary
            ? "border-accent bg-accent text-white shadow-[0_18px_36px_-24px_rgba(255,79,31,0.8)] hover:border-[#20231f] hover:shadow-[0_20px_38px_-24px_rgba(18,20,18,0.45)]"
            : "border-fg/20 text-fg hover:border-fg bg-white/65 backdrop-blur-sm hover:text-white",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
            isPrimary
              ? "translate-y-[102%] bg-[#20231f] group-hover:translate-y-0"
              : "origin-left scale-x-0 bg-[#20231f] group-hover:scale-x-100",
          )}
        />
        <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-px motion-reduce:transform-none">
          {children}
        </span>
        <span
          aria-hidden
          className="relative z-10 ml-5 flex h-6 w-7 items-center justify-end border-l border-current/25 pl-3"
        >
          <svg
            viewBox="0 0 18 16"
            className="h-4 w-[1.125rem] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1 motion-reduce:transform-none"
            fill="none"
          >
            <path
              d="M2 8h13M10.5 3.5 15 8l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}

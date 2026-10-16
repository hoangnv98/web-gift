import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/** Apricot-blossom mark + wordmark */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-10 place-items-center rounded-full bg-crimson-700 text-gold-300 shadow-[0_6px_16px_-6px_rgb(136_25_23/0.7)] transition-transform duration-500 ease-out-expo group-hover:rotate-12">
        <BlossomIcon className="size-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-tight",
            tone === "dark" ? "text-cream-50" : "text-ink-900",
          )}
        >
          {site.name}
        </span>
        <span className={cn("mt-1 text-[10px] font-medium uppercase tracking-[0.22em]", tone === "dark" ? "text-gold-300" : "text-gold-600")}>
          Gift Catalogue
        </span>
      </span>
    </Link>
  );
}

export function BlossomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3.2c1.9 0 3 1.6 3 3.3 0 .3 0 .5-.1.8 1.8-.8 3.9-.2 4.5 1.6.6 1.8-.5 3.5-2.1 4.1.9.9 1.4 2.4.5 3.8-.9 1.5-2.9 1.7-4.4.8.1 1.7-1 3.3-2.8 3.3s-2.9-1.6-2.8-3.3c-1.5.9-3.5.7-4.4-.8-.9-1.4-.4-2.9.5-3.8C2.3 12.4 1.2 10.7 1.8 8.9c.6-1.8 2.7-2.4 4.5-1.6-.1-.3-.1-.5-.1-.8 0-1.7 1.1-3.3 3-3.3 1.2 0 2.1.6 2.8 1.5.7-.9 1.6-1.5 2.8-1.5Z" opacity=".95" />
      <circle cx="12" cy="12.5" r="2.2" fill="#881917" />
    </svg>
  );
}

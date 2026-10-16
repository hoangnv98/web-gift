import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/** Logo tròn T&Q GIFT – nền navy, chữ vàng kim. Thay bằng file logo thật khi có. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid shrink-0 place-items-center rounded-full bg-navy-900 ring-2 ring-gold-500 shadow-[0_6px_18px_-6px_rgb(212_175_55/0.7)]", className)}>
      <svg viewBox="0 0 64 64" className="size-[86%]" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="url(#g)" strokeWidth="1.2" strokeDasharray="2 3" />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c59b27" /><stop offset="0.5" stopColor="#f5e6ad" /><stop offset="1" stopColor="#aa7c11" />
          </linearGradient>
        </defs>
        <text x="32" y="36" textAnchor="middle" fontFamily="Playfair Display, Georgia, serif" fontWeight="700" fontSize="22" fill="url(#g)">T&amp;Q</text>
        <text x="32" y="49" textAnchor="middle" fontFamily="sans-serif" fontWeight="600" fontSize="7.5" letterSpacing="2" fill="#f5e6ad">GIFT</text>
      </svg>
    </span>
  );
}

export function Logo({ className, tone = "dark", compact = false }: { className?: string; tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label={site.name}>
      <LogoMark className="size-12 transition-transform duration-500 ease-out-expo group-hover:rotate-6" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display text-[1.35rem] font-bold tracking-tight", tone === "dark" ? "text-cream-50" : "text-navy-900")}>{site.name}</span>
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-gold-400">{site.tagline}</span>
        </span>
      )}
    </Link>
  );
}

export function BlossomIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3.2c1.9 0 3 1.6 3 3.3 0 .3 0 .5-.1.8 1.8-.8 3.9-.2 4.5 1.6.6 1.8-.5 3.5-2.1 4.1.9.9 1.4 2.4.5 3.8-.9 1.5-2.9 1.7-4.4.8.1 1.7-1 3.3-2.8 3.3s-2.9-1.6-2.8-3.3c-1.5.9-3.5.7-4.4-.8-.9-1.4-.4-2.9.5-3.8C2.3 12.4 1.2 10.7 1.8 8.9c.6-1.8 2.7-2.4 4.5-1.6-.1-.3-.1-.5-.1-.8 0-1.7 1.1-3.3 3-3.3 1.2 0 2.1.6 2.8 1.5.7-.9 1.6-1.5 2.8-1.5Z" />
      <circle cx="12" cy="12.5" r="2.2" fill="#f5e6ad" />
    </svg>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

/* Kiểu chữ "biên tập" theo mincygroup.com, dùng cho trang Giới thiệu và Hồ sơ năng lực. */

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("inline-block text-[13px] font-medium uppercase tracking-[0.3em] text-navy-900 sm:text-[15px]", className)}>— {children}</span>;
}

export function H2({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h2 className={cn("text-balance text-[2rem] font-normal leading-[1.15] tracking-[-0.01em] text-navy-900 md:text-[2.5rem] lg:text-5xl", className)}>{children}</h2>;
}

/** Chữ nhấn trong tiêu đề (tương đương `.emph` của mincygroup): vàng kim trên nền sáng, vàng nhạt trên nền navy. */
export function Emph({ dark = false, children }: { dark?: boolean; children: React.ReactNode }) {
  return <span className={dark ? "text-gold-300" : "text-gold-700"}>{children}</span>;
}

export function GhostLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2 py-3 text-[13px] font-medium uppercase tracking-[0.15em] text-ink-800 transition-colors hover:text-navy-900", className)}>
      {children}<span className="transition-[margin] duration-300 group-hover:ml-2">→</span>
    </Link>
  );
}

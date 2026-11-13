import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoGold from "@/assets/brand/logo-ngang-vang.png";
import logoMaroon from "@/assets/brand/logo-ngang-do.png";

/**
 * Logo ngang T&Q GIFT (biểu tượng + chữ + slogan "Trao chữ Tâm – Gửi quà Quý").
 * tone="dark": nền tối (header, footer navy) → bản vàng kim; tone="light": nền sáng → bản đỏ đô.
 * File gốc: src/assets/brand/ (thêm bản trắng logo-ngang-trang.png), favicon: src/app/icon.png.
 */
export function Logo({ className, imageClassName, tone = "dark", name = "T&Q GIFT", preload = false }: { className?: string; imageClassName?: string; tone?: "light" | "dark"; name?: string; preload?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label={`${name} – Trang chủ`}>
      <Image src={tone === "dark" ? logoGold : logoMaroon} alt={name} preload={preload} sizes="200px" className={cn("h-12 w-auto sm:h-14", imageClassName)} />
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

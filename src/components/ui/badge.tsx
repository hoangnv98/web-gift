import { cn } from "@/lib/utils";
import type { Badge as BadgeKind } from "@/data/catalogue";

const styles: Record<BadgeKind, string> = {
  "Bán chạy": "bg-ruby-700 text-cream-50",
  "Cao cấp": "bg-navy-900 text-gold-300",
  "Giới hạn": "bg-gold-gradient text-navy-900",
  Mới: "bg-cream-50 text-ruby-700 ring-1 ring-ruby-200",
};

export function Badge({ kind, className }: { kind: BadgeKind; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]", styles[kind], className)}>
      {kind}
    </span>
  );
}

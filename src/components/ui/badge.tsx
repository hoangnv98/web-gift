import { cn } from "@/lib/utils";
import type { BadgeId } from "@/lib/cms";
import { badgeLabel } from "@/lib/catalogue";

const styles: Record<BadgeId, string> = {
  "ban-chay": "bg-ruby-700 text-cream-50",
  "cao-cap": "bg-navy-900 text-gold-300",
  "gioi-han": "bg-gold-gradient text-navy-900",
  moi: "bg-cream-50 text-ruby-700 ring-1 ring-ruby-200",
};

export function Badge({ kind, className }: { kind: BadgeId; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]", styles[kind], className)}>
      {badgeLabel[kind]}
    </span>
  );
}

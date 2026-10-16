"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { groups, materials, priceTiers, sortOptions, visibleProducts, tags, type MaterialId, type SortId, type Tag } from "@/data/catalogue";
import { CatalogueItem } from "./catalogue-item";
import { AgeGate } from "@/components/layout/age-gate";
import { Button } from "@/components/ui/button";

/** Tham số URL: nhom, chat-lieu, gia, sap-xep, tag, q */
export function CatalogueView() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const f = {
    nhom: sp.get("nhom") || "tat-ca",
    chatLieu: (sp.get("chat-lieu") as MaterialId | null) || null,
    gia: sp.get("gia"),
    sapXep: (sp.get("sap-xep") as SortId) || "mac-dinh",
    tag: (sp.get("tag") as Tag | null) || null,
    q: sp.get("q") || "",
  };

  const update = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (!v || v === "tat-ca" || v === "mac-dinh") next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, sp],
  );

  const results = useMemo(() => {
    const group = groups.find((g) => g.id === f.nhom) ?? groups[0];
    const tier = priceTiers.find((t) => t.id === f.gia);
    const q = f.q.trim().toLowerCase();
    let list = visibleProducts.filter((p) => {
      if (!group.match(p)) return false;
      if (f.chatLieu && p.material !== f.chatLieu) return false;
      if (f.tag && !p.tags.includes(f.tag)) return false;
      if (tier && (p.price < tier.min || (tier.max !== null && p.price >= tier.max))) return false;
      if (q && !(p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q) || p.items.some((i) => i.toLowerCase().includes(q)))) return false;
      return true;
    });
    if (f.sapXep === "gia-tang") list = [...list].sort((a, b) => a.price - b.price);
    if (f.sapXep === "gia-giam") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [f.nhom, f.chatLieu, f.gia, f.sapXep, f.tag, f.q]);

  const activeCount = [f.nhom !== "tat-ca", f.chatLieu, f.gia, f.tag, f.q].filter(Boolean).length;
  const tagInfo = tags.find((t) => t.id === f.tag);

  return (
    <div>
      <AgeGate active={!!tagInfo?.ageGate} />

      {/* Tầng 1 – Nhóm chính (nền vàng đồng) */}
      <PillRow label="Dịp tặng">
        {groups.map((g) => (
          <Pill key={g.id} tone="gold" active={f.nhom === g.id} onClick={() => update({ nhom: g.id })}>{g.label}</Pill>
        ))}
      </PillRow>

      {/* Tầng 2 – Chất liệu */}
      <PillRow label="Chất liệu & kiểu dáng">
        <Pill active={!f.chatLieu} onClick={() => update({ "chat-lieu": null })}>Tất cả</Pill>
        {materials.map((m) => (
          <Pill key={m.id} active={f.chatLieu === m.id} onClick={() => update({ "chat-lieu": f.chatLieu === m.id ? null : m.id })}>{m.label}</Pill>
        ))}
      </PillRow>

      {/* Tầng 3 – Khoảng giá */}
      <PillRow label="Khoảng giá">
        <Pill active={!f.gia} onClick={() => update({ gia: null })}>Tất cả</Pill>
        {priceTiers.map((t) => (
          <Pill key={t.id} active={f.gia === t.id} onClick={() => update({ gia: f.gia === t.id ? null : t.id })}>{t.label}</Pill>
        ))}
      </PillRow>

      {/* Tầng 4 – Sắp xếp */}
      <PillRow label="Sắp xếp">
        {sortOptions.map((s) => (
          <Pill key={s.id} tone="navy" active={f.sapXep === s.id} onClick={() => update({ "sap-xep": s.id })}>{s.label}</Pill>
        ))}
      </PillRow>

      {/* Active chips */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-cream-300 pt-4">
        <p className="text-sm text-ink-500">
          <span className="font-bold text-navy-900">{results.length}</span> set quà
          {f.q && <> cho từ khoá “<span className="font-semibold text-navy-900">{f.q}</span>”</>}
          {tagInfo && <> · <span className="font-semibold text-ruby-700">{tagInfo.label}</span></>}
        </p>
        {activeCount > 0 && (
          <button type="button" onClick={() => update({ nhom: null, "chat-lieu": null, gia: null, tag: null, q: null })} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ruby-700 hover:underline">
            <X className="size-4" /> Xoá bộ lọc ({activeCount})
          </button>
        )}
      </div>

      {/* Grid: 2 cột desktop, 1 cột mobile */}
      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {results.map((p, i) => <CatalogueItem key={p.slug} product={p} priority={i < 2} />)}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-cream-400 bg-cream-50 p-12 text-center">
          <p className="font-display text-2xl text-navy-900">Chưa có set quà phù hợp</p>
          <p className="mt-2 text-sm text-ink-500">Thử nới khoảng giá, chọn chất liệu khác hoặc liên hệ để được thiết kế riêng.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => update({ nhom: null, "chat-lieu": null, gia: null, tag: null, q: null })}>Xoá bộ lọc</Button>
            <Button variant="gold" size="sm" href="/lien-he">Nhận tư vấn</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function PillRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
      <p className="w-36 shrink-0 pt-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-400">{label}</p>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">{children}</div>
    </div>
  );
}

function Pill({ children, active, onClick, tone = "grey" }: { children: React.ReactNode; active: boolean; onClick: () => void; tone?: "gold" | "grey" | "navy" }) {
  const styles = {
    gold: active ? "bg-gold-gradient text-navy-900 shadow-gold" : "bg-gold-100 text-gold-800 ring-1 ring-gold-300 hover:bg-gold-200",
    grey: active ? "bg-navy-900 text-cream-50" : "bg-cream-200 text-ink-700 hover:bg-cream-300",
    navy: active ? "bg-ruby-700 text-cream-50" : "bg-cream-200 text-ink-700 hover:bg-cream-300",
  }[tone];
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("h-10 shrink-0 rounded-full px-4 text-[13px] font-semibold transition-all duration-300", styles)}>
      {children}
    </button>
  );
}

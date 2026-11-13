"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, BookOpen, Building2, ChevronDown, ChevronRight, ClipboardList, FileBadge2, FileText, Gift, Moon, Package, PartyPopper, Printer, Wallet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MenuGroup, MenuIcon, MenuTile } from "@/lib/product-menu";

const ICONS: Record<MenuIcon, LucideIcon> = {
  tet: Gift,
  "trung-thu": Moon,
  "su-kien": PartyPopper,
  b2b: Building2,
  budget: Wallet,
  material: Package,
  discount: BadgePercent,
  print: Printer,
  steps: ClipboardList,
  quote: FileText,
  profile: FileBadge2,
};

/** Mega menu desktop: cột nhóm bên trái, rê chuột vào nhóm thì bên phải hiện ô danh mục con. */
export function ProductMegaMenu({ groups, open, onClose }: { groups: MenuGroup[]; open: boolean; onClose: () => void }) {
  const [activeId, setActiveId] = useState(groups[0]?.id);
  const active = groups.find((g) => g.id === activeId) ?? groups[0];
  if (!active) return null;

  return (
    <div
      className={cn(
        "absolute inset-x-4 top-full z-50 origin-top overflow-hidden rounded-b-2xl bg-white text-ink-900 shadow-card-hover ring-1 ring-navy-900/10 transition-all duration-200 sm:inset-x-6 lg:inset-x-8",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
      )}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="grid min-h-[380px] grid-cols-[288px_1fr]">
        <ul className="border-r border-cream-200 bg-cream-50 py-3" role="list">
          {groups.map((g) => {
            const Icon = ICONS[g.icon];
            const isActive = g.id === active.id;
            return (
              <li key={g.id}>
                <Link
                  href={g.href}
                  onMouseEnter={() => setActiveId(g.id)}
                  onFocus={() => setActiveId(g.id)}
                  onClick={onClose}
                  className={cn("relative flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors", isActive ? "bg-white text-navy-900" : "text-ink-700 hover:text-navy-900")}
                >
                  {isActive && <span className="absolute inset-y-2 left-0 w-0.5 bg-gold-500" />}
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", isActive ? "bg-navy-900 text-gold-300" : "bg-white text-navy-700 ring-1 ring-cream-200")}><Icon className="size-4" /></span>
                  <span className="flex-1">{g.title}</span>
                  <ChevronRight className={cn("size-4 transition-transform", isActive ? "translate-x-0.5 text-gold-600" : "text-ink-300")} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col p-6">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-cream-200 pb-4">
            <p className="text-lg font-normal text-navy-900">{active.title}</p>
            <Link href={active.href} onClick={onClose} className="group inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-ink-700 hover:text-navy-900">
              Xem tất cả <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          {/* Chỉ render nhóm đang chọn khi menu mở -> ảnh không tải khi chưa cần */}
          {open && (
            <ul className="grid flex-1 content-start grid-cols-4 gap-4 xl:grid-cols-5" role="list">
              {active.tiles.map((t) => <li key={t.href + t.label}><DesktopTile tile={t} onClick={onClose} /></li>)}
            </ul>
          )}
          <Link href="/catalogue" onClick={onClose} className="mt-6 flex items-center justify-between rounded-xl bg-navy-900 px-5 py-3 text-sm font-medium text-cream-50 transition-colors hover:bg-navy-800">
            <span>Xem toàn bộ Catalogue online · lọc theo dịp, chất liệu, khoảng giá</span>
            <BookOpen className="size-4 text-gold-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Badges({ tile }: { tile: MenuTile }) {
  return (
    <>
      {tile.hot && <span className="rounded-full bg-ruby-700 px-1.5 py-px text-[9px] font-bold tracking-wider text-white">HOT</span>}
      {tile.ageGate && !tile.label.includes("18+") && <span className="rounded-full border border-ruby-200 px-1.5 py-px text-[9px] font-bold text-ruby-700">18+</span>}
    </>
  );
}

function DesktopTile({ tile, onClick }: { tile: MenuTile; onClick: () => void }) {
  if (tile.image) {
    return (
      <Link href={tile.href} onClick={onClick} className="group block">
        <span className="relative block aspect-square overflow-hidden rounded-xl bg-cream-100 ring-1 ring-cream-200">
          <Image src={tile.image} alt="" fill sizes="180px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          {(tile.hot || tile.ageGate) && <span className="absolute left-2 top-2 flex gap-1"><Badges tile={tile} /></span>}
        </span>
        <span className="mt-2 block text-sm font-medium leading-snug text-ink-800 group-hover:text-ruby-700">{tile.label}</span>
      </Link>
    );
  }
  const Icon = ICONS[tile.icon ?? "budget"];
  return (
    <Link href={tile.href} onClick={onClick} className="group flex h-full flex-col rounded-xl border border-cream-200 p-4 transition-colors hover:border-gold-500 hover:bg-cream-50">
      <span className="grid size-10 place-items-center rounded-full border border-navy-900/15 text-navy-900 group-hover:border-gold-500 group-hover:text-gold-700"><Icon className="size-4" strokeWidth={1.75} /></span>
      <span className="mt-3 text-sm font-medium leading-snug text-ink-800 group-hover:text-navy-900">{tile.label}</span>
      {tile.note && <span className="mt-1 text-xs text-ink-400">{tile.note}</span>}
    </Link>
  );
}

/** Menu Sản phẩm trên mobile: accordion 2 cấp (dùng <details> gốc của trình duyệt). */
export function ProductMenuMobile({ groups }: { groups: MenuGroup[] }) {
  return (
    <details className="group/sp rounded-xl">
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        Sản phẩm <ChevronDown className="size-5 text-gold-300 transition-transform group-open/sp:rotate-180" />
      </summary>
      <div className="mb-2 ml-3 border-l border-white/10 pl-2">
        {groups.map((g) => {
          const Icon = ICONS[g.icon];
          return (
            <details key={g.id} className="group/g">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-cream-100 hover:bg-white/10 [&::-webkit-details-marker]:hidden">
                <Icon className="size-4 text-gold-300" />
                <span className="flex-1">{g.title}</span>
                <ChevronDown className="size-4 text-cream-200/60 transition-transform group-open/g:rotate-180" />
              </summary>
              <ul className="mb-2 ml-7 space-y-0.5">
                {g.tiles.map((t) => (
                  <li key={t.href + t.label}>
                    <Link href={t.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-cream-200/85 hover:bg-white/10 hover:text-gold-300">
                      {t.label}<Badges tile={t} />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={g.href} className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300 hover:bg-white/10">Xem tất cả <ArrowRight className="size-3.5" /></Link>
                </li>
              </ul>
            </details>
          );
        })}
      </div>
    </details>
  );
}

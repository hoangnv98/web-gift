"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronDown, Heart, LayoutGrid, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Navigation, Settings } from "@/lib/cms";
import type { ProductLite } from "@/lib/catalogue";
import { useStore } from "@/lib/store";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { SearchBox } from "./search-box";
import { SearchOverlay } from "./search-overlay";

export interface HeaderProps {
  settings: Pick<Settings, "name" | "slogan" | "tagline" | "hotline" | "hotlineHref">;
  navigation: Navigation;
  products: ProductLite[];
}

export function Header({ settings: site, navigation, products }: HeaderProps) {
  const pathname = usePathname();
  // Menu "mở" chỉ với pathname lúc mở -> điều hướng sẽ tự đóng, không cần effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [catPath, setCatPath] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileOpen = openPath === pathname;
  const catOpen = catPath === pathname;
  const { cart, wishlist } = useStore();

  const priceOf = (slug: string) => products.find((p) => p.slug === slug)?.price ?? 0;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [slug, qty]) => sum + priceOf(slug) * qty, 0);
  const hasHot = navigation.megaMenu.some((c) => c.items.some((i) => i.hot));

  return (
    <header className="sticky top-0 z-50 shadow-[0_8px_30px_-18px_rgb(11_25_44/0.6)]">
      {/* Topbar */}
      <div className="bg-navy-950 text-cream-200">
        <Container className="flex h-9 items-center justify-between gap-4 text-xs">
          <p className="truncate">
            <span className="font-semibold text-gold-300">{site.name}</span>
            <span className="hidden sm:inline"> – {navigation.announcement?.text || site.slogan}</span>
          </p>
          <a href={site.hotlineHref} className="flex shrink-0 items-center gap-1.5 font-semibold hover:text-gold-300">
            <Phone className="size-3.5 text-gold-400" />
            <span className="hidden sm:inline">Tư vấn mua hàng:</span> {site.hotline}
          </a>
        </Container>
      </div>

      {/* Main header */}
      <div className="bg-navy-900 text-cream-50">
        <Container className="flex h-[76px] items-center gap-3 sm:gap-4 lg:gap-8">
          <Logo tone="dark" name={site.name} tagline={site.tagline} className="min-w-0" />
          <SearchBox products={products} className="hidden flex-1 md:block lg:mx-6" />
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} className="grid size-11 place-items-center rounded-full hover:bg-white/10 md:hidden" aria-label="Tìm kiếm" aria-haspopup="dialog" aria-expanded={searchOpen}>
              <Search className="size-5" />
            </button>
            <Link href="/yeu-thich" className="relative grid size-11 place-items-center rounded-full hover:bg-white/10" aria-label="Sản phẩm yêu thích">
              <Heart className="size-5" />
              {wishlist.length > 0 && <Count n={wishlist.length} />}
            </Link>
            <Link href="/gio-hang" className="flex h-11 items-center gap-2 rounded-full px-2 hover:bg-white/10 sm:pr-4" aria-label="Giỏ hàng">
              <span className="relative grid size-9 place-items-center">
                <ShoppingBag className="size-5" />
                {cartCount > 0 && <Count n={cartCount} />}
              </span>
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-[10px] uppercase tracking-wider text-cream-200/70">Giỏ hàng</span>
                <span className="text-sm font-bold text-gold-300">{formatPrice(cartTotal)}</span>
              </span>
            </Link>
            <button type="button" onClick={() => setOpenPath(mobileOpen ? null : pathname)} className="grid size-11 place-items-center rounded-full hover:bg-white/10 lg:hidden" aria-label={mobileOpen ? "Đóng menu" : "Mở menu"} aria-expanded={mobileOpen}>
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Navigation bar */}
      <div className="hidden border-t border-white/10 bg-navy-800 text-cream-50 lg:block">
        <Container className="flex h-12 items-center gap-2">
          <div className="relative" onMouseEnter={() => setCatPath(pathname)} onMouseLeave={() => setCatPath(null)}>
            <button type="button" onClick={() => setCatPath(catOpen ? null : pathname)} className="relative flex h-12 items-center gap-2 bg-navy-900 px-4 text-sm font-bold uppercase tracking-wide text-gold-300 hover:bg-navy-950" aria-expanded={catOpen}>
              <LayoutGrid className="size-4" /> Danh mục sản phẩm <ChevronDown className={cn("size-4 transition-transform", catOpen && "rotate-180")} />
              {hasHot && <span className="absolute -top-1.5 right-3 rounded-full bg-ruby-700 px-1.5 py-px text-[9px] font-bold tracking-wider text-white shadow">HOT</span>}
            </button>
            <div className={cn("absolute left-0 top-full z-50 w-[720px] origin-top-left rounded-b-2xl bg-white p-6 text-ink-900 shadow-card-hover ring-1 ring-navy-900/10 transition-all duration-200", catOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0")}>
              <div className="grid grid-cols-3 gap-6">
                {navigation.megaMenu.map((col) => (
                  <div key={col.title}>
                    <p className="font-display text-lg font-semibold text-navy-900">{col.title}</p>
                    <ul className="mt-3 space-y-2">
                      {col.items.map((it) => (
                        <li key={it.href}>
                          <Link href={it.href} onClick={() => setCatPath(null)} className="block rounded-lg px-2 py-1.5 text-sm text-ink-700 hover:bg-cream-100 hover:text-ruby-700">
                            {it.label}{it.hot && <span className="ml-2 rounded-full bg-ruby-700 px-1.5 text-[9px] font-bold text-white">HOT</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link href="/catalogue" onClick={() => setCatPath(null)} className="mt-5 flex items-center justify-between rounded-xl bg-gold-gradient px-4 py-3 text-sm font-bold text-navy-900">
                Xem toàn bộ Catalogue online <BookOpen className="size-4" />
              </Link>
            </div>
          </div>

          <nav className="flex flex-1 items-center justify-center gap-1" aria-label="Chính">
            {navigation.mainNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={cn("relative px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-cream-200 transition-colors hover:text-gold-300", active && "text-gold-300")}>
                  {item.label}
                  {active && <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-gold-400" />}
                </Link>
              );
            })}
          </nav>

          <Link href="/catalogue" className="flex h-9 items-center gap-2 rounded-full bg-gold-gradient px-5 text-sm font-bold uppercase tracking-wide text-navy-900 shadow-[0_6px_20px_-8px_rgb(212_175_55/0.9)] transition hover:-translate-y-0.5 hover:brightness-105">
            <BookOpen className="size-4" /> Catalogue
          </Link>
        </Container>
      </div>

      {/* Mobile menu */}
      <div className={cn("grid overflow-hidden bg-navy-900 text-cream-50 transition-[grid-template-rows] duration-400 ease-out-expo lg:hidden", mobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="min-h-0">
          <Container className="flex flex-col gap-1 border-t border-white/10 py-4">
            <Link href="/catalogue" className="mb-2 flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-4 py-3 text-sm font-bold uppercase text-navy-900"><BookOpen className="size-4" /> Catalogue online</Link>
            {navigation.mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-xl px-3 py-3 text-base font-medium hover:bg-white/10">{item.label}</Link>
            ))}
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">Danh mục sản phẩm</p>
            {navigation.megaMenu.flatMap((c) => c.items).map((it) => (
              <Link key={it.href} href={it.href} className="rounded-xl px-3 py-2.5 text-sm text-cream-200 hover:bg-white/10">{it.label}</Link>
            ))}
          </Container>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} products={products} navigation={navigation} />
    </header>
  );
}

function Count({ n }: { n: number }) {
  return <span className="absolute -right-0.5 -top-0.5 grid min-w-[18px] place-items-center rounded-full bg-ruby-700 px-1 text-[10px] font-bold leading-[18px] text-white ring-2 ring-navy-900">{n}</span>;
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Header() {
  const pathname = usePathname();
  // Menu is "open" only for the pathname it was opened on, so navigation closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (v: boolean) => setOpenPath(v ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-crimson-800 text-cream-100">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <Truck className="size-3.5 text-gold-300" />
            <span className="hidden sm:inline">Giao hàng toàn quốc · Miễn phí thiết kế thiệp in tên doanh nghiệp</span>
            <span className="sm:hidden">Giao hàng toàn quốc</span>
          </p>
          <a href={site.hotlineHref} className="flex items-center gap-1.5 font-semibold tracking-wide hover:text-gold-300">
            <Phone className="size-3.5 text-gold-300" />
            {site.hotline}
          </a>
        </Container>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b border-transparent bg-cream-50/85 backdrop-blur-md transition-all duration-300",
          scrolled && "border-cream-300/70 shadow-[0_8px_30px_-18px_rgb(28_20_18/0.35)]",
        )}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Chính">
            {site.nav.map((item) => {
              const base = item.href.split("?")[0];
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(base) && !item.href.includes("?");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-crimson-700",
                    active && "text-crimson-700",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button href="/lien-he" size="sm">
              Nhận báo giá
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="grid size-10 place-items-center rounded-full text-ink-900 hover:bg-cream-200 lg:hidden"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>

        {/* Mobile menu */}
        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out-expo lg:hidden",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <Container className="flex flex-col gap-1 border-t border-cream-300/70 py-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-ink-800 hover:bg-cream-200"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/lien-he" className="mt-2">
                Nhận báo giá
              </Button>
            </Container>
          </div>
        </div>
      </div>
    </header>
  );
}

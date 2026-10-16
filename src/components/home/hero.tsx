import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { unsplash, img } from "@/lib/images";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-tet-lattice">
      {/* Blossom decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 hidden size-[520px] opacity-[0.18] mix-blend-multiply lg:block">
        <Image src={unsplash(img.blossom, 900, 900)} alt="" fill sizes="520px" className="object-cover" />
      </div>

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-6">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-crimson-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
            <Sparkles className="size-3.5" /> Catalogue {site.season}
          </p>
          <h1 className="animate-fade-up animate-delay-1 mt-6 text-balance text-5xl font-semibold leading-[1.05] text-ink-900 sm:text-6xl lg:text-7xl">
            Món quà Tết
            <br />
            <span className="text-gold-foil italic">trọn vẹn</span> ý nghĩa
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-500">
            Hộp quà và giỏ quà Tết cao cấp dành cho doanh nghiệp. Thiết kế theo nhận diện thương hiệu, sản phẩm tuyển chọn, giao tận nơi toàn quốc.
          </p>
          <div className="animate-fade-up animate-delay-3 mt-9 flex flex-wrap gap-3">
            <Button href="/catalogue" size="lg">
              Xem catalogue <ArrowRight className="size-4" />
            </Button>
            <Button href="/lien-he" variant="outline" size="lg">
              Nhận báo giá doanh nghiệp
            </Button>
          </div>

          <dl className="animate-fade-up animate-delay-4 mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-gold-500/30 pt-8">
            <Stat value="50+" label="Mẫu quà Tết" />
            <Stat value="1.200+" label="Doanh nghiệp tin chọn" />
            <Stat value="63" label="Tỉnh thành giao hàng" />
          </dl>
        </div>

        {/* Collage */}
        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-6 grid-rows-6 gap-3 sm:gap-4" style={{ aspectRatio: "1 / 1" }}>
            <Frame className="col-span-4 row-span-4 animate-fade-up animate-delay-1" src={unsplash(img.redGifts, 1000, 1000)} alt="Hộp quà Tết đỏ nơ vàng" priority />
            <Frame className="col-span-2 row-span-3 animate-fade-up animate-delay-2" src={unsplash(img.teaPot, 600, 900)} alt="Trà thượng hạng" />
            <Frame className="col-span-2 row-span-3 animate-fade-up animate-delay-3" src={unsplash(img.winePour, 600, 900)} alt="Rượu vang đỏ" />
            <Frame className="col-span-4 row-span-2 animate-fade-up animate-delay-4" src={unsplash(img.mixedNuts, 1000, 500)} alt="Hạt dinh dưỡng" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-4 shadow-card-hover ring-1 ring-ink-900/5 sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-600">Từ</p>
            <p className="font-display text-2xl font-semibold text-crimson-700">360.000đ</p>
            <p className="text-xs text-ink-400">đến 6.500.000đ / phần</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-3xl font-semibold text-crimson-700">{value}</dt>
      <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-400">{label}</dd>
    </div>
  );
}

function Frame({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-cream-200 shadow-card ring-1 ring-ink-900/5 ${className ?? ""}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
    </div>
  );
}

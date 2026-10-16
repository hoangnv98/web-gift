import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { CatalogueView } from "@/components/catalogue/catalogue-view";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Catalogue quà Tết",
  description: `Catalogue hộp quà, giỏ quà ${site.season}. Lọc theo chất liệu và khoảng giá.`,
};

export default function CataloguePage() {
  return (
    <>
      <section className="bg-tet-lattice">
        <Container className="py-14 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">Catalogue {site.season}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Catalogue quà Tết <span className="text-gold-foil italic">cao cấp</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-ink-500">
            Toàn bộ mẫu hộp quà và giỏ quà của mùa Tết này. Giá niêm yết chưa bao gồm VAT, ưu đãi theo số lượng cho đơn hàng doanh nghiệp.
          </p>
        </Container>
      </section>
      <Container className="py-10 lg:py-14">
        <Suspense fallback={<CatalogueSkeleton />}>
          <CatalogueView />
        </Suspense>
      </Container>
    </>
  );
}

function CatalogueSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-[4/6] animate-pulse rounded-3xl bg-cream-200" />
      ))}
    </div>
  );
}

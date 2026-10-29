import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { CatalogueView } from "@/components/catalogue/catalogue-view";
import { getCategories, getMaterials, getProducts, getSettings, getTags } from "@/lib/cms";
import { catalogueFontsClassName } from "@/lib/catalogue-fonts";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return {
    title: "Catalogue quà tặng online",
    description: `Web catalogue trực tuyến của ${site.name}: hộp quà Tết, giỏ quà Tết, quà Trung thu, quà sự kiện. Lọc theo dịp, chất liệu, khoảng giá. Giá chưa gồm VAT.`,
    alternates: { canonical: "/catalogue" },
  };
}

export default async function CataloguePage() {
  const [site, products, categories, materials, tags] = await Promise.all([getSettings(), getProducts(), getCategories(), getMaterials(), getTags()]);
  return (
    <div className={`${catalogueFontsClassName} bg-tet-50 font-cat-sans text-ink-900`}>
      <section className="border-b border-tet-200">
        <Container className="max-w-[1680px] py-10 lg:py-14">
          <span className="inline-block rounded-sm bg-sun-500 px-3 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[0.08em] text-white">Web catalogue · {site.season}</span>
          <h1 className="mt-4 text-balance font-cat-serif text-4xl font-[450] uppercase leading-[1.05] tracking-[0.04em] text-tet-red sm:text-5xl" style={{ fontVariationSettings: '"opsz" 96' }}>
            Catalogue quà tặng
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-[15px] font-medium leading-relaxed text-ink-500">
            Toàn bộ set quà của {site.name}, cập nhật giá và thành phần theo thời gian thực. Gửi link này cho đối tác để xem trực tiếp, không cần file PDF. Giá chưa gồm VAT.
          </p>
        </Container>
      </section>
      <Container className="max-w-[1680px] py-8 lg:py-12">
        <Suspense fallback={<Skeleton />}>
          <CatalogueView products={products.filter((p) => p.availability !== "het-hang")} categories={categories} materials={materials} tags={tags} brand={site.name} />
        </Suspense>
      </Container>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
      {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[640px] animate-pulse rounded-3xl bg-tet-100" />)}
    </div>
  );
}

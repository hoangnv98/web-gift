import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { CatalogueView } from "@/components/catalogue/catalogue-view";
import { getCategories, getMaterials, getProducts, getSettings, getTags } from "@/lib/cms";

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
    <>
      <section className="bg-navy-silk text-cream-50">
        <Container className="py-12 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Web Catalogue trực tuyến · {site.season}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Catalogue quà tặng <span className="text-gold-foil italic">{site.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base text-cream-200/80 sm:text-lg">
            Toàn bộ set quà đang có, cập nhật giá và thành phần theo thời gian thực. Gửi link này cho đối tác để xem trực tiếp, không cần file PDF.
          </p>
        </Container>
      </section>
      <Container className="py-8 lg:py-12">
        <Suspense fallback={<Skeleton />}>
          <CatalogueView products={products.filter((p) => p.availability !== "het-hang")} categories={categories} materials={materials} tags={tags} brand={site.name} />
        </Suspense>
      </Container>
    </>
  );
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[520px] animate-pulse rounded-3xl bg-cream-200" />)}
    </div>
  );
}

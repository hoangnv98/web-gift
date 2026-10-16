import type { Metadata } from "next";
import { Shelf, BrandStory, BudgetFilter } from "@/components/home/sections";
import { getCategories, getProducts, getSettings } from "@/lib/cms";
import { byCategory, byTag } from "@/lib/catalogue";
import { PageHero } from "@/components/ui/page-hero";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return { title: "Quà Tết doanh nghiệp", description: `Hộp quà Tết, giỏ quà Tết cao cấp ${site.season}. Miễn phí in logo, chiết khấu B2B.`, alternates: { canonical: "/qua-tet" } };
}

export default async function TetPage() {
  const [site, products, categories] = await Promise.all([getSettings(), getProducts(), getCategories()]);
  const cat = (slug: string) => categories.find((c) => c.slug === slug);
  const hop = cat("hop-qua-tet");
  const gio = cat("gio-qua-tet");
  return (
    <>
      <PageHero eyebrow={site.season} title="Quà Tết doanh nghiệp" highlight="trọn vẹn ý nghĩa" text="Hộp quà, giỏ quà Tết được tuyển chọn cho đối tác, khách hàng VIP và tập thể nhân viên." cta={{ label: "Xem catalogue quà Tết", href: "/catalogue?nhom=qua-tet" }} image="redGifts" />
      <BudgetFilter />
      {hop && <Shelf eyebrow="Hộp quà" title="Hộp Quà Tết Cao Cấp" href="/catalogue?nhom=hop-qua-tet" products={byCategory(products, hop)} />}
      {gio && <Shelf eyebrow="Giỏ quà" title="Giỏ Quà Tết" href="/catalogue?nhom=gio-qua-tet" products={byCategory(products, gio)} className="bg-cream-100" />}
      <Shelf eyebrow="18+" title="Set quà có rượu vang nhập khẩu" href="/catalogue?tag=ruou-vang" products={byTag(products, "ruou-vang")} />
      <BrandStory compact />
    </>
  );
}

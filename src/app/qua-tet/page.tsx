import type { Metadata } from "next";
import { Shelf, BrandStory, BudgetFilter } from "@/components/home/sections";
import { byGroup, byTag } from "@/data/catalogue";
import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Quà Tết doanh nghiệp 2027", description: `Hộp quà Tết, giỏ quà Tết cao cấp ${site.season}. Miễn phí in logo, chiết khấu B2B.`, alternates: { canonical: "/qua-tet" } };

export default function TetPage() {
  return (
    <>
      <PageHero eyebrow={site.season} title="Quà Tết doanh nghiệp" highlight="trọn vẹn ý nghĩa" text="Hộp quà, giỏ quà Tết được tuyển chọn cho đối tác, khách hàng VIP và tập thể nhân viên." cta={{ label: "Xem catalogue quà Tết", href: "/catalogue?nhom=qua-tet" }} image="redGifts" />
      <BudgetFilter />
      <Shelf eyebrow="Hộp quà" title="Hộp Quà Tết Cao Cấp" href="/catalogue?nhom=hop-qua-tet" products={byGroup("hop-qua-tet")} />
      <Shelf eyebrow="Giỏ quà" title="Giỏ Quà Tết" href="/catalogue?nhom=gio-qua-tet" products={byGroup("gio-qua-tet")} className="bg-cream-100" />
      <Shelf eyebrow="18+" title="Set quà có rượu vang nhập khẩu" href="/catalogue?tag=ruou-vang" products={byTag("ruou-vang")} />
      <BrandStory compact />
    </>
  );
}

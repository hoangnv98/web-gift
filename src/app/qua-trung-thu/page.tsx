import type { Metadata } from "next";
import { Shelf } from "@/components/home/sections";
import { getCategories, getProducts } from "@/lib/cms";
import { byCategory } from "@/lib/catalogue";
import { PageHero } from "@/components/ui/page-hero";

export const metadata: Metadata = { title: "Quà Trung Thu doanh nghiệp", description: "Hộp bánh Trung thu cao cấp, giftset trà & bánh in logo doanh nghiệp.", alternates: { canonical: "/qua-trung-thu" } };

export default async function TrungThuPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const cat = categories.find((c) => c.slug === "trung-thu");
  return (
    <>
      <PageHero eyebrow="Mùa trăng đoàn viên" title="Quà Trung Thu" highlight="đoàn viên & tri ân" text="Hộp bánh thủ công, hộp gỗ hai tầng kết hợp trà, rượu vang — món quà cho mùa trăng của doanh nghiệp." cta={{ label: "Xem catalogue Trung thu", href: "/catalogue?nhom=trung-thu" }} image="goldBows" />
      {cat && <Shelf eyebrow="Bộ sưu tập" title="Hộp quà Trung Thu" href="/catalogue?nhom=trung-thu" products={byCategory(products, cat)} />}
    </>
  );
}

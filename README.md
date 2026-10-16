# T&Q GIFT – tqgift.vn

Website quà Tết, quà Trung thu và quà tặng doanh nghiệp của **CÔNG TY TNHH T&Q GIFT VIỆT NAM**.

## Tech stack

| Lớp | Lựa chọn | Lý do |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Cache Components, Turbopack) + **TypeScript** | SEO tốt, prerender tĩnh toàn bộ catalogue, dễ thêm API / Server Action / CMS |
| Styling | **Tailwind CSS v4** + design tokens trong `src/app/globals.css` | Navy `#0B192C` · Gold `#D4AF37` (gradient `#C59B27 → #F5E6AD → #AA7C11`) · Cream `#FAF6F0` · Ruby `#9B1B1E` |
| Font | `next/font`: Playfair Display (tiêu đề) + Plus Jakarta Sans (nội dung), subset `vietnamese` | |
| Ảnh | `next/image` (AVIF/WebP tự động, lazy-load) – nguồn Unsplash tạm thời | Đổi nguồn tại `src/lib/images.ts` |
| State client | `src/lib/store.ts` (giỏ hàng, yêu thích, cờ 18+) lưu localStorage | Thay bằng API khi có backend |
| Icon | `lucide-react` | |

```bash
pnpm install
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # bản production (bắt buộc build trước khi start)
pnpm lint
```

## Trang & tính năng đã có

| Route | Nội dung |
| --- | --- |
| `/` | Hero slider 3 slide · 4 Cam kết vàng · Về T&Q GIFT · Lọc theo ngân sách · 4 kệ sản phẩm · Hệ giá trị T&Q (navy) · Logo đối tác (bật/tắt) · Câu chuyện văn hoá & SEO |
| `/catalogue` | **Web catalogue trực tuyến**: 4 tầng lọc pill (dịp tặng / chất liệu / khoảng giá / sắp xếp) lọc tức thì, lưu trên URL. Mỗi set quà = ô tạp chí: tiêu đề in hoa đỏ, ảnh chính + 3 thumbnail (click đổi ảnh, double-click/nhấn ảnh lớn mở lightbox), bullet thành phần icon hoa mai, nhãn mã SP, thanh giá gradient vàng. 2 cột desktop, 1 cột mobile |
| `/catalogue/[slug]` | Chi tiết set quà, gallery + lightbox, JSON-LD Product, sản phẩm liên quan |
| `/qua-tet`, `/qua-trung-thu` | Landing theo mùa |
| `/qua-doanh-nghiep` | Landing B2B: bảng chiết khấu 10/30/50/100+, dịch vụ in/ép kim/khắc laser, quy trình 5 bước, form báo giá sỉ |
| `/gioi-thieu`, `/blog`, `/blog/[slug]`, `/lien-he` | |
| `/chinh-sach/*` | 5 trang chính sách bắt buộc (bảo mật, thanh toán, vận chuyển, kiểm hàng & đổi trả, điều khoản) |
| `/gio-hang`, `/yeu-thich` | Giỏ hàng (tổng tiền hiện trên header) & yêu thích, lưu localStorage |
| `/sitemap.xml`, `/robots.txt` | SEO |

Khác: header sticky 3 tầng (topbar · header navy có tìm kiếm gợi ý tức thì · thanh điều hướng với dropdown DANH MỤC + nút CATALOGUE vàng kim), popup xác minh 18+ khi vào danh mục rượu vang, 3 nút nổi (Zalo / Hotline / Catalogue), footer pháp nhân + vị trí logo Bộ Công Thương & DMCA.

## "Admin tạm thời" – chỉnh ở đâu

| Việc | File |
| --- | --- |
| Tên, hotline, Zalo, địa chỉ pháp nhân, menu, dropdown danh mục | `src/data/site.ts` |
| Thêm / sửa giá / ẩn set quà (`hidden: true`) → `/catalogue` tự cập nhật khi build | `src/data/catalogue.ts` |
| Bật/tắt khối logo đối tác 5.1 và 5.2, thêm logo, sửa tiêu đề; bảng chiết khấu B2B | `src/data/settings.ts` |
| Bài blog | `src/data/blog.ts` |
| Nội dung 5 chính sách | `src/data/policies.ts` |
| Ảnh | `src/lib/images.ts` + `images.remotePatterns` trong `next.config.ts` |

Thay logo thật: sửa `LogoMark` trong `src/components/ui/logo.tsx`. Thay 2 ô placeholder Bộ Công Thương / DMCA trong `src/components/layout/footer.tsx` bằng logo chính thức sau khi đăng ký.

## Lộ trình mở rộng (giai đoạn 2)

1. **CMS / Admin** – Payload CMS (self-host, có giao diện quản trị sẵn) hoặc Sanity. Model: Product, Category, PartnerLogo, HomeSettings (toggle 5.1/5.2), Post, Policy. Thay các file `src/data/*.ts` bằng hàm fetch + `"use cache"` / `cacheTag`, webhook CMS gọi `revalidateTag` → `/catalogue` cập nhật ngay khi admin sửa giá hoặc ẩn sản phẩm.
2. **Form báo giá** – Server Action trong `src/components/b2b/quote-form.tsx`: validate bằng Zod, gửi Zalo OA API / Email (Resend) / Telegram Bot, lưu lead vào CMS.
3. **Ảnh thật** – upload lên Cloudinary / Vercel Blob; `next/image` đã bật AVIF/WebP.
4. **Giỏ hàng & thanh toán** – chuyển `store.ts` sang server (Prisma + PostgreSQL), tích hợp VNPay / MoMo nếu bán lẻ.
5. **Tìm kiếm** – khi vượt ~200 sản phẩm chuyển sang Meilisearch / Algolia.
6. **Analytics** – GA4, Meta Pixel, Zalo Pixel; Google Search Console với sitemap có sẵn.

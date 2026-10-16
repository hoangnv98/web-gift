# Lộc Xuân – Catalogue quà Tết

Website catalogue quà Tết doanh nghiệp (hộp quà, giỏ quà), lấy cảm hứng từ các trang catalogue quà Tết hiện có. Giai đoạn 1: giao diện tĩnh, dữ liệu mẫu, ảnh chất lượng cao.

## Tech stack

| Lớp | Lựa chọn | Lý do |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Cache Components, Turbopack) | SEO tốt cho trang catalogue, prerender tĩnh, dễ thêm API route / server action sau này |
| Ngôn ngữ | **TypeScript** | Kiểu dữ liệu `Product`, `Category` dùng chung giữa UI và backend tương lai |
| Styling | **Tailwind CSS v4** + design tokens trong `src/app/globals.css` | Token hoá màu / font / shadow, đổi theme theo mùa chỉ cần sửa một file |
| Icon | `lucide-react` | Nhẹ, tree-shake |
| Ảnh | `next/image` + Unsplash (tạm) | Tự tối ưu kích thước, lazy-load; sau này thay bằng CDN/CMS riêng |
| Font | `next/font` – Playfair Display (display) + Be Vietnam Pro (body), subset `vietnamese` | Tự host, không layout shift |
| Package manager | pnpm | |

## Chạy dự án

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

## Cấu trúc

```
src/
├─ app/
│  ├─ layout.tsx              # Header + Footer + fonts + metadata
│  ├─ page.tsx                # Trang chủ (hero, danh mục, nổi bật, vì sao, quy trình, CTA)
│  ├─ catalogue/page.tsx      # Catalogue + bộ lọc (chất liệu, khoảng giá, sắp xếp)
│  ├─ catalogue/[slug]/page.tsx  # Chi tiết sản phẩm (prerender tĩnh)
│  ├─ lien-he/page.tsx        # Form báo giá (UI only)
│  └─ globals.css             # Design tokens
├─ components/
│  ├─ ui/                     # Button, Badge, Container, SectionHeading, Logo
│  ├─ layout/                 # Header (sticky, mobile menu), Footer
│  ├─ catalogue/              # ProductCard, CatalogueView (client), ProductGallery
│  └─ home/                   # Hero + các section trang chủ
├─ data/
│  ├─ site.ts                 # Tên thương hiệu, hotline, nav
│  └─ catalogue.ts            # Taxonomy + 14 sản phẩm mẫu
└─ lib/
   ├─ images.ts               # Registry ảnh (đổi nguồn ảnh tại đây)
   └─ utils.ts                # cn(), formatPrice(), discountPercent()
```

## Design system

- **Màu:** `crimson` (đỏ may mắn, màu chủ đạo), `gold` (vàng kim, nhấn), `cream` (nền giấy), `ink` (chữ). Dùng dạng `bg-crimson-700`, `text-gold-600`, `bg-cream-100`…
- **Font:** `font-display` cho tiêu đề (serif), `font-sans` cho nội dung.
- **Hiệu ứng:** `shadow-card`, `shadow-card-hover`, `ease-out-expo`, `.text-gold-foil`, `.bg-tet-lattice`, `.bg-crimson-silk`, `.animate-fade-up`.
- **Bo góc:** card `rounded-3xl`, nút `rounded-full`.

Đổi tên thương hiệu, hotline, mùa Tết trong `src/data/site.ts`.

## Lộ trình mở rộng

1. **CMS cho sản phẩm** – Sanity hoặc Payload CMS. Chỉ cần thay `src/data/catalogue.ts` bằng hàm fetch; mọi component nhận `Product` nên không đổi. Dùng `"use cache"` + `cacheTag` để revalidate khi CMS cập nhật.
2. **Ảnh thật** – upload lên Cloudinary / Vercel Blob / S3, thay `unsplash()` trong `src/lib/images.ts`, thêm host vào `images.remotePatterns`.
3. **Form báo giá** – Server Action trong `lien-he/page.tsx` gửi email (Resend) hoặc đẩy vào CRM / Google Sheet; thêm Zod để validate.
4. **Giỏ hàng / đặt hàng** – state bằng Zustand, lưu đơn qua Prisma + PostgreSQL (Neon / Supabase), hoặc tích hợp Shopify Storefront API nếu muốn thanh toán.
5. **Tìm kiếm & phân trang** – khi vượt ~100 sản phẩm: chuyển lọc từ client sang `searchParams` trên server, hoặc dùng Algolia / Meilisearch.
6. **Đa ngôn ngữ** – `next-intl`, tách chuỗi trong `data/` ra file dịch.
7. **Analytics / SEO** – `sitemap.ts`, `robots.ts`, JSON-LD `Product`, GA4 / Meta Pixel.
8. **Admin** – trang `/admin` bảo vệ bằng Auth.js (nếu không dùng CMS có sẵn giao diện).

# T&Q GIFT – tqgift.vn

Website quà Tết, quà Trung thu và quà tặng doanh nghiệp của **CÔNG TY TNHH T&Q GIFT VIỆT NAM**.

## Dữ liệu từ CMS (tqgift-admin)

Từ 16/10/2026 storefront không còn dữ liệu tĩnh trong `src/data`. Toàn bộ sản phẩm, danh mục, blog, chính sách,
cài đặt website, menu, trang chủ, B2B và SEO đọc từ **tqgift-admin** (Payload CMS, repo `hoangnv98/tqgift-admin`)
qua REST tại `CMS_URL`.

```bash
cp .env.example .env.local      # CMS_URL, NEXT_PUBLIC_SITE_URL, REVALIDATE_SECRET (trùng với admin)
pnpm dev                        # http://localhost:3001 – admin phải chạy ở http://localhost:3000
```

- `src/lib/cms.ts`: các hàm `getProducts`, `getPosts`, `getSettings`, `getHomePage`… dùng `use cache` + `cacheTag`,
  nên trang vẫn static; admin gọi `POST /api/revalidate` (header `x-revalidate-secret`) để làm mới theo tag.
- `src/lib/catalogue.ts`: khoảng giá, sắp xếp, nhãn và các hàm lọc thuần logic.
- `src/lib/payload-types.ts`: copy từ admin (`pnpm generate:types` bên admin) mỗi khi schema đổi.
- Form báo giá gửi qua Server Action `src/app/actions/quote.ts` → `POST {CMS_URL}/api/quote-requests`.
- Ảnh phục vụ từ admin (`/api/media/...`) hoặc Cloudflare R2 (`CMS_MEDIA_URL`). Khi CMS chạy local, `next.config.ts`
  bật `images.dangerouslyAllowLocalIP` để `next/image` tải được ảnh từ localhost.
- Build production cần admin đang chạy (Vercel: deploy admin trước, đặt `CMS_URL` trỏ tới admin).

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

## Quản trị nội dung – chỉnh ở đâu

Mọi nội dung chỉnh trong **tqgift-admin** (`/admin`), storefront tự cập nhật sau vài giây nhờ revalidate theo tag:

| Việc | Vị trí trong admin |
| --- | --- |
| Tên, hotline, Zalo, địa chỉ pháp nhân, logo BCT/DMCA | Cài đặt → Thông tin website |
| Menu chính, dropdown danh mục, thanh thông báo | Cài đặt → Menu điều hướng |
| Hero slider, bật/tắt khối, kệ sản phẩm, logo đối tác 5.1 / 5.2 | Cài đặt → Trang chủ |
| Bảng chiết khấu, dịch vụ in logo, quy trình đặt hàng | Cài đặt → Quà doanh nghiệp (B2B) |
| Thêm / sửa giá / ẩn (chuyển về bản nháp hoặc "Hết hàng") set quà | Sản phẩm |
| Nhóm, chất liệu, tag (cổng 18+) | Sản phẩm → Nhóm / Chất liệu / Thành phần & tag |
| Bài blog, chính sách | Nội dung |
| Lead từ form báo giá, khách hàng | Khách hàng |
| Ảnh | Nội dung → Thư viện ảnh (hoặc upload ngay trong form sản phẩm) |

Còn lại trong code: ảnh biên tập cố định (About, hero các trang phụ) ở `src/lib/images.ts`; logo SVG placeholder `LogoMark` trong `src/components/ui/logo.tsx`.

## Lộ trình mở rộng (giai đoạn 2)

1. ~~CMS / Admin~~ – đã xong: Payload CMS (`tqgift-admin`), fetch + `use cache` / `cacheTag`, admin gọi `/api/revalidate`.
2. ~~Form báo giá~~ – đã xong: Server Action → `quote-requests`, admin báo qua Resend / Telegram. Có thể thêm Zalo OA sau.
3. **Ảnh thật** – upload trong admin, lưu Cloudflare R2; `next/image` đã bật AVIF/WebP.
4. **Giỏ hàng & thanh toán** – chuyển `store.ts` sang server (Prisma + PostgreSQL), tích hợp VNPay / MoMo nếu bán lẻ.
5. **Tìm kiếm** – khi vượt ~200 sản phẩm chuyển sang Meilisearch / Algolia.
6. **Analytics** – GA4, Meta Pixel, Zalo Pixel; Google Search Console với sitemap có sẵn.

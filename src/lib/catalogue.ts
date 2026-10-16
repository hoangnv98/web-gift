import type { BadgeId, Category, Kind, Occasion, Product } from "./cms";

/** Các hằng số lọc / sắp xếp của catalogue – thuần logic, dùng được ở client. */

export interface PriceTier { id: string; label: string; min: number; max: number | null }

export const priceTiers: PriceTier[] = [
  { id: "duoi-500", label: "Dưới 500.000đ", min: 0, max: 500_000 },
  { id: "500-1000", label: "500.000đ – 1.000.000đ", min: 500_000, max: 1_000_000 },
  { id: "1000-1500", label: "1.000.000đ – 1.500.000đ", min: 1_000_000, max: 1_500_000 },
  { id: "1500-2000", label: "1.500.000đ – 2.000.000đ", min: 1_500_000, max: 2_000_000 },
  { id: "2000-3000", label: "2.000.000đ – 3.000.000đ", min: 2_000_000, max: 3_000_000 },
  { id: "tren-3000", label: "Trên 3.000.000đ", min: 3_000_000, max: null },
];

export type SortId = "mac-dinh" | "gia-tang" | "gia-giam";
export const sortOptions: { id: SortId; label: string }[] = [
  { id: "mac-dinh", label: "Mặc định" },
  { id: "gia-tang", label: "Sắp Xếp Giá Tăng Dần" },
  { id: "gia-giam", label: "Sắp Xếp Giá Giảm Dần" },
];

export const ALL_GROUP: Category = { slug: "tat-ca", label: "Tất cả" };

export const occasionLabel = (o: Occasion) => ({ tet: "Quà Tết", "trung-thu": "Quà Trung Thu", "su-kien": "Quà dịp lễ & sự kiện" })[o];
export const kindLabel = (k: Kind) => ({ hop: "Hộp quà", gio: "Giỏ quà", giftset: "Giftset" })[k];
export const badgeLabel: Record<BadgeId, string> = { "ban-chay": "Bán chạy", "cao-cap": "Cao cấp", "gioi-han": "Giới hạn", moi: "Mới" };

/** Sản phẩm thuộc nhóm khi khớp dịp và loại của nhóm (bỏ trống = mọi). */
export function inCategory(p: Product, c: Category) {
  if (c.occasion && p.occasion !== c.occasion) return false;
  if (c.kind && p.kind !== c.kind) return false;
  return true;
}

export const byCategory = (products: Product[], c: Category, limit?: number) => {
  const list = products.filter((p) => inCategory(p, c));
  return limit ? list.slice(0, limit) : list;
};

export const byTag = (products: Product[], tag: string, limit?: number) => {
  const list = products.filter((p) => p.tags.includes(tag));
  return limit ? list.slice(0, limit) : list;
};

export const getFeatured = (products: Product[], limit = 6) => products.filter((p) => p.featured).slice(0, limit);

export const getRelated = (products: Product[], product: Product, limit = 4) =>
  products.filter((p) => p.slug !== product.slug && p.occasion === product.occasion).slice(0, limit);

export function searchProducts(products: Product[], q: string, limit = 6) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return products
    .filter((p) => p.name.toLowerCase().includes(s) || p.code.toLowerCase().includes(s) || p.items.some((i) => i.toLowerCase().includes(s)))
    .slice(0, limit);
}

/** Thông tin sản phẩm tối giản gửi xuống client (header, giỏ hàng). */
export interface ProductLite { slug: string; code: string; name: string; price: number; thumb: string }
export const toLite = (p: Product): ProductLite => ({ slug: p.slug, code: p.code, name: p.name, price: p.price, thumb: p.images[0]?.thumb ?? "" });

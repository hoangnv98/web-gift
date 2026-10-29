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

/* ----------------------- Hiển thị theo mẫu catalogue in ----------------------- */

/** "Hộp Quà Tết T&Q GIFT Thịnh Vượng Phú Quý" -> "Thịnh Vượng Phú Quý" (tên ngắn in bằng Bodoni). */
export function shortProductName(name: string, brand?: string) {
  const escaped = brand ? brand.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&") : "T&Q\\s*GIFT";
  const re = new RegExp("^.*?" + escaped + "\\s*", "i");
  const short = name.replace(re, "").trim();
  return short || name;
}

/** Nhãn vàng phía trên tên set: "HỘP QUÀ TẾT", "GIỎ QUÀ TRUNG THU", "GIFTSET SỰ KIỆN"... */
export function catalogueLabel(p: Pick<Product, "kind" | "occasion">) {
  const kind = { hop: "Hộp quà", gio: "Giỏ quà", giftset: "Giftset" }[p.kind] ?? "Quà";
  const occ = { tet: "Tết", "trung-thu": "Trung thu", "su-kien": "Sự kiện" }[p.occasion] ?? "";
  return `${kind} ${occ}`.trim();
}

export interface CatalogueRow { name: string; value: string }

const PROPER = new Set(["Úc","Mỹ","Ý","Pháp","Chile","Huế","Bỉ","Hàn","Quốc","Việt","Nam","Lâm","Đồng","Khánh","Hoà","Tây","Hồ","Đà","Lạt","Cầu","Đất","Buôn","Ma","Thuột","Bình","Phước","U","Minh","Long","Đan","Mạch","Hạ","Thái","Đông","Phương","Shan","Tuyết","Bordeaux","AOC","Primitivo","Amarone","Valpolicella","Saint-Émilion","Grand","Cru","Médoc","Shiraz","Cabernet","Sauvignon","Arabica","Robusta","Honey","Phổ","Nhĩ","Tứ","Quý","Atiso","Inox","Chianti","Tết","Gift","T&Q"]);
const UNIT: Record<string, string> = { g: "gram", gram: "gram", kg: "kg", ml: "ml", l: "lít" };
const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Tách một dòng thành phần thành "tên | khối lượng" như bảng trong catalogue in.
 * "01 Chai Vang Ý Primitivo 750ml" -> { name: "Chai vang Ý Primitivo", value: "750 ml" }
 * Dòng đầu (index 0) là bộ hộp/phụ kiện -> "01 bộ"; dòng "Tặng ..." -> "tặng kèm".
 */
export function parseCatalogueItem(raw: string, index: number): CatalogueRow {
  let s = raw.trim();
  if (index === 0) return { name: s, value: "01 bộ" };
  if (/^Tặng /i.test(s)) return { name: s.replace(/ của T&Q Gift$/i, ""), value: "tặng kèm" };
  let qty = 1;
  const q = s.match(/^(\d+)\s+(.*)$/);
  if (q) { qty = Number(q[1]); s = q[2]; }
  let value = "";
  // Cho phép phần mô tả trong ngoặc sau khối lượng: "06 Bánh Nướng 120g (Vi cá, Bào ngư)"
  let m = s.match(/^(.*?)\s+(\d+(?:[.,]\d+)?)\s*(g|gram|kg|ml|l)(\s*\(.*\))?$/i);
  if (m) {
    s = m[1] + (m[4] ?? "");
    value = `${m[2]} ${UNIT[m[3].toLowerCase()]}`;
  } else if ((m = s.match(/^(.*?)\s+(\d+)\s+(Gói|Viên|Túi|Hộp|Chai)$/i))) {
    s = m[1];
    value = `${m[2]} ${m[3].toLowerCase()}`;
  }
  s = s.split(" ").map((w, i, a) => (i === 0 || PROPER.has(w) || (w === "Nhân" && a[i - 1] === "Mỹ") || !/^[A-ZÀ-Ỹ][a-zà-ỹ]+$/.test(w) ? w : w.toLowerCase())).join(" ");
  if (qty > 1) s = `${pad2(qty)} × ${s}`;
  if (!value) value = qty > 1 ? `${pad2(qty)} cái` : "01 cái";
  return { name: s, value };
}

/** Chia bảng thành phần thành 2 cột đều nhau. */
export function catalogueColumns(items: string[]): [CatalogueRow[], CatalogueRow[]] {
  const rows = items.map(parseCatalogueItem);
  const half = Math.ceil(rows.length / 2);
  return [rows.slice(0, half), rows.slice(half)];
}

/** 1250000 -> "1.250.000" (không kèm đ, vì ô VND/SET đứng cạnh). */
export const formatVnd = (n: number) => new Intl.NumberFormat("vi-VN").format(n);

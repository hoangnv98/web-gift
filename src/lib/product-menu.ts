import type { Category, Material, NavLink, Navigation, Product } from "./cms";
import { inCategory, priceTiers } from "./catalogue";

/**
 * Menu "Sản phẩm" (mega menu 2 tầng, tham khảo quatangbondi.vn): cột trái là các nhóm,
 * rê chuột vào nhóm nào thì bên phải hiện các ô danh mục con.
 * - 3 nhóm đầu lấy từ Admin → Menu điều hướng → Dropdown danh mục (Quà Tết, Trung Thu, Dịp lễ…).
 * - Các nhóm còn lại dựng từ dữ liệu có sẵn: giải pháp B2B, khoảng giá, chất liệu.
 * Thuần dữ liệu, tính ở server rồi truyền xuống Header.
 */
export type MenuIcon = "tet" | "trung-thu" | "su-kien" | "b2b" | "budget" | "material" | "discount" | "print" | "steps" | "quote" | "profile";

export interface MenuTile { label: string; href: string; image?: string; icon?: MenuIcon; note?: string; ageGate?: boolean; hot?: boolean }
export interface MenuGroup { id: string; title: string; href: string; icon: MenuIcon; tiles: MenuTile[] }

/** Các trang landing được gom vào tab "Sản phẩm" (không hiện thành tab riêng nữa). */
export const PRODUCT_PAGES = ["/qua-tet", "/qua-doanh-nghiep", "/qua-trung-thu"];
export const PROFILE_LINK: NavLink = { label: "Hồ sơ năng lực", href: "/ho-so-nang-luc" };

const OCCASION_PAGE: Record<string, string> = { tet: "/qua-tet", "trung-thu": "/qua-trung-thu" };

/** Lọc sản phẩm theo query của link catalogue (nhom, chat-lieu, tag, gia) – cùng logic với catalogue-view. */
function matchLink(href: string, products: Product[], categories: Category[]) {
  const url = new URL(href, "https://x");
  if (url.pathname !== "/catalogue") return [];
  const q = url.searchParams;
  const cat = categories.find((c) => c.slug === q.get("nhom"));
  const tier = priceTiers.find((t) => t.id === q.get("gia"));
  return products.filter((p) => {
    if (cat && !inCategory(p, cat)) return false;
    if (q.get("chat-lieu") && p.material.slug !== q.get("chat-lieu")) return false;
    if (q.get("tag") && !p.tags.includes(q.get("tag")!)) return false;
    if (tier && (p.price < tier.min || (tier.max !== null && p.price >= tier.max))) return false;
    return true;
  });
}

function tileImage(href: string, products: Product[], categories: Category[]) {
  const q = new URL(href, "https://x").searchParams;
  const onlyGroup = q.get("nhom") && [...q.keys()].length === 1;
  const cat = categories.find((c) => c.slug === q.get("nhom"));
  if (onlyGroup && cat?.image) return cat.image.thumb;
  return matchLink(href, products, categories)[0]?.images[0]?.thumb ?? cat?.image?.thumb;
}

export function buildProductMenu({ navigation, products, categories, materials }: { navigation: Navigation; products: Product[]; categories: Category[]; materials: Material[] }): MenuGroup[] {
  const live = products.filter((p) => p.availability !== "het-hang");

  const fromCms: MenuGroup[] = navigation.megaMenu.map((col, i) => {
    // Nhóm thuộc dịp nào: theo danh mục mà các link trong cột trỏ tới.
    const slugs = col.items.map((it) => new URL(it.href, "https://x").searchParams.get("nhom")).filter(Boolean);
    const occasion = categories.find((c) => slugs.includes(c.slug))?.occasion;
    const icon: MenuIcon = occasion === "tet" ? "tet" : occasion === "trung-thu" ? "trung-thu" : "su-kien";
    const top = categories.find((c) => c.occasion === occasion && !c.kind);
    return {
      id: `cms-${i}`,
      title: col.title,
      href: (occasion && OCCASION_PAGE[occasion]) || (top ? `/catalogue?nhom=${top.slug}` : "/catalogue"),
      icon,
      tiles: col.items.map((it) => ({ label: it.label, href: it.href, image: tileImage(it.href, live, categories), ageGate: it.ageGate, hot: it.hot })),
    };
  });

  const b2b: MenuGroup = {
    id: "b2b",
    title: "Quà tặng doanh nghiệp",
    href: "/qua-doanh-nghiep",
    icon: "b2b",
    tiles: [
      { label: "Bảng chiết khấu theo số lượng", href: "/qua-doanh-nghiep#chiet-khau", icon: "discount", note: "Áp dụng từ 10 phần quà" },
      { label: "In · ép kim · khắc laser logo", href: "/qua-doanh-nghiep#dich-vu", icon: "print", note: "Theo nhận diện thương hiệu" },
      { label: "Quy trình đặt hàng & hoá đơn VAT", href: "/qua-doanh-nghiep#quy-trinh", icon: "steps", note: "Hoá đơn GTGT điện tử" },
      { label: "Đăng ký báo giá sỉ", href: "/qua-doanh-nghiep#bao-gia", icon: "quote", note: "Phản hồi trong 24 giờ" },
      { label: PROFILE_LINK.label, href: PROFILE_LINK.href, icon: "profile", note: "Dành cho Purchasing / HR" },
    ],
  };

  const budget: MenuGroup = {
    id: "budget",
    title: "Theo ngân sách",
    href: "/catalogue",
    icon: "budget",
    tiles: priceTiers.map((t) => {
      const href = `/catalogue?gia=${t.id}`;
      return { label: t.label, href, icon: "budget" as const, note: `${matchLink(href, live, categories).length} set quà` };
    }),
  };

  const material: MenuGroup = {
    id: "material",
    title: "Theo chất liệu hộp",
    href: "/catalogue",
    icon: "material",
    tiles: materials.map((m) => {
      const href = `/catalogue?chat-lieu=${m.slug}`;
      return { label: m.label, href, image: tileImage(href, live, categories) };
    }),
  };

  return [...fromCms, b2b, budget, material].filter((g) => g.tiles.length > 0);
}

export type NavEntry = { kind: "link"; link: NavLink } | { kind: "products" };

/**
 * Sắp lại menu chính từ CMS: gom Quà Tết / Quà doanh nghiệp / Quà Trung Thu vào một tab "Sản phẩm"
 * (đặt ở vị trí tab đầu tiên bị gom) và chèn "Hồ sơ năng lực" sau "Giới thiệu" nếu Admin chưa có.
 */
export function arrangeMainNav(mainNav: NavLink[]): NavEntry[] {
  const out: NavEntry[] = [];
  let productsAdded = false;
  for (const link of mainNav) {
    if (PRODUCT_PAGES.includes(link.href)) {
      if (!productsAdded) out.push({ kind: "products" });
      productsAdded = true;
      continue;
    }
    out.push({ kind: "link", link });
    if (link.href === "/gioi-thieu" && !mainNav.some((l) => l.href === PROFILE_LINK.href)) out.push({ kind: "link", link: PROFILE_LINK });
  }
  if (!productsAdded) out.splice(Math.min(1, out.length), 0, { kind: "products" });
  if (!out.some((e) => e.kind === "link" && e.link.href === PROFILE_LINK.href)) out.push({ kind: "link", link: PROFILE_LINK });
  return out;
}

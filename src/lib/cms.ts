import { COMPANY } from "./company";
import { cacheLife, cacheTag } from "next/cache";
import type {
  B2BSetting,
  Category as CmsCategory,
  HomePage as CmsHomePage,
  Material as CmsMaterial,
  Media,
  Navigation as CmsNavigation,
  Policy as CmsPolicy,
  Post as CmsPost,
  Product as CmsProduct,
  SeoDefault,
  SiteSetting,
  Tag as CmsTag,
} from "./payload-types";

/**
 * Lớp đọc dữ liệu từ tqgift-admin (Payload CMS) qua REST.
 * Mọi hàm đều `use cache` + cacheTag; admin gọi POST /api/revalidate để làm mới theo tag.
 */
const CMS_URL = (process.env.CMS_URL || "http://localhost:3000").replace(/\/$/, "");
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tqgift.vn").replace(/\/$/, "");

export const siteUrl = SITE_URL;

/* ------------------------------ Kiểu dữ liệu ----------------------------- */

export type Occasion = CmsProduct["occasion"];
export type Kind = CmsProduct["kind"];
export type BadgeId = NonNullable<CmsProduct["badge"]>;

export interface ImageRef {
  /** Ảnh gốc / lớn (tới 1600px) */
  src: string;
  /** Ảnh vuông 900px cho card */
  card: string;
  /** Ảnh vuông 400px cho thumbnail */
  thumb: string;
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: number;
  slug: string;
  code: string;
  name: string;
  occasion: Occasion;
  kind: Kind;
  material: { slug: string; label: string };
  /** slug của tag */
  tags: string[];
  ageGate: boolean;
  price: number;
  originalPrice?: number;
  badge?: BadgeId;
  featured: boolean;
  availability: NonNullable<CmsProduct["availability"]>;
  minOrder: number;
  tagline: string;
  description: string;
  /** Dòng đầu tiên là bộ hộp/phụ kiện */
  items: string[];
  images: ImageRef[];
  seo?: { title?: string; description?: string; image?: ImageRef };
}

export interface Category { slug: string; label: string; occasion?: Occasion; kind?: Kind; description?: string; image?: ImageRef }
export interface Material { slug: string; label: string }
export interface Tag { slug: string; label: string; ageGate: boolean }

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  cover: ImageRef;
  content: CmsPost["content"];
  seo?: { title?: string; description?: string };
}

export interface Policy { slug: string; title: string; updated?: string; showInFooter: boolean; sections: { heading: string; paragraphs: string[] }[] }

export interface Settings {
  name: string;
  shortName: string;
  slogan: string;
  tagline: string;
  season: string;
  description: string;
  hotline: string;
  hotlineHref: string;
  zalo: string;
  email: string;
  hours: string;
  company: { legalName: string; address: string; representative: string; phone: string; taxCode: string; bank: { account: string; name: string } };
  bctUrl?: string;
  bctBadge?: ImageRef;
  dmcaUrl?: string;
  copyrightYear: number;
  social: { platform: string; url: string }[];
  logo?: ImageRef;
}

export interface NavLink { label: string; href: string }
export interface MegaMenuItem extends NavLink { ageGate: boolean; hot: boolean }
export interface Navigation {
  mainNav: NavLink[];
  megaMenu: { title: string; items: MegaMenuItem[] }[];
  footerLinks: NavLink[];
  announcement?: { text: string; href?: string };
}

export interface Slide { eyebrow?: string; title: string; highlight?: string; text?: string; cta?: NavLink; cta2?: NavLink; image: ImageRef }
export interface LogoBlock { enabled: boolean; title: string; subtitle: string; logos: { name: string; src?: string; href?: string }[] }
export interface HomePage {
  slides: Slide[];
  autoplaySeconds: number;
  sections: Record<"commitments" | "about" | "budgetFilter" | "shelves" | "coreValues" | "brandStory" | "blog", boolean>;
  featuredProductIds: number[];
  shelves: { title: string; category: Category; limit: number }[];
  partners: LogoBlock;
  press: LogoBlock;
}

export interface B2B {
  discounts: { from: number; to?: number; discount: string; perk?: string }[];
  services: { title: string; description?: string; image?: ImageRef }[];
  steps: { title: string; description?: string }[];
  quoteNote?: string;
}

export interface Seo { titleTemplate: string; defaultTitle?: string; defaultDescription?: string; ogImage?: ImageRef; keywords: string[]; ga4Id?: string; metaPixelId?: string; googleSiteVerification?: string }

/* --------------------------------- Fetch --------------------------------- */

class CmsError extends Error {}

async function cmsFetch<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${CMS_URL}/api/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new CmsError(`CMS ${res.status} khi gọi ${url.pathname}. Kiểm tra CMS_URL (${CMS_URL}) và tqgift-admin đang chạy.`);
  return res.json() as Promise<T>;
}

async function cmsList<T>(collection: string, params: Record<string, string | number> = {}) {
  const data = await cmsFetch<{ docs: T[] }>(collection, { limit: 500, depth: 1, ...params });
  return data.docs;
}

/* -------------------------------- Mappers -------------------------------- */

const abs = (u?: string | null) => (!u ? "" : u.startsWith("http") ? u : `${CMS_URL}${u}`);

export function toImage(m?: Media | number | null, altFallback = ""): ImageRef | undefined {
  if (!m || typeof m !== "object" || !m.url) return undefined;
  const src = abs(m.sizes?.large?.url || m.url);
  return {
    src,
    card: abs(m.sizes?.card?.url) || src,
    thumb: abs(m.sizes?.thumbnail?.url) || src,
    alt: m.alt || altFallback,
    width: m.sizes?.large?.width || m.width || 1600,
    height: m.sizes?.large?.height || m.height || 1600,
  };
}

const rel = <T extends { id: number }>(v: T | number | null | undefined): T | undefined => (v && typeof v === "object" ? v : undefined);
const link = (label?: string | null, href?: string | null): NavLink | undefined => (label && href ? { label, href } : undefined);

function mapProduct(p: CmsProduct): Product {
  const material = rel(p.material);
  const tagDocs = (p.tags ?? []).map((t) => rel(t as CmsTag | number)).filter((t): t is CmsTag => Boolean(t));
  return {
    id: p.id,
    slug: p.slug,
    code: p.code,
    name: p.name,
    occasion: p.occasion,
    kind: p.kind,
    material: { slug: material?.slug ?? "", label: material?.title ?? "" },
    tags: tagDocs.map((t) => t.slug),
    ageGate: tagDocs.some((t) => t.ageGate),
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    badge: p.badge ?? undefined,
    featured: Boolean(p.featured),
    availability: p.availability ?? "con-hang",
    minOrder: p.minOrder ?? 1,
    tagline: p.tagline ?? "",
    description: p.description ?? "",
    items: (p.items ?? []).map((i) => i.text),
    images: (p.images ?? []).map((i) => toImage(i.image, p.name)).filter((i): i is ImageRef => Boolean(i)),
    seo: p.seo ? { title: p.seo.title ?? undefined, description: p.seo.description ?? undefined, image: toImage(p.seo.image) } : undefined,
  };
}

const mapCategory = (c: CmsCategory): Category => ({ slug: c.slug, label: c.title, occasion: c.occasion ?? undefined, kind: c.kind ?? undefined, description: c.description ?? undefined, image: toImage(c.image) });
const mapMaterial = (m: CmsMaterial): Material => ({ slug: m.slug, label: m.title });
const mapTag = (t: CmsTag): Tag => ({ slug: t.slug, label: t.title, ageGate: Boolean(t.ageGate) });

const postCategoryLabel: Record<string, string> = { "cam-nang": "Cẩm nang quà tặng", "doanh-nghiep": "Doanh nghiệp", "xu-huong": "Xu hướng", "tin-tuc": "Tin T&Q GIFT" };

function mapPost(p: CmsPost): Post {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: postCategoryLabel[p.category] ?? p.category,
    categorySlug: p.category,
    date: p.publishedAt ?? p.createdAt,
    cover: toImage(p.cover, p.title) ?? { src: "", card: "", thumb: "", alt: p.title, width: 1600, height: 1000 },
    content: p.content,
    seo: p.seo ? { title: p.seo.title ?? undefined, description: p.seo.description ?? undefined } : undefined,
  };
}

const mapPolicy = (p: CmsPolicy): Policy => ({
  slug: p.slug,
  title: p.title,
  updated: p.updatedDate ?? undefined,
  showInFooter: p.showInFooter ?? true,
  sections: (p.sections ?? []).map((s) => ({ heading: s.heading, paragraphs: s.body.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean) })),
});

/* -------------------------------- Getters -------------------------------- */

export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheTag("products");
  cacheLife("weeks");
  const docs = await cmsList<CmsProduct>("products", { sort: "order", depth: 1 });
  return docs.map(mapProduct);
}

export async function getProduct(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheTag("categories");
  cacheLife("weeks");
  return (await cmsList<CmsCategory>("categories", { sort: "order" })).map(mapCategory);
}

export async function getMaterials(): Promise<Material[]> {
  "use cache";
  cacheTag("materials");
  cacheLife("weeks");
  return (await cmsList<CmsMaterial>("materials", { sort: "order" })).map(mapMaterial);
}

export async function getTags(): Promise<Tag[]> {
  "use cache";
  cacheTag("tags");
  cacheLife("weeks");
  return (await cmsList<CmsTag>("tags", { sort: "order" })).map(mapTag);
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheTag("posts");
  cacheLife("weeks");
  return (await cmsList<CmsPost>("posts", { sort: "-publishedAt" })).map(mapPost);
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getPolicies(): Promise<Policy[]> {
  "use cache";
  cacheTag("policies");
  cacheLife("weeks");
  return (await cmsList<CmsPolicy>("policies", { sort: "order" })).map(mapPolicy);
}

export async function getPolicy(slug: string) {
  return (await getPolicies()).find((p) => p.slug === slug);
}

export async function getSettings(): Promise<Settings> {
  "use cache";
  cacheTag("settings");
  cacheLife("weeks");
  const s = await cmsFetch<SiteSetting>("globals/site-settings", { depth: 1 });
  const hotline = s.hotline || COMPANY.hotline;
  const tel = s.hotlineTel || hotline.replace(/[^\d+]/g, "") || COMPANY.hotlineTel;
  return {
    name: s.name,
    shortName: s.shortName || s.name,
    slogan: s.slogan ?? "",
    tagline: s.tagline ?? "",
    season: s.season ?? "",
    description: s.description ?? "",
    hotline,
    hotlineHref: `tel:${tel}`,
    zalo: s.zalo || COMPANY.zalo,
    email: s.email ?? "",
    hours: s.hours ?? "",
    // Thông tin pháp nhân lấy từ src/lib/company.ts để đảm bảo ghi chuẩn từng chữ.
    company: { legalName: COMPANY.legalName, address: COMPANY.address, representative: s.representative ?? "", phone: hotline, taxCode: COMPANY.taxCode, bank: COMPANY.bank },
    bctUrl: s.bctUrl ?? undefined,
    bctBadge: toImage(s.bctBadge),
    dmcaUrl: s.dmcaUrl ?? undefined,
    copyrightYear: s.copyrightYear ?? new Date().getFullYear(),
    social: (s.social ?? []).map((x) => ({ platform: x.platform, url: x.url })),
    logo: toImage(s.logo, s.name),
  };
}

export async function getNavigation(): Promise<Navigation> {
  "use cache";
  cacheTag("settings", "navigation");
  cacheLife("weeks");
  const n = await cmsFetch<CmsNavigation>("globals/navigation", { depth: 0 });
  return {
    mainNav: (n.mainNav ?? []).map((l) => ({ label: l.label, href: l.href })),
    megaMenu: (n.megaMenu ?? []).map((c) => ({ title: c.title, items: (c.items ?? []).map((i) => ({ label: i.label, href: i.href, ageGate: Boolean(i.ageGate), hot: Boolean(i.hot) })) })),
    footerLinks: (n.footerLinks ?? []).map((l) => ({ label: l.label, href: l.href })),
    announcement: n.announcement?.enabled && n.announcement.text ? { text: n.announcement.text, href: n.announcement.href ?? undefined } : undefined,
  };
}

const mapLogoBlock = (b?: CmsHomePage["partners"]): LogoBlock => ({
  enabled: Boolean(b?.enabled),
  title: b?.title ?? "",
  subtitle: b?.subtitle ?? "",
  logos: (b?.logos ?? []).map((l) => ({ name: l.name, src: toImage(l.image)?.card, href: l.href ?? undefined })),
});

export async function getHomePage(): Promise<HomePage> {
  "use cache";
  cacheTag("settings", "home");
  cacheLife("weeks");
  const h = await cmsFetch<CmsHomePage>("globals/home-page", { depth: 1 });
  const sec = h.sections ?? {};
  return {
    slides: (h.slides ?? []).flatMap((s) => {
      const image = toImage(s.image, s.title);
      return image ? [{ eyebrow: s.eyebrow ?? undefined, title: s.title, highlight: s.highlight ?? undefined, text: s.text ?? undefined, cta: link(s.ctaLabel, s.ctaHref), cta2: link(s.cta2Label, s.cta2Href), image }] : [];
    }),
    autoplaySeconds: h.autoplaySeconds ?? 6,
    sections: {
      commitments: sec.commitments ?? true,
      about: sec.about ?? true,
      budgetFilter: sec.budgetFilter ?? true,
      shelves: sec.shelves ?? true,
      coreValues: sec.coreValues ?? true,
      brandStory: sec.brandStory ?? true,
      blog: sec.blog ?? true,
    },
    featuredProductIds: (h.featuredProducts ?? []).map((p) => (typeof p === "object" ? p.id : p)),
    shelves: (h.shelves ?? []).flatMap((s) => {
      const c = rel(s.category as CmsCategory | number);
      return c ? [{ title: s.title, category: mapCategory(c), limit: s.limit ?? 8 }] : [];
    }),
    partners: mapLogoBlock(h.partners),
    press: mapLogoBlock(h.press),
  };
}

export async function getB2B(): Promise<B2B> {
  "use cache";
  cacheTag("settings", "b2b");
  cacheLife("weeks");
  const b = await cmsFetch<B2BSetting>("globals/b2b-settings", { depth: 1 });
  return {
    discounts: (b.discounts ?? []).map((d) => ({ from: d.from, to: d.to ?? undefined, discount: d.discount, perk: d.perk ?? undefined })),
    services: (b.services ?? []).map((s) => ({ title: s.title, description: s.description ?? undefined, image: toImage(s.image, s.title) })),
    steps: (b.steps ?? []).map((s) => ({ title: s.title, description: s.description ?? undefined })),
    quoteNote: b.quoteNote ?? undefined,
  };
}

export async function getSeo(): Promise<Seo> {
  "use cache";
  cacheTag("settings", "seo");
  cacheLife("weeks");
  const s = await cmsFetch<SeoDefault>("globals/seo-defaults", { depth: 1 });
  return {
    titleTemplate: s.titleTemplate || "%s | T&Q GIFT",
    defaultTitle: s.defaultTitle ?? undefined,
    defaultDescription: s.defaultDescription ?? undefined,
    ogImage: toImage(s.ogImage),
    keywords: (s.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
    ga4Id: s.scripts?.ga4Id ?? undefined,
    metaPixelId: s.scripts?.metaPixelId ?? undefined,
    googleSiteVerification: s.scripts?.googleSiteVerification ?? undefined,
  };
}

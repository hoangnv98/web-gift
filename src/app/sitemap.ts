import type { MetadataRoute } from "next";
import { getPolicies, getPosts, getProducts, siteUrl } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts, policies] = await Promise.all([getProducts(), getPosts(), getPolicies()]);
  const statics = ["", "/catalogue", "/qua-tet", "/qua-doanh-nghiep", "/qua-trung-thu", "/gioi-thieu", "/blog", "/lien-he"];
  return [
    ...statics.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${siteUrl}/catalogue/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...policies.map((p) => ({ url: `${siteUrl}/chinh-sach/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}

import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { visibleProducts } from "@/data/catalogue";
import { posts } from "@/data/blog";
import { policies } from "@/data/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const statics = ["", "/catalogue", "/qua-tet", "/qua-doanh-nghiep", "/qua-trung-thu", "/gioi-thieu", "/blog", "/lien-he"];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...visibleProducts.map((p) => ({ url: `${base}/catalogue/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...policies.map((p) => ({ url: `${base}/chinh-sach/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}

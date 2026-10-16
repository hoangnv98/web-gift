import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/cms";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/gio-hang", "/yeu-thich", "/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

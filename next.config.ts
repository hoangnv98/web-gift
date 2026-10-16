import type { NextConfig } from "next";

const cms = new URL(process.env.CMS_URL || "http://localhost:3000");
const media = process.env.CMS_MEDIA_URL ? new URL(process.env.CMS_MEDIA_URL) : null;
// Next 16 chặn next/image tải ảnh từ localhost; chỉ mở khi CMS chạy local (dev).
const cmsIsLocal = ["localhost", "127.0.0.1"].includes(cms.hostname);

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: cmsIsLocal,
    remotePatterns: [
      { protocol: cms.protocol.replace(":", "") as "http" | "https", hostname: cms.hostname, port: cms.port, pathname: "/api/media/**" },
      ...(media ? [{ protocol: media.protocol.replace(":", "") as "http" | "https", hostname: media.hostname, pathname: "/**" }] : []),
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

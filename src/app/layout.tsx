import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getNavigation, getProducts, getSeo, getSettings, siteUrl } from "@/lib/cms";
import { toLite } from "@/lib/catalogue";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/layout/floating-buttons";

const body = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"], display: "swap" });
const display = Playfair_Display({ variable: "--font-display", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"], style: ["normal", "italic"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const [site, seo] = await Promise.all([getSettings(), getSeo()]);
  const title = seo.defaultTitle || `${site.name} – ${site.slogan}`;
  const description = seo.defaultDescription || site.description;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: seo.titleTemplate },
    description,
    keywords: seo.keywords,
    openGraph: { title, description, locale: "vi_VN", type: "website", siteName: site.name, url: siteUrl, images: seo.ogImage ? [{ url: seo.ogImage.src, alt: seo.ogImage.alt }] : undefined },
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    verification: seo.googleSiteVerification ? { google: seo.googleSiteVerification } : undefined,
  };
}

// Microsoft Clarity (https://clarity.microsoft.com) – project ID cho https://tqgift.vn/
const CLARITY_ID = "z5ezhqno4s";
const CLARITY_SNIPPET = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`;

// Schema.org LocalBusiness (JSON-LD) – giúp Google hiển thị thông tin doanh nghiệp.
const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CÔNG TY TNHH T&Q GIFT VIỆT NAM",
  alternateName: "T&Q Gift - Quà Tặng Doanh Nghiệp Bắc Ninh",
  url: "https://www.tqgift.vn",
  logo: "https://www.tqgift.vn/logo.png",
  image: "https://www.tqgift.vn/og-image.jpg",
  description:
    "Chuyên sản xuất, thiết kế và cung cấp giải pháp Quà tặng Doanh nghiệp, Quà tặng Sự kiện, Hội nghị, Công đoàn và Hộp quà Tết B2B cao cấp tại Bắc Ninh.",
  taxID: "2301429910",
  telephone: "+84962303859",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Đường Lý Thái Tổ, Khu phố Doi Sóc, Phường Từ Sơn",
    addressLocality: "Từ Sơn",
    addressRegion: "Bắc Ninh",
    postalCode: "16300",
    addressCountry: "VN",
  },
  areaServed: ["Từ Sơn", "Bắc Ninh", "Yên Phong", "Quế Võ", "Tiên Du", "Hà Nội", "Hưng Yên"],
  priceRange: "$$",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, navigation, products, seo] = await Promise.all([getSettings(), getNavigation(), getProducts(), getSeo()]);
  // suppressHydrationWarning trên <html>/<body>: extension trình duyệt (Grammarly, ColorZilla, trình dịch…)
  // hay chèn thuộc tính vào hai thẻ này trước khi React hydrate, gây cảnh báo hydration giả.
  return (
    <html lang="vi" suppressHydrationWarning className={`${body.variable} ${display.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CLARITY_SNIPPET }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }} />
      </head>
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <Header settings={{ name: site.name, slogan: site.slogan, tagline: site.tagline, hotline: site.hotline, hotlineHref: site.hotlineHref }} navigation={navigation} products={products.map(toLite)} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
        {seo.ga4Id && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${seo.ga4Id}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seo.ga4Id}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}

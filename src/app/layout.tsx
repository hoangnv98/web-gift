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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [site, navigation, products, seo] = await Promise.all([getSettings(), getNavigation(), getProducts(), getSeo()]);
  return (
    <html lang="vi" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
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

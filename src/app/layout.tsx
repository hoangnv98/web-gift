import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingButtons } from "@/components/layout/floating-buttons";

const body = Plus_Jakarta_Sans({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"], display: "swap" });
const display = Playfair_Display({ variable: "--font-display", subsets: ["latin", "vietnamese"], weight: ["400", "500", "600", "700", "800"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.slogan}`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["quà tết doanh nghiệp", "hộp quà tết", "giỏ quà tết", "quà trung thu", "quà tặng doanh nghiệp", "T&Q Gift"],
  openGraph: { title: `${site.name} – ${site.slogan}`, description: site.description, locale: "vi_VN", type: "website", siteName: site.name, url: site.url },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}

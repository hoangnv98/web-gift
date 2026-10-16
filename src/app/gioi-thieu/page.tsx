import type { Metadata } from "next";
import { AboutBlock, CoreValues, BrandStory } from "@/components/home/sections";
import { PageHero } from "@/components/ui/page-hero";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Giới thiệu T&Q GIFT", description: site.description, alternates: { canonical: "/gioi-thieu" } };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Về chúng tôi" title={site.name} highlight={site.slogan} text="Thương hiệu quà tặng cao cấp thuộc Công ty TNHH T&Q Gift Việt Nam." image="darkLuxuryGifts" />
      <AboutBlock />
      <CoreValues />
      <BrandStory />
    </>
  );
}

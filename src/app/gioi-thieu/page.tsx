import type { Metadata } from "next";
import { AboutBlock, CoreValues, BrandStory } from "@/components/home/sections";
import { PageHero } from "@/components/ui/page-hero";
import { getSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return { title: `Giới thiệu ${site.name}`, description: site.description, alternates: { canonical: "/gioi-thieu" } };
}

export default async function AboutPage() {
  const site = await getSettings();
  return (
    <>
      <PageHero eyebrow="Về chúng tôi" title={site.name} highlight={site.slogan} text={`Thương hiệu quà tặng cao cấp thuộc ${site.company.legalName}.`} image="darkLuxuryGifts" />
      <AboutBlock />
      <CoreValues />
      <BrandStory />
    </>
  );
}

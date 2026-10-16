import { HeroSlider } from "@/components/home/hero-slider";
import { GoldenCommitments, AboutBlock, BudgetFilter, Shelves, CoreValues, PartnerLogos, BrandStory } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <GoldenCommitments />
      <AboutBlock />
      <BudgetFilter />
      <Shelves />
      <CoreValues />
      <PartnerLogos />
      <BrandStory />
    </>
  );
}

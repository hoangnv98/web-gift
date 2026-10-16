import { getHomePage } from "@/lib/cms";
import { HeroSlider } from "@/components/home/hero-slider";
import { GoldenCommitments, AboutBlock, BudgetFilter, Shelves, CoreValues, PartnerLogos, BrandStory, LatestPosts } from "@/components/home/sections";

export default async function HomePage() {
  const home = await getHomePage();
  const s = home.sections;
  return (
    <>
      <HeroSlider slides={home.slides} autoplaySeconds={home.autoplaySeconds} />
      {s.commitments && <GoldenCommitments />}
      {s.about && <AboutBlock />}
      {s.budgetFilter && <BudgetFilter />}
      {s.shelves && <Shelves />}
      {s.coreValues && <CoreValues />}
      <PartnerLogos />
      {s.blog && <LatestPosts />}
      {s.brandStory && <BrandStory />}
    </>
  );
}

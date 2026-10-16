import { Hero } from "@/components/home/hero";
import { CategoryShowcase, FeaturedProducts, WhyUs, Process, ContactCTA } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyUs />
      <Process />
      <ContactCTA />
    </>
  );
}

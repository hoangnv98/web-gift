import type { Metadata } from "next";
import { WishlistView } from "@/components/catalogue/cart-view";
import { Container } from "@/components/ui/container";
import { getProducts } from "@/lib/cms";

export const metadata: Metadata = { title: "Sản phẩm yêu thích", robots: { index: false } };

export default async function WishlistPage() {
  const products = await getProducts();
  return (
    <Container className="py-14 lg:py-20">
      <h1 className="text-3xl font-semibold text-navy-900 sm:text-4xl">Sản phẩm yêu thích</h1>
      <WishlistView products={products} />
    </Container>
  );
}

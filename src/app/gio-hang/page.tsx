import type { Metadata } from "next";
import { CartView } from "@/components/catalogue/cart-view";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = { title: "Giỏ hàng", robots: { index: false } };

export default function CartPage() {
  return (
    <Container className="py-14 lg:py-20">
      <h1 className="text-3xl font-semibold text-navy-900 sm:text-4xl">Giỏ hàng</h1>
      <p className="mt-2 text-ink-500">Giỏ hàng dùng để tổng hợp các set quà bạn quan tâm và gửi yêu cầu báo giá. Thanh toán trực tuyến sẽ được bổ sung.</p>
      <CartView />
    </Container>
  );
}

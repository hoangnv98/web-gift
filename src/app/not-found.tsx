import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-navy-900 sm:text-5xl">Không tìm thấy trang</h1>
      <p className="mt-4 text-ink-500">Sản phẩm có thể đã ngừng kinh doanh hoặc đường dẫn không đúng.</p>
      <Button href="/catalogue" variant="gold" className="mt-8">Quay lại catalogue</Button>
    </Container>
  );
}

import type { Metadata } from "next";
import { Copy, MapPin, Send, Star } from "lucide-react";
import { getSettings, siteUrl } from "@/lib/cms";
import { COMPANY } from "@/lib/company";
import { reviewGroups } from "@/lib/reviews";
import { Container } from "@/components/ui/container";
import { ReviewPicker } from "@/components/reviews/review-picker";

export const metadata: Metadata = {
  title: "Đánh giá T&Q GIFT trên Google Maps",
  description: "Cảm ơn bạn đã tin chọn T&Q GIFT. Chọn một lời đánh giá gợi ý, sao chép và gửi lên Google Maps chỉ trong 30 giây – quà Tết, quà Trung thu, quà tặng doanh nghiệp Bắc Ninh.",
  alternates: { canonical: "/danh-gia" },
  openGraph: { title: "Đánh giá T&Q GIFT trên Google Maps", description: "Sao chép lời đánh giá gợi ý và gửi lên Google Maps trong 30 giây.", url: `${siteUrl}/danh-gia`, type: "website" },
};

const steps = [
  { icon: Copy, title: "Chọn & sao chép", text: "Chọn lời đánh giá đúng với trải nghiệm của bạn, bấm Sao chép. Có thể sửa lại theo ý mình." },
  { icon: MapPin, title: "Mở Google Maps", text: "Bấm nút đỏ “Đánh giá trên Google Maps”, chọn “Viết bài đánh giá” và chọn 5 sao." },
  { icon: Send, title: "Dán & gửi", text: "Dán nội dung đã sao chép vào ô nhận xét, thêm ảnh nếu có rồi bấm Đăng. Xong!" },
];

/** Landing thu thập đánh giá Google Maps: lời gợi ý sao chép 1 chạm + nút mở trang địa điểm. */
export default async function ReviewPage() {
  const site = await getSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cách đánh giá ${site.name} trên Google Maps`,
    description: "Sao chép lời đánh giá gợi ý, mở Google Maps, chọn 5 sao, dán và gửi.",
    totalTime: "PT1M",
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-navy-silk text-cream-50">
        <Container className="py-14 text-center lg:py-20">
          <p className="flex items-center justify-center gap-1 text-gold-400" aria-hidden>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-6 fill-current" />)}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">Cảm ơn bạn đã tin chọn {site.name}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Đánh giá <span className="text-gold-foil italic">{site.name}</span> trên Google Maps
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-cream-200/85 sm:text-lg">
            Mỗi lời đánh giá 5 sao giúp nhiều doanh nghiệp khác tìm thấy {site.name}. Chỉ mất 30 giây: sao chép một lời gợi ý bên dưới, mở Google Maps, dán và gửi.
          </p>
          <a href={COMPANY.reviewUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex h-13 items-center gap-2 rounded-full bg-gold-gradient px-8 text-base font-bold text-navy-900 shadow-[0_8px_24px_-10px_rgb(212_175_55/0.8)] transition hover:-translate-y-0.5 hover:brightness-105">
            <Star className="size-5 fill-current" /> Viết đánh giá ngay
          </a>
        </Container>
      </section>

      <Container className="py-12 lg:py-16">
        <ol className="grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-card ring-1 ring-navy-900/5">
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-cream-300">0{i + 1}</span>
              <span className="grid size-11 place-items-center rounded-xl bg-navy-900 text-gold-300"><s.icon className="size-5" /></span>
              <h2 className="mt-4 text-lg font-semibold text-navy-900">{s.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <ReviewPicker groups={reviewGroups} reviewUrl={COMPANY.reviewUrl} />
        </div>
      </Container>
    </>
  );
}

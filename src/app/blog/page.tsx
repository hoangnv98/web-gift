import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unsplash, img } from "@/lib/images";
import { posts } from "@/data/blog";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = { title: "Blog quà tặng", description: "Cẩm nang chọn quà Tết, quà Trung thu và quà tặng doanh nghiệp.", alternates: { canonical: "/blog" } };

export default function BlogPage() {
  return (
    <Container className="py-14 lg:py-20">
      <SectionHeading as="h1" eyebrow="Blog" title="Cẩm nang quà tặng doanh nghiệp" description="Kinh nghiệm chọn quà, quy trình đặt hàng và xu hướng mỗi mùa." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="group overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-card-hover">
            <Link href={`/blog/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden">
              <Image src={unsplash(img[p.cover], 800, 500)} alt={p.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{p.category} · {new Date(p.date).toLocaleDateString("vi-VN")}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug text-navy-900"><Link href={`/blog/${p.slug}`} className="hover:text-ruby-700">{p.title}</Link></h2>
              <p className="mt-2 line-clamp-3 text-sm text-ink-500">{p.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}

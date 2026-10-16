import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { unsplash, img } from "@/lib/images";
import { getPost, posts } from "@/data/blog";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${slug}` } } : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <Container className="max-w-3xl py-12 lg:py-16">
      <nav className="flex items-center gap-1.5 text-sm text-ink-400"><Link href="/" className="hover:text-ruby-700">Trang chủ</Link><ChevronRight className="size-3.5" /><Link href="/blog" className="hover:text-ruby-700">Blog</Link></nav>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{post.category} · {new Date(post.date).toLocaleDateString("vi-VN")}</p>
      <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl lg:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-ink-500">{post.excerpt}</p>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl"><Image src={unsplash(img[post.cover], 1400, 800)} alt={post.title} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" /></div>
      <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-ink-700">{post.body.map((p) => <p key={p}>{p}</p>)}</div>
      <div className="mt-12 rounded-3xl bg-navy-900 p-8 text-cream-50">
        <p className="font-display text-2xl font-semibold">Cần tư vấn set quà cho doanh nghiệp?</p>
        <p className="mt-2 text-sm text-cream-200/80">Gửi số lượng và ngân sách, nhận đề xuất mẫu trong 24 giờ.</p>
        <Button href="/qua-doanh-nghiep#bao-gia" variant="gold" className="mt-5">Nhận báo giá sỉ</Button>
      </div>
    </Container>
  );
}

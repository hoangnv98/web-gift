import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPolicies, getPolicy } from "@/lib/cms";
import { Container } from "@/components/ui/container";

export async function generateStaticParams() {
  return (await getPolicies()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/chinh-sach/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = await getPolicy(slug);
  return policy ? { title: policy.title, alternates: { canonical: `/chinh-sach/${slug}` } } : {};
}

export default function PolicyPage(props: PageProps<"/chinh-sach/[slug]">) {
  return (
    <Suspense fallback={<Container className="py-14"><div className="h-[60vh] animate-pulse rounded-3xl bg-cream-200" /></Container>}>
      <PolicyDetail params={props.params} />
    </Suspense>
  );
}

async function PolicyDetail({ params }: Pick<PageProps<"/chinh-sach/[slug]">, "params">) {
  const { slug } = await params;
  const [policy, policies] = await Promise.all([getPolicy(slug), getPolicies()]);
  if (!policy) notFound();
  return (
    <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
      <aside className="lg:col-span-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Chính sách</p>
        <ul className="mt-4 space-y-1">
          {policies.map((p) => (
            <li key={p.slug}><Link href={`/chinh-sach/${p.slug}`} className={p.slug === slug ? "block rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-gold-300" : "block rounded-xl px-4 py-2.5 text-sm text-ink-700 hover:bg-cream-200"}>{p.title}</Link></li>
          ))}
        </ul>
      </aside>
      <article className="lg:col-span-9">
        <h1 className="text-balance text-3xl font-semibold text-navy-900 sm:text-4xl">{policy.title}</h1>
        {policy.updated && <p className="mt-2 text-sm text-ink-400">Cập nhật: {new Date(policy.updated).toLocaleDateString("vi-VN")}</p>}
        <div className="mt-8 space-y-8">
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-navy-900">{s.heading}</h2>
              {s.paragraphs.map((p) => <p key={p} className="mt-3 leading-relaxed text-ink-700">{p}</p>)}
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}

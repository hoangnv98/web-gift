import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { unsplash, img, type ImageKey } from "@/lib/images";
import { getProducts, getSettings } from "@/lib/cms";
import { coreValues } from "@/components/home/sections";
import { Container } from "@/components/ui/container";
import { Eyebrow, H2, Emph, GhostLink } from "@/components/ui/editorial";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSettings();
  return { title: `Giới thiệu ${site.name}`, description: site.description, alternates: { canonical: "/gioi-thieu" } };
}

/* Bố cục theo mincygroup.com/about: banner → câu chuyện 4 chương → giá trị → 3 dòng quà → pháp nhân → dấu ấn → CTA. */

const chapters: { label: string; title: string; image: ImageKey; paragraphs: React.ReactNode[] }[] = [
  {
    label: "Khởi nguồn",
    title: "Tặng quà – một nét đẹp ứng xử của người Việt",
    image: "handingGift",
    paragraphs: [
      "Trong văn hóa của người Việt, tặng quà từ lâu đã vượt qua giá trị vật chất đơn thuần để trở thành một nét đẹp ứng xử đầy tinh tế. Cứ mỗi độ thu sang trăng tròn hay khi tiết trời chuyển mình báo hiệu một mùa Xuân mới sắp gõ cửa, lòng người lại nôn nao chuẩn bị những thức quà tươm tất nhất để biếu tặng người thân, bạn bè và đối tác. Đó là khoảnh khắc ta chậm lại giữa guồng quay công việc, nhìn lại chặng đường đã qua và gửi trao lòng Tri ân sâu sắc đến những vị Quý nhân – những người đã luôn đồng hành, nâng đỡ và sát cánh cùng ta tạo nên thành tựu.",
      <>Thấu hiểu trọn vẹn tâm ý ấy, <strong className="font-semibold text-navy-900">T&amp;Q GIFT</strong> ra đời không chỉ để cung cấp những giỏ quà hay hộp quà đơn thuần, mà để cùng bạn kể một câu chuyện trọn vẹn về sự trân trọng.</>,
    ],
  },
  {
    label: "Tâm & Quý",
    title: "Khởi nguồn từ Tâm & Quý",
    image: "goldBows",
    paragraphs: [
      "Chúng tôi tin rằng một món quà chỉ thực sự chạm đến trái tim khi được chuẩn bị bằng cái Tâm chân thành và sự thấu hiểu. Từ những hũ yến sào thượng hạng, những chai vang tuyển chọn, trà ngon, bánh quý cho đến từng đường kim mũi chỉ trên hộp da, nét ép kim trên giấy mỹ thuật... tất cả đều được T&Q GIFT chăm chút tỉ mỉ để tạo nên một tặng phẩm Quý giá, nâng tầm vị thế của cả người trao lẫn người nhận.",
    ],
  },
  {
    label: "Lời chúc",
    title: "Gửi gắm lời chúc Thịnh vượng – Phú quý – Thuận lợi",
    image: "redGifts",
    paragraphs: [
      "Mỗi hộp quà mở ra là một lời chúc phúc lành cho năm mới, mùa mới. T&Q GIFT gói vào từng sản phẩm ước vọng về một hành trình vạn sự Thuận lợi, luôn có Quý nhân tương trợ, để công việc kinh doanh ngày càng Thịnh vượng và gia đạo ngập tràn Phú quý.",
    ],
  },
  {
    label: "Cam kết",
    title: "Vững vàng chuẩn mực Trust & Quality",
    image: "darkLuxuryGifts",
    paragraphs: [
      "Đằng sau vẻ ngoài hào hoa như một tác phẩm thời trang là sự cam kết khắt khe về chất lượng. Với khách hàng doanh nghiệp và cá nhân, chữ T&Q chính là bảo chứng cho Trust (Sự tin cậy tuyệt đối về tiến độ, dịch vụ) và Quality (Chất lượng sản phẩm minh bạch, chính hãng, thượng hạng).",
      "Dù là mùa trăng đoàn viên, dịp Tết sum vầy hay những cột mốc kỷ niệm đáng nhớ trong năm, hãy để T&Q GIFT thay bạn trao đi thành ý – vẹn tròn, sang trọng và đong đầy cảm xúc.",
    ],
  },
];

const giftLines = [
  { title: "Quà Tết", href: "/qua-tet", text: "Hộp quà, giỏ quà Tết được tuyển chọn cho đối tác, khách hàng VIP và tập thể nhân viên." },
  { title: "Quà Trung Thu", href: "/qua-trung-thu", text: "Hộp bánh thủ công, hộp gỗ hai tầng kết hợp trà, rượu vang — món quà cho mùa trăng của doanh nghiệp." },
  { title: "Quà tặng doanh nghiệp", href: "/qua-doanh-nghiep", text: "Một đầu mối cho toàn bộ mùa quà của doanh nghiệp: tư vấn, thiết kế thương hiệu, sản xuất, giao hàng và hoá đơn." },
];

export default async function AboutPage() {
  const [site, products] = await Promise.all([getSettings(), getProducts()]);
  const { company } = site;
  // Ảnh thật của các set quà cho khối "Dấu ấn": ưu tiên sản phẩm nổi bật.
  const gallery = [...products.filter((p) => p.featured), ...products.filter((p) => !p.featured)].filter((p) => p.images[0]).slice(0, 5);

  return (
    <>
      {/* Banner */}
      <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden bg-navy-900 py-24 text-white">
        <Image src={unsplash(img.darkLuxuryGifts, 1920, 1080)} alt="" fill preload sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-900/75 to-navy-900/90" />
        <Container>
          <div className="max-w-[1100px]">
            <Eyebrow className="mb-6 border-b border-white/40 pb-2 text-white/85">Về {site.name}</Eyebrow>
            <h1 className="text-balance text-[2.25rem] font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.45rem]">
              Trao chữ <Emph dark>Tâm</Emph>, gửi quà <Emph dark>Quý</Emph>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg font-light leading-relaxed text-white/80">Gửi trọn Tri ân – Khởi nguồn Thịnh vượng.</p>
            <p className="mt-8 text-[11px] uppercase tracking-[0.15em] text-white/50">— {company.legalName} · MST {company.taxCode}</p>
          </div>
        </Container>
      </section>

      {/* Câu chuyện */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Eyebrow className="mb-4 block">Câu chuyện thương hiệu</Eyebrow>
            <H2>Nghệ thuật trao quà – nơi chữ <Emph>Tâm</Emph> gặp gỡ người <Emph>Quý</Emph></H2>
            <p className="mt-6 text-pretty text-[1.0625rem] leading-[1.7] text-ink-700">
              <strong className="font-semibold text-navy-900">T&amp;Q GIFT</strong> là thương hiệu quà tặng cao cấp thuộc {company.legalName}. Khởi nguồn từ tâm niệm mỗi món quà trao đi là một nhịp cầu kết nối những mối thâm giao, chúng tôi mang đến các giải pháp quà Tết, quà Trung thu và quà tặng doanh nghiệp sang trọng, chỉn chu trong từng chi tiết.
            </p>
          </div>
          <div className="space-y-12 lg:space-y-16">
            {chapters.map((c, idx) => (
              <article key={c.label} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={cn(idx % 2 === 1 && "lg:col-start-2 lg:row-start-1")}>
                  <div className="mb-4 flex items-baseline gap-3 border-b border-ink-200 pb-3">
                    <span className="text-4xl font-light leading-none text-gold-700">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-ink-700">{c.label}</span>
                  </div>
                  <h3 className="mb-4 text-2xl font-normal leading-snug text-navy-900">{c.title}</h3>
                  <div className="space-y-4 md:text-justify text-[1.0625rem] leading-[1.7] text-ink-700">
                    {c.paragraphs.map((p, k) => <p key={k}>{p}</p>)}
                  </div>
                </div>
                <div className={cn("relative aspect-[4/3] overflow-hidden bg-cream-200", idx % 2 === 1 && "lg:col-start-1 lg:row-start-1")}>
                  <Image src={unsplash(img[c.image], 1200, 900)} alt={c.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Hệ giá trị */}
      <section className="bg-navy-50/60 py-24 md:py-32">
        <Container>
          <div className="mb-16 text-center">
            <Eyebrow className="mb-3 block">Giá trị cốt lõi</Eyebrow>
            <H2>Hệ giá trị <Emph>“T &amp; Q”</Emph></H2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {coreValues.map((v) => (
              <article key={v.title} className="relative border border-ink-200 bg-white px-8 py-12 text-center">
                <span className="absolute left-1/2 top-0 h-px w-8 -translate-x-1/2 bg-navy-900" />
                <span className="mx-auto mb-6 grid size-[60px] place-items-center rounded-full border border-navy-900 text-navy-900"><v.icon className="size-5" strokeWidth={1.5} /></span>
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-700">{v.sub}</p>
                <h3 className="mb-4 mt-2 text-2xl font-normal text-navy-900">{v.title}</h3>
                <p className="text-[0.9375rem] leading-[1.7] text-ink-700">{v.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 3 dòng quà */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="mb-16 text-center">
            <Eyebrow className="mb-3 block">Lĩnh vực</Eyebrow>
            <H2>Ba dòng quà <Emph>chủ lực</Emph></H2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {giftLines.map((g, idx) => (
              <article key={g.href} className="flex flex-col border-t border-navy-900 bg-white px-6 py-12">
                <p className="mb-4 text-xs tracking-[0.25em] text-navy-900">— {String(idx + 1).padStart(2, "0")}</p>
                <h3 className="mb-4 text-2xl font-normal text-navy-900">{g.title}</h3>
                <p className="flex-1 md:text-justify text-[0.9375rem] leading-[1.7] text-ink-700">{g.text}</p>
                <GhostLink href={g.href} className="mt-6 self-start">Khám phá</GhostLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Pháp nhân */}
      <section className="bg-navy-50/60 py-24 md:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-200">
            <Image src={unsplash(img.kraftPinkRibbon, 900, 1125)} alt={`Quà tặng ${site.name}`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div>
            <Eyebrow className="block">Pháp nhân</Eyebrow>
            <H2 className="mb-6 mt-4">Đơn vị <Emph>chủ quản</Emph></H2>
            <div className="mb-6 flex flex-col border-b border-ink-200 pb-4">
              <span className="text-2xl text-navy-900">{company.legalName}</span>
              <span className="mt-2 text-xs uppercase tracking-[0.15em] text-ink-500">{company.representative ? `Người đại diện: ${company.representative}` : `Thương hiệu ${site.name}`}</span>
            </div>
            <dl className="grid gap-x-8 gap-y-4 text-[1.0625rem] leading-[1.7] text-ink-700 sm:grid-cols-[auto_1fr]">
              <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500 sm:pt-1.5">Mã số thuế</dt><dd>{company.taxCode}</dd>
              <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500 sm:pt-1.5">Địa chỉ</dt><dd>{company.address}</dd>
              <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500 sm:pt-1.5">Hotline</dt><dd><a href={site.hotlineHref} className="hover:text-navy-900">{site.hotline}</a></dd>
              <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500 sm:pt-1.5">Tài khoản</dt><dd>{company.bank.account} – {company.bank.name}</dd>
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-8">
              <GhostLink href="/ho-so-nang-luc">Xem hồ sơ năng lực</GhostLink>
              <GhostLink href="/lien-he">Liên hệ với chúng tôi</GhostLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Dấu ấn quà tặng – ảnh thật từ catalogue */}
      {gallery.length >= 3 && (
        <section className="bg-white py-24 md:py-32">
          <Container>
            <div className="mb-16 text-center">
              <Eyebrow className="mb-3 block">Dấu ấn quà tặng</Eyebrow>
              <H2>Mỗi set quà, <Emph>một lời tri ân</Emph></H2>
            </div>
            <Link href={`/catalogue/${gallery[0].slug}`} className="group relative mb-6 block aspect-[16/10] overflow-hidden bg-navy-50">
              <Image src={gallery[0].images[0].src} alt={gallery[0].images[0].alt} fill sizes="(min-width: 1280px) 1216px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </Link>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {gallery.slice(1).map((p) => (
                <Link key={p.slug} href={`/catalogue/${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-navy-50" aria-label={p.name}>
                  <Image src={p.images[0].card} alt={p.images[0].alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA cuối trang */}
      <section className="bg-navy-900 py-24 text-white md:py-32">
        <Container>
          <div className="mx-auto max-w-[720px] text-center">
            <Eyebrow className="mb-4 block text-white/70">Quà tặng doanh nghiệp</Eyebrow>
            <H2 className="mb-6 text-white">Gửi trọn Tri ân –<br /><Emph dark>Khởi nguồn Thịnh vượng</Emph></H2>
            <p className="mb-12 text-[1.0625rem] text-gold-300">Miễn phí in logo doanh nghiệp, chiết khấu B2B theo số lượng, đầy đủ hoá đơn VAT và giao hàng toàn quốc.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/qua-doanh-nghiep#bao-gia" className="inline-flex items-center justify-center border border-white/40 px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:border-white hover:bg-white hover:text-navy-900">Nhận báo giá</Link>
              <Link href="/catalogue" className="inline-flex items-center justify-center px-4 py-3.5 text-[13px] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors hover:text-white">Xem catalogue →</Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, FileCheck2, Heart, Printer, Truck, Handshake, Gem, ShieldCheck } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
// Ảnh khối Giới thiệu: ghép từ ảnh studio set thật (_build/scripts/anh_gioi_thieu.py bên thư mục TQ-Gift)
import aboutImage from "@/assets/home/gioi-thieu-tqgift.jpg";
import { getHomePage, getPosts, getProducts, type LogoBlock, type Product } from "@/lib/cms";
import { byCategory, priceTiers } from "@/lib/catalogue";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/catalogue/product-card";

/* ---------------------- Section 1b – 4 Cam kết vàng --------------------- */
export const commitments = [
  { icon: Printer, title: "Miễn phí in logo doanh nghiệp", text: "Thiệp, tem, ép kim hoặc khắc laser theo nhận diện thương hiệu." },
  { icon: BadgePercent, title: "Chiết khấu B2B hấp dẫn", text: "Giảm 5% từ 10 set, đến 25% khi đặt từ 500 set." },
  { icon: FileCheck2, title: "Đầy đủ hoá đơn VAT & hồ sơ công bố", text: "Hoá đơn GTGT, hồ sơ công bố sản phẩm, chứng nhận xuất xứ." },
  { icon: Truck, title: "Giao hàng toàn quốc đúng hẹn", text: "63 tỉnh thành, giao tận văn phòng hoặc tới từng người nhận." },
];

export function GoldenCommitments() {
  return (
    <section className="relative z-10 -mt-8">
      <Container>
        <ul className="grid gap-4 rounded-3xl bg-white p-4 shadow-card-hover ring-1 ring-navy-900/5 sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          {commitments.map((u) => (
            <li key={u.title} className="flex gap-4 rounded-2xl p-3 transition hover:bg-cream-100">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-300"><u.icon className="size-5" /></span>
              <div>
                <p className="font-semibold leading-snug text-navy-900">{u.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{u.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------ Section 2 – Về T&Q GIFT ----------------------- */
export function AboutBlock() {
  return (
    <section className="bg-cream-100 py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-card ring-1 ring-navy-900/5">
            <Image src={aboutImage} alt="Các set quà Tết T&Q GIFT" fill placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <SectionHeading align="left" eyebrow="Giới thiệu" title="VỀ T&Q GIFT" />
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-700">
            <strong className="text-navy-900">T&amp;Q GIFT</strong> là thương hiệu quà tặng cao cấp thuộc Công ty TNHH T&amp;Q Gift Việt Nam. Khởi nguồn từ tâm niệm mỗi món quà trao đi là một nhịp cầu kết nối những mối thâm giao, chúng tôi mang đến các giải pháp quà Tết, quà Trung thu và quà tặng doanh nghiệp sang trọng, chỉn chu trong từng chi tiết. Tại T&amp;Q GIFT, mỗi tặng phẩm đều được chế tác bằng trọn vẹn chữ <strong className="text-ruby-700">Tâm</strong> để xứng tầm món quà <strong className="text-ruby-700">Quý</strong>, gói ghém thông điệp <em className="font-display text-navy-900">“Gửi trọn Tri ân – Khởi nguồn Thịnh vượng”</em>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/gioi-thieu" variant="primary">Câu chuyện thương hiệu <ArrowRight className="size-4" /></Button>
            <Button href="/catalogue" variant="outline">Xem catalogue</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------- Section 3 – Kệ sản phẩm & lọc theo ngân sách ------------- */
export function BudgetFilter() {
  return (
    <section className="pt-20">
      <Container>
        <SectionHeading eyebrow="Chọn theo ngân sách" title="Tìm set quà đúng tầm giá trong 1 cú nhấp" />
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {priceTiers.map((t) => (
            <Link key={t.id} href={`/catalogue?gia=${t.id}`} className="rounded-full border-gold-gradient px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:-translate-y-0.5 hover:shadow-gold">{t.label}</Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Shelf({ eyebrow, title, href, products, className }: { eyebrow: string; title: string; href: string; products: Product[]; className?: string }) {
  if (products.length === 0) return null;
  return (
    <section className={cn("py-14", className)}>
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow={eyebrow} title={title} />
          <Button href={href} variant="outline" size="sm" className="shrink-0">Xem tất cả <ArrowRight className="size-4" /></Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </Container>
    </section>
  );
}

/** Kệ sản phẩm trang chủ – cấu hình trong Admin → Trang chủ → Kệ sản phẩm. */
export async function Shelves() {
  const [home, products] = await Promise.all([getHomePage(), getProducts()]);
  return (
    <>
      {home.shelves.map((s, i) => {
        // Nhãn nhỏ trên tiêu đề kệ: số mẫu và giá thấp nhất của cả nhóm (thay cho "Kệ 01", "Kệ 02")
        const all = byCategory(products, s.category);
        const from = all.length ? Math.min(...all.map((p) => p.price)) : 0;
        return <Shelf key={s.category.slug + i} eyebrow={`${all.length} mẫu · giá từ ${formatPrice(from)}`} title={s.title} href={`/catalogue?nhom=${s.category.slug}`} products={s.limit ? all.slice(0, s.limit) : all} className={i % 2 === 1 ? "bg-cream-100" : undefined} />;
      })}
    </>
  );
}

/* ----------------- Section 4 – Hệ giá trị cốt lõi "T & Q" --------------- */
export const coreValues = [
  { icon: Heart, title: "Tâm & Quý", sub: "Tinh thần chế tác", text: "Lấy chữ Tâm của người làm nghề làm gốc để tuyển chọn và thiết kế nên những món quà Quý xứng tầm đẳng cấp." },
  { icon: Handshake, title: "Tri ân & Quý nhân", sub: "Sứ mệnh kết nối", text: "Là cầu nối văn hóa giúp khách hàng bày tỏ lòng Tri ân chân thành nhất đến những Quý nhân, đối tác và cộng sự trân quý." },
  { icon: Gem, title: "Thịnh vượng & Phú quý", sub: "Thông điệp trao gửi", text: "Mỗi tặng phẩm là một vật phẩm phong thủy may mắn, mang theo lời chúc công danh Thuận lợi, sự nghiệp Thịnh vượng, tài lộc Phú quý." },
  { icon: ShieldCheck, title: "Trust & Quality", sub: "Cam kết vận hành", text: "Đặt Niềm tin (Trust) của khách hàng và Chất lượng (Quality) sản phẩm làm kim chỉ nam cho sự phát triển bền vững của T&Q Gift Việt Nam." },
];

export function CoreValues() {
  return (
    <section className="bg-navy-silk py-20 text-cream-50 lg:py-28">
      <Container>
        <SectionHeading tone="dark" eyebrow="Giá trị cốt lõi" title="Hệ giá trị “T & Q”" description="Bốn trụ cột làm nên mỗi món quà mang tên T&Q GIFT." />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((v) => (
            <li key={v.title} className="group rounded-3xl border border-gold-500/25 bg-white/[0.04] p-7 transition hover:border-gold-500/60 hover:bg-white/[0.07]">
              <span className="grid size-14 place-items-center rounded-2xl bg-gold-gradient text-navy-900 shadow-gold"><v.icon className="size-6" /></span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{v.sub}</p>
              <h3 className="mt-2 text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-200/80">{v.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* --------------- Section 5 – Logo đối tác (bật/tắt trong Admin) --------- */
function LogoTile({ name, src, href }: { name: string; src?: string; href?: string }) {
  const inner = src ? (
    <Image src={src} alt={name} width={160} height={64} className="max-h-12 w-auto object-contain grayscale transition group-hover:grayscale-0" />
  ) : (
    <span className="font-display text-sm font-semibold uppercase tracking-wider text-ink-300">{name}</span>
  );
  const cls = "group grid h-24 w-44 shrink-0 place-items-center rounded-2xl bg-white px-4 ring-1 ring-navy-900/5 shadow-card";
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <div className={cls}>{inner}</div>;
}

function LogoMarquee({ block }: { block: LogoBlock }) {
  const items = [...block.logos, ...block.logos];
  return (
    <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]">
        {items.map((l, i) => <LogoTile key={l.name + i} {...l} />)}
      </div>
    </div>
  );
}

export async function PartnerLogos() {
  const { partners, press } = await getHomePage();
  const showPartners = partners.enabled && partners.logos.length > 0;
  const showPress = press.enabled && press.logos.length > 0;
  if (!showPartners && !showPress) return null; // Tắt cả hai -> trang chủ co gọn, không để khoảng trắng
  return (
    <section className="bg-cream-100 py-20">
      <Container>
        {showPartners && (
          <div>
            <SectionHeading eyebrow="Khối 5.1" title={partners.title.toUpperCase()} description={partners.subtitle} />
            <LogoMarquee block={partners} />
          </div>
        )}
        {showPress && (
          <div className={cn(showPartners && "mt-16")}>
            <SectionHeading eyebrow="Khối 5.2" title={press.title.toUpperCase()} description={press.subtitle} />
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              {press.logos.map((l) => <LogoTile key={l.name} {...l} />)}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

/* --------------------- Section 5b – Bài viết mới nhất ------------------- */
export async function LatestPosts({ limit = 3 }: { limit?: number }) {
  const posts = (await getPosts()).slice(0, limit);
  if (posts.length === 0) return null;
  return (
    <section className="py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading align="left" eyebrow="Blog" title="Cẩm nang quà tặng doanh nghiệp" />
          <Button href="/blog" variant="outline" size="sm" className="shrink-0">Xem tất cả <ArrowRight className="size-4" /></Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="group overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-card-hover">
              <Link href={`/blog/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-cream-100">
                {p.cover.src && <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
              </Link>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">{p.category}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-navy-900"><Link href={`/blog/${p.slug}`} className="hover:text-ruby-700">{p.title}</Link></h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

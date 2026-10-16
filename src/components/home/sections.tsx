import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgePercent, FileCheck2, Heart, Printer, Sparkles, Truck, Handshake, Gem, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { unsplash, img } from "@/lib/images";
import { byGroup, byTag, priceTiers, type Product } from "@/data/catalogue";
import { homeSettings, type LogoBlock } from "@/data/settings";
import { site } from "@/data/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/catalogue/product-card";

/* ---------------------- Section 1b – 4 Cam kết vàng --------------------- */
const usps = [
  { icon: Printer, title: "Miễn phí in logo doanh nghiệp", text: "Thiệp, tem, ép kim hoặc khắc laser theo nhận diện thương hiệu." },
  { icon: BadgePercent, title: "Chiết khấu B2B hấp dẫn", text: "Ưu đãi theo mốc 10 / 30 / 50 / 100+ phần quà." },
  { icon: FileCheck2, title: "Đầy đủ hoá đơn VAT & hồ sơ công bố", text: "Hoá đơn GTGT, hồ sơ công bố sản phẩm, chứng nhận xuất xứ." },
  { icon: Truck, title: "Giao hàng toàn quốc đúng hẹn", text: "63 tỉnh thành, giao tận văn phòng hoặc tới từng người nhận." },
];

export function GoldenCommitments() {
  return (
    <section className="relative z-10 -mt-8">
      <Container>
        <ul className="grid gap-4 rounded-3xl bg-white p-4 shadow-card-hover ring-1 ring-navy-900/5 sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          {usps.map((u) => (
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
            <Image src={unsplash(img.handingGift, 900, 1125)} alt="Trao gửi quà tặng T&Q GIFT" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-navy-900 p-5 text-cream-50 shadow-card-hover sm:block">
            <p className="font-display text-3xl font-bold text-gold-300">T&amp;Q</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream-200/70">Tâm &amp; Quý</p>
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

export function Shelves() {
  return (
    <>
      <Shelf eyebrow="Kệ 01" title="Hộp Quà Tết Cao Cấp" href="/catalogue?nhom=hop-qua-tet" products={byGroup("hop-qua-tet")} />
      <Shelf eyebrow="Kệ 02" title="Giỏ Quà Rượu Vang Nhập Khẩu" href="/catalogue?nhom=gio-qua-tet&tag=ruou-vang" products={byTag("ruou-vang").filter((p) => p.kind === "gio")} className="bg-cream-100" />
      <Shelf eyebrow="Kệ 03" title="Quà Trung Thu" href="/catalogue?nhom=trung-thu" products={byGroup("trung-thu")} />
      <Shelf eyebrow="Kệ 04" title="Quà Tặng Sự Kiện, 8/3 & Sinh Nhật Công Ty" href="/catalogue?nhom=su-kien" products={byGroup("su-kien")} className="bg-cream-100" />
    </>
  );
}

/* ----------------- Section 4 – Hệ giá trị cốt lõi "T & Q" --------------- */
const values = [
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
          {values.map((v) => (
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

export function PartnerLogos() {
  const { partners, press } = homeSettings;
  if (!partners.enabled && !press.enabled) return null; // Tắt cả hai -> trang chủ co gọn, không để khoảng trắng
  return (
    <section className="bg-cream-100 py-20">
      <Container>
        {partners.enabled && (
          <div>
            <SectionHeading eyebrow="Khối 5.1" title={partners.title.toUpperCase()} description={partners.subtitle} />
            <LogoMarquee block={partners} />
          </div>
        )}
        {press.enabled && (
          <div className={cn(partners.enabled && "mt-16")}>
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

/* --------------- Section 6 – Câu chuyện văn hoá & SEO chân trang --------- */
export function BrandStory({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("bg-cream-lattice", compact ? "py-16" : "py-20 lg:py-28")}>
      <Container className="max-w-4xl">
        <SectionHeading eyebrow="Nghệ thuật trao quà" title="NGHỆ THUẬT TRAO QUÀ – NƠI CHỮ “TÂM” GẶP GỠ NGƯỜI “QUÝ”" />
        <div className="prose-tq mt-10 space-y-5 text-pretty text-[15px] leading-relaxed text-ink-700 sm:text-base">
          <p>Trong văn hóa của người Việt, tặng quà từ lâu đã vượt qua giá trị vật chất đơn thuần để trở thành một nét đẹp ứng xử đầy tinh tế. Cứ mỗi độ thu sang trăng tròn hay khi tiết trời chuyển mình báo hiệu một mùa Xuân mới sắp gõ cửa, lòng người lại nôn nao chuẩn bị những thức quà tươm tất nhất để biếu tặng người thân, bạn bè và đối tác. Đó là khoảnh khắc ta chậm lại giữa guồng quay công việc, nhìn lại chặng đường đã qua và gửi trao lòng Tri ân sâu sắc đến những vị Quý nhân – những người đã luôn đồng hành, nâng đỡ và sát cánh cùng ta tạo nên thành tựu.</p>
          <p>Thấu hiểu trọn vẹn tâm ý ấy, <strong className="text-navy-900">T&amp;Q GIFT</strong> ra đời không chỉ để cung cấp những giỏ quà hay hộp quà đơn thuần, mà để cùng bạn kể một câu chuyện trọn vẹn về sự trân trọng:</p>
          <StoryPoint title="Khởi nguồn từ TÂM & QUÝ">Chúng tôi tin rằng một món quà chỉ thực sự chạm đến trái tim khi được chuẩn bị bằng cái Tâm chân thành và sự thấu hiểu. Từ những hũ yến sào thượng hạng, những chai vang tuyển chọn, trà ngon, bánh quý cho đến từng đường kim mũi chỉ trên hộp da, nét ép kim trên giấy mỹ thuật... tất cả đều được T&amp;Q GIFT chăm chút tỉ mỉ để tạo nên một tặng phẩm Quý giá, nâng tầm vị thế của cả người trao lẫn người nhận.</StoryPoint>
          <StoryPoint title="Gửi gắm lời chúc THỊNH VƯỢNG – PHÚ QUÝ – THUẬN LỢI">Mỗi hộp quà mở ra là một lời chúc phúc lành cho năm mới, mùa mới. T&amp;Q GIFT gói vào từng sản phẩm ước vọng về một hành trình vạn sự Thuận lợi, luôn có Quý nhân tương trợ, để công việc kinh doanh ngày càng Thịnh vượng và gia đạo ngập tràn Phú quý.</StoryPoint>
          <StoryPoint title="Vững vàng chuẩn mực TRUST & QUALITY (Niềm tin & Chất lượng)">Đằng sau vẻ ngoài hào hoa như một tác phẩm thời trang là sự cam kết khắt khe về chất lượng. Với khách hàng doanh nghiệp và cá nhân, chữ T&amp;Q chính là bảo chứng cho Trust (Sự tin cậy tuyệt đối về tiến độ, dịch vụ) và Quality (Chất lượng sản phẩm minh bạch, chính hãng, thượng hạng).</StoryPoint>
          <p>Dù là mùa trăng đoàn viên, dịp Tết sum vầy hay những cột mốc kỷ niệm đáng nhớ trong năm, hãy để T&amp;Q GIFT thay bạn trao đi thành ý – vẹn tròn, sang trọng và đong đầy cảm xúc.</p>
          <p className="rounded-xl border border-ruby-200 bg-ruby-50 px-4 py-3 text-sm font-semibold text-ruby-700">{site.name} không bán rượu cho người dưới 18 tuổi và phụ nữ đang mang thai.</p>
        </div>
      </Container>
    </section>
  );
}

function StoryPoint({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-l-4 border-gold-500 bg-white/70 p-5 shadow-card">
      <p className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900"><Sparkles className="size-4 text-gold-600" />{title}:</p>
      <p className="mt-2">{children}</p>
    </div>
  );
}

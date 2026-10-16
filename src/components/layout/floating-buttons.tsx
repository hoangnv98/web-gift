import Link from "next/link";
import { BookOpen, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
      <a href={site.zalo} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 rounded-full bg-[#0068ff] p-3 text-white shadow-[0_10px_30px_-10px_rgb(0_104_255/0.8)] transition hover:-translate-y-0.5" aria-label="Chat Zalo">
        <MessageCircle className="size-5" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-32 group-hover:pr-2 sm:inline-block">Chat Zalo</span>
      </a>
      <a href={site.hotlineHref} className="group flex items-center gap-2 rounded-full bg-ruby-700 p-3 text-white shadow-[0_10px_30px_-10px_rgb(155_27_30/0.8)] transition hover:-translate-y-0.5" aria-label="Gọi hotline">
        <Phone className="size-5 animate-ring" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-hover:pr-2 sm:inline-block">{site.hotline}</span>
      </a>
      <Link href="/catalogue" className="group flex items-center gap-2 rounded-full bg-gold-gradient p-3 text-navy-900 shadow-[0_10px_30px_-10px_rgb(212_175_55/0.9)] transition hover:-translate-y-0.5" aria-label="Xem catalogue nhanh">
        <BookOpen className="size-5" />
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-40 group-hover:pr-2 sm:inline-block">Catalogue</span>
      </Link>
    </div>
  );
}

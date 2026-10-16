"use client";

import { useRouter } from "next/navigation";
import { Wine } from "lucide-react";
import { store, useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const FLAG = "age18";

/** Popup xác minh 18+ khi xem danh mục rượu vang. */
export function AgeGate({ active }: { active: boolean }) {
  const { flags } = useStore();
  const router = useRouter();
  if (!active || flags[FLAG]) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="age-title" className="fixed inset-0 z-[70] grid place-items-center bg-navy-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-cream-50 p-8 text-center shadow-card-hover ring-1 ring-gold-500/40">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-navy-900 text-gold-300"><Wine className="size-8" /></span>
        <h2 id="age-title" className="mt-5 text-2xl font-semibold text-navy-900">Xác minh độ tuổi</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">
          Danh mục này có sản phẩm rượu vang. Theo quy định kinh doanh rượu trên thương mại điện tử, vui lòng xác nhận bạn đã đủ 18 tuổi.
        </p>
        <p className="mt-2 text-xs text-ink-400">{site.name} không bán rượu cho người dưới 18 tuổi và phụ nữ đang mang thai.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="gold" className="flex-1" onClick={() => store.setFlag(FLAG, true)}>Tôi đã đủ 18 tuổi</Button>
          <Button variant="outline" className="flex-1" onClick={() => router.push("/")}>Chưa đủ 18 tuổi</Button>
        </div>
      </div>
    </div>
  );
}

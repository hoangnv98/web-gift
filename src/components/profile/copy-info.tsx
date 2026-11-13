"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Sao chép thông tin doanh nghiệp (dạng "Nhãn: giá trị" từng dòng) để dán vào form đăng ký nhà cung cấp. */
export function CopyCompanyInfo({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          /* trình duyệt chặn clipboard: bỏ qua */
        }
      }}
      className="inline-flex items-center gap-2 border border-navy-900/20 px-5 py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-navy-900 transition-colors hover:border-navy-900 hover:bg-navy-900 hover:text-white"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Đã sao chép" : "Sao chép thông tin"}
    </button>
  );
}

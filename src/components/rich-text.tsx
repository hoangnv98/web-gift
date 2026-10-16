import Link from "next/link";
import type { ReactNode } from "react";

/** Render tối giản nội dung Lexical (Payload) – đoạn, tiêu đề, danh sách, link, định dạng chữ. */
interface LexicalNode { type: string; children?: LexicalNode[]; text?: string; format?: number | string; tag?: string; listType?: string; fields?: { url?: string; newTab?: boolean }; url?: string }

const BOLD = 1, ITALIC = 2, STRIKE = 4, UNDERLINE = 8, CODE = 16;

function renderText(n: LexicalNode, key: number) {
  let el: ReactNode = n.text ?? "";
  const f = typeof n.format === "number" ? n.format : 0;
  if (f & CODE) el = <code className="rounded bg-cream-200 px-1 text-[0.9em]">{el}</code>;
  if (f & BOLD) el = <strong>{el}</strong>;
  if (f & ITALIC) el = <em>{el}</em>;
  if (f & UNDERLINE) el = <u>{el}</u>;
  if (f & STRIKE) el = <s>{el}</s>;
  return <span key={key}>{el}</span>;
}

function renderNodes(nodes: LexicalNode[] = []): ReactNode[] {
  return nodes.map((n, i) => {
    switch (n.type) {
      case "text": return renderText(n, i);
      case "linebreak": return <br key={i} />;
      case "paragraph": return <p key={i}>{renderNodes(n.children)}</p>;
      case "heading": {
        const Tag = (n.tag as "h2" | "h3" | "h4") || "h2";
        return <Tag key={i} className="mt-8 font-semibold text-navy-900">{renderNodes(n.children)}</Tag>;
      }
      case "quote": return <blockquote key={i} className="border-l-4 border-gold-500 pl-4 italic">{renderNodes(n.children)}</blockquote>;
      case "list": {
        const L = n.listType === "number" ? "ol" : "ul";
        return <L key={i} className={L === "ol" ? "list-decimal pl-6" : "list-disc pl-6"}>{renderNodes(n.children)}</L>;
      }
      case "listitem": return <li key={i}>{renderNodes(n.children)}</li>;
      case "link":
      case "autolink": {
        const href = n.fields?.url || n.url || "#";
        const external = /^https?:/.test(href);
        return external
          ? <a key={i} href={href} target={n.fields?.newTab ? "_blank" : undefined} rel="noopener noreferrer" className="text-ruby-700 underline">{renderNodes(n.children)}</a>
          : <Link key={i} href={href} className="text-ruby-700 underline">{renderNodes(n.children)}</Link>;
      }
      default: return n.children ? <div key={i}>{renderNodes(n.children)}</div> : null;
    }
  });
}

export function RichText({ data, className }: { data: { root: { children: unknown[] } } | null | undefined; className?: string }) {
  if (!data?.root) return null;
  return <div className={className}>{renderNodes(data.root.children as LexicalNode[])}</div>;
}

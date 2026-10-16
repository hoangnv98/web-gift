import { revalidateTag } from "next/cache";

/**
 * tqgift-admin gọi khi dữ liệu thay đổi:
 * POST /api/revalidate  { "tags": ["products", "product:<slug>"] }  header x-revalidate-secret
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { tags?: unknown };
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string" && t.length <= 256) : [];
  if (tags.length === 0) return Response.json({ ok: false, error: "tags required" }, { status: 400 });
  for (const tag of tags) revalidateTag(tag, "max");
  return Response.json({ ok: true, tags, at: new Date().toISOString() });
}

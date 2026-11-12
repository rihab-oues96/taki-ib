import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

function matches(given: string | null, expected: string | undefined) {
  if (!given || !expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Called by the CMS API whenever published content changes: the next request gets fresh data. */
export async function POST(request: Request) {
  if (!matches(request.headers.get("x-revalidate-secret"), process.env.CMS_REVALIDATE_SECRET)) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  revalidateTag("cms", { expire: 0 });
  return Response.json({ revalidated: true });
}

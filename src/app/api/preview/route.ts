import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = (process.env.CMS_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

/** Opened from the backoffice "Aperçu" button with a short-lived token signed by the API. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";
  const path = searchParams.get("path") ?? "/";
  // Only same-site paths: never redirect to another origin.
  const target = /^\/(?!\/)/.test(path) ? path : "/";

  const check = await fetch(`${API_URL}/api/public/preview/verify`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token }),
    cache: "no-store",
  }).catch(() => null);

  if (!check?.ok) return new Response("Lien d'aperçu invalide ou expiré.", { status: 401 });

  (await draftMode()).enable();
  redirect(target);
}

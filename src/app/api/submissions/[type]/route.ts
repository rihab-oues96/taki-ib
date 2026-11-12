const API_URL = (process.env.CMS_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

const TYPES = new Set(["contact", "admission", "job"]);
/** A CV is at most 5 MB (checked again by the API); the rest of a form is a few kilobytes. */
const MAX_BODY_BYTES = 6 * 1024 * 1024;

function fail(status: number, code: string, message: string) {
  return Response.json({ success: false, error: { code, message } }, { status, headers: { "cache-control": "no-store" } });
}

/** Forms are only accepted from this website's own pages, never from another site's script or form. */
function sameOrigin(request: Request): boolean {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return site === "same-origin";
  try {
    const host = new URL(origin).host;
    return host === request.headers.get("host") || host === request.headers.get("x-forwarded-host");
  } catch {
    return false;
  }
}

/** The visitor's address, as reported by the reverse proxy in front of the site (used by the API to limit abuse). */
function clientIp(request: Request): string {
  return request.headers.get("x-real-ip")?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
}

/**
 * Receives the contact, pre-registration and job application forms and hands them to the
 * CMS API, which validates and stores them. The browser never talks to the API itself:
 * this server adds the shared secret that the API requires.
 */
export async function POST(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!TYPES.has(type)) return fail(404, "NOT_FOUND", "Formulaire inconnu");
  if (!sameOrigin(request)) return fail(403, "FORBIDDEN", "Origine non autorisée");

  const contentType = request.headers.get("content-type") ?? "";
  const expected = type === "job" ? "multipart/form-data" : "application/json";
  if (!contentType.startsWith(expected)) return fail(415, "UNSUPPORTED_MEDIA_TYPE", "Format d'envoi invalide");

  const tooLarge = () => fail(413, "PAYLOAD_TOO_LARGE", "Envoi trop volumineux");
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return tooLarge();
  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) return tooLarge();

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/public/submissions/${type}`, {
      method: "POST",
      headers: {
        "content-type": contentType,
        "x-forms-secret": process.env.CMS_FORMS_SECRET ?? "",
        "x-client-ip": clientIp(request),
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    return fail(502, "UNAVAILABLE", "Le service est momentanément indisponible");
  }

  // The API answers with the same envelope the form expects: { success, data | error }.
  const payload = await res.json().catch(() => null);
  if (!payload) return fail(502, "UNAVAILABLE", "Le service est momentanément indisponible");
  return Response.json(payload, { status: res.status, headers: { "cache-control": "no-store" } });
}

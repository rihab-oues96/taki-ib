import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { draftMode } from "next/headers";
import type { GlobalContent } from "./content/global";
import { isVideoFile, youtubeId } from "./content/videos";

/**
 * Data layer for the CMS (backoffice-back). Every piece of website content comes from here.
 *
 * - Results are cached and tagged `cms`; the backoffice calls /api/revalidate on publish,
 *   so changes appear right away. The cache also expires by itself as a safety net.
 * - In preview (Draft Mode) the cache is bypassed and unpublished drafts are returned.
 * - Editors paste full YouTube links in the backoffice; they are reduced to video ids here,
 *   so the rest of the website only ever deals with ids.
 * - When the API cannot be reached a CmsError is thrown and the nearest error boundary renders.
 */
const API_URL = (process.env.CMS_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export class CmsError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "CmsError";
  }
}

async function request<T>(path: string, preview: boolean): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/public${path}`, {
      headers: preview ? { "x-preview-secret": process.env.CMS_PREVIEW_SECRET ?? "" } : undefined,
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new CmsError(`Le service de contenu est injoignable (${path})`);
  }
  if (!res.ok) throw new CmsError(`Le service de contenu a répondu ${res.status} (${path})`, res.status);
  const body = (await res.json()) as { data: T };
  return videoIds(body.data);
}

/** Keys that hold a YouTube video: `id` (videos, testimonials, `video.id`), `videoId(s)`, `heroVideoId`… */
const VIDEO_KEY = /^(id|youtubeId|videoIds?|[a-z]+VideoId)$/;

/**
 * Replaces every YouTube link stored under a video key by its id. Bare ids are left as they are,
 * and so are uploaded video files (the home page background video can be either).
 */
function videoIds<T>(value: T, key = ""): T {
  if (typeof value === "string") return (VIDEO_KEY.test(key) && !isVideoFile(value) ? youtubeId(value) : value) as T;
  if (Array.isArray(value)) return value.map((v) => videoIds(v, key)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, videoIds(v, k)])) as T;
  }
  return value;
}

/**
 * Sections of a page, keyed by section name. A section hidden in the backoffice is absent,
 * so pages render `content.hero && <Hero … />`.
 */
export async function getPage<T extends object>(page: string): Promise<Partial<T>> {
  "use cache";
  cacheLife("hours");
  cacheTag("cms");
  const { isEnabled } = await draftMode();
  const data = await request<{ sections: Partial<T> }>(`/pages/${page}`, isEnabled);
  return data.sections;
}

/** Visible entries of a content type (articles, FAQ, testimonials…), in backoffice order. */
export async function getEntries<T>(type: string): Promise<(T & { _id: string; slug?: string })[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("cms");
  const { isEnabled } = await draftMode();
  return request(`/entries/${type}`, isEnabled);
}

/** One entry by its URL slug, or null when it does not exist or is hidden. */
export async function getEntry<T>(type: string, slug: string): Promise<(T & { _id: string; slug: string }) | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("cms");
  const { isEnabled } = await draftMode();
  try {
    return await request(`/entries/${type}/${encodeURIComponent(slug)}`, isEnabled);
  } catch (err) {
    if (err instanceof CmsError && err.status === 404) return null;
    throw err;
  }
}

/**
 * Site-wide content (identity, menu, footer). These three sections are required for any
 * page to render, so a missing one is treated as an outage rather than hidden content.
 */
export async function getGlobal(): Promise<GlobalContent> {
  const global = await getPage<GlobalContent>("global");
  if (!global.site || !global.navigation || !global.footer) {
    throw new CmsError("Le contenu commun du site (identité, menu, pied de page) est incomplet");
  }
  return global as GlobalContent;
}

export async function getSite() {
  return (await getGlobal()).site;
}

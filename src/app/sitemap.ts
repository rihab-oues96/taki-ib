import type { MetadataRoute } from "next";
import { getEntries } from "@/lib/cms";
import type { Post } from "@/lib/content/actualites";

const BASE = "https://takiacademy-redesign.example";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/mission", "/middle-education-program", "/diploma-program", "/scholar-life", "/notre-equipe", "/establishment-policies", "/actuality", "/jobs", "/admission", "/contact-us"];
  const posts = await getEntries<Post>("posts");
  return [
    ...pages.map((p) => ({ url: BASE + p })),
    ...posts.map((p) => ({ url: `${BASE}/actuality/${p.slug}`, lastModified: p.date })),
  ];
}

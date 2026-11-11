import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/site";

const BASE = "https://takiacademy-redesign.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/mission", "/middle-education-program", "/diploma-program", "/scholar-life", "/notre-equipe", "/establishment-policies", "/actuality", "/jobs", "/contact-us"];
  return [
    ...pages.map((p) => ({ url: BASE + p })),
    ...POSTS.map((p) => ({ url: `${BASE}/actuality/${p.slug}`, lastModified: p.date })),
  ];
}

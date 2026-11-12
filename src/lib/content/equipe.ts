/** "equipe" page sections; the organisation chart is the `levels` of the "organisation" section, top to bottom. */
import type { LinkItem } from "./global";

/** `desc`, `name` and `photo` are empty strings when not set. */
export type TeamMember = { role: string; desc: string; name: string; photo: string };
export type TeamLevel = { title: string; intro: string; members: TeamMember[] };

export type EquipeContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; primaryCta: LinkItem; secondaryCta: LinkItem };
  videos: { eyebrow: string; title: string; text: string; /** YouTube ids picked from the "videos" content type. */ videoIds: string[] };
  organisation: { eyebrow: string; title: string; text: string; namePlaceholder: string; levels: TeamLevel[] };
  join: { title: string; text: string; primaryCta: LinkItem; secondaryCta: LinkItem };
};

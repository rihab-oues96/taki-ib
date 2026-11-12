/** "politiques" page sections and the "policies" content type. */
import type { LinkItem } from "./global";

/** `paras` and `items` are empty arrays when a section has none. */
export type PolicySection = { heading: string; paras: string[]; items: string[] };

export type Policy = {
  id: string;
  title: string;
  short: string;
  intro: string;
  review: string;
  facts: { value: string; label: string }[];
  sections: PolicySection[];
};

export type PolicyViewerLabels = { listTitle: string; tabsLabel: string };

export type PolitiquesContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; cta: LinkItem };
  viewer: PolicyViewerLabels;
  contact: { title: string; text: string; portalCta: LinkItem; contactCta: LinkItem };
};

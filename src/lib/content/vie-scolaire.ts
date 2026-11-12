/** Sections of the "vie-scolaire" page (/scholar-life). */
import type { VideoCat } from "./videos";

type Cta = { label: string; href: string };
export type Seo = { title: string; description: string };
export type SocialNetwork = "instagram" | "facebook" | "youtube" | "linkedin";

export type SocialContent = {
  eyebrow: string;
  title: string;
  lead: string;
  items: { network: SocialNetwork; name: string; handle: string; desc: string }[];
};

export type VieHero = { eyebrow: string; title: string; lead: string; primaryCta: Cta; secondaryCta: Cta };

export type VieReelContent = {
  ariaLabel: string;
  /** "{n}" and "{total}" are replaced. */
  slideLabel: string;
  paginationLabel: string;
  /** YouTube ids, in display order; each must exist in the "videos" content type. */
  videoIds: string[];
};

export type VieTabsContent = {
  eyebrow: string;
  title: string;
  ariaLabel: string;
  tabs: { key: string; label: string; kicker: string; title: string; text: string[]; videoIds: string[] }[];
};

export type VieLibrary = { image: string; alt: string; eyebrow: string; title: string; quote: string; cite: string };

export type VieRights = { eyebrow: string; title: string; lead: string; items: { title: string; text: string }[] };

export type VieVideosContent = {
  eyebrow: string;
  title: string;
  lead: string;
  filterAriaLabel: string;
  allLabel: string;
  moreLabel: string;
  categories: { key: VideoCat; label: string }[];
};

export type VieScolaireContent = {
  seo: Seo;
  hero: VieHero;
  reel: VieReelContent;
  tabs: VieTabsContent;
  library: VieLibrary;
  rights: VieRights;
  videos: VieVideosContent;
  social: SocialContent;
};

/** Gallery tile (component MediaGallery). */
export type MediaItem = {
  kind: "image" | "video" | "youtube";
  title: string;
  caption?: string;
  src?: string;
  poster?: string;
  youtubeId?: string;
  feature?: boolean;
};

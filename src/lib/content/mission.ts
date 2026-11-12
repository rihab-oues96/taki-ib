/** Sections of the "mission" page managed in the backoffice. */
import type { LinkItem } from "./global";

export type Seo = { title: string; description: string };
export type TitledText = { title: string; text: string };

export type MissionHero = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
};

export type MissionItem = {
  id: string;
  /** Start of the tab label, hidden on small screens. */
  tabLong: string;
  tab: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
  /** Optional logo above the text: `src` is empty when there is none. */
  logo: { src: string; alt: string; width: number | null; height: number | null };
  /** Optional link: `href` is empty when there is none. */
  link: LinkItem;
};

export type MissionsContent = {
  eyebrow: string;
  title: string;
  tabsLabel: string;
  /** 1-based index of the tab open on load. */
  defaultTab: number | null;
  items: MissionItem[];
};

export type ValuesContent = {
  eyebrow: string;
  title: string;
  text: string;
  cardTitle: string;
  items: TitledText[];
};

export type LearnerProfileContent = {
  eyebrow: string;
  title: string;
  text: string;
  cta: LinkItem;
  items: TitledText[];
};

export type DocumentsContent = {
  eyebrow: string;
  title: string;
  resources: TitledText[];
  ibKicker: string;
  ibTitle: string;
  ibCountLabel: string;
  ibBadge: string;
  ibDownloadLabel: string;
  ibDocs: (TitledText & { href: string })[];
};

export type MissionContent = {
  seo: Seo;
  hero: MissionHero;
  missions: MissionsContent;
  values: ValuesContent;
  learnerProfile: LearnerProfileContent;
  documents: DocumentsContent;
};

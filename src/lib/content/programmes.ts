/** Shapes of the "pei" and "dp" page sections managed in the backoffice. */
import type { LinkItem } from "./global";

export type Seo = { title: string; description: string };

export type ProgrammeBanner = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Always links to the pre-registration page set in the site settings. */
  primaryCta: { label: string };
  secondaryCta: LinkItem;
  badge: { image: string; alt: string; text: string; linkLabel: string; href: string };
};

export type Stat = { value: string; unit: string; label: string };
export type Panel = { img: string; side: string; title: string; text: string };
export type PanelsSection = { eyebrow: string; title: string; text: string; panels: Panel[] };
export type IconCard = { icon: string; title: string; text: string };

export type WebSchoolSection = {
  eyebrow: string;
  title: string;
  text: string;
  parentLabel: string;
  studentLabel: string;
  previewLabel: string;
  appName: string;
  items: (IconCard & { tag: string })[];
};

export type ProgrammeCta = {
  title: string;
  text: string;
  primaryLabel: string;
  secondaryCta: LinkItem;
  phoneText: string;
};

export type Quality = { name: string; text: string };

export type PeiContent = {
  seo: Seo;
  banner: ProgrammeBanner;
  figures: { ariaLabel: string; image: string; alt: string; stats: Stat[] };
  programme: PanelsSection;
  years: {
    eyebrow: string;
    title: string;
    text: string;
    years: { name: string; detail: string }[];
    cards: IconCard[];
  };
  develops: { eyebrow: string; title: string; text: string; items: { icon: string; title: string }[] };
  subjects: { eyebrow: string; title: string; text: string; items: IconCard[] };
  profile: { eyebrow: string; title: string; text: string; cta: LinkItem; groupLabel: string; qualities: Quality[] };
  webSchool: WebSchoolSection;
  cta: ProgrammeCta;
};

export type CoreItem = { title: string; text: string };

export type DpContent = {
  seo: Seo;
  banner: ProgrammeBanner;
  figures: {
    ariaLabel: string;
    image: string;
    alt: string;
    video: { href: string; label: string; caption: string };
    stats: (Stat & { separator: string; value2: string })[];
  };
  pillars: PanelsSection;
  structure: {
    eyebrow: string;
    title: string;
    text: string;
    levels: { code: string; title: string; text: string }[];
    groupsLabel: string;
    groups: string[];
    coreBadge: string;
    coreText: string;
  };
  core: { eyebrow: string; title: string; text: string; listLabel: string; items: CoreItem[] };
  evaluation: {
    eyebrow: string;
    title: string;
    items: IconCard[];
    scaleLabel: string;
    scaleAriaLabel: string;
    scaleNote: string;
    scaleMax: string;
  };
  recognition: {
    bigNumber: string;
    bigText: string;
    eyebrow: string;
    title: string;
    items: IconCard[];
    links: LinkItem[];
  };
  webSchool: WebSchoolSection;
  cta: ProgrammeCta;
};

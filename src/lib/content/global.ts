/** Shapes of the "global" page sections managed in the backoffice. */
export type LinkItem = { label: string; href: string };

export type SiteSettings = {
  name: string;
  short: string;
  url: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string;
  mapQuery: string;
  preRegistration: string;
  studentPortal: string;
  parentPortal: string;
  social: { facebook: string; instagram: string; youtube: string; linkedin: string };
  seo: { titleDefault: string; description: string; image: string };
  skipLink: string;
};

export type NavItem = LinkItem & { children: LinkItem[] };

export type Navigation = {
  logo: string;
  ariaLabel: string;
  items: NavItem[];
  mobileItems: LinkItem[];
  contactCta: LinkItem;
  primaryCta: LinkItem;
  openMenuLabel: string;
  closeMenuLabel: string;
};

export type FooterContent = {
  logo: string;
  tagline: string;
  columns: { title: string; links: (LinkItem & { external: boolean })[] }[];
  visitTitle: string;
  visitCta: LinkItem;
  copyright: string;
  legal: string;
};

export type GlobalContent = {
  site: SiteSettings;
  navigation: Navigation;
  footer: FooterContent;
  /** Optional blocks: absent when hidden in the backoffice. */
  faq?: FaqHeading;
};

export type FaqHeading = { eyebrow: string; title: string };
export type FaqItem = { q: string; a: string };

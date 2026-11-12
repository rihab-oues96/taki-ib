/** Content types "posts" (articles with their own page) and "news" (cards of the Actualités page). */
export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  /** "L'essentiel" box shown above the text. Empty when the article has none. */
  keyPoints: string[];
  /** null when not set. */
  readMinutes: number | null;
  sections: {
    heading: string;
    body: string[];
    /** Comparison table; `rows` is empty when the section has no table. */
    table: { head: string[]; rows: string[][] };
  }[];
  /** Pull quote shown after the last section. Empty when the article has none. */
  quote: string;
};

export type NewsCat = "articles" | "events" | "ecole";

export type NewsItem = {
  cat: NewsCat;
  title: string;
  excerpt: string;
  image: string;
  /** Article: internal link. Empty for a video. */
  href: string;
  /** Video: YouTube id + kind. `id` is empty for an article. */
  video: { id: string; kind: "short" | "long" | "" };
};

type Cta = { label: string; href: string };

/** Sections of the "actualites" page (/actuality). */
export type NewsGridContent = {
  title: string;
  filterAriaLabel: string;
  allLabel: string;
  categories: { key: NewsCat; label: string }[];
  articleLinkLabel: string;
  videoLinkLabel: string;
};

export type ActualitesContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  featured: {
    video: { id: string; kind: "short" | "long"; title: string; thumb: string };
    playLabel: string;
    badge: string;
    category: string;
    title: string;
    text: string;
    cta: Cta;
  };
  grid: NewsGridContent;
  social: import("./vie-scolaire").SocialContent;
};

/** Fixed copy of the article template (/actuality/[slug]), page key "article". */
export type ArticleSidebarLabels = {
  tocTitle: string;
  shareTitle: string;
  shareFacebook: string;
  shareLinkedin: string;
  shareWhatsapp: string;
  copyLabel: string;
  copiedLabel: string;
};

export type ArticleContent = {
  header: {
    breadcrumbAriaLabel: string;
    back: Cta;
    authorLogo: string;
    authorName: string;
    /** "{minutes}" is replaced. */
    readingTime: string;
  };
  body: ArticleSidebarLabels & { ariaLabel: string; keyPointsTitle: string; tableCriterionLabel: string };
  contact: { title: string; text: string; primaryCta: Cta; secondaryCta: Cta; phoneText: string };
  more: { title: string; link: Cta };
};

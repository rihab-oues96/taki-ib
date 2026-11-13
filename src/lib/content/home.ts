/** Home page sections (page key "home"). First half here; the rest comes from ./home-2. */
import type { ClassActivitiesContent, InscriptionContent, NewsHeading, TestimonialsHeading } from "./home-2";

type Cta = { label: string; href: string };

export type SeoContent = { title: string; description: string };

export type HeroProgramme = {
  code: string;
  /** CSS colour of the code badge. */
  accent: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  alt: string;
  title: string;
  text: string;
  href: string;
};

export type HeroContent = {
  sectionLabel: string;
  announcement: { text: string; textDesktop: string; linkLabel: string; linkHref: string };
  eyebrow: string;
  titleLine1: string;
  /** `*mots*` are shown in yellow. */
  titleLine2: string;
  lead: string;
  watchLabel: string;
  cta: Cta;
  video: {
    /** YouTube id, or the address of an uploaded video file (`/uploads/….mp4`). */
    backgroundVideoId: string;
    /** YouTube id of the film opened by the "watch" button. */
    filmVideoId: string;
    backgroundTitle: string;
    backgroundStart: number | null;
    playLabel: string;
    pauseLabel: string;
    filmTitle: string;
    filmClose: string;
    filmFallback: string;
  };
  dock: { title: string; hint: string; moreLabel: string; closeLabel: string };
  programmes: HeroProgramme[];
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  text: string;
  cta: Cta;
  /** YouTube id of the video opened by the "video tour" button. */
  videoId: string;
  slides: { name: string; icon: string; image: string; title: string; text: string; caption: string }[];
  stats: { value: string; label: string }[];
  /** `slide` is the 1-based position of the photo the shortcut opens. */
  facilities: { label: string; icon: string; slide: number | null }[];
  labels: {
    chooseSlide: string;
    viewSlide: string;
    pause: string;
    resume: string;
    carousel: string;
    previous: string;
    next: string;
    videoCta: string;
    videoTitle: string;
    facilityHint: string;
    close: string;
  };
};

export type DiplomaContent = {
  eyebrow: string;
  title: string;
  text: string;
  cta: Cta;
  logos: { image: string; alt: string; width: number | null; height: number | null }[];
  official: { title: string; linkLabel: string; linkHref: string };
  journeyTitle: string;
  /** An empty `dot` shows an arrow. The last stop is highlighted. */
  stops: { dot: string; name: string; age: string }[];
  stats: { value: number | null; suffix: string; label: string }[];
  source: { label: string; linkLabel: string; linkHref: string };
};

export type WhyContent = {
  eyebrow: string;
  title: string;
  decoration: string;
  text: string;
  cta: Cta;
  panels: { image: string; side: string; title: string; text: string }[];
};

export type HomeContent = {
  seo: SeoContent;
  hero: HeroContent;
  about: AboutContent;
  diploma: DiplomaContent;
  why: WhyContent;
  classActivities: ClassActivitiesContent;
  inscription: InscriptionContent;
  testimonials: TestimonialsHeading;
  news: NewsHeading;
};

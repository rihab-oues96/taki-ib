/** Sections of the "not-found" page (404), managed in the backoffice. */
import type { LinkItem } from "./global";

export type NotFoundMessage = {
  code: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: LinkItem;
  /** Optional: not rendered when its label or link is empty. */
  secondaryCta: LinkItem;
};

export type NotFoundContent = {
  seo: { title: string; description: string };
  message: NotFoundMessage;
  links: { title: string; items: { label: string; text: string; href: string }[] };
};

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { plain, rich } from "@/components/Rich";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { getPage } from "@/lib/cms";
import type { NotFoundContent, NotFoundMessage } from "@/lib/content/not-found";

/**
 * 404 page, shown for unknown addresses and when a page calls notFound().
 * Its content is the "Page introuvable (404)" page of the backoffice.
 * This file ships with every route, so it stays a Server Component without client code.
 */

/** A visitor must never land on an empty page: used when the message section is hidden. */
const FALLBACK: NotFoundMessage = {
  code: "404",
  eyebrow: "Page introuvable",
  title: "Cette page *s'est égarée*",
  text: "L'adresse est peut-être incorrecte, ou la page a été déplacée.",
  cta: { label: "Retour à l'accueil", href: "/" },
  secondaryCta: { label: "", href: "" },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<NotFoundContent>("not-found");
  return { title: seo?.title || plain(FALLBACK.eyebrow), description: seo?.description || undefined };
}

export default async function NotFound() {
  const c = await getPage<NotFoundContent>("not-found");
  const m = c.message ?? FALLBACK;
  const links = c.links?.items.filter((item) => item.label && item.href) ?? [];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-white pt-[136px] pb-16 text-navy sm:pt-40 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-16 -z-10 size-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,191,232,.28),transparent)]"
        />
        <Container className="flex max-w-[900px] flex-col items-center text-center">
          {m.code && (
            <p
              aria-hidden
              className="bg-linear-to-b from-[#51a0d8] to-[#8bc3e8]/40 bg-clip-text text-[clamp(112px,22vw,220px)] font-semibold leading-[0.9] tracking-[-0.06em] text-transparent"
            >
              {m.code}
            </p>
          )}
          <div className="mt-6">{m.eyebrow && <Eyebrow>{m.eyebrow}</Eyebrow>}</div>
          <h1 className="text-[clamp(32px,4vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em] [&_em]:not-italic [&_em]:text-brand">
            {rich(m.title)}
          </h1>
          {m.text && <p className="mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-[#5d6f7c]">{rich(m.text)}</p>}
          <div className="mt-7 flex flex-wrap justify-center gap-3 max-[640px]:w-full max-[640px]:flex-col">
            {m.cta?.label && m.cta.href && (
              <ButtonLink href={m.cta.href} variant="brand" arrow>
                {m.cta.label}
              </ButtonLink>
            )}
            {m.secondaryCta?.label && m.secondaryCta.href && (
              <ButtonLink href={m.secondaryCta.href} variant="line">
                {m.secondaryCta.label}
              </ButtonLink>
            )}
          </div>
        </Container>
      </section>

      {links.length > 0 && (
        <section aria-label={plain(c.links?.title) || "Pages utiles"} className="bg-white pb-20 sm:pb-28">
          <Container className="max-w-[1080px]">
            {c.links?.title && (
              <h2 className="mb-6 text-center text-[20px] font-semibold tracking-[-0.015em] text-navy">
                {plain(c.links.title)}
              </h2>
            )}
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {links.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-3xl bg-[#f4f8fb] p-6 transition duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun"
                  >
                    <span className="flex items-start justify-between gap-3 text-[17px] font-semibold leading-snug tracking-[-0.015em]">
                      {item.label}
                      <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-brand transition group-hover:text-sun" aria-hidden />
                    </span>
                    {item.text && <span className="mt-2 text-[14.5px] leading-[1.5] text-[#5d6f7c] transition group-hover:text-white/75">{item.text}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}

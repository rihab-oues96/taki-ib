import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { PolicyViewer } from "@/components/PolicyViewer";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { getEntries, getPage } from "@/lib/cms";
import type { Policy, PolitiquesContent } from "@/lib/content/politiques";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<PolitiquesContent>("politiques");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function PoliciesPage() {
  const [c, policies] = await Promise.all([getPage<PolitiquesContent>("politiques"), getEntries<Policy>("policies")]);
  return (
    <>
      {c.hero && (
        <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title, "text-brand-light")} lead={c.hero.lead}>
          <ButtonLink href={c.hero.cta.href}>{c.hero.cta.label}</ButtonLink>
        </PageHero>
      )}

      {c.viewer && policies.length > 0 && (
        <section className="py-16 sm:py-24">
          <Container>
            <PolicyViewer policies={policies} labels={c.viewer} />
          </Container>
        </section>
      )}

      {c.contact && (
        <section className="bg-[#f4f8fb] py-16">
          <Container className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <h2 className="font-semibold text-[clamp(32px,3.6vw,50px)] leading-[1.08] tracking-[-0.035em]">{c.contact.title}</h2>
              <p className="mt-3 max-w-xl text-ink-soft">{c.contact.text}</p>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-wrap gap-3 md:justify-end">
              <ButtonLink href={c.contact.portalCta.href} external variant="dark">{c.contact.portalCta.label}</ButtonLink>
              <ButtonLink href={c.contact.contactCta.href} variant="brand">{c.contact.contactCta.label}</ButtonLink>
            </Reveal>
          </Container>
        </section>
      )}

    </>
  );
}

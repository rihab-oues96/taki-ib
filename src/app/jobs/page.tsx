import type { Metadata } from "next";
import { Briefcase, Mail, Phone } from "lucide-react";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { getPage, getSite } from "@/lib/cms";
import type { JobsContent } from "@/lib/content/contact";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<JobsContent>("jobs");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function JobsPage() {
  const [c, site] = await Promise.all([getPage<JobsContent>("jobs"), getSite()]);
  return (
    <>
      {c.hero && (
        <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title)} lead={c.hero.lead}>
          <ButtonLink href={c.hero.cta.href} variant="navy">{c.hero.cta.label}</ButtonLink>
        </PageHero>
      )}

      {/* Open positions, managed in the backoffice. Without any, the "no offers" state shows. */}
      {c.offers && (
        <section aria-labelledby="offersTitle" className="bg-white pb-20 sm:pb-24">
          <Container>
            <Reveal className="mx-auto max-w-3xl">
              <h2 id="offersTitle" className="sr-only">{c.offers.title}</h2>
              {c.offers.items.length === 0 ? (
                <div className="rounded-[28px] bg-[#f4f8fb] px-6 py-14 text-center sm:px-12">
                  <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                    <Briefcase size={26} aria-hidden />
                  </span>
                  <p className="mt-6 text-[clamp(24px,2.4vw,32px)] font-semibold leading-tight tracking-[-0.03em] text-navy">
                    {c.offers.emptyTitle}
                  </p>
                  <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.6] text-[#5d6f7c]">{c.offers.emptyText}</p>
                </div>
              ) : (
                <ul className="grid gap-4">
                  {c.offers.items.map((o, i) => (
                    <li key={i} className="rounded-3xl bg-[#f4f8fb] p-7">
                      <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand">{o.type}</p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.015em] text-navy">{o.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-soft">{o.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </Container>
        </section>
      )}

      {(c.apply || c.help) && (
        <section id="candidature" aria-labelledby="applyTitle" className="scroll-mt-24 bg-[#f4f8fb] py-20 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {c.apply && (
              <Reveal>
                <h2 id="applyTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
                  {rich(c.apply.title, "not-italic text-brand")}
                </h2>
                <p className="mb-10 mt-4 max-w-xl text-[17px] leading-[1.6] text-[#5d6f7c]">{c.apply.text}</p>
                <JobApplicationForm content={c.apply} />
              </Reveal>
            )}

            {c.help && (
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-navy p-8 text-white">
                  <h3 className="text-[28px] font-semibold tracking-[-0.03em]">{c.help.title}</h3>
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={site.phoneHref} className="font-bold underline-offset-4 hover:underline">{site.phone}</a></li>
                    <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={`mailto:${site.email}`} className="break-all font-bold underline-offset-4 hover:underline">{site.email}</a></li>
                  </ul>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}
    </>
  );
}

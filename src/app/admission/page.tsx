import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AdmissionForm } from "@/components/AdmissionForm";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { getPage, getSite } from "@/lib/cms";
import type { AdmissionContent } from "@/lib/content/contact";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<AdmissionContent>("admission");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function AdmissionPage() {
  const [c, site] = await Promise.all([getPage<AdmissionContent>("admission"), getSite()]);
  return (
    <>
      {c.hero && (
        <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title)} lead={c.hero.lead}>
          <ButtonLink href={c.hero.primaryCta.href} variant="navy">{c.hero.primaryCta.label}</ButtonLink>
          <ButtonLink href={c.hero.secondaryCta.href} variant="line">{c.hero.secondaryCta.label}</ButtonLink>
        </PageHero>
      )}

      {c.steps && (
        <section aria-label={c.steps.ariaLabel} className="bg-white pb-20 sm:pb-24">
          <Container>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.steps.items.map((s, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <li className="h-full rounded-3xl bg-[#f4f8fb] p-7">
                    <span className="grid size-11 place-items-center rounded-full bg-brand text-lg font-bold text-white">{i + 1}</span>
                    <h2 className="mt-5 text-xl font-semibold tracking-[-0.015em] text-navy">{s.title}</h2>
                    <p className="mt-2 leading-relaxed text-[#5d6f7c]">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </Container>
        </section>
      )}

      {(c.form || c.help) && (
        <section id="inscription" aria-labelledby="formTitle" className="bg-[#f4f8fb] py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {c.form && (
              <Reveal>
                <SectionHeading eyebrow={c.form.eyebrow} title={<span id="formTitle">{c.form.title}</span>}>
                  {c.form.text}
                </SectionHeading>
                <div className="mt-10 rounded-[28px] bg-white p-6 sm:p-10">
                  <AdmissionForm content={c.form} />
                </div>
              </Reveal>
            )}

            {c.help && (
              <Reveal delay={0.1} className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-3xl bg-navy p-8 text-white">
                  <h3 className="text-[28px] font-semibold tracking-[-0.03em]">{c.help.title}</h3>
                  <p className="mt-3 text-white/75">{c.help.text}</p>
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={site.phoneHref} className="font-bold underline-offset-4 hover:underline">{site.phone}</a></li>
                    <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={`mailto:${site.email}`} className="break-all font-bold underline-offset-4 hover:underline">{site.email}</a></li>
                    <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><span>{site.name}<br />{site.address}</span></li>
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href={c.help.cta.href} variant="solid">{c.help.cta.label}</ButtonLink>
                  </div>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      <Faq />
    </>
  );
}

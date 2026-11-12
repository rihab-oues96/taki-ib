import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { getPage, getSite } from "@/lib/cms";
import type { ContactContent } from "@/lib/content/contact";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<ContactContent>("contact");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function ContactPage() {
  const [c, site] = await Promise.all([getPage<ContactContent>("contact"), getSite()]);
  return (
    <>
      {c.hero && <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title, "text-brand-light")} lead={c.hero.lead} />}

      {(c.form || c.info) && (
        <section id="visit" className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {c.form && (
              <Reveal>
                <h2 className="font-semibold text-[clamp(32px,3.6vw,50px)] leading-[1.08] tracking-[-0.035em]">{c.form.title}</h2>
                <p className="mb-10 mt-4 max-w-xl text-[17px] text-ink-soft">{c.form.text}</p>
                <ContactForm content={c.form} />
              </Reveal>
            )}

            {c.info && (
              <Reveal delay={0.1} className="space-y-4">
                <div className="rounded-3xl bg-navy p-8 text-white">
                  <h3 className="font-semibold tracking-[-0.03em] text-[28px]">{c.info.title}</h3>
                  <ul className="mt-6 space-y-5">
                    <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><span>{site.name}<br />{site.address}</span></li>
                    <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={site.phoneHref} className="font-bold underline-offset-4 hover:underline">{site.phone}</a></li>
                    <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={`mailto:${site.email}`} className="break-all font-bold underline-offset-4 hover:underline">{site.email}</a></li>
                    <li className="flex gap-4"><Clock className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><span className="text-white/75">{c.info.visitNote}</span></li>
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={c.info.cta.href} variant="sun">{c.info.cta.label}</ButtonLink>
                  </div>
                </div>
                <div className="rounded-3xl bg-[#f4f8fb] p-8">
                  <h3 className="text-[20px] font-semibold tracking-[-0.015em] leading-snug">{c.info.followTitle}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Object.entries(site.social).filter(([, v]) => v).map(([k, v]) => (
                      <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-sm font-bold capitalize shadow-sm transition-colors hover:bg-brand hover:text-white">{k}</a>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {c.map && (
        <section aria-label={c.map.ariaLabel} className="pb-20">
          <Container>
            <div className="overflow-hidden rounded-[28px] ring-1 ring-navy/10">
              <iframe
                title={c.map.title}
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0"
              />
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contactez-nous",
  description: "Contactez l'équipe des admissions de Taki Academy International School à Sahloul, Sousse, ou réservez une visite de l'école.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contactez-nous"
        title={<>Parlons de <em className="text-brand-light">l&apos;avenir de votre enfant</em></>}
        lead="Notre équipe des admissions se fera un plaisir de répondre à vos questions et de vous accueillir à l'école."
      image="/media/building.jpg"
      />

      <section id="visit" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="font-semibold text-[clamp(32px,3.6vw,50px)] leading-[1.08] tracking-[-0.035em]">Réservez une visite ou posez une question</h2>
            <p className="mb-10 mt-4 max-w-xl text-[17px] text-ink-soft">Parlez-nous un peu de votre famille et nous reviendrons vers vous.</p>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <div className="rounded-3xl bg-navy p-8 text-white">
              <h3 className="font-semibold tracking-[-0.03em] text-[28px]">Admissions</h3>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><span>{SITE.name}<br />{SITE.address}</span></li>
                <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={SITE.phoneHref} className="font-bold underline-offset-4 hover:underline">{SITE.phone}</a></li>
                <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={`mailto:${SITE.email}`} className="break-all font-bold underline-offset-4 hover:underline">{SITE.email}</a></li>
                <li className="flex gap-4"><Clock className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><span className="text-white/75">Appelez-nous ou écrivez-nous pour convenir d&apos;un horaire de visite qui vous convient.</span></li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={SITE.preRegistration} external variant="sun">Pré-inscription en ligne</ButtonLink>
              </div>
            </div>
            <div className="rounded-3xl bg-[#f4f8fb] p-8">
              <h3 className="text-[20px] font-semibold tracking-[-0.015em] leading-snug">Suivez-nous</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.entries(SITE.social).map(([k, v]) => (
                  <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-sm font-bold capitalize shadow-sm transition-colors hover:bg-brand hover:text-white">{k}</a>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Carte" className="pb-20">
        <Container>
          <div className="overflow-hidden rounded-[28px] ring-1 ring-navy/10">
            <iframe
              title="Taki Academy International School sur la carte"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

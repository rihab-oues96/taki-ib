import type { Metadata } from "next";
import { Briefcase, Mail, Phone } from "lucide-react";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recrutement",
  description:
    "Rejoignez l'équipe de Taki Academy International School : consultez nos offres d'emploi ou envoyez-nous une candidature spontanée.",
};

/** Open positions. Leave empty to show the "no offers" state. */
const OFFERS: { title: string; type: string; description: string }[] = [];

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Recrutement"
        title={<>Rejoignez <em>notre équipe</em></>}
        lead="Nous recherchons des talents passionnés pour transformer l'éducation et créer l'avenir ensemble."
      >
        <ButtonLink href="#candidature" variant="navy">Envoyer une candidature</ButtonLink>
      </PageHero>

      <section aria-labelledby="offersTitle" className="bg-white pb-20 sm:pb-24">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <h2 id="offersTitle" className="sr-only">Offres d&apos;emploi</h2>
            {OFFERS.length === 0 ? (
              <div className="rounded-[28px] bg-[#f4f8fb] px-6 py-14 text-center sm:px-12">
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                  <Briefcase size={26} aria-hidden />
                </span>
                <p className="mt-6 text-[clamp(24px,2.4vw,32px)] font-semibold leading-tight tracking-[-0.03em] text-navy">
                  Aucune offre disponible pour le moment
                </p>
                <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.6] text-[#5d6f7c]">
                  Déposez votre CV et complétez vos informations afin que nous puissions vous contacter dès qu&apos;une opportunité se présente.
                </p>
              </div>
            ) : (
              <ul className="grid gap-4">
                {OFFERS.map((o) => (
                  <li key={o.title} className="rounded-3xl bg-[#f4f8fb] p-7">
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

      <section id="candidature" aria-labelledby="applyTitle" className="scroll-mt-24 bg-[#f4f8fb] py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 id="applyTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
              Envoyez-nous <em className="not-italic text-brand">votre candidature</em>
            </h2>
            <p className="mb-10 mt-4 max-w-xl text-[17px] leading-[1.6] text-[#5d6f7c]">
              Parlez-nous de votre parcours : nous conservons chaque candidature et revenons vers vous dès qu&apos;un poste correspond à votre profil.
            </p>
            <JobApplicationForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-navy p-8 text-white">
              <h3 className="text-[28px] font-semibold tracking-[-0.03em]">Une question ?</h3>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={SITE.phoneHref} className="font-bold underline-offset-4 hover:underline">{SITE.phone}</a></li>
                <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={`mailto:${SITE.email}`} className="break-all font-bold underline-offset-4 hover:underline">{SITE.email}</a></li>
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

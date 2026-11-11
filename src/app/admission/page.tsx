import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AdmissionForm } from "@/components/AdmissionForm";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, PageHero, SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pré-inscription",
  description:
    "Inscrivez votre enfant à Taki Academy International School (Sahloul, Sousse) : remplissez la fiche de pré-inscription 2026-2027 en ligne.",
};

const STEPS = [
  { title: "Choisir l’inscription", text: "Sélectionnez le niveau et la classe de votre enfant." },
  { title: "Présenter votre enfant", text: "Son identité et son parcours scolaire." },
  { title: "Vos coordonnées", text: "Celles du parent ou du responsable légal." },
  { title: "Envoyer", text: "Validez le formulaire, notre équipe revient vers vous pour la suite." },
];

export default function AdmissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Pré-inscription"
        title={<>Inscrivez-vous pour une <em>expérience hors du commun</em></>}
        lead="Rejoignez Taki Academy et accédez à un programme de classe mondiale menant au diplôme du Baccalauréat International."
      >
        <ButtonLink href="#inscription" variant="navy">Remplir la fiche</ButtonLink>
        <ButtonLink href="/contact-us#visit" variant="line">Réserver une visite</ButtonLink>
      </PageHero>

      <section aria-label="Les étapes" className="bg-white pb-20 sm:pb-24">
        <Container>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
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

      <section id="inscription" aria-labelledby="formTitle" className="bg-[#f4f8fb] py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Inscription 2026 – 2027" title={<span id="formTitle">Fiche de pré-inscription</span>}>
              Remplissez les informations ci-dessous. Tous les champs sont obligatoires, sauf indication contraire.
            </SectionHeading>
            <div className="mt-10 rounded-[28px] bg-white p-6 sm:p-10">
              <AdmissionForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-navy p-8 text-white">
              <h3 className="text-[28px] font-semibold tracking-[-0.03em]">Besoin d’aide ?</h3>
              <p className="mt-3 text-white/75">Notre équipe vous accompagne pendant toute l’inscription.</p>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={SITE.phoneHref} className="font-bold underline-offset-4 hover:underline">{SITE.phone}</a></li>
                <li className="flex gap-4"><Mail className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><a href={`mailto:${SITE.email}`} className="break-all font-bold underline-offset-4 hover:underline">{SITE.email}</a></li>
                <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-sun" size={20} aria-hidden /><span>{SITE.name}<br />{SITE.address}</span></li>
              </ul>
              <div className="mt-8">
                <ButtonLink href="/contact-us" variant="solid">Contactez-nous</ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Faq />
    </>
  );
}

import Image from "next/image";
import { SITE } from "@/lib/site";
import { ButtonLink, Container, Eyebrow } from "./ui";
import { Reveal } from "./Reveal";

const STEPS = [
  "Choisissez le type d'inscription",
  "Remplissez la fiche de renseignements de votre enfant",
  "Remplissez la fiche du premier responsable légal",
  "Envoyez les données",
];

export function AdmissionsCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <Image src="/media/building.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-900 via-navy-900/90 to-navy-900/50" />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <Eyebrow light>Admissions</Eyebrow>
          <h2 className="text-[clamp(32px,3.6vw,50px)] font-semibold leading-[1.08] tracking-[-0.035em] [&_em]:not-italic">
            Venez découvrir où votre enfant pourrait <em className="text-brand-light">s&apos;épanouir</em>
          </h2>
          <p className="mt-6 max-w-lg text-[17px] leading-[1.6] text-white/75">
            La meilleure façon de savoir si Taki Academy convient à votre famille est de parcourir nos couloirs, de rencontrer notre équipe et de poser toutes vos questions.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact-us#visit" variant="sun">Réserver une visite de l&apos;école</ButtonLink>
            <ButtonLink href={SITE.preRegistration} variant="ghost">Pré-inscription en ligne</ButtonLink>
          </div>
          <p className="mt-6 text-white/65">
            Ou appelez les admissions au <a className="font-bold text-white underline underline-offset-4" href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="space-y-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-xl font-bold text-white">{i + 1}</span>
                <span className="font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

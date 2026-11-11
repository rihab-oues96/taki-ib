import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen, CalendarCheck, Download, Eye, Flag, FlaskConical, Globe2, GraduationCap, HeartPulse,
  Languages, Lightbulb, ListChecks, MessageCircle, FileText, BarChart3, Palette, PenTool, Search, Sigma,
  Sparkles, Target, Users,
} from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { PeiPanels } from "@/components/pei/PeiPanels";
import { LearnerProfileExplorer } from "@/components/pei/LearnerProfileExplorer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programme d'éducation intermédiaire (PEI)",
  description: "Le Programme d'éducation intermédiaire de l'IB pour les élèves de 11 à 16 ans à Taki Academy : huit groupes de matières, apprentissage par la recherche et développement personnel.",
};

const STATS = [
  { n: "11–16", u: "ans", l: "L'âge des élèves du PEI" },
  { n: "1", u: "million", l: "d'élèves IB chaque année" },
  { n: "3 700", l: "établissements scolaires" },
  { n: "147", u: "pays", l: "où l'IB est présent" },
];

const YEARS = [
  ["PEI 1", "Dès 11 ans"], ["PEI 2", "2e année"], ["PEI 3", "3e année"], ["PEI 4", "4e année"], ["PEI 5", "Jusqu'à 16 ans"],
];

const DEVELOPS = [
  [Sparkles, "Apprendre tout au long de la vie"],
  [Search, "Apprendre par la pratique et la recherche"],
  [Lightbulb, "Développer l'esprit critique"],
  [Eye, "Apprendre pour comprendre"],
  [Globe2, "Explorer l'identité humaine et les défis mondiaux"],
  [ListChecks, "Renforcer l'autonomie et l'organisation"],
  [Target, "Développer des talents personnels"],
  [GraduationCap, "Préparer progressivement la suite des études"],
] as const;

const SUBJECTS = [
  [BookOpen, "Langue et littérature", "Lire, analyser et écrire des textes variés dans sa langue principale."],
  [Languages, "Acquisition de langues", "Apprendre une nouvelle langue pour communiquer et découvrir d'autres cultures."],
  [Users, "Individus et sociétés", "Histoire, géographie et société pour comprendre le monde et ses enjeux."],
  [FlaskConical, "Sciences", "Biologie, physique et chimie, par l'expérience et la démarche scientifique."],
  [Sigma, "Mathématiques", "Raisonner, modéliser et résoudre des problèmes concrets."],
  [Palette, "Arts", "S'exprimer et créer à travers les arts visuels et les arts de la scène."],
  [PenTool, "Design", "Imaginer et concevoir des solutions à des problèmes réels, de l'idée au prototype."],
  [HeartPulse, "Éducation physique et à la santé", "Bouger, coopérer et adopter un mode de vie sain et équilibré."],
] as const;

const WEBSCHOOL = [
  [CalendarCheck, "Présence de l'élève", "Suivi quotidien de l'assiduité et de la ponctualité.", "Chaque jour"],
  [BarChart3, "Résultats et bulletins", "Accès en temps réel aux évaluations et aux notes.", "En temps réel"],
  [MessageCircle, "Communication", "Échanges directs avec l'administration et les enseignants.", "Direct"],
  [FileText, "Devoirs et travaux", "Consultation des travaux assignés et rendus.", "À jour"],
] as const;

const H2 = "text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] [&_em]:not-italic";

export default function PeiPage() {
  return (
    <>
      {/* Banner */}
      <section aria-labelledby="pei-title" className="bg-white px-4 pb-12 pt-28 text-center sm:pb-16 sm:pt-32">
        <Eyebrow>Programme d&apos;éducation intermédiaire · PEI</Eyebrow>
        <h1 id="pei-title" className="mx-auto max-w-[900px] text-[clamp(32px,4vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em] text-navy [&_em]:not-italic">
          Là où les élèves apprennent <em className="text-brand">à apprendre</em>.
        </h1>
        <p className="mx-auto mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-[#5d6f7c]">
          Le programme d&apos;éducation intermédiaire est de renommée mondiale pour son excellence académique. Il stimule la pensée critique, la curiosité intellectuelle et la compréhension interculturelle.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3 max-sm:flex-col">
          <ButtonLink href={SITE.preRegistration} variant="navy" external>Pré-inscription</ButtonLink>
          <ButtonLink href="/contact-us" variant="line">Contactez-nous</ButtonLink>
        </div>
        <p className="mt-[26px] inline-flex items-center gap-3 rounded-full bg-[#f4f8fb] py-2 pl-2.5 pr-4 text-sm text-[#5d6f7c] max-sm:flex-wrap max-sm:justify-center">
          <Image src="/brand/ib-pei.png" alt="Programme d'éducation intermédiaire de l'IB" width={137} height={30} className="h-[30px] w-auto" />
          <span>École du monde de l&apos;IB&nbsp;·{" "}
            <a href="https://www.ibo.org/fr/school/062913/" target="_blank" rel="noopener noreferrer" className="font-bold text-navy underline decoration-sun decoration-2 underline-offset-4 hover:text-brand">
              vérifier sur ibo.org
            </a>
          </span>
        </p>
      </section>

      {/* Key figures */}
      <section aria-label="Chiffres clés" className="bg-white px-4 pb-[72px] sm:pb-24">
        <Container>
          <Reveal className="relative h-[clamp(280px,36vw,500px)] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)] sm:rounded-[28px] max-sm:h-[300px]">
            <Image src="/media/programme/pei-students.jpg" alt="Des élèves de TakiAcademy International School en pleine activité en classe" fill priority sizes="1200px" className="object-cover [object-position:50%_18%]" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,51,70,0)_45%,rgba(11,51,70,.45))]" />
          </Reveal>
          <Reveal className="relative z-[2] -mt-10 grid grid-cols-2 rounded-[22px] bg-white shadow-[0_30px_60px_-36px_rgba(11,51,70,.45)] sm:-mt-12 sm:mx-2 lg:-mt-[60px] lg:mx-10 lg:grid-cols-4 max-sm:mx-2">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className={`px-4 py-[18px] sm:px-7 sm:py-6 ${i % 2 === 1 ? "border-l border-[#e3ebf0]" : ""} ${i >= 2 ? "border-t border-[#e3ebf0] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="block text-[clamp(26px,2.6vw,36px)] font-bold leading-none tracking-[-0.035em] text-navy">
                  {s.n}
                  {s.u && <small className="ml-1.5 text-[.55em] font-semibold tracking-[-0.01em] text-brand">{s.u}</small>}
                </span>
                <span className="mt-2 block text-sm leading-[1.4] text-[#5d6f7c]">{s.l}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Our programme: image panels */}
      <section aria-labelledby="pei-why" className="relative overflow-hidden bg-[#114f6e] px-4 pb-[68px] pt-14 text-white max-md:pb-[52px] max-md:pt-12">
        <Container className="relative">
          <Reveal className="relative z-[1] mb-7 grid items-end gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-x-[72px]">
            <div>
              <Eyebrow light>Notre programme</Eyebrow>
              <h2 id="pei-why" className="text-[clamp(30px,3.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em] [&_em]:not-italic">
                Un programme riche, des <em className="text-brand-light">méthodes dynamiques</em>.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-white/80">
              Le PEI propose un curriculum riche et varié, avec des méthodes d&apos;enseignement dynamiques basées sur la recherche. Il encourage la pensée critique et l&apos;application des connaissances dans le monde réel.
            </p>
          </Reveal>
          <PeiPanels />
        </Container>
      </section>

      {/* Timeline */}
      <section aria-labelledby="pei-years" className="bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container>
          <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>À qui s&apos;adresse ce cycle&nbsp;?</Eyebrow>
              <h2 id="pei-years" className={`${H2} text-navy [&_em]:text-brand`}>Cinq années pour <em>grandir et progresser</em>.</h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">
              Le PEI accompagne les élèves de 11 à 16 ans dans une phase essentielle de leur développement académique et personnel, du PEI&nbsp;1 au PEI&nbsp;5.
            </p>
          </Reveal>

          <Reveal className="relative mt-14">
            <div aria-hidden className="absolute inset-x-[10%] top-[34px] h-1 rounded bg-[#dbe8f0] max-sm:hidden">
              <span className="absolute inset-0 rounded bg-linear-to-r from-brand to-brand-light" />
            </div>
            <ol className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-5">
              {YEARS.map(([y, a], i) => {
                const last = i === YEARS.length - 1;
                return (
                  <li key={y} className="text-center">
                    <span className={`mx-auto grid size-[72px] place-items-center rounded-full text-[15px] font-bold ${last ? "bg-sun text-navy shadow-[0_0_0_7px_rgba(246,194,28,.25)]" : "bg-navy text-white shadow-[0_0_0_7px_rgba(47,165,222,.18)]"}`}>
                      {i + 1}
                    </span>
                    <span className="mt-4 block text-[17px] font-bold text-navy">{y}</span>
                    <span className="mt-0.5 block text-sm text-[#5d6f7c]">{a}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              [Target, "Une étape clé", "La transition entre l'enseignement de base et le secondaire, à un âge où l'adolescent se transforme."],
              [Flag, "Équivalence avec le système tunisien", "Le PEI correspond aux cycles du collège et du début du secondaire tunisien, pour une continuité pédagogique adaptée."],
            ].map(([Icon, t, d], i) => {
              const I = Icon as typeof Target;
              return (
                <Reveal key={t as string} delay={i * 0.07} className="grid grid-cols-[48px_1fr] items-start gap-4 rounded-[22px] bg-white px-[26px] py-6 shadow-[0_24px_50px_-40px_rgba(11,51,70,.5)]">
                  <span className="grid size-12 place-items-center rounded-[14px] bg-[#eef6fb] text-brand"><I size={22} strokeWidth={1.8} aria-hidden /></span>
                  <div>
                    <h3 className="mt-0.5 text-lg font-bold tracking-[-0.01em] text-navy">{t as string}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-[#5d6f7c]">{d as string}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* What the MYP develops */}
      <section aria-labelledby="pei-develops" className="bg-[radial-gradient(120%_120%_at_85%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-4 py-[72px] text-white sm:py-24">
        <Container>
          <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow light>Ce que le PEI développe</Eyebrow>
              <h2 id="pei-develops" className={`${H2} text-white [&_em]:text-brand-light`}>Des compétences pour la vie, <em>pas seulement pour les examens</em>.</h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-white/70">Un programme complet qui forme des apprenants autonomes et engagés.</p>
          </Reveal>
          <ul className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DEVELOPS.map(([Icon, t], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <li className="group h-full rounded-[20px] bg-white/[0.06] px-5 pb-6 pt-[22px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)] transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:text-navy hover:shadow-[0_26px_50px_-26px_rgba(0,0,0,.6)]">
                  <span className="grid size-[46px] place-items-center rounded-[14px] bg-brand-light/15 text-brand-light transition-colors group-hover:bg-brand group-hover:text-white"><Icon size={22} strokeWidth={1.8} aria-hidden /></span>
                  <h3 className="mt-[18px] text-[17px] font-bold leading-[1.3] tracking-[-0.01em]">{t}</h3>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Subject groups */}
      <section aria-labelledby="pei-subjects" className="bg-white px-4 py-[72px] sm:py-24">
        <Container>
          <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>Les matières enseignées</Eyebrow>
              <h2 id="pei-subjects" className={`${H2} text-navy [&_em]:text-brand`}>Huit groupes de matières, <em>un programme cohérent</em>.</h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">Le programme est structuré autour de 8 groupes de matières qui garantissent une formation équilibrée et complète.</p>
          </Reveal>
          <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUBJECTS.map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <li className="group relative h-full rounded-[22px] bg-[#f4f8fb] p-[24px_22px] transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgba(11,51,70,.5),inset_0_0_0_1.5px_var(--color-brand)]">
                  <span className="absolute right-[22px] top-[22px] text-[13px] font-bold tracking-[0.06em] text-[#9fb3c0]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-[52px] place-items-center rounded-2xl bg-white text-brand shadow-[0_10px_24px_-14px_rgba(11,51,70,.35)] transition-colors group-hover:bg-brand group-hover:text-white"><Icon size={24} strokeWidth={1.8} aria-hidden /></span>
                  <h3 className="mt-[18px] text-lg font-bold leading-[1.25] tracking-[-0.01em] text-navy">{t}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-[#5d6f7c]">{d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Learner profile */}
      <section id="profil" aria-labelledby="pei-profile" className="bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>Le profil de l&apos;apprenant de l&apos;IB</Eyebrow>
            <h2 id="pei-profile" className={`${H2} text-navy [&_em]:text-brand`}>Dix qualités, <em>expliquées simplement</em>.</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">
              Le profil de l&apos;apprenant représente la mission de l&apos;IB en pratique. Ces qualités vont bien au-delà du développement intellectuel et des considérations purement scolaires.
            </p>
            <div className="mt-7">
              <ButtonLink href="https://ibtakiacademyschool.com/documents/learner-profile-fr.pdf" variant="navy" external>
                <Download size={16} strokeWidth={2.4} aria-hidden />Télécharger le profil (PDF)
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal><LearnerProfileExplorer /></Reveal>
        </Container>
      </section>

      {/* Web School */}
      <section aria-labelledby="pei-ws" className="bg-white px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>Suivi et accompagnement</Eyebrow>
            <h2 id="pei-ws" className={`${H2} text-navy [&_em]:text-brand`}>Suivez votre enfant, <em>jour après jour</em>.</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">Grâce à l&apos;application Web School, les parents et les élèves ont accès à un suivi complet et transparent.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={SITE.parentPortal} variant="navy" external>Espace parents</ButtonLink>
              <ButtonLink href={SITE.studentPortal} variant="line" external>Espace élèves</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="rounded-[28px] bg-[#f4f8fb] p-3.5 shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)]" >
            <div aria-label="Aperçu de l'application Web School">
              <div aria-hidden className="flex items-center gap-1.5 px-2 pb-3.5 pt-1.5">
                <i className="size-[9px] rounded-full bg-[#cfdde6]" /><i className="size-[9px] rounded-full bg-[#cfdde6]" /><i className="size-[9px] rounded-full bg-[#cfdde6]" />
                <b className="ml-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#5d6f7c]">Web School</b>
              </div>
              <ul className="grid gap-2.5">
                {WEBSCHOOL.map(([Icon, t, d, tag]) => (
                  <li key={t} className="grid grid-cols-[46px_minmax(0,1fr)_auto] items-center gap-3.5 rounded-[18px] bg-white px-4 py-3.5 transition duration-300 hover:translate-x-1.5 hover:shadow-[0_18px_34px_-24px_rgba(11,51,70,.55),inset_3px_0_0_var(--color-brand)] max-sm:grid-cols-[46px_minmax(0,1fr)]">
                    <span className="grid size-[46px] place-items-center rounded-[14px] bg-[#eef6fb] text-brand"><Icon size={22} strokeWidth={1.8} aria-hidden /></span>
                    <div>
                      <h3 className="text-[15.5px] font-bold text-navy">{t}</h3>
                      <p className="mt-[3px] text-[13.5px] leading-[1.45] text-[#5d6f7c]">{d}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#eef6fb] px-2.5 py-[5px] text-xs font-bold text-navy max-sm:hidden">
                      <span aria-hidden className="size-1.5 rounded-full bg-brand" />{tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section aria-labelledby="pei-cta" className="bg-white px-4 pb-[72px] sm:pb-24">
        <Container>
          <Reveal className="relative grid items-center gap-8 overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_85%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] p-8 text-white sm:p-14 lg:grid-cols-[1.25fr_.75fr] lg:gap-x-14">
            <div>
              <h2 id="pei-cta" className={`${H2} text-white [&_em]:text-brand-light`}>Vous souhaitez en savoir plus <em>sur le cycle intermédiaire</em>&nbsp;?</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-white/75">Découvrez comment le PEI peut accompagner le développement académique et personnel de votre enfant pendant ces années essentielles.</p>
            </div>
            <div className="flex flex-col items-start gap-3 max-sm:items-stretch">
              <ButtonLink href={SITE.preRegistration} variant="solid" external className="sm:min-w-60">Pré-inscription</ButtonLink>
              <ButtonLink href="/contact-us" variant="ghost" className="sm:min-w-60">Contactez-nous</ButtonLink>
              <p className="mt-1.5 text-[14.5px] text-white/75">
                Ou appelez les admissions au{" "}
                <a href={SITE.phoneHref} className="font-bold text-white underline decoration-sun decoration-2 underline-offset-4">{SITE.phone}</a>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Faq />
    </>
  );
}

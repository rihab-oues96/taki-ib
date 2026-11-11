import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, BarChart3, Building2, FileText, Globe2, MessageCircle, Info, Play, Scale, TrendingUp } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { PeiPanels } from "@/components/pei/PeiPanels";
import { CoreList } from "@/components/pei/CoreList";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programme du diplôme de l'IB (DP)",
  description: "Le Programme du diplôme de l'IB à Taki Academy International School, Sousse : rigueur académique, tronc commun (TdC, mémoire, CAS) et un diplôme reconnu dans plus de 140 pays.",
};

const STATS = [
  { n: "4", u: "piliers", l: "Pour un développement complet" },
  { n: "NM", mid: "·", u2: "NS", l: "Deux niveaux pour chaque matière" },
  { n: "1 → 7", l: "L'échelle des notes finales" },
  { n: "140", u: "+ pays", l: "reconnaissent le diplôme" },
];

const PANELS = [
  { img: "/media/about/library.jpg", side: "Compréhension intellectuelle", title: "Compréhension intellectuelle", text: "Développer une pensée critique et analytique approfondie." },
  { img: "/media/about/clubs.jpg", side: "Perspectives internationales", title: "Perspectives internationales", text: "Cultiver une vision globale et interculturelle du monde." },
  { img: "/media/about/classes.jpg", side: "Rigueur académique", title: "Rigueur académique", text: "Maintenir des standards d'excellence et d'exigence." },
  { img: "/media/about/multimedia.jpg", side: "Autonomie", title: "Autonomie et responsabilité", text: "Former des apprenants indépendants et engagés." },
];

const GROUPS = ["Langue et littérature", "Acquisition de langues", "Individus et sociétés", "Sciences", "Mathématiques", "Arts"];

const WEBSCHOOL = [
  [TrendingUp, "Avancement scolaire", "Suivi en temps réel de la progression académique.", "En temps réel"],
  [BarChart3, "Résultats", "Accès aux notes et aux évaluations détaillées.", "Détaillés"],
  [MessageCircle, "Observations des enseignants", "Commentaires personnalisés et retours pédagogiques.", "Personnalisés"],
  [Info, "Informations administratives", "Actualités, calendrier et communications de l'école.", "À jour"],
] as const;

const H2 = "text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] [&_em]:not-italic";
const LEAD = "mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]";

export default function DiplomaPage() {
  return (
    <>
      {/* Banner */}
      <section aria-labelledby="dp-title" className="bg-white px-4 pb-12 pt-28 text-center sm:pb-16 sm:pt-32">
        <Eyebrow>Programme du diplôme de l&apos;IB · DP</Eyebrow>
        <h1 id="dp-title" className="mx-auto max-w-[900px] text-[clamp(32px,4vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em] text-navy [&_em]:not-italic">
          La voie vers <em className="text-brand">l&apos;université,</em> partout dans le monde.
        </h1>
        <p className="mx-auto mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-[#5d6f7c]">
          Le Programme du diplôme de l&apos;IB prépare les élèves à l&apos;enseignement supérieur et les encourage à devenir des citoyens du monde responsables et engagés.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3 max-sm:flex-col">
          <ButtonLink href={SITE.preRegistration} variant="navy">Pré-inscription</ButtonLink>
          <ButtonLink href="/contact-us" variant="line">Contactez-nous</ButtonLink>
        </div>
        <p className="mt-[26px] inline-flex items-center gap-3 rounded-full bg-[#f4f8fb] py-2 pl-2.5 pr-4 text-sm text-[#5d6f7c] max-sm:flex-wrap max-sm:justify-center">
          <Image src="/brand/ib-dp.png" alt="Programme du diplôme de l'IB" width={137} height={30} className="h-[30px] w-auto" />
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
          <Reveal className="relative h-[clamp(280px,36vw,500px)] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)] max-sm:h-[300px] sm:rounded-[28px]">
            <Image src="/media/about/building.jpg" alt="Le bâtiment de TakiAcademy International School à Sahloul" fill priority sizes="1200px" className="object-cover [object-position:50%_30%]" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,51,70,0)_45%,rgba(11,51,70,.45))]" />
            <a
              href="https://www.ibo.org/fr/programmes/diploma-programme/"
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute left-1/2 top-[44%] z-[2] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3.5 rounded-full bg-white/95 py-2.5 pl-2.5 pr-6 text-[15.5px] font-bold text-navy shadow-[0_24px_50px_-20px_rgba(11,51,70,.6)] transition-colors hover:text-brand max-sm:top-[40%] max-sm:pr-[18px] max-sm:text-[14.5px]"
            >
              <i className="grid size-[52px] flex-none place-items-center rounded-full bg-linear-to-r from-brand to-brand-light text-white transition-transform group-hover:scale-[1.08]">
                <Play size={18} fill="currentColor" aria-hidden />
              </i>
              <span>
                Comprendre le DP en vidéo
                <small className="block text-[12.5px] font-medium text-[#5d6f7c]">Présentation officielle de l&apos;IB</small>
              </span>
            </a>
          </Reveal>
          <Reveal className="relative z-[2] -mt-10 grid grid-cols-2 rounded-[22px] bg-white shadow-[0_30px_60px_-36px_rgba(11,51,70,.45)] max-sm:mx-2 sm:-mt-12 sm:mx-2 lg:-mt-[60px] lg:mx-10 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className={`px-4 py-[18px] sm:px-7 sm:py-6 ${i % 2 === 1 ? "border-l border-[#e3ebf0]" : ""} ${i >= 2 ? "border-t border-[#e3ebf0] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="block text-[clamp(26px,2.6vw,36px)] font-bold leading-none tracking-[-0.035em] text-navy">
                  {s.n}
                  {s.mid && <small className="mx-1.5 text-[.55em] font-semibold text-brand">{s.mid}</small>}
                  {s.u2}
                  {s.u && <small className="ml-1.5 text-[.55em] font-semibold tracking-[-0.01em] text-brand">{s.u}</small>}
                </span>
                <span className="mt-2 block text-sm leading-[1.4] text-[#5d6f7c]">{s.l}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Four pillars */}
      <section aria-labelledby="dp-pillars" className="bg-[#114f6e] px-4 pb-[68px] pt-14 text-white max-md:pb-[52px] max-md:pt-12">
        <Container>
          <Reveal className="mb-7 grid items-end gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-x-[72px]">
            <div>
              <Eyebrow light>Quatre piliers</Eyebrow>
              <h2 id="dp-pillars" className="text-[clamp(30px,3.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em] [&_em]:not-italic">
                Construit sur <em className="text-brand-light">quatre piliers</em>.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-white/80">
              Le Programme du diplôme offre une formation académique rigoureuse qui prépare les élèves à participer activement à une société mondiale en constante évolution.
            </p>
          </Reveal>
          <PeiPanels panels={PANELS} />
        </Container>
      </section>

      {/* Structure */}
      <section aria-labelledby="dp-structure" className="overflow-hidden bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>Structure du programme</Eyebrow>
            <h2 id="dp-structure" className={`${H2} text-navy [&_em]:text-brand`}>Choisissez vos matières, <em>à votre niveau</em>.</h2>
            <p className={LEAD}>
              Les élèves choisissent des matières issues de différents groupes disciplinaires, pour une formation équilibrée et complète qui favorise l&apos;approfondissement tout en gardant l&apos;interdisciplinarité.
            </p>
            <div className="mt-[30px] grid grid-cols-2 gap-3">
              {[
                ["NM", "Niveau moyen", "Une formation équilibrée couvrant l'essentiel des disciplines."],
                ["NS", "Niveau supérieur", "Un approfondissement académique pour les matières de spécialisation."],
              ].map(([a, t, d]) => (
                <div key={a} className="rounded-[20px] bg-white px-[22px] pb-6 pt-[22px] shadow-[0_24px_50px_-40px_rgba(11,51,70,.5)]">
                  <b className="inline-block text-[34px] font-bold leading-none tracking-[-0.04em] text-navy shadow-[inset_0_-6px_0_rgba(246,194,28,.55)]">{a}</b>
                  <h3 className="mt-3.5 text-[17px] font-bold text-navy">{t}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#5d6f7c]">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-[28px] bg-white px-6 pb-7 pt-[30px] shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)] sm:px-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#5d6f7c]">Six groupes de matières</p>
            <ol className="mt-3.5">
              {GROUPS.map((g, i) => (
                <li key={g} className="flex items-baseline gap-[18px] border-b border-[#e3ebf0] py-[15px] text-[clamp(19px,1.7vw,23px)] font-semibold tracking-[-0.015em] text-navy transition-[color,padding] duration-300 hover:pl-2 hover:text-brand">
                  <span className="text-[13px] font-bold tracking-[0.06em] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {g}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[15.5px] font-semibold text-navy">
              <b className="rounded-full bg-sun px-3 py-1.5 text-[13px] font-extrabold">+ Le tronc commun</b>TdC · Mémoire · CAS
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Core */}
      <section aria-labelledby="dp-core" className="bg-white px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>Le tronc commun</Eyebrow>
            <h2 id="dp-core" className={`${H2} text-navy [&_em]:text-brand`}>Trois composantes, <em>au cœur du diplôme</em>.</h2>
            <p className={LEAD}>Au centre du Programme du diplôme, le tronc commun relie toutes les matières et forme l&apos;élève au-delà de la salle de classe.</p>
          </Reveal>
          <Reveal><CoreList /></Reveal>
        </Container>
      </section>

      {/* Assessment */}
      <section aria-labelledby="dp-eval" className="bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>Évaluation</Eyebrow>
            <h2 id="dp-eval" className={`${H2} text-navy [&_em]:text-brand`}>Équitable, externe, <em>comparable à l&apos;international</em>.</h2>
            <ul className="mt-7 grid gap-3">
              {[
                [FileText, "Examens écrits externes de l'IB", "Des évaluations standardisées, notées par des examinateurs internationaux."],
                [Scale, "Évaluations internes modérées", "Des travaux évalués par les enseignants et modérés par l'IB pour garantir l'équité."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof FileText;
                return (
                  <li key={t as string} className="grid grid-cols-[46px_1fr] items-start gap-4 rounded-[18px] bg-white px-5 py-[18px] shadow-[0_20px_40px_-36px_rgba(11,51,70,.5)]">
                    <span className="grid size-[46px] place-items-center rounded-[14px] bg-[#eef6fb] text-brand"><I size={22} strokeWidth={1.8} aria-hidden /></span>
                    <div>
                      <h3 className="mt-0.5 text-[16.5px] font-bold text-navy">{t as string}</h3>
                      <p className="mt-1 text-[14.5px] leading-[1.5] text-[#5d6f7c]">{d as string}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal className="rounded-[28px] bg-white px-5 pb-5 pt-6 shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)] sm:px-8 sm:pb-[26px] sm:pt-[30px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#5d6f7c]">Notes finales</p>
            <div role="img" aria-label="Échelle de notation de 1 à 7" className="mt-[18px] flex items-baseline justify-between gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
                <span
                  key={n}
                  className={`text-[clamp(34px,4.6vw,64px)] font-bold leading-none tracking-[-0.04em] text-navy ${n === 7 ? "rounded-[18px] bg-sun px-[clamp(8px,1.4vw,18px)] pb-2 pt-1" : ""}`}
                  style={{ opacity: n === 7 ? 1 : 0.18 + i * 0.11 }}
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="mt-[22px] flex flex-wrap justify-between gap-3 border-t border-[#e3ebf0] pt-4 text-sm text-[#5d6f7c]">
              <span>De 1 à 7, chaque note reflète le niveau de maîtrise de l&apos;élève.</span>
              <b className="text-navy">7 = le plus élevé</b>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Recognition */}
      <section aria-labelledby="dp-recognition" className="bg-[radial-gradient(120%_120%_at_15%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-4 py-[72px] text-white sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-20">
          <Reveal>
            <p className="bg-linear-to-b from-white from-30% to-brand-light bg-clip-text text-[clamp(96px,13vw,180px)] font-bold leading-[0.9] tracking-[-0.06em] text-transparent">140+</p>
            <p className="mt-3.5 max-w-[340px] text-lg leading-[1.45] text-white/80">pays où les universités les plus prestigieuses reconnaissent le diplôme de l&apos;IB.</p>
          </Reveal>
          <Reveal>
            <Eyebrow light>Équivalences et reconnaissance</Eyebrow>
            <h2 id="dp-recognition" className={`${H2} text-white [&_em]:text-brand-light`}>Un diplôme qui <em>ouvre des portes</em>.</h2>
            <div className="mt-7 grid gap-3">
              {[
                [Globe2, "Reconnaissance internationale", "Le diplôme de l'IB est reconnu par les universités les plus prestigieuses dans plus de 140 pays."],
                [Building2, "Accès universitaire", "Il garantit l'accès aux universités en Tunisie et à l'étranger, avec des équivalences reconnues au niveau national et international."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Globe2;
                return (
                  <div key={t as string} className="grid grid-cols-[46px_1fr] items-start gap-4 rounded-[18px] bg-white/[0.06] px-5 py-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]">
                    <span className="grid size-[46px] place-items-center rounded-[14px] bg-brand-light/15 text-brand-light"><I size={22} strokeWidth={1.8} aria-hidden /></span>
                    <div>
                      <h3 className="mt-0.5 text-[17px] font-bold">{t as string}</h3>
                      <p className="mt-1 text-[14.5px] leading-[1.5] text-white/70">{d as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-[26px] flex flex-wrap gap-x-7 gap-y-3">
              {[
                ["https://www.ibo.org/globalassets/new-structure/brochures-and-infographics/pdfs/dp-programme-brochure-fr.pdf", "Brochure officielle du DP (PDF)"],
                ["https://www.ibo.org/fr/school/062913/", "Notre accréditation sur ibo.org"],
              ].map(([href, label]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[14.5px] font-bold text-white transition-colors hover:text-brand-light">
                  {label}
                  <ArrowRight size={14} strokeWidth={2.6} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Web School */}
      <section aria-labelledby="dp-ws" className="bg-white px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>Suivi et accompagnement</Eyebrow>
            <h2 id="dp-ws" className={`${H2} text-navy [&_em]:text-brand`}>Un soutien <em>à chaque étape</em>.</h2>
            <p className={LEAD}>Grâce à l&apos;application Web School, les parents et les élèves ont accès à un suivi complet et transparent.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href={SITE.parentPortal} variant="navy" external>Espace parents</ButtonLink>
              <ButtonLink href={SITE.studentPortal} variant="line" external>Espace élèves</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="rounded-[28px] bg-[#f4f8fb] p-3.5 shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)]">
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
      <section aria-labelledby="dp-cta" className="bg-white px-4 pb-[72px] sm:pb-24">
        <Container>
          <Reveal className="relative grid items-center gap-8 overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_85%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] p-8 text-white sm:p-14 lg:grid-cols-[1.25fr_.75fr] lg:gap-x-14">
            <div>
              <h2 id="dp-cta" className={`${H2} text-white [&_em]:text-brand-light`}>Préparez dès aujourd&apos;hui <em>l&apos;avenir universitaire</em> de votre enfant.</h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-white/75">Rejoignez une communauté d&apos;apprenants internationaux et offrez à votre enfant les meilleures chances de réussite dans un monde globalisé.</p>
            </div>
            <div className="flex flex-col items-start gap-3 max-sm:items-stretch">
              <ButtonLink href={SITE.preRegistration} variant="solid" className="sm:min-w-60">Pré-inscription</ButtonLink>
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

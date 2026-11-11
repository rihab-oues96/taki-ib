import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Eyebrow, PageHero } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { VideoProvider } from "@/components/vie/VideoPlayer";
import { VieReel } from "@/components/vie/VieReel";
import { VieTabs } from "@/components/vie/VieTabs";
import { VieVideos } from "@/components/vie/VieVideos";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vie scolaire",
  description:
    "La vie à Taki Academy en images : vidéos, sorties scolaires, clubs, bibliothèque, droits et devoirs des élèves.",
};

const RIGHTS = [
  { t: "Ponctualité", d: "Être ponctuel, porter son uniforme et respecter le rang." },
  { t: "Politesse", d: "Être poli envers ses pairs et les adultes de l’école." },
  { t: "Non-violence", d: "Ne jamais recourir à la violence, verbale ou physique, pour résoudre un conflit." },
  { t: "Sécurité", d: "Éviter toute manipulation dangereuse pour soi-même ou pour les autres." },
  { t: "Calme et discipline", d: "Ne pas perturber le fonctionnement de la classe ou de l’école." },
];

const iconProps = { "aria-hidden": true, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24" } as const;
const SOCIALS: { name: string; href: string; handle: string; desc: string; icon: ReactNode }[] = [
  {
    name: "Instagram",
    href: SITE.social.instagram,
    handle: "@takiacademy.international",
    desc: "Photos et reels du quotidien",
    icon: (
      <svg width="26" height="26" {...iconProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: SITE.social.facebook,
    handle: "TakiAcademy.International",
    desc: "Actualités et événements",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14 2c-3.2 0-4 2.4-4 4v2.5H7.5V12H10v10h4V12h2.9l.4-3.5H14z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: SITE.social.youtube,
    handle: "@TakiAcademy.International",
    desc: "Toutes nos vidéos",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.5 4.6 12 4.6 12 4.6s-6.5 0-8.4.5A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8zM9.8 15.1V8.9l5.4 3.1-5.4 3.1z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: SITE.social.linkedin,
    handle: "TakiAcademy International School",
    desc: "La vie de l’établissement",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z" />
      </svg>
    ),
  },
];

const H2 = "text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy";

export default function ScholarLifePage() {
  return (
    <VideoProvider>
      <PageHero
        eyebrow="Vie scolaire"
        title={<>La vie à l’école, <em>en images</em>.</>}
        lead="À TakiAcademy, la vie scolaire s’appuie sur la communauté et l’inclusion. Elle intègre les valeurs de l’IB pour valoriser chaque élève et favoriser son engagement."
      >
        <ButtonLink href="#videos" variant="navy">Voir toutes nos vidéos</ButtonLink>
        <ButtonLink href={SITE.preRegistration} external variant="line">Pré-inscription</ButtonLink>
      </PageHero>

      <VieReel />

      <VieTabs />

      {/* Library */}
      <section aria-labelledby="libTitle" className="bg-[#f4f8fb] px-4 py-18 sm:py-24">
        <div className="mx-auto grid w-[min(1200px,100%)] items-center gap-10 lg:grid-cols-2 lg:gap-x-18">
          <Reveal>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)]">
              <Image
                src="/media/vie/library.jpg"
                alt="La bibliothèque de TakiAcademy International School"
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>La bibliothèque</Eyebrow>
            <h2 id="libTitle" className={H2}>
              Le cœur de l’apprentissage <em className="not-italic text-brand">au PEI</em>.
            </h2>
            <blockquote className="mt-7 border-l-4 border-sun pl-[26px]">
              <p className="text-[clamp(18px,1.6vw,21px)] font-medium leading-[1.55] text-navy">
                Une bibliothèque est conçue de manière à maximiser son efficacité&nbsp;: les bibliothèques sont des combinaisons de personnes,
                d’espaces, de collections et de services qui facilitent et renforcent l’enseignement et l’apprentissage.
              </p>
              <cite className="mt-3.5 block text-sm font-semibold not-italic text-[#5d6f7c]">Définition du Programme d’éducation intermédiaire</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Rights & duties */}
      <section aria-labelledby="ruTitle" className="bg-white px-4 py-18 sm:py-24">
        <div className="mx-auto w-[min(1200px,100%)]">
          <Reveal className="grid items-end gap-6 md:grid-cols-2 md:gap-x-20">
            <div>
              <Eyebrow>Droits et devoirs</Eyebrow>
              <h2 id="ruTitle" className={H2}>
                Cinq engagements, <em className="not-italic text-brand">une communauté</em>.
              </h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">
              Chaque élève a des droits qui garantissent son bien-être. En contrepartie, ses devoirs encouragent la discipline et le respect au sein de l’école.
            </p>
          </Reveal>
          <ol className="mt-12 grid border-t border-[#e3ebf0] max-[640px]:grid-cols-1 min-[641px]:grid-cols-3 min-[1101px]:grid-cols-5">
            {RIGHTS.map((r, i) => (
              <li
                key={r.t}
                className={`group py-6 pr-[22px] max-[640px]:grid max-[640px]:grid-cols-[56px_1fr] max-[640px]:gap-x-3 max-[640px]:border-b max-[640px]:border-[#e3ebf0] max-[640px]:py-5 max-[640px]:pr-0 ${
                  i > 0 ? "min-[1101px]:border-l min-[1101px]:border-[#e3ebf0] min-[1101px]:pl-[22px]" : ""
                } ${i === 3 ? "min-[641px]:max-[1100px]:pl-0" : i % 3 !== 0 ? "min-[641px]:max-[1100px]:border-l min-[641px]:max-[1100px]:border-[#e3ebf0] min-[641px]:max-[1100px]:pl-[22px]" : ""}`}
              >
                <span className="block text-[46px] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-brand-light)] transition group-hover:text-brand group-hover:[-webkit-text-stroke-color:var(--color-brand)] max-[640px]:row-span-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-[18px] text-lg font-bold tracking-[-0.01em] text-navy max-[640px]:mt-0.5">{r.t}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#5d6f7c]">{r.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <VieVideos />

      {/* Social */}
      <section aria-labelledby="soTitle" className="bg-white px-4 py-18 sm:py-24">
        <div className="mx-auto grid w-[min(1200px,100%)] items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-x-20">
          <Reveal>
            <Eyebrow>Suivez-nous</Eyebrow>
            <h2 id="soTitle" className={H2}>
              La vie de l’école, <em className="not-italic text-brand">au jour le jour</em>.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">Photos, reels et actualités&nbsp;: retrouvez chaque moment sur nos réseaux.</p>
          </Reveal>
          <Reveal delay={0.1} className="border-t border-[#e3ebf0]">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[52px_1fr_44px] items-center gap-x-5 gap-y-1 border-b border-[#e3ebf0] px-1 py-[22px] text-navy transition-[padding,color] duration-500 hover:pl-3.5 hover:text-brand focus-visible:rounded-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun sm:grid-cols-[52px_1fr_1fr_48px]"
              >
                <span className="grid size-[52px] place-items-center rounded-2xl bg-[#eef6fb] text-brand transition group-hover:bg-brand group-hover:text-white max-sm:row-span-2">
                  {s.icon}
                </span>
                <span className="text-[clamp(24px,2.4vw,34px)] font-semibold tracking-[-0.03em]">{s.name}</span>
                <span className="min-w-0 text-[13.5px] leading-[1.45] text-[#5d6f7c] max-sm:col-start-2 max-sm:row-start-2">
                  <b className="block truncate text-[14.5px] font-bold text-navy">{s.handle}</b>
                  {s.desc}
                </span>
                <span
                  aria-hidden
                  className="grid size-11 place-items-center rounded-full text-navy shadow-[inset_0_0_0_1px_#cfdde6] transition duration-500 group-hover:-rotate-45 group-hover:bg-brand group-hover:text-white group-hover:shadow-none max-sm:col-start-3 max-sm:row-span-2 max-sm:row-start-1"
                >
                  <ArrowRight size={14} strokeWidth={2.6} />
                </span>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <Faq />
    </VideoProvider>
  );
}

import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, Eyebrow, PageHero } from "@/components/ui";
import { MissionTabs } from "@/components/mission/MissionTabs";
import { ValuesCard } from "@/components/mission/ValuesCard";
import { LearnerProfile } from "@/components/mission/LearnerProfile";
import { Documents } from "@/components/mission/Documents";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Notre mission",
  description: "La mission de l'IB, de Taki Academy et du Programme d'éducation intermédiaire : des apprenants curieux, bienveillants et ouverts sur le monde.",
};

export default function MissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Notre mission"
        title={<>Éduquer l’enfant dans sa globalité, pour <em>le monde entier</em>.</>}
        lead="Notre engagement est simple : une éducation rigoureuse, humaine et ouverte sur le monde, dans le cadre du Baccalauréat International."
      >
        <ButtonLink href="/middle-education-program">Découvrir notre programme</ButtonLink>
        <ButtonLink href={SITE.preRegistration} variant="line">
          Pré-inscription
        </ButtonLink>
      </PageHero>

      {/* Nos missions — tab switcher */}
      <section id="missions" aria-labelledby="tbTitle" className="bg-white px-0 pt-6 pb-26">
        <Container>
          <Reveal className="text-center">
            <Eyebrow>Nos missions</Eyebrow>
            <h2
              id="tbTitle"
              className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
            >
              Deux missions,<em className="not-italic text-brand">une même ambition</em>.
            </h2>
          </Reveal>
          <MissionTabs />
        </Container>
      </section>

      {/* Nos valeurs */}
      <section aria-labelledby="vlTitle" className="bg-[#f4f8fb] py-18 sm:py-24">
        <Container className="grid items-center gap-7 min-[1001px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] min-[1001px]:gap-x-[72px] min-[1001px]:gap-y-10">
          <Reveal>
            <Eyebrow>Nos valeurs</Eyebrow>
            <h2
              id="vlTitle"
              className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
            >
              Quatre valeurs qui façonnent <em className="not-italic text-brand">chaque jour</em>.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">
              Elles guident notre enseignement, la vie de l’école et la façon dont chaque élève grandit.
            </p>
          </Reveal>
          <Reveal>
            <ValuesCard />
          </Reveal>
        </Container>
      </section>

      <LearnerProfile />
      <Documents />

      {/* Existing FAQ, intentionally untouched */}
      <Faq />
    </>
  );
}

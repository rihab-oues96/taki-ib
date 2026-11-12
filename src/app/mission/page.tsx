import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Container, Eyebrow, PageHero } from "@/components/ui";
import { MissionTabs } from "@/components/mission/MissionTabs";
import { ValuesCard } from "@/components/mission/ValuesCard";
import { LearnerProfile } from "@/components/mission/LearnerProfile";
import { Documents } from "@/components/mission/Documents";
import { getPage } from "@/lib/cms";
import type { MissionContent } from "@/lib/content/mission";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<MissionContent>("mission");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function MissionPage() {
  const c = await getPage<MissionContent>("mission");
  return (
    <>
      {c.hero && (
        <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title)} lead={c.hero.lead}>
          <ButtonLink href={c.hero.primaryCta.href}>{c.hero.primaryCta.label}</ButtonLink>
          <ButtonLink href={c.hero.secondaryCta.href} variant="line">
            {c.hero.secondaryCta.label}
          </ButtonLink>
        </PageHero>
      )}

      {/* Nos missions — tab switcher */}
      {c.missions && (
        <section id="missions" aria-labelledby="tbTitle" className="bg-white px-0 pt-6 pb-26">
          <Container>
            <Reveal className="text-center">
              <Eyebrow>{c.missions.eyebrow}</Eyebrow>
              <h2
                id="tbTitle"
                className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
              >
                {rich(c.missions.title, "not-italic text-brand")}
              </h2>
            </Reveal>
            <MissionTabs content={c.missions} />
          </Container>
        </section>
      )}

      {/* Nos valeurs */}
      {c.values && (
        <section aria-labelledby="vlTitle" className="bg-[#f4f8fb] py-18 sm:py-24">
          <Container className="grid items-center gap-7 min-[1001px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] min-[1001px]:gap-x-[72px] min-[1001px]:gap-y-10">
            <Reveal>
              <Eyebrow>{c.values.eyebrow}</Eyebrow>
              <h2
                id="vlTitle"
                className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
              >
                {rich(c.values.title, "not-italic text-brand")}
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">{c.values.text}</p>
            </Reveal>
            <Reveal>
              <ValuesCard content={c.values} />
            </Reveal>
          </Container>
        </section>
      )}

      {c.learnerProfile && <LearnerProfile content={c.learnerProfile} />}
      {c.documents && <Documents content={c.documents} />}

      {/* Existing FAQ, intentionally untouched */}
      <Faq />
    </>
  );
}

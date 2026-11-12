import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { plain, rich } from "@/components/Rich";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { PeiPanels } from "@/components/pei/PeiPanels";
import { LearnerProfileExplorer } from "@/components/pei/LearnerProfileExplorer";
import { Banner, FinalCta, H2, WebSchool } from "@/components/pei/ProgrammeBlocks";
import { programmeIcon } from "@/components/pei/icons";
import { getPage, getSite } from "@/lib/cms";
import type { PeiContent } from "@/lib/content/programmes";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<PeiContent>("pei");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function PeiPage() {
  const [c, site] = await Promise.all([getPage<PeiContent>("pei"), getSite()]);
  return (
    <>
      {c.banner && <Banner id="pei" content={c.banner} site={site} />}

      {/* Key figures */}
      {c.figures && (
      <section aria-label={c.figures.ariaLabel} className="bg-white px-4 pb-[72px] sm:pb-24">
        <Container>
          <Reveal className="relative h-[clamp(280px,36vw,500px)] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)] sm:rounded-[28px] max-sm:h-[300px]">
            <Image src={c.figures.image} alt={plain(c.figures.alt)} fill priority sizes="1200px" className="object-cover [object-position:50%_18%]" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,51,70,0)_45%,rgba(11,51,70,.45))]" />
          </Reveal>
          <Reveal className="relative z-[2] -mt-10 grid grid-cols-2 rounded-[22px] bg-white shadow-[0_30px_60px_-36px_rgba(11,51,70,.45)] sm:-mt-12 sm:mx-2 lg:-mt-[60px] lg:mx-10 lg:grid-cols-4 max-sm:mx-2">
            {c.figures.stats.map((s, i) => (
              <div
                key={i}
                className={`px-4 py-[18px] sm:px-7 sm:py-6 ${i % 2 === 1 ? "border-l border-[#e3ebf0]" : ""} ${i >= 2 ? "border-t border-[#e3ebf0] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="block text-[clamp(26px,2.6vw,36px)] font-bold leading-none tracking-[-0.035em] text-navy">
                  {s.value}
                  {s.unit && <small className="ml-1.5 text-[.55em] font-semibold tracking-[-0.01em] text-brand">{s.unit}</small>}
                </span>
                <span className="mt-2 block text-sm leading-[1.4] text-[#5d6f7c]">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      )}

      {/* Our programme: image panels */}
      {c.programme && (
      <section aria-labelledby="pei-why" className="relative overflow-hidden bg-[#114f6e] px-4 pb-[68px] pt-14 text-white max-md:pb-[52px] max-md:pt-12">
        <Container className="relative">
          <Reveal className="relative z-[1] mb-7 grid items-end gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-x-[72px]">
            <div>
              <Eyebrow light>{c.programme.eyebrow}</Eyebrow>
              <h2 id="pei-why" className="text-[clamp(30px,3.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em] [&_em]:not-italic">
                {rich(c.programme.title, "text-brand-light")}
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-white/80">
              {c.programme.text}
            </p>
          </Reveal>
          <PeiPanels panels={c.programme.panels} />
        </Container>
      </section>
      )}

      {/* Timeline */}
      {c.years && (
      <section aria-labelledby="pei-years" className="bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container>
          <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>{c.years.eyebrow}</Eyebrow>
              <h2 id="pei-years" className={`${H2} text-navy [&_em]:text-brand`}>{rich(c.years.title)}</h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">
              {c.years.text}
            </p>
          </Reveal>

          <Reveal className="relative mt-14">
            <div aria-hidden className="absolute inset-x-[10%] top-[34px] h-1 rounded bg-[#dbe8f0] max-sm:hidden">
              <span className="absolute inset-0 rounded bg-linear-to-r from-brand to-brand-light" />
            </div>
            <ol className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-5">
              {c.years.years.map((year, i, all) => {
                const last = i === all.length - 1;
                return (
                  <li key={i} className="text-center">
                    <span className={`mx-auto grid size-[72px] place-items-center rounded-full text-[15px] font-bold ${last ? "bg-sun text-navy shadow-[0_0_0_7px_rgba(246,194,28,.25)]" : "bg-navy text-white shadow-[0_0_0_7px_rgba(47,165,222,.18)]"}`}>
                      {i + 1}
                    </span>
                    <span className="mt-4 block text-[17px] font-bold text-navy">{year.name}</span>
                    <span className="mt-0.5 block text-sm text-[#5d6f7c]">{year.detail}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {c.years.cards.map((card, i) => {
              const I = programmeIcon(card.icon);
              return (
                <Reveal key={i} delay={i * 0.07} className="grid grid-cols-[48px_1fr] items-start gap-4 rounded-[22px] bg-white px-[26px] py-6 shadow-[0_24px_50px_-40px_rgba(11,51,70,.5)]">
                  <span className="grid size-12 place-items-center rounded-[14px] bg-[#eef6fb] text-brand"><I size={22} strokeWidth={1.8} aria-hidden /></span>
                  <div>
                    <h3 className="mt-0.5 text-lg font-bold tracking-[-0.01em] text-navy">{card.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-[1.55] text-[#5d6f7c]">{card.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      )}

      {/* What the MYP develops */}
      {c.develops && (
      <section aria-labelledby="pei-develops" className="bg-[radial-gradient(120%_120%_at_85%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-4 py-[72px] text-white sm:py-24">
        <Container>
          <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow light>{c.develops.eyebrow}</Eyebrow>
              <h2 id="pei-develops" className={`${H2} text-white [&_em]:text-brand-light`}>{rich(c.develops.title)}</h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-white/70">{c.develops.text}</p>
          </Reveal>
          <ul className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.develops.items.map((item, i) => {
              const Icon = programmeIcon(item.icon);
              return (
              <Reveal key={i} delay={i * 0.06}>
                <li className="group h-full rounded-[20px] bg-white/[0.06] px-5 pb-6 pt-[22px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)] transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:text-navy hover:shadow-[0_26px_50px_-26px_rgba(0,0,0,.6)]">
                  <span className="grid size-[46px] place-items-center rounded-[14px] bg-brand-light/15 text-brand-light transition-colors group-hover:bg-brand group-hover:text-white"><Icon size={22} strokeWidth={1.8} aria-hidden /></span>
                  <h3 className="mt-[18px] text-[17px] font-bold leading-[1.3] tracking-[-0.01em]">{item.title}</h3>
                </li>
              </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>
      )}

      {/* Subject groups */}
      {c.subjects && (
      <section aria-labelledby="pei-subjects" className="bg-white px-4 py-[72px] sm:py-24">
        <Container>
          <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-20">
            <div>
              <Eyebrow>{c.subjects.eyebrow}</Eyebrow>
              <h2 id="pei-subjects" className={`${H2} text-navy [&_em]:text-brand`}>{rich(c.subjects.title)}</h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">{c.subjects.text}</p>
          </Reveal>
          <ul className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.subjects.items.map((item, i) => {
              const Icon = programmeIcon(item.icon);
              return (
              <Reveal key={i} delay={i * 0.06}>
                <li className="group relative h-full rounded-[22px] bg-[#f4f8fb] p-[24px_22px] transition duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_30px_60px_-36px_rgba(11,51,70,.5),inset_0_0_0_1.5px_var(--color-brand)]">
                  <span className="absolute right-[22px] top-[22px] text-[13px] font-bold tracking-[0.06em] text-[#9fb3c0]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-[52px] place-items-center rounded-2xl bg-white text-brand shadow-[0_10px_24px_-14px_rgba(11,51,70,.35)] transition-colors group-hover:bg-brand group-hover:text-white"><Icon size={24} strokeWidth={1.8} aria-hidden /></span>
                  <h3 className="mt-[18px] text-lg font-bold leading-[1.25] tracking-[-0.01em] text-navy">{item.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.55] text-[#5d6f7c]">{item.text}</p>
                </li>
              </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>
      )}

      {/* Learner profile */}
      {c.profile && (
      <section id="profil" aria-labelledby="pei-profile" className="bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>{c.profile.eyebrow}</Eyebrow>
            <h2 id="pei-profile" className={`${H2} text-navy [&_em]:text-brand`}>{rich(c.profile.title)}</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">
              {c.profile.text}
            </p>
            <div className="mt-7">
              <ButtonLink href={c.profile.cta.href} variant="navy" external>
                <Download size={16} strokeWidth={2.4} aria-hidden />{c.profile.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal><LearnerProfileExplorer label={c.profile.groupLabel} qualities={c.profile.qualities} /></Reveal>
        </Container>
      </section>
      )}

      {c.webSchool && <WebSchool id="pei" content={c.webSchool} site={site} />}

      {c.cta && <FinalCta id="pei" content={c.cta} site={site} />}

      <Faq />
    </>
  );
}

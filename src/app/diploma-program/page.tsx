import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { plain, rich } from "@/components/Rich";
import { Container, Eyebrow } from "@/components/ui";
import { PeiPanels } from "@/components/pei/PeiPanels";
import { CoreList } from "@/components/pei/CoreList";
import { Banner, FinalCta, H2, LEAD, WebSchool } from "@/components/pei/ProgrammeBlocks";
import { programmeIcon } from "@/components/pei/icons";
import { getPage, getSite } from "@/lib/cms";
import type { DpContent } from "@/lib/content/programmes";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<DpContent>("dp");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function DiplomaPage() {
  const [c, site] = await Promise.all([getPage<DpContent>("dp"), getSite()]);
  return (
    <>
      {c.banner && <Banner id="dp" content={c.banner} site={site} />}

      {/* Key figures */}
      {c.figures && (
      <section aria-label={c.figures.ariaLabel} className="bg-white px-4 pb-[72px] sm:pb-24">
        <Container>
          <Reveal className="relative h-[clamp(280px,36vw,500px)] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)] max-sm:h-[300px] sm:rounded-[28px]">
            <Image src={c.figures.image} alt={plain(c.figures.alt)} fill priority sizes="1200px" className="object-cover [object-position:50%_30%]" />
            <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,51,70,0)_45%,rgba(11,51,70,.45))]" />
            <a
              href={c.figures.video.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute left-1/2 top-[44%] z-[2] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3.5 rounded-full bg-white/95 py-2.5 pl-2.5 pr-6 text-[15.5px] font-bold text-navy shadow-[0_24px_50px_-20px_rgba(11,51,70,.6)] transition-colors hover:text-brand max-sm:top-[40%] max-sm:pr-[18px] max-sm:text-[14.5px]"
            >
              <i className="grid size-[52px] flex-none place-items-center rounded-full bg-linear-to-r from-brand to-brand-light text-white transition-transform group-hover:scale-[1.08]">
                <Play size={18} fill="currentColor" aria-hidden />
              </i>
              <span>
                {c.figures.video.label}
                <small className="block text-[12.5px] font-medium text-[#5d6f7c]">{c.figures.video.caption}</small>
              </span>
            </a>
          </Reveal>
          <Reveal className="relative z-[2] -mt-10 grid grid-cols-2 rounded-[22px] bg-white shadow-[0_30px_60px_-36px_rgba(11,51,70,.45)] max-sm:mx-2 sm:-mt-12 sm:mx-2 lg:-mt-[60px] lg:mx-10 lg:grid-cols-4">
            {c.figures.stats.map((s, i) => (
              <div
                key={i}
                className={`px-4 py-[18px] sm:px-7 sm:py-6 ${i % 2 === 1 ? "border-l border-[#e3ebf0]" : ""} ${i >= 2 ? "border-t border-[#e3ebf0] lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="block text-[clamp(26px,2.6vw,36px)] font-bold leading-none tracking-[-0.035em] text-navy">
                  {s.value}
                  {s.separator && <small className="mx-1.5 text-[.55em] font-semibold text-brand">{s.separator}</small>}
                  {s.value2}
                  {s.unit && <small className="ml-1.5 text-[.55em] font-semibold tracking-[-0.01em] text-brand">{s.unit}</small>}
                </span>
                <span className="mt-2 block text-sm leading-[1.4] text-[#5d6f7c]">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>
      )}

      {/* Four pillars */}
      {c.pillars && (
      <section aria-labelledby="dp-pillars" className="bg-[#114f6e] px-4 pb-[68px] pt-14 text-white max-md:pb-[52px] max-md:pt-12">
        <Container>
          <Reveal className="mb-7 grid items-end gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-x-[72px]">
            <div>
              <Eyebrow light>{c.pillars.eyebrow}</Eyebrow>
              <h2 id="dp-pillars" className="text-[clamp(30px,3.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em] [&_em]:not-italic">
                {rich(c.pillars.title, "text-brand-light")}
              </h2>
            </div>
            <p className="text-[17px] leading-[1.65] text-white/80">
              {c.pillars.text}
            </p>
          </Reveal>
          <PeiPanels panels={c.pillars.panels} />
        </Container>
      </section>
      )}

      {/* Structure */}
      {c.structure && (
      <section aria-labelledby="dp-structure" className="overflow-hidden bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>{c.structure.eyebrow}</Eyebrow>
            <h2 id="dp-structure" className={`${H2} text-navy [&_em]:text-brand`}>{rich(c.structure.title)}</h2>
            <p className={LEAD}>
              {c.structure.text}
            </p>
            <div className="mt-[30px] grid grid-cols-2 gap-3">
              {c.structure.levels.map((level, i) => (
                <div key={i} className="rounded-[20px] bg-white px-[22px] pb-6 pt-[22px] shadow-[0_24px_50px_-40px_rgba(11,51,70,.5)]">
                  <b className="inline-block text-[34px] font-bold leading-none tracking-[-0.04em] text-navy shadow-[inset_0_-6px_0_rgba(246,194,28,.55)]">{level.code}</b>
                  <h3 className="mt-3.5 text-[17px] font-bold text-navy">{level.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#5d6f7c]">{level.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="rounded-[28px] bg-white px-6 pb-7 pt-[30px] shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)] sm:px-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#5d6f7c]">{c.structure.groupsLabel}</p>
            <ol className="mt-3.5">
              {c.structure.groups.map((g, i) => (
                <li key={i} className="flex items-baseline gap-[18px] border-b border-[#e3ebf0] py-[15px] text-[clamp(19px,1.7vw,23px)] font-semibold tracking-[-0.015em] text-navy transition-[color,padding] duration-300 hover:pl-2 hover:text-brand">
                  <span className="text-[13px] font-bold tracking-[0.06em] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {g}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[15.5px] font-semibold text-navy">
              <b className="rounded-full bg-sun px-3 py-1.5 text-[13px] font-extrabold">{c.structure.coreBadge}</b>{c.structure.coreText}
            </p>
          </Reveal>
        </Container>
      </section>
      )}

      {/* Core */}
      {c.core && (
      <section aria-labelledby="dp-core" className="bg-white px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>{c.core.eyebrow}</Eyebrow>
            <h2 id="dp-core" className={`${H2} text-navy [&_em]:text-brand`}>{rich(c.core.title)}</h2>
            <p className={LEAD}>{c.core.text}</p>
          </Reveal>
          <Reveal><CoreList label={c.core.listLabel} items={c.core.items} /></Reveal>
        </Container>
      </section>
      )}

      {/* Assessment */}
      {c.evaluation && (
      <section aria-labelledby="dp-eval" className="bg-[#f4f8fb] px-4 py-[72px] sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[72px]">
          <Reveal>
            <Eyebrow>{c.evaluation.eyebrow}</Eyebrow>
            <h2 id="dp-eval" className={`${H2} text-navy [&_em]:text-brand`}>{rich(c.evaluation.title)}</h2>
            <ul className="mt-7 grid gap-3">
              {c.evaluation.items.map((item, i) => {
                const I = programmeIcon(item.icon);
                return (
                  <li key={i} className="grid grid-cols-[46px_1fr] items-start gap-4 rounded-[18px] bg-white px-5 py-[18px] shadow-[0_20px_40px_-36px_rgba(11,51,70,.5)]">
                    <span className="grid size-[46px] place-items-center rounded-[14px] bg-[#eef6fb] text-brand"><I size={22} strokeWidth={1.8} aria-hidden /></span>
                    <div>
                      <h3 className="mt-0.5 text-[16.5px] font-bold text-navy">{item.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-[1.5] text-[#5d6f7c]">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal className="rounded-[28px] bg-white px-5 pb-5 pt-6 shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)] sm:px-8 sm:pb-[26px] sm:pt-[30px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#5d6f7c]">{c.evaluation.scaleLabel}</p>
            <div role="img" aria-label={c.evaluation.scaleAriaLabel} className="mt-[18px] flex items-baseline justify-between gap-1">
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
              <span>{c.evaluation.scaleNote}</span>
              <b className="text-navy">{c.evaluation.scaleMax}</b>
            </p>
          </Reveal>
        </Container>
      </section>
      )}

      {/* Recognition */}
      {c.recognition && (
      <section aria-labelledby="dp-recognition" className="bg-[radial-gradient(120%_120%_at_15%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-4 py-[72px] text-white sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-x-20">
          <Reveal>
            <p className="bg-linear-to-b from-white from-30% to-brand-light bg-clip-text text-[clamp(96px,13vw,180px)] font-bold leading-[0.9] tracking-[-0.06em] text-transparent">{c.recognition.bigNumber}</p>
            <p className="mt-3.5 max-w-[340px] text-lg leading-[1.45] text-white/80">{c.recognition.bigText}</p>
          </Reveal>
          <Reveal>
            <Eyebrow light>{c.recognition.eyebrow}</Eyebrow>
            <h2 id="dp-recognition" className={`${H2} text-white [&_em]:text-brand-light`}>{rich(c.recognition.title)}</h2>
            <div className="mt-7 grid gap-3">
              {c.recognition.items.map((item, i) => {
                const I = programmeIcon(item.icon);
                return (
                  <div key={i} className="grid grid-cols-[46px_1fr] items-start gap-4 rounded-[18px] bg-white/[0.06] px-5 py-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)]">
                    <span className="grid size-[46px] place-items-center rounded-[14px] bg-brand-light/15 text-brand-light"><I size={22} strokeWidth={1.8} aria-hidden /></span>
                    <div>
                      <h3 className="mt-0.5 text-[17px] font-bold">{item.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-[1.5] text-white/70">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-[26px] flex flex-wrap gap-x-7 gap-y-3">
              {c.recognition.links.map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[14.5px] font-bold text-white transition-colors hover:text-brand-light">
                  {link.label}
                  <ArrowRight size={14} strokeWidth={2.6} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
      )}

      {c.webSchool && <WebSchool id="dp" content={c.webSchool} site={site} />}

      {c.cta && <FinalCta id="dp" content={c.cta} site={site} />}

      <Faq />
    </>
  );
}

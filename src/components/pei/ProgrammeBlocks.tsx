import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { plain, rich } from "@/components/Rich";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import type { SiteSettings } from "@/lib/content/global";
import type { ProgrammeBanner, ProgrammeCta, WebSchoolSection } from "@/lib/content/programmes";
import { programmeIcon } from "./icons";

/** Blocks shared by the PEI and DP pages. `id` prefixes the heading ids ("pei" or "dp"). */

export const H2 = "text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] [&_em]:not-italic";
export const LEAD = "mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]";

export function Banner({ id, content, site }: { id: string; content: ProgrammeBanner; site: SiteSettings }) {
  const { badge } = content;
  return (
    <section aria-labelledby={`${id}-title`} className="bg-white px-4 pb-12 pt-28 text-center sm:pb-16 sm:pt-32">
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <h1 id={`${id}-title`} className="mx-auto max-w-[900px] text-[clamp(32px,4vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em] text-navy [&_em]:not-italic">
        {rich(content.title, "text-brand")}
      </h1>
      <p className="mx-auto mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-[#5d6f7c]">{content.lead}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3 max-sm:flex-col">
        <ButtonLink href={site.preRegistration} variant="navy">{content.primaryCta.label}</ButtonLink>
        <ButtonLink href={content.secondaryCta.href} variant="line">{content.secondaryCta.label}</ButtonLink>
      </div>
      <p className="mt-[26px] inline-flex items-center gap-3 rounded-full bg-[#f4f8fb] py-2 pl-2.5 pr-4 text-sm text-[#5d6f7c] max-sm:flex-wrap max-sm:justify-center">
        <Image src={badge.image} alt={plain(badge.alt)} width={137} height={30} className="h-[30px] w-auto" />
        <span>{badge.text}{" "}
          <a href={badge.href} target="_blank" rel="noopener noreferrer" className="font-bold text-navy underline decoration-sun decoration-2 underline-offset-4 hover:text-brand">
            {badge.linkLabel}
          </a>
        </span>
      </p>
    </section>
  );
}

export function WebSchool({ id, content, site }: { id: string; content: WebSchoolSection; site: SiteSettings }) {
  return (
    <section aria-labelledby={`${id}-ws`} className="bg-white px-4 py-[72px] sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-[72px]">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 id={`${id}-ws`} className={`${H2} text-navy [&_em]:text-brand`}>{rich(content.title)}</h2>
          <p className={LEAD}>{content.text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={site.parentPortal} variant="navy" external>{content.parentLabel}</ButtonLink>
            <ButtonLink href={site.studentPortal} variant="line" external>{content.studentLabel}</ButtonLink>
          </div>
        </Reveal>
        <Reveal className="rounded-[28px] bg-[#f4f8fb] p-3.5 shadow-[0_40px_80px_-56px_rgba(11,51,70,.6)]">
          <div aria-label={content.previewLabel}>
            <div aria-hidden className="flex items-center gap-1.5 px-2 pb-3.5 pt-1.5">
              <i className="size-[9px] rounded-full bg-[#cfdde6]" /><i className="size-[9px] rounded-full bg-[#cfdde6]" /><i className="size-[9px] rounded-full bg-[#cfdde6]" />
              <b className="ml-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#5d6f7c]">{content.appName}</b>
            </div>
            <ul className="grid gap-2.5">
              {content.items.map((item, i) => {
                const Icon = programmeIcon(item.icon);
                return (
                  <li key={i} className="grid grid-cols-[46px_minmax(0,1fr)_auto] items-center gap-3.5 rounded-[18px] bg-white px-4 py-3.5 transition duration-300 hover:translate-x-1.5 hover:shadow-[0_18px_34px_-24px_rgba(11,51,70,.55),inset_3px_0_0_var(--color-brand)] max-sm:grid-cols-[46px_minmax(0,1fr)]">
                    <span className="grid size-[46px] place-items-center rounded-[14px] bg-[#eef6fb] text-brand"><Icon size={22} strokeWidth={1.8} aria-hidden /></span>
                    <div>
                      <h3 className="text-[15.5px] font-bold text-navy">{item.title}</h3>
                      <p className="mt-[3px] text-[13.5px] leading-[1.45] text-[#5d6f7c]">{item.text}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#eef6fb] px-2.5 py-[5px] text-xs font-bold text-navy max-sm:hidden">
                      <span aria-hidden className="size-1.5 rounded-full bg-brand" />{item.tag}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FinalCta({ id, content, site }: { id: string; content: ProgrammeCta; site: SiteSettings }) {
  return (
    <section aria-labelledby={`${id}-cta`} className="bg-white px-4 pb-[72px] sm:pb-24">
      <Container>
        <Reveal className="relative grid items-center gap-8 overflow-hidden rounded-[32px] bg-[radial-gradient(120%_140%_at_85%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] p-8 text-white sm:p-14 lg:grid-cols-[1.25fr_.75fr] lg:gap-x-14">
          <div>
            <h2 id={`${id}-cta`} className={`${H2} text-white [&_em]:text-brand-light`}>{rich(content.title)}</h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-white/75">{content.text}</p>
          </div>
          <div className="flex flex-col items-start gap-3 max-sm:items-stretch">
            <ButtonLink href={site.preRegistration} variant="solid" className="sm:min-w-60">{content.primaryLabel}</ButtonLink>
            <ButtonLink href={content.secondaryCta.href} variant="ghost" className="sm:min-w-60">{content.secondaryCta.label}</ButtonLink>
            <p className="mt-1.5 text-[14.5px] text-white/75">
              {content.phoneText}{" "}
              <a href={site.phoneHref} className="font-bold text-white underline decoration-sun decoration-2 underline-offset-4">{site.phone}</a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

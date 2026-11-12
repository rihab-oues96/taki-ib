import type { Metadata } from "next";
import { ArrowRight, Play } from "lucide-react";
import { ActualityGrid } from "@/components/ActualityGrid";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Eyebrow, PageHero } from "@/components/ui";
import { VideoProvider, VideoThumb } from "@/components/vie/VideoPlayer";
import { getEntries, getPage, getSite } from "@/lib/cms";
import type { ActualitesContent, NewsItem } from "@/lib/content/actualites";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<ActualitesContent>("actualites");
  return seo ? { title: seo.title, description: seo.description } : {};
}

export default async function ActualityPage() {
  const [c, news, site] = await Promise.all([getPage<ActualitesContent>("actualites"), getEntries<NewsItem>("news"), getSite()]);

  return (
    <VideoProvider>
      {c.hero && <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title)} lead={c.hero.lead} />}

      {/* À la une */}
      {c.featured && (
      <section aria-labelledby="ftTitle" className="bg-white px-4 pb-14 sm:pb-[72px]">
        <div className="mx-auto w-[min(1200px,100%)]">
          <Reveal>
            <article className="grid overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-50px_rgba(11,51,70,.55),0_0_0_1px_#e3ebf0] sm:rounded-[30px] lg:grid-cols-[1.15fr_1fr]">
              <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[420px]">
                <VideoThumb video={{ ...c.featured.video, cat: "events" }} sizes="(min-width:1024px) 650px, 100vw" className="absolute inset-0" />
                <span className="pointer-events-none absolute bottom-6 left-6 hidden items-center gap-3 rounded-full bg-white/95 py-2 pr-5 pl-2 text-[14.5px] font-bold text-navy sm:inline-flex">
                  <span className="grid size-10 place-items-center rounded-full bg-linear-to-r from-brand to-brand-light text-white">
                    <Play size={16} fill="currentColor" strokeWidth={0} aria-hidden />
                  </span>
                  {c.featured.playLabel}
                </span>
              </div>
              <div className="flex flex-col items-start justify-center px-[22px] pt-[26px] pb-7 sm:p-12">
                <p className="flex items-center gap-2.5 text-[13px] font-bold text-brand">
                  <span className="rounded-full bg-sun px-3 py-[5px] text-navy">{c.featured.badge}</span>{c.featured.category}
                </p>
                <h2 id="ftTitle" className="mt-4 text-[clamp(26px,2.6vw,38px)] font-semibold leading-[1.12] tracking-[-0.03em] text-navy">
                  {c.featured.title}
                </h2>
                <p className="mt-3.5 text-[16.5px] leading-[1.6] text-[#5d6f7c]">
                  {c.featured.text}
                </p>
                <ButtonLink href={c.featured.cta.href} variant="navy" className="mt-[26px]">
                  {c.featured.cta.label}
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
      )}

      {/* Toutes les actualités */}
      {c.grid && (
      <section aria-labelledby="nwTitle" className="bg-[#f4f8fb] px-4 py-16 sm:py-[88px] sm:pb-24">
        <div className="mx-auto w-[min(1200px,100%)]">
          <ActualityGrid items={news} content={c.grid} />
        </div>
      </section>
      )}

      {/* Suivez-nous */}
      {c.social && (
      <section aria-labelledby="soTitle" className="bg-white px-4 py-18 sm:py-24">
        <div className="mx-auto grid w-[min(1200px,100%)] items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-x-20">
          <Reveal>
            <Eyebrow>{c.social.eyebrow}</Eyebrow>
            <h2 id="soTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
              {rich(c.social.title, "not-italic text-brand")}
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">
              {c.social.lead}
            </p>
          </Reveal>
          <Reveal>
            <ul className="border-t border-[#e3ebf0]">
              {c.social.items.map((s) => (
                <li key={s.name}>
                  <a
                    href={site.social[s.network]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[1fr_44px] items-center gap-x-5 gap-y-1 border-b border-[#e3ebf0] px-1 py-5 text-navy transition-all duration-500 ease-out-expo hover:pl-3.5 hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_44px]"
                  >
                    <span className="text-[clamp(24px,2.4vw,34px)] font-semibold tracking-[-0.03em]">{s.name}</span>
                    <span className="order-3 col-span-1 text-[13.5px] leading-[1.45] text-[#5d6f7c] sm:order-none">
                      <b className="block truncate text-[14.5px] font-bold text-navy">{s.handle}</b>
                      {s.desc}
                    </span>
                    <span
                      aria-hidden
                      className="row-span-2 grid size-11 place-items-center rounded-full text-navy shadow-[inset_0_0_0_1px_#cfdde6] transition duration-300 group-hover:-rotate-45 group-hover:bg-brand group-hover:text-white group-hover:shadow-none sm:row-span-1"
                    >
                      <ArrowRight size={14} strokeWidth={2.6} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      )}
    </VideoProvider>
  );
}

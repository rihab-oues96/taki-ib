import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Eyebrow, PageHero } from "@/components/ui";
import { Faq } from "@/components/Faq";
import { SOCIAL_ICONS } from "@/components/vie/SocialIcons";
import { VideoProvider } from "@/components/vie/VideoPlayer";
import { VieReel } from "@/components/vie/VieReel";
import { VieTabs } from "@/components/vie/VieTabs";
import { VieVideos } from "@/components/vie/VieVideos";
import { getEntries, getPage, getSite } from "@/lib/cms";
import type { SchoolVideo } from "@/lib/content/videos";
import type { VieScolaireContent } from "@/lib/content/vie-scolaire";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<VieScolaireContent>("vie-scolaire");
  return seo ? { title: seo.title, description: seo.description } : {};
}

const EM = "not-italic text-brand";
const H2 = "text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy";

export default async function ScholarLifePage() {
  const [c, videos, site] = await Promise.all([
    getPage<VieScolaireContent>("vie-scolaire"),
    getEntries<SchoolVideo>("videos"),
    getSite(),
  ]);
  // Videos are referenced by YouTube id; ids that no longer exist in the library are skipped.
  const pick = (ids: string[]) => ids.flatMap((id) => videos.find((v) => v.id === id) ?? []);

  return (
    <VideoProvider>
      {c.hero && (
        <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title)} lead={c.hero.lead}>
          <ButtonLink href={c.hero.primaryCta.href} variant="navy">{c.hero.primaryCta.label}</ButtonLink>
          <ButtonLink href={c.hero.secondaryCta.href} variant="line">{c.hero.secondaryCta.label}</ButtonLink>
        </PageHero>
      )}

      {c.reel && <VieReel content={c.reel} videos={pick(c.reel.videoIds)} />}

      {c.tabs && <VieTabs content={c.tabs} tabs={c.tabs.tabs.map((t) => ({ ...t, videos: pick(t.videoIds) }))} />}

      {/* Library */}
      {c.library && (
      <section aria-labelledby="libTitle" className="bg-[#f4f8fb] px-4 py-18 sm:py-24">
        <div className="mx-auto grid w-[min(1200px,100%)] items-center gap-10 lg:grid-cols-2 lg:gap-x-18">
          <Reveal>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)]">
              <Image
                src={c.library.image}
                alt={c.library.alt}
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{c.library.eyebrow}</Eyebrow>
            <h2 id="libTitle" className={H2}>
              {rich(c.library.title, EM)}
            </h2>
            <blockquote className="mt-7 border-l-4 border-sun pl-[26px]">
              <p className="text-[clamp(18px,1.6vw,21px)] font-medium leading-[1.55] text-navy">
                {c.library.quote}
              </p>
              <cite className="mt-3.5 block text-sm font-semibold not-italic text-[#5d6f7c]">{c.library.cite}</cite>
            </blockquote>
          </Reveal>
        </div>
      </section>
      )}

      {/* Rights & duties */}
      {c.rights && (
      <section aria-labelledby="ruTitle" className="bg-white px-4 py-18 sm:py-24">
        <div className="mx-auto w-[min(1200px,100%)]">
          <Reveal className="grid items-end gap-6 md:grid-cols-2 md:gap-x-20">
            <div>
              <Eyebrow>{c.rights.eyebrow}</Eyebrow>
              <h2 id="ruTitle" className={H2}>
                {rich(c.rights.title, EM)}
              </h2>
            </div>
            <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">
              {c.rights.lead}
            </p>
          </Reveal>
          <ol className="mt-12 grid border-t border-[#e3ebf0] max-[640px]:grid-cols-1 min-[641px]:grid-cols-3 min-[1101px]:grid-cols-5">
            {c.rights.items.map((r, i) => (
              <li
                key={r.title}
                className={`group py-6 pr-[22px] max-[640px]:grid max-[640px]:grid-cols-[56px_1fr] max-[640px]:gap-x-3 max-[640px]:border-b max-[640px]:border-[#e3ebf0] max-[640px]:py-5 max-[640px]:pr-0 ${
                  i > 0 ? "min-[1101px]:border-l min-[1101px]:border-[#e3ebf0] min-[1101px]:pl-[22px]" : ""
                } ${i === 3 ? "min-[641px]:max-[1100px]:pl-0" : i % 3 !== 0 ? "min-[641px]:max-[1100px]:border-l min-[641px]:max-[1100px]:border-[#e3ebf0] min-[641px]:max-[1100px]:pl-[22px]" : ""}`}
              >
                <span className="block text-[46px] font-bold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-brand-light)] transition group-hover:text-brand group-hover:[-webkit-text-stroke-color:var(--color-brand)] max-[640px]:row-span-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-[18px] text-lg font-bold tracking-[-0.01em] text-navy max-[640px]:mt-0.5">{r.title}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55] text-[#5d6f7c]">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      )}

      {c.videos && <VieVideos content={c.videos} videos={videos} />}

      {/* Social */}
      {c.social && (
      <section aria-labelledby="soTitle" className="bg-white px-4 py-18 sm:py-24">
        <div className="mx-auto grid w-[min(1200px,100%)] items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-x-20">
          <Reveal>
            <Eyebrow>{c.social.eyebrow}</Eyebrow>
            <h2 id="soTitle" className={H2}>
              {rich(c.social.title, EM)}
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">{c.social.lead}</p>
          </Reveal>
          <Reveal delay={0.1} className="border-t border-[#e3ebf0]">
            {c.social.items.map((s) => (
              <a
                key={s.name}
                href={site.social[s.network]}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[52px_1fr_44px] items-center gap-x-5 gap-y-1 border-b border-[#e3ebf0] px-1 py-[22px] text-navy transition-[padding,color] duration-500 hover:pl-3.5 hover:text-brand focus-visible:rounded-lg focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun sm:grid-cols-[52px_1fr_1fr_48px]"
              >
                <span className="grid size-[52px] place-items-center rounded-2xl bg-[#eef6fb] text-brand transition group-hover:bg-brand group-hover:text-white max-sm:row-span-2">
                  {SOCIAL_ICONS[s.network]}
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
      )}

      <Faq />
    </VideoProvider>
  );
}

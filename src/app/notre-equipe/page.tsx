import type { Metadata } from "next";
import Image from "next/image";
import { User } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { VideoProvider, VideoThumb } from "@/components/vie/VideoPlayer";
import { ButtonLink, Container, Eyebrow, PageHero } from "@/components/ui";
import { rich } from "@/components/Rich";
import { getEntries, getPage } from "@/lib/cms";
import type { EquipeContent, TeamLevel, TeamMember } from "@/lib/content/equipe";
import type { SchoolVideo } from "@/lib/content/videos";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<EquipeContent>("equipe");
  return seo ? { title: seo.title, description: seo.description } : {};
}

/** Row widths: 1–3 members use fixed 210px cards, 5 wraps to 3 columns on tablet. */
const ROW_COLS: Record<number, string> = {
  1: "grid-cols-[minmax(0,260px)] sm:grid-cols-[minmax(0,210px)]",
  2: "grid-cols-2 sm:grid-cols-[repeat(2,minmax(0,210px))]",
  3: "grid-cols-2 sm:grid-cols-[repeat(3,minmax(0,210px))]",
  5: "grid-cols-2 sm:grid-cols-[repeat(3,minmax(0,210px))] lg:grid-cols-[repeat(5,minmax(0,210px))]",
};

/** Round portrait of a member, or a silhouette when no photo was added in the backoffice. */
function Portrait({ member, size, iconSize, className }: { member: TeamMember; size: number; iconSize: number; className: string }) {
  return (
    <span
      className={`relative grid flex-none place-items-center overflow-hidden rounded-full transition-colors duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {member.photo ? (
        <Image src={member.photo} alt={member.name ? `Portrait de ${member.name}` : ""} fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <User size={iconSize} strokeWidth={1.8} aria-hidden />
      )}
    </span>
  );
}

function Level({ level, first, namePlaceholder }: { level: TeamLevel; first: boolean; namePlaceholder: string }) {
  const isPanel = level.members.every((m) => !m.desc);
  const count = level.members.length;
  return (
    <Reveal className={`relative flex flex-col items-center text-center ${first ? "pt-3" : "pt-14"}`}>
      {!first && (
        <span aria-hidden className="absolute left-1/2 top-0 h-11 w-0.5 -translate-x-1/2 rounded bg-linear-to-b from-[#cfe3ef] to-brand-light" />
      )}
      <span className="inline-flex items-center gap-2 rounded-full bg-navy px-[18px] py-[9px] text-sm font-bold text-white shadow-[0_12px_24px_-14px_rgba(11,51,70,.6)]">
        <span aria-hidden className="size-2 rounded-full bg-sun" />
        {level.title}
      </span>
      <p className="mt-2.5 max-w-[460px] text-[14.5px] leading-normal text-[#5d6f7c]">{level.intro}</p>

      {isPanel ? (
        <ul
          className={`relative mt-[22px] grid w-full max-w-[1000px] gap-2.5 rounded-[26px] bg-white p-3.5 shadow-[0_30px_60px_-48px_rgba(11,51,70,.55)] grid-cols-1 sm:grid-cols-2 ${
            count === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
          }`}
        >
          <span aria-hidden className="absolute -top-[22px] left-1/2 h-[22px] w-0.5 -translate-x-1/2 bg-brand-light" />
          {level.members.map((m, j) => (
            <li
              key={j}
              className="group flex items-center gap-3 rounded-2xl bg-[#f4f8fb] p-3 text-left transition-colors duration-300 hover:bg-brand"
            >
              <Portrait
                member={m}
                size={m.photo ? 46 : 38}
                iconSize={18}
                className="bg-white text-brand group-hover:bg-white/20 group-hover:text-white"
              />
              <span>
                <b className="block text-sm font-bold leading-[1.3] text-navy transition-colors duration-300 group-hover:text-white">{m.role}</b>
                <small className="mt-0.5 block text-xs font-semibold text-[#9fb3c0] transition-colors duration-300 group-hover:text-white/75">
                  {m.name || namePlaceholder}
                </small>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={`relative mt-[22px] grid w-full justify-center gap-3.5 pt-6 ${ROW_COLS[count] ?? ROW_COLS[3]}`}>
          {/* connector: stem + horizontal bar spanning the card centres */}
          <span aria-hidden className="absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 bg-brand-light" />
          {count > 1 && (
            <span
              aria-hidden
              className={`absolute top-3 h-0.5 bg-brand-light max-sm:hidden ${count === 5 ? "max-lg:hidden" : ""}`}
              style={{
                left: `calc((100% - (${count} * 210px + ${count - 1} * 14px)) / 2 + 105px)`,
                right: `calc((100% - (${count} * 210px + ${count - 1} * 14px)) / 2 + 105px)`,
              }}
            />
          )}
          {level.members.map((m, j) => {
            const lead = first;
            return (
              <li
                key={j}
                className={`group relative flex flex-col items-center rounded-[22px] shadow-[0_20px_40px_-34px_rgba(11,51,70,.5)] transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-32px_rgba(11,51,70,.55),inset_0_0_0_1.5px_var(--color-brand)] ${
                  lead
                    ? "bg-[radial-gradient(120%_140%_at_90%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-[22px] pb-6 pt-[26px] text-white"
                    : "bg-white px-[18px] pb-5 pt-[22px]"
                }`}
              >
                <span aria-hidden className="absolute -top-3 left-1/2 h-3 w-0.5 -translate-x-1/2 bg-brand-light max-sm:hidden" />
                <Portrait
                  member={m}
                  size={(lead ? 76 : 58) + (m.photo ? 20 : 0)}
                  iconSize={lead ? 30 : 22}
                  className={
                    lead
                      ? `bg-white/12 text-white ${m.photo ? "ring-2 ring-white/25" : ""}`
                      : "bg-[#eef6fb] text-brand group-hover:bg-brand group-hover:text-white"
                  }
                />
                <h3 className="mt-3.5 text-[15.5px] font-bold leading-[1.3] tracking-[-0.01em]">{m.role}</h3>
                <p className={`mt-1 text-[12.5px] font-semibold ${lead ? "text-white/55" : "text-[#9fb3c0]"}`}>
                  {m.name || namePlaceholder}
                </p>
                {m.desc && (
                  <p className={`mt-2 text-[13px] leading-normal ${lead ? "text-white/72" : "text-[#5d6f7c]"}`}>{m.desc}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Reveal>
  );
}

export default async function TeamPage() {
  const [c, videos] = await Promise.all([
    getPage<EquipeContent>("equipe"),
    getEntries<SchoolVideo>("videos"),
  ]);
  // Videos are picked by YouTube id, in the order chosen in the backoffice; unknown ids are skipped.
  const teamVideos = (c.videos?.videoIds ?? []).flatMap((id) => videos.find((v) => v.id === id) ?? []);

  return (
    <VideoProvider>
      {c.hero && (
        <PageHero eyebrow={c.hero.eyebrow} title={rich(c.hero.title)} lead={c.hero.lead}>
          <ButtonLink href={c.hero.primaryCta.href}>{c.hero.primaryCta.label}</ButtonLink>
          <ButtonLink href={c.hero.secondaryCta.href} variant="line">{c.hero.secondaryCta.label}</ButtonLink>
        </PageHero>
      )}

      {/* En vidéo */}
      {c.videos && (
        <section className="bg-white pb-[72px] pt-6 sm:pb-24" aria-labelledby="equipe-videos">
          <Container>
            <Reveal className="grid items-end gap-7 md:grid-cols-2 md:gap-x-20">
              <div>
                <Eyebrow>{c.videos.eyebrow}</Eyebrow>
                <h2 id="equipe-videos" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy [&_em]:not-italic">
                  {rich(c.videos.title, "text-brand")}
                </h2>
              </div>
              <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">{c.videos.text}</p>
            </Reveal>
            <div className="-mx-4 mt-10 grid snap-x snap-mandatory auto-cols-[58%] grid-flow-col gap-3.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
              {teamVideos.map((v, i) => (
                <VideoThumb
                  key={v.id}
                  video={v}
                  sizes="(min-width:1024px) 190px, (min-width:640px) 33vw, 58vw"
                  className={`aspect-[9/16] snap-start rounded-[22px] shadow-[0_24px_40px_-30px_rgba(11,51,70,.6)] ${
                    i % 2 === 1 ? "lg:mt-7" : ""
                  }`}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Organigramme */}
      {c.organisation && (
        <section id="organisation" className="scroll-mt-20 bg-[#f4f8fb] py-[72px] sm:py-24" aria-labelledby="equipe-orga">
          <Container>
            <Reveal className="mx-auto max-w-[640px] text-center">
              <Eyebrow>{c.organisation.eyebrow}</Eyebrow>
              <h2 id="equipe-orga" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy [&_em]:not-italic">
                {rich(c.organisation.title, "text-brand")}
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">{c.organisation.text}</p>
            </Reveal>
            <div className="mx-auto mt-10 max-w-[1120px]">
              {(c.organisation.levels ?? []).map((level, i) => (
                <Level key={`${i}-${level.title}`} level={level} first={i === 0} namePlaceholder={c.organisation!.namePlaceholder} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Rejoindre l'équipe */}
      {c.join && (
        <section className="bg-white py-[72px] sm:py-24">
          <Container>
            <Reveal className="grid items-center gap-7 rounded-[28px] bg-[radial-gradient(120%_120%_at_85%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] p-8 text-white sm:p-14 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                <h2 className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] [&_em]:not-italic">
                  {rich(c.join.title, "text-brand-light")}
                </h2>
                <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-white/72">{c.join.text}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <ButtonLink href={c.join.primaryCta.href} variant="solid" className="md:min-w-60">
                  {c.join.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={c.join.secondaryCta.href} variant="ghost" className="md:min-w-60">{c.join.secondaryCta.label}</ButtonLink>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      <Faq />
    </VideoProvider>
  );
}

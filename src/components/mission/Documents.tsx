import { Download } from "lucide-react";
import type { DocumentsContent } from "@/lib/content/mission";
import { Reveal } from "../Reveal";
import { rich } from "../Rich";
import { Container, Eyebrow } from "../ui";

/** "Documents & ressources" (Figma Mission page): resource cards + navy IB documents board. */
export function Documents({ content }: { content: DocumentsContent }) {
  return (
    <section aria-labelledby="dcTitle" className="bg-[#f4f8fb] px-0 py-18 sm:py-24">
      <Container>
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2
            id="dcTitle"
            className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
          >
            {rich(content.title, "not-italic text-brand")}
          </h2>
        </Reveal>

        <div className="mt-11 grid gap-4 lg:grid-cols-3">
          {content.resources.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-2.5 rounded-3xl bg-white px-[26px] pt-[26px] pb-6 shadow-[0_24px_50px_-40px_rgba(11,51,70,.5)]">
                <span
                  aria-hidden
                  className="text-[44px] leading-[0.8] font-bold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-brand-light)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3.5 text-[20px] font-bold tracking-[-0.015em] text-navy">{r.title}</h3>
                <p className="flex-1 text-[15px] leading-[1.55] text-[#5d6f7c]">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-5 overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_90%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-[18px] pt-[26px] pb-5 text-white shadow-[0_40px_80px_-50px_rgba(11,51,70,.85)] sm:px-9 sm:pt-[34px] sm:pb-9">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white/60">{content.ibKicker}</p>
                <h3 className="text-[clamp(22px,2.2vw,30px)] leading-[1.15] font-semibold tracking-[-0.025em]">
                  {rich(content.ibTitle, "not-italic text-brand-light")}
                </h3>
              </div>
              <p className="rounded-full bg-white/8 px-3.5 py-[7px] text-[13px] font-semibold text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]">
                {content.ibDocs.length} {content.ibCountLabel}
              </p>
            </div>
            <div className="mt-[26px] grid gap-3 min-[701px]:grid-cols-3 min-[1101px]:grid-cols-5">
              {content.ibDocs.map((d) => (
                <a
                  key={d.title}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-[20px] bg-white/6 px-[18px] pt-5 pb-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)] transition duration-350 hover:-translate-y-1.5 hover:bg-white hover:text-navy hover:shadow-[0_26px_50px_-26px_rgba(0,0,0,.6)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sun min-[701px]:min-h-[220px]"
                >
                  <span className="self-start rounded-[7px] bg-sun px-[9px] py-1 text-[11px] font-extrabold tracking-[0.08em] text-navy">
                    {content.ibBadge}
                  </span>
                  <h4 className="mt-[18px] text-[17px] leading-[1.25] font-bold tracking-[-0.01em]">{d.title}</h4>
                  <p className="mt-2 flex-1 text-[13.5px] leading-normal text-white/65 transition-colors group-hover:text-[#5d6f7c]">
                    {d.text}
                  </p>
                  <span className="mt-4 flex items-center justify-between border-t border-white/12 pt-3.5 text-[14px] font-bold transition-colors group-hover:border-[#e3ebf0]">
                    {content.ibDownloadLabel}
                    <i
                      aria-hidden
                      className="grid size-[34px] place-items-center rounded-full bg-white text-brand transition duration-350 group-hover:translate-y-[3px] group-hover:bg-brand group-hover:text-white"
                    >
                      <Download size={16} strokeWidth={2.4} />
                    </i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

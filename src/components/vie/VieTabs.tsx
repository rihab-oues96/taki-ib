"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { rich } from "@/components/Rich";
import type { SchoolVideo } from "@/lib/content/videos";
import type { VieTabsContent } from "@/lib/content/vie-scolaire";
import { VideoThumb } from "./VideoPlayer";

type Tab = VieTabsContent["tabs"][number] & { videos: SchoolVideo[] };

/** "Sorties scolaires / Les clubs" pill tabs with a sliding indicator. */
export function VieTabs({ content, tabs: TABS }: { content: VieTabsContent; tabs: Tab[] }) {
  const [cur, setCur] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState({ w: 0, x: 0 });

  const place = useCallback(() => {
    const t = tabRefs.current[cur];
    if (t) setInd({ w: t.offsetWidth, x: t.offsetLeft });
  }, [cur]);

  useLayoutEffect(place, [place]);
  useEffect(() => {
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const next = (i + n + TABS.length) % TABS.length;
    setCur(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="sorties" aria-labelledby="tvTitle" className="bg-white px-4 pb-18 pt-6 sm:pb-24">
      <div className="mx-auto w-[min(1200px,100%)]">
        <Reveal className="text-center">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 id="tvTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
            {rich(content.title, "not-italic text-brand")}
          </h2>
        </Reveal>

        <Reveal>
          <div
            ref={barRef}
            role="tablist"
            aria-label={content.ariaLabel}
            className="relative mx-auto mt-9 flex w-max max-w-full rounded-full bg-[#eef6fb] p-2 shadow-[0_24px_48px_-36px_rgba(11,51,70,.35)]"
          >
            <span
              aria-hidden
              className="absolute bottom-2 left-0 top-2 rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(11,51,70,.35),0_0_0_1px_rgba(11,51,70,.04)] transition-[transform,width] duration-500 ease-out-expo motion-reduce:transition-none"
              style={{ width: ind.w, transform: `translateX(${ind.x}px)` }}
            />
            {TABS.map((t, i) => (
              <button
                key={t.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`tab-${t.key}`}
                aria-controls={`pane-${t.key}`}
                aria-selected={cur === i}
                tabIndex={cur === i ? 0 : -1}
                onClick={() => setCur(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative z-10 h-12 whitespace-nowrap rounded-full px-[18px] text-[14.5px] transition-colors duration-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun sm:h-14 sm:px-7 sm:text-[17px] ${
                  cur === i ? "font-bold text-navy" : "font-semibold text-brand-light hover:text-brand"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          {TABS.map((t, i) => (
            <div
              key={t.key}
              role="tabpanel"
              id={`pane-${t.key}`}
              aria-labelledby={`tab-${t.key}`}
              hidden={cur !== i}
              className={cur === i ? "grid animate-fade-up items-center gap-7 md:grid-cols-2 md:gap-14" : ""}
            >
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand">{t.kicker}</p>
                <h3 className="mt-3 text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.12] tracking-[-0.03em] text-navy">{t.title}</h3>
                {t.text.map((p, k) => (
                  <p key={k} className={`text-[17px] leading-[1.7] text-[#5d6f7c] ${k === 0 ? "mt-[18px]" : "mt-3"}`}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {t.videos.map((v, k) => (
                  <VideoThumb
                    key={v.id}
                    video={v}
                    sizes="(min-width:1024px) 280px, 45vw"
                    className={`aspect-[9/16] rounded-3xl shadow-[0_30px_60px_-40px_rgba(11,51,70,.6)] ${k === 1 ? "mt-6 sm:mt-10" : ""}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

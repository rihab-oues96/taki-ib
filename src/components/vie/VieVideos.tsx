"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import { VIDEOS, VIDEO_CATS, type VideoCat } from "@/lib/school-videos";
import { VideoThumb } from "./VideoPlayer";

const STEP = 15;

/** Filterable library of every video, with a "voir plus" pager. */
export function VieVideos() {
  const [filter, setFilter] = useState<VideoCat | "all">("all");
  const [shown, setShown] = useState(STEP);

  const counts = useMemo(
    () => Object.fromEntries(VIDEO_CATS.map((c) => [c.key, VIDEOS.filter((v) => v.cat === c.key).length])) as Record<VideoCat, number>,
    [],
  );
  const list = filter === "all" ? VIDEOS : VIDEOS.filter((v) => v.cat === filter);
  const label = (k: VideoCat) => VIDEO_CATS.find((c) => c.key === k)!.label;

  const pick = (f: VideoCat | "all") => {
    setFilter(f);
    setShown(STEP);
  };

  return (
    <section id="videos" aria-labelledby="vwTitle" className="bg-[#f4f8fb] px-4 py-18 sm:py-24">
      <div className="mx-auto w-[min(1200px,100%)]">
        <Reveal className="grid items-end gap-6 md:grid-cols-2 md:gap-x-20">
          <div>
            <Eyebrow>Nos vidéos</Eyebrow>
            <h2 id="vwTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
              Toute la vie de l’école, <em className="not-italic text-brand">en vidéo</em>.
            </h2>
          </div>
          <p className="text-[17px] leading-[1.6] text-[#5d6f7c]">
            Activités, sorties, journées portes ouvertes, témoignages de parents et d’élèves&nbsp;: retrouvez ici toutes nos vidéos.
          </p>
        </Reveal>

        <div role="group" aria-label="Filtrer les vidéos" className="mt-9 flex flex-wrap gap-2">
          {[{ key: "all" as const, label: "Tout", n: VIDEOS.length }, ...VIDEO_CATS.map((c) => ({ key: c.key, label: c.label, n: counts[c.key] }))].map((f) => {
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => pick(f.key)}
                className={`h-[42px] rounded-full px-[18px] text-[14.5px] font-semibold transition ${
                  on
                    ? "bg-brand text-white"
                    : "bg-white text-navy shadow-[inset_0_0_0_1px_#dbe8f0] hover:text-brand hover:shadow-[inset_0_0_0_1.5px_var(--color-brand)]"
                }`}
              >
                {f.label} <b className={`ml-1 font-bold ${on ? "text-white/75" : "text-[#9fb3c0]"}`}>{f.n}</b>
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-3.5 gap-y-[18px] md:grid-cols-3 lg:grid-cols-4 min-[1100px]:grid-cols-5">
          {list.slice(0, shown).map((v) => (
            <article key={v.id} className="min-w-0">
              <VideoThumb video={v} sizes="(min-width:1100px) 230px, (min-width:768px) 30vw, 50vw" className="aspect-[4/5] w-full rounded-[20px]" />
              <p dir="auto" className="mt-3 line-clamp-2 text-sm font-semibold leading-[1.4] text-navy">
                {v.title}
              </p>
              <span className="mt-1 block text-[12.5px] font-semibold text-brand">{label(v.cat)}</span>
            </article>
          ))}
        </div>

        {list.length > shown && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((s) => s + STEP)}
              className="inline-flex h-12 items-center justify-center rounded-full border-[1.5px] border-[#cfdde6] bg-transparent px-6 text-sm font-bold text-navy transition hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full"
            >
              Voir plus de vidéos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

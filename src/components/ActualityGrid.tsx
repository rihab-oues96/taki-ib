"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { VideoThumb } from "@/components/vie/VideoPlayer";
import type { SchoolVideo } from "@/lib/school-videos";

export type NewsCat = "articles" | "events" | "ecole";

export type NewsItem = {
  cat: NewsCat;
  title: string;
  excerpt: string;
  image: string;
  /** Article: internal link. Video: YouTube id + kind. */
  href?: string;
  video?: { id: string; kind: "short" | "long" };
};

const FILTERS: { key: NewsCat | "all"; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "articles", label: "Articles" },
  { key: "events", label: "Événements" },
  { key: "ecole", label: "Vie de l’école" },
];

const TAG: Record<NewsCat, string> = { articles: "Articles", events: "Événements", ecole: "Vie de l’école" };

function LinkLabel({ children }: { children: string }) {
  return (
    <span className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-bold leading-[1.2] text-navy transition-colors group-hover/c:text-brand">
      {children}
      <ArrowRight size={14} strokeWidth={2.6} className="transition-transform duration-300 group-hover/c:translate-x-1" aria-hidden />
    </span>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  const body = (
    <div className="flex flex-1 flex-col items-start px-[22px] pb-[22px] pt-5">
      <span className="rounded-full bg-[#eef6fb] px-[11px] py-1 text-[12.5px] font-bold text-brand">{TAG[item.cat]}</span>
      <h3 className="mt-3 text-[18.5px] font-bold leading-[1.3] tracking-[-0.015em]">{item.title}</h3>
      <p className="mt-2 flex-1 text-[14.5px] leading-[1.55] text-[#5d6f7c]">{item.excerpt}</p>
      <LinkLabel>{item.video ? "Voir la vidéo" : "Lire l’article"}</LinkLabel>
    </div>
  );
  const shell =
    "group/c flex h-full flex-col overflow-hidden rounded-3xl bg-white text-left text-navy shadow-[0_24px_50px_-42px_rgba(11,51,70,.55)] transition duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-40px_rgba(11,51,70,.6)]";

  if (item.video) {
    const v: SchoolVideo = { id: item.video.id, kind: item.video.kind, cat: "ecole", title: item.title, thumb: item.image };
    return (
      <article className={shell}>
        <VideoThumb video={v} sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" className="aspect-[16/10] w-full" />
        {body}
      </article>
    );
  }
  return (
    <Link href={item.href!} className={`${shell} focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[#dbe8f0]">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
          className="object-cover object-[50%_30%] transition-transform duration-700 ease-out-expo group-hover/c:scale-[1.06]"
        />
      </div>
      {body}
    </Link>
  );
}

/** "Toutes les actualités": filter bar + card grid. */
export function ActualityGrid({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState<NewsCat | "all">("all");
  const list = filter === "all" ? items : items.filter((i) => i.cat === filter);

  return (
    <>
      <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <h2 id="nwTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
          Toutes les <em className="not-italic text-brand">actualités</em>.
        </h2>
        <div role="group" aria-label="Filtrer les actualités" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.key)}
                className={`h-[42px] rounded-full px-[18px] text-[14.5px] font-semibold transition ${
                  on
                    ? "bg-brand text-white"
                    : "bg-white text-navy shadow-[inset_0_0_0_1px_#dbe8f0] hover:text-brand hover:shadow-[inset_0_0_0_1.5px_var(--color-brand)]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </Reveal>
      <div className="mt-9 grid gap-x-[18px] gap-y-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {list.map((i) => (
          <NewsCard key={i.title} item={i} />
        ))}
      </div>
    </>
  );
}

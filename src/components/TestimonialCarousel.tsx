"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { Pagination } from "./Pagination";
import type { Testimonial, TestimonialsHeading, TestimonialVideo } from "@/lib/content/home-2";

type Slide =
  | { kind: "video"; id: string; title: string; vertical: boolean; quote: string; name: string }
  | { kind: "quote"; quote: string; name: string };

const GAP = 32;

export function TestimonialCarousel({
  testimonials,
  videos,
  labels,
}: {
  testimonials: Testimonial[];
  videos: TestimonialVideo[];
  labels: TestimonialsHeading;
}) {
  // Vidéos et témoignages écrits en alternance
  const SLIDES: Slide[] = videos
    .flatMap((v, i): Slide[] => {
      const t = testimonials[i];
      return [
        { kind: "video", id: v.id, title: v.title, vertical: v.vertical, quote: labels.videoCaption, name: labels.videoAuthor },
        ...(t ? [{ kind: "quote" as const, quote: t.quote, name: t.name }] : []),
      ];
    })
    .concat(testimonials.slice(videos.length).map((t) => ({ kind: "quote" as const, quote: t.quote, name: t.name })));
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const go = (i: number) => {
    setActive((i + SLIDES.length) % SLIDES.length);
    setPlaying(null);
  };
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const cur = SLIDES[active];
  const count = SLIDES.length;

  // Défilement automatique, en pause pendant la lecture, au survol ou si mouvement réduit
  useEffect(() => {
    if (paused || playing !== null || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % count), 3000);
    return () => clearTimeout(t);
  }, [active, paused, playing, reduce, count]);

  if (!cur) return null;

  return (
    <div
      className="mt-12"
      style={{ ["--w" as string]: "min(64vw, 560px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden py-2">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            gap: GAP,
            transform: `translateX(calc(${active} * (var(--w) + ${GAP}px) * -1))`,
            paddingLeft: "calc(50% - var(--w) / 2)",
            paddingRight: "calc(50% - var(--w) / 2)",
          }}
        >
          {SLIDES.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                className={`relative aspect-video shrink-0 overflow-hidden rounded-3xl bg-navy transition-opacity duration-700 ${isActive ? "opacity-100" : "cursor-pointer opacity-40"}`}
                style={{ width: "var(--w)" }}
                onClick={() => !isActive && go(i)}
                aria-hidden={!isActive}
              >
                {s.kind === "video" ? (
                  playing === i && isActive ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${s.id}?rel=0&modestbranding=1&autoplay=1&vq=hd1080&hd=1`}
                      title={s.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className={`absolute inset-0 m-auto border-0 ${s.vertical ? "h-full aspect-[9/16]" : "size-full"}`}
                    />
                  ) : (
                    <button
                      type="button"
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => {
                        if (isActive) {
                          e.stopPropagation();
                          setPlaying(i);
                        }
                      }}
                      className="group absolute inset-0 size-full"
                      aria-label={`${labels.playPrefix} ${s.title}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://i.ytimg.com/vi/${s.id}/maxresdefault.jpg`}
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (!img.src.endsWith("/hqdefault.jpg")) img.src = `https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`;
                        }}
                        alt=""
                        className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-navy-900/10" />
                      <span className="absolute bottom-6 left-6 grid size-12 place-items-center rounded-full bg-white text-navy shadow-lg transition-transform group-hover:scale-110">
                        <Play size={18} fill="currentColor" />
                      </span>
                    </button>
                  )
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-center bg-brand p-8 text-white sm:p-12">
                    <span aria-hidden className="font-serif text-8xl leading-none opacity-60">“</span>
                    <p className="max-w-3xl text-xl font-semibold leading-snug sm:text-3xl">{s.quote}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Légende de la diapositive active */}
      <div className="mx-auto mt-8 flex min-h-[130px] max-w-[min(64vw,560px)] flex-col items-center gap-5 px-1 text-center">
        <AnimatePresence mode="wait">
          <motion.figure
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl"
          >
            <blockquote className="text-base leading-snug text-navy sm:text-lg">{cur.quote}</blockquote>
            <figcaption className="mt-2 text-sm text-ink-soft">{cur.name}</figcaption>
          </motion.figure>
        </AnimatePresence>
        {cur.kind === "video" && playing !== active && (
          <button
            type="button"
            onClick={() => setPlaying(active)}
            className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] px-6 text-sm font-bold text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(81,160,216,.65)] focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full"
          >
            {labels.watchLabel}
          </button>
        )}
      </div>

      <Pagination className="mt-6" count={SLIDES.length} active={active} onChange={go} label={labels.paginationLabel} />
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSite } from "@/components/SiteProvider";
import type { HeroContent } from "@/lib/content/home";
import { isVideoFile } from "@/lib/content/videos";

const EASE = [0.22, 1, 0.36, 1] as const;

const BTN =
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-6 text-sm font-bold leading-none transition-colors duration-200 max-[640px]:w-full";

/** Splits a title line into words; words inside `*…*` are flagged as highlighted. */
function titleWords(line: string) {
  return line
    .split(/(\*[^*]+\*)/g)
    .flatMap((part) => {
      const on = part.length > 2 && part.startsWith("*") && part.endsWith("*");
      return (on ? part.slice(1, -1) : part)
        .split(" ")
        .filter(Boolean)
        .map((word) => ({ word, on }));
    });
}

export function Hero({ content: c }: { content: HeroContent }) {
  const site = useSite();
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [film, setFilm] = useState(false);
  const [prog, setProg] = useState<number | null>(null);
  const bg = useRef<HTMLIFrameElement>(null);
  const bgFile = useRef<HTMLVideoElement>(null);
  // The background is either a YouTube video or a file uploaded in the backoffice.
  const isFile = isVideoFile(site.heroVideoId);
  const dock = useRef<HTMLElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  const chipEl = useRef<HTMLElement | null>(null);

  // N'afficher la vidéo d'arrière-plan qu'une fois que YouTube confirme sa lecture.
  useEffect(() => {
    if (reduce || isFile) return;
    const onMsg = (e: MessageEvent) => {
      if (!/youtube(-nocookie)?\.com$/.test(new URL(e.origin).hostname)) return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        const s = d?.event === "onStateChange" ? d.info : d?.info?.playerState;
        if (s === 1) setTimeout(() => setPlaying(true), 700);
      } catch {}
    };
    window.addEventListener("message", onMsg);
    let tries = 0;
    const t = setInterval(() => {
      bg.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: "bg", channel: "widget" }),
        "*",
      );
      if (++tries > 10) clearInterval(t);
    }, 500);
    return () => {
      window.removeEventListener("message", onMsg);
      clearInterval(t);
    };
  }, [reduce, isFile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFilm(false);
        setProg(null);
      }
    };
    // Close on outside click only: React's own listener sits on `document` too,
    // so stopPropagation() in the dock can't shield it from this handler.
    const onDoc = (e: MouseEvent) => {
      if (dock.current?.contains(e.target as Node)) return;
      setProg(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDoc);
    };
  }, []);

  // Pointe la petite flèche de la carte vers le logo cliqué.
  useLayoutEffect(() => {
    const p = pop.current;
    const d = dock.current;
    const chip = chipEl.current;
    if (prog === null || !p || !d || !chip) return;
    const dr = d.getBoundingClientRect();
    const cr = chip.getBoundingClientRect();
    const center = cr.left + cr.width / 2;
    const w = p.offsetWidth;
    const popRight = dr.right - d.clientLeft;
    const popLeft = dr.left + d.clientLeft + d.clientWidth / 2 - w / 2;
    p.style.setProperty("--tip", `${Math.max(18, popRight - center - 7)}px`);
    p.style.setProperty("--tipx", `${Math.max(18, center - popLeft - 7)}px`);
  }, [prog]);

  const toggle = () => {
    if (isFile) {
      if (paused) void bgFile.current?.play().catch(() => undefined);
      else bgFile.current?.pause();
      setPaused((p) => !p);
      return;
    }
    bg.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: paused ? "playVideo" : "pauseVideo",
        args: [],
      }),
      "*",
    );
    setPaused((p) => !p);
  };

  const words1 = titleWords(c.titleLine1);
  const words2 = titleWords(c.titleLine2);
  const current = prog === null ? undefined : c.programmes[prog];

  const fade = (delay: number) => ({
    initial: reduce ? (false as const) : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 1, ease: EASE },
  });

  return (
    <section
      aria-label={c.sectionLabel}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-900 text-paper"
    >
      {/* Background video */}
      <div
        className="absolute inset-0 z-0 overflow-hidden bg-[#0b2230] bg-cover bg-center bg-no-repeat"
        style={isFile ? undefined : { backgroundImage: `url('https://i.ytimg.com/vi/${site.heroVideoId}/maxresdefault.jpg')` }}
      >
        {isFile && (
          <video
            ref={bgFile}
            src={site.heroVideoId}
            title={c.video.backgroundTitle}
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload={reduce ? "metadata" : "auto"}
            tabIndex={-1}
            aria-hidden
            onPlaying={() => setPlaying(true)}
            className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-[1200ms] ease-out-expo ${
              playing || reduce ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {!reduce && !isFile && (
          <iframe
            ref={bg}
            title={c.video.backgroundTitle}
            src={`https://www.youtube-nocookie.com/embed/${site.heroVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${site.heroVideoId}&start=${c.video.backgroundStart ?? 0}&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&disablekb=1&enablejsapi=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden
            className={`pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-screen min-w-[177.78svh] -translate-x-1/2 -translate-y-1/2 scale-[1.2] border-0 transition-opacity duration-[1200ms] ease-out-expo ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,31,43,.72)_0%,rgba(6,31,43,.30)_26%,rgba(6,31,43,.50)_55%,rgba(6,31,43,.92)_100%),radial-gradient(ellipse_60%_45%_at_50%_66%,rgba(6,31,43,.55),transparent_75%)]" />

      {/* Announcement bar */}
      <div className="relative z-[2] flex h-10 items-center justify-center gap-2.5 bg-navy-900/45 px-4 text-center text-sm text-paper backdrop-blur-[5px] max-[640px]:h-auto max-[640px]:min-h-10 max-[640px]:px-3 max-[640px]:py-1.5 max-[640px]:text-xs">
        <span className="size-1.5 shrink-0 rounded-full bg-sun" aria-hidden />
        <span>
          {c.announcement.text}{" "}
          <span className="max-[640px]:hidden">{c.announcement.textDesktop} </span>
        </span>
        <a
          href={c.announcement.linkHref}
          target="_blank"
          rel="noopener"
          className="whitespace-nowrap border-b border-paper/35 opacity-75 hover:opacity-100"
        >
          {c.announcement.linkLabel}
        </a>
      </div>

      {/* Emplacement de la barre de navigation (fournie par <Header />) */}
      <div className="h-20" aria-hidden />

      {/* Content */}
      <div className="relative z-[2] mx-auto flex w-[min(1100px,100%)] flex-1 flex-col items-center justify-end px-4 pb-9 text-center min-[641px]:pb-7 min-[1181px]:pb-20">
        <motion.p
          {...fade(0.1)}
          className="mb-[18px] inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-light"
        >
          {c.eyebrow}
        </motion.p>
        <h1 className="text-[48px] font-semibold leading-[1.08] tracking-[-0.025em] max-[640px]:text-[34px]">
          <span className="block">
            {words1.map((w, i) => (
              <Word key={w.word + i} i={i} reduce={!!reduce}>
                {w.word}
              </Word>
            ))}
          </span>
          <span className="block text-brand-light">
            {words2.map((w, i) => (
              <span key={w.word + i} className={w.on ? "text-sun" : undefined}>
                <Word i={i + words1.length} reduce={!!reduce}>
                  {w.word}
                </Word>
              </span>
            ))}
          </span>
        </h1>
        <motion.p
          {...fade(1.1)}
          className="mt-[22px] max-w-[560px] text-[17px] leading-[1.55] text-paper/[.78] max-[640px]:text-[15.5px]"
        >
          {c.lead}
        </motion.p>
        <motion.div
          {...fade(1.3)}
          className="mt-[34px] flex gap-3 max-[640px]:w-full max-[640px]:flex-col"
        >
          <button
            type="button"
            onClick={() => setFilm(true)}
            className={`group ${BTN} border-paper/[.32] bg-paper/[.08] backdrop-blur-[6px] hover:border-brand hover:bg-brand`}
          >
            <span className="grid size-[22px] place-items-center rounded-full bg-paper">
              <span
                className="ml-0.5 border-y-[4.5px] border-l-[7px] border-y-transparent border-l-navy transition-colors duration-200 group-hover:border-l-brand"
                aria-hidden
              />
            </span>
            {c.watchLabel}
          </button>
          <a
            href={c.cta.href}
            className={`${BTN} border-paper bg-paper text-navy hover:border-brand hover:bg-brand hover:text-white`}
          >
            {c.cta.label}
          </a>
        </motion.div>
      </div>

      {/* IB programmes dock */}
      <motion.aside
        ref={dock}
        {...fade(1.7)}
        aria-label={c.dock.title}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-8 right-8 z-[4] rounded-[20px] border border-paper/[.14] bg-navy-900/[.42] p-3.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,.55)] backdrop-blur-[14px] backdrop-saturate-[1.4] max-[1180px]:relative max-[1180px]:bottom-auto max-[1180px]:right-auto max-[1180px]:z-[2] max-[1180px]:mx-4 max-[1180px]:mb-7 max-[1180px]:max-w-[calc(100%-32px)] max-[1180px]:self-center max-[640px]:rounded-[18px] max-[640px]:p-3"
      >
        <p className="mx-1 mb-2.5 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-brand-light">
          <span className="relative size-[7px] shrink-0 rounded-full bg-sun" aria-hidden>
            <span className="absolute -inset-1 animate-pulse-ring rounded-full border-[1.5px] border-sun" />
          </span>
          <span>
            {c.dock.title}{" "}
            <span className="font-medium normal-case tracking-[0.02em] text-paper/55 max-[640px]:hidden">
              {c.dock.hint}
            </span>
          </span>
        </p>
        <div className="flex gap-2.5 max-[640px]:gap-2">
          {c.programmes.map((p, k) => (
            <button
              key={k}
              type="button"
              aria-expanded={prog === k}
              aria-controls="ibpop"
              onClick={(e) => {
                chipEl.current = e.currentTarget;
                setProg(prog === k ? null : k);
              }}
              className={`relative flex h-14 items-center justify-center overflow-hidden rounded-[13px] border-2 bg-white px-3.5 transition-[transform,border-color,box-shadow] duration-[350ms] ease-out-expo before:absolute before:inset-y-0 before:-left-[60%] before:w-2/5 before:skew-x-[-18deg] before:bg-[linear-gradient(100deg,transparent,rgba(255,255,255,.75),transparent)] before:transition-[left] before:duration-700 before:ease-out-expo before:content-[''] hover:-translate-y-[3px] hover:shadow-[0_14px_28px_-12px_rgba(0,0,0,.55)] hover:before:left-[130%] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand max-[640px]:h-[50px] max-[640px]:flex-1 max-[640px]:px-2.5 ${
                prog === k
                  ? "-translate-y-[3px] border-brand shadow-[0_0_0_4px_rgba(47,165,222,.25),0_14px_28px_-12px_rgba(0,0,0,.55)]"
                  : "border-transparent shadow-[0_6px_18px_-8px_rgba(0,0,0,.45)]"
              }`}
            >
              <Image
                src={p.logo}
                alt={p.alt}
                width={p.logoWidth ?? 512}
                height={p.logoHeight ?? 156}
                className="block h-[35px] w-auto max-[640px]:h-[27px] max-[640px]:max-w-full max-[640px]:object-contain"
              />
            </button>
          ))}
        </div>

        {current && (
          <div
            ref={pop}
            key={prog}
            id="ibpop"
            role="region"
            aria-live="polite"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-[calc(100%+12px)] right-0 w-[min(350px,calc(100vw-32px))] origin-bottom-right animate-pop-in rounded-[20px] bg-white px-[22px] pb-5 pt-[22px] text-left text-navy shadow-[0_30px_70px_-20px_rgba(0,0,0,.6)] after:absolute after:-bottom-[7px] after:right-[var(--tip,60px)] after:size-3.5 after:rotate-45 after:rounded-[2px] after:bg-white after:content-[''] max-[1180px]:relative max-[1180px]:bottom-auto max-[1180px]:right-auto max-[1180px]:mt-3 max-[1180px]:w-full max-[1180px]:origin-top max-[1180px]:after:hidden"
          >
            <button
              type="button"
              onClick={() => setProg(null)}
              aria-label={c.dock.closeLabel}
              className="absolute right-3 top-3 size-8 rounded-full bg-[#eef3f6] text-xl leading-none text-navy transition-colors duration-200 hover:bg-brand hover:text-white"
            >
              ×
            </button>
            <div className="mb-2.5 flex items-center gap-2">
              <span
                className="inline-flex h-6 items-center rounded-full px-2.5 text-xs font-bold tracking-[0.06em] text-white"
                style={{ background: current.accent }}
              >
                {current.code}
              </span>
            </div>
            <h2 className="mb-2 mr-10 text-[19px] font-bold leading-[1.25] tracking-[-0.01em]">
              {current.title}
            </h2>
            <p className="text-[14.5px] leading-[1.6] text-ink-soft">{current.text}</p>
            <Link
              href={current.href}
              className="group mt-3.5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-navy"
            >
              {c.dock.moreLabel}
              <span
                aria-hidden
                className="transition-transform duration-[250ms] ease-out-expo group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </motion.aside>

      {/* Background video pause/play */}
      {playing && (
        <motion.button
          type="button"
          onClick={toggle}
          {...fade(1.5)}
          aria-label={paused ? c.video.playLabel : c.video.pauseLabel}
          className="absolute bottom-8 left-6 z-[3] grid size-10 place-items-center rounded-full border border-paper/35 bg-navy-900/35 hover:bg-navy-900/60 max-[640px]:bottom-auto max-[640px]:left-auto max-[640px]:right-4 max-[640px]:top-[136px]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#fafafa" aria-hidden>
            {paused ? (
              <path d="M3 1l8 5-8 5z" />
            ) : (
              <>
                <rect x="2" y="1" width="3" height="10" />
                <rect x="7" y="1" width="3" height="10" />
              </>
            )}
          </svg>
        </motion.button>
      )}

      {/* Film modal */}
      {film && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.video.filmTitle}
          onClick={(e) => e.target === e.currentTarget && setFilm(false)}
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(3,15,21,.86)] p-4"
        >
          <div className="relative aspect-video w-[min(1100px,100%)] bg-black">
            <button
              type="button"
              onClick={() => setFilm(false)}
              className="absolute -top-11 right-0 text-sm opacity-80 hover:opacity-100"
              autoFocus
            >
              {c.video.filmClose}
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${site.filmVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title={c.video.filmTitle}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full border-0"
            />
            <a
              href={`https://www.youtube.com/watch?v=${site.filmVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-0 -bottom-10 text-center text-[13.5px] text-paper/75 underline underline-offset-[3px] hover:text-brand"
            >
              {c.video.filmFallback}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

function Word({
  children,
  i,
  reduce,
}: {
  children: string;
  i: number;
  reduce: boolean;
}) {
  return (
    <>
      <motion.span
        className="inline-block"
        initial={
          reduce ? false : { opacity: 0, y: "0.35em", filter: "blur(6px)" }
        }
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.15 + i * 0.07, duration: 0.9, ease: EASE }}
      >
        {children}
      </motion.span>{" "}
    </>
  );
}

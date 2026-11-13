"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { rich } from "@/components/Rich";
import type { AboutContent } from "@/lib/content/home";

const DUR = 6000;
const pad = (n: number) => String(n).padStart(2, "0");

export function About({ content: c }: { content: AboutContent }) {
  const SLIDES = c.slides;
  const L = c.labels;
  const [cur, setCur] = useState(0);
  const [shown, setShown] = useState(0); // text content, swapped after fade-out
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [video, setVideo] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => {
    setCur((c) => {
      const n = (i + SLIDES.length) % SLIDES.length;
      return n === c ? c : n;
    });
  }, [SLIDES.length]);

  // swap text with a short fade
  useEffect(() => {
    if (cur === shown) return;
    const t = setTimeout(() => setShown(cur), 260);
    return () => clearTimeout(t);
  }, [cur, shown]);

  // run the slideshow only while visible, not paused and not hovered
  const hold = paused || !visible || hovering || video;
  useEffect(() => {
    if (hold) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % SLIDES.length), DUR);
    return () => clearTimeout(t);
  }, [cur, hold, SLIDES.length]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // keep the active thumbnail in view (scroll the strip only, not the page)
  useEffect(() => {
    const strip = thumbsRef.current;
    const at = strip?.children[cur] as HTMLElement | undefined;
    if (strip && at) strip.scrollTo({ left: at.offsetLeft - strip.offsetLeft - 2, behavior: "smooth" });
  }, [cur]);

  // close the video modal with Escape
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideo(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [video]);

  const fading = cur !== shown;
  const s = SLIDES[shown];
  const active = SLIDES[cur];
  if (!s || !active) return null;

  return (
    <section ref={rootRef} id="apropos" aria-labelledby="aboutTitle" className="relative overflow-hidden bg-white px-4 pb-12 pt-14 text-navy sm:px-6 max-[700px]:pb-16 max-[700px]:pt-[72px]">
      {/* soft brand glow behind the bento */}
      <div className="pointer-events-none absolute left-1/2 top-[180px] h-[640px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(47,165,222,.10),transparent_70%)] max-[700px]:top-[300px] max-[700px]:w-[700px]" />

      <div className="relative mx-auto w-[min(1200px,100%)]">
        {/* header */}
        <Reveal>
          <header className="mb-9 grid items-start gap-x-14 gap-y-3.5 min-[1081px]:mb-12 min-[1081px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-3 inline-flex items-center gap-2.5 text-[13.5px] font-medium uppercase tracking-[0.06em] text-[#7b8a96]">
                <span className="h-1 w-[26px] rounded bg-sun" aria-hidden />
                {c.eyebrow}
              </p>
              <h2 id="aboutTitle" className="text-[clamp(30px,3.2vw,42px)] font-bold leading-[1.1] tracking-[-0.025em]">
                {rich(c.title, "not-italic text-brand")}
              </h2>
            </div>
            <div className="max-w-[520px] min-[1081px]:justify-self-end min-[1081px]:pt-[32px]">
              <p className="text-[15.5px] leading-[1.6] text-[#5d6f7c]">
                {c.text}
              </p>
              <ButtonLink href={c.cta.href} variant="navy" className="mt-3.5 self-start">{c.cta.label}</ButtonLink>
            </div>
          </header>
        </Reveal>

        {/* bento */}
        <div className="grid gap-5 min-[1081px]:h-[clamp(356px,calc(100svh-438px),520px)] min-[1081px]:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] min-[1081px]:gap-x-20">
          {/* left: rotating feature text + thumbnails + key figures */}
          <Reveal delay={0.05} className="order-2 flex flex-col justify-between border-l border-[#e3ebf0] py-1.5 pl-[18px] pr-5 min-[701px]:pl-7 min-[1081px]:order-none">
            <div>
              <div aria-live="polite" className={`transition duration-[350ms] ${fading ? "translate-y-1.5 opacity-0" : ""}`}>
                <span className="text-[13px] font-semibold tracking-[0.08em] text-brand">
                  {pad(shown + 1)} <i className="not-italic text-[#9fb0bb]">/ {pad(SLIDES.length)}</i>
                </span>
                <h3 className="mb-2 mt-2 text-[22px] font-bold leading-tight tracking-[-0.01em]">{s.title}</h3>
                <p className="text-[15px] leading-[1.6] text-[#5d6f7c] min-[701px]:min-h-[72px]">{s.text}</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div role="tablist" aria-label={L.chooseSlide} className="flex h-[30px] items-center gap-1.5 rounded-full bg-[#eef4f8] px-3">
                  {SLIDES.map((sl, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === cur}
                      aria-label={sl.name}
                      onClick={() => go(i)}
                      className={`relative h-[7px] cursor-pointer overflow-hidden rounded-full transition-[width,background-color] duration-[450ms] ${i === cur ? "w-[42px] bg-brand" : "w-[7px] bg-[#c5d3dc]"}`}
                    >
                      {i === cur && (
                        <i
                          key={`${cur}-${hold}`}
                          className="absolute inset-0 w-0 rounded-[inherit] bg-brand-deep"
                          style={hold ? { width: 0 } : { animation: `feat-fill ${DUR}ms linear forwards` }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? L.resume : L.pause}
                  className="grid size-[30px] place-items-center rounded-full bg-[#eef4f8] transition-colors hover:bg-brand hover:text-white"
                >
                  {paused ? <Play size={10} fill="currentColor" aria-hidden /> : <Pause size={10} fill="currentColor" aria-hidden />}
                </button>
              </div>

              <div ref={thumbsRef} className="mt-3 grid snap-x snap-mandatory auto-cols-[calc((100%-32px)/5)] grid-flow-col gap-2 overflow-x-auto px-0.5 pb-1.5 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SLIDES.map((sl, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`${L.viewSlide} ${sl.name}`}
                    className="group relative aspect-square snap-start overflow-hidden rounded-[10px] outline-none"
                  >
                    <Image
                      src={sl.image}
                      alt=""
                      fill
                      sizes="80px"
                      className={`object-cover transition duration-500 group-hover:scale-[1.08] group-hover:filter-none ${i === cur ? "" : "brightness-[.92] saturate-[.75]"}`}
                    />
                    <span
                      className={`pointer-events-none absolute inset-0 rounded-[inherit] transition-shadow duration-300 group-focus-visible:shadow-[inset_0_0_0_3px_#0b3346] ${i === cur ? "shadow-[inset_0_0_0_3px_#2fa5de,inset_0_0_0_5px_rgba(255,255,255,.85)]" : ""}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-[#e3ebf0] pt-4">
              {c.stats.map(({ value: n, label: l }) => (
                <div key={l}>
                  <dt className="text-[clamp(30px,2.8vw,38px)] font-bold leading-none tracking-[-0.04em] text-brand">{n}</dt>
                  <dd className="mt-1.5 text-[13px] leading-[1.35] text-[#5d6f7c]">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* right: media card */}
          <Reveal delay={0.12} className="order-1 min-[1081px]:order-none">
            <div
              ref={mediaRef}
              role="group"
              aria-roledescription="carrousel"
              aria-label={L.carousel}
              tabIndex={0}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") go(cur - 1);
                if (e.key === "ArrowRight") go(cur + 1);
              }}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
                touchX.current = null;
              }}
              className="group/media relative isolate h-full min-h-[400px] touch-pan-y overflow-hidden rounded-[22px] bg-[#dfe9ef] shadow-[0_30px_60px_-36px_rgba(11,51,70,.55)] min-[1081px]:min-h-0 min-[701px]:max-[1080px]:min-h-[440px]"
            >
              {SLIDES.map((sl, i) => (
                <Image
                  key={i}
                  src={sl.image}
                  alt={sl.name}
                  fill
                  priority={i === 0}
                  sizes="(min-width:1081px) 700px, 100vw"
                  className={`object-cover object-[center_35%] transition-[opacity,transform] duration-[900ms,7000ms] ease-linear ${i === cur ? "scale-100 opacity-100" : "scale-[1.07] opacity-0"}`}
                />
              ))}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(6,31,43,.35)_0%,transparent_26%,transparent_52%,rgba(6,31,43,.82)_100%)]" />

              <span className="absolute left-4 top-4 z-[2] inline-flex h-[34px] items-center gap-2 rounded-full bg-white/95 py-0 pl-1.5 pr-3.5 text-[13px] font-semibold backdrop-blur-sm">
                <Image src={s.icon} alt="" width={24} height={24} className="size-6 rounded-full bg-[#eaf5fc] p-[3px]" />
                <span>{s.name}</span>
              </span>

              <button
                onClick={() => go(cur - 1)}
                aria-label={L.previous}
                className="absolute left-3.5 top-1/2 z-[2] grid size-[38px] -translate-y-1/2 place-items-center rounded-full bg-white/90 transition hover:bg-brand hover:text-white min-[701px]:size-[42px] min-[701px]:-translate-x-1.5 min-[701px]:opacity-0 min-[701px]:group-hover/media:translate-x-0 min-[701px]:group-hover/media:opacity-100 min-[701px]:focus-visible:translate-x-0 min-[701px]:focus-visible:opacity-100"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                onClick={() => go(cur + 1)}
                aria-label={L.next}
                className="absolute right-3.5 top-1/2 z-[2] grid size-[38px] -translate-y-1/2 place-items-center rounded-full bg-white/90 transition hover:bg-brand hover:text-white min-[701px]:size-[42px] min-[701px]:translate-x-1.5 min-[701px]:opacity-0 min-[701px]:group-hover/media:translate-x-0 min-[701px]:group-hover/media:opacity-100 min-[701px]:focus-visible:translate-x-0 min-[701px]:focus-visible:opacity-100"
              >
                <ChevronRight size={18} aria-hidden />
              </button>

              <div className="absolute inset-x-5 bottom-[18px] z-[2] flex items-end justify-between gap-3 text-white">
                <p className={`max-w-[58%] text-[15px] leading-[1.4] transition-opacity duration-[350ms] max-[700px]:hidden ${fading ? "opacity-0" : ""}`}>
                  <b className="mb-[3px] block text-[11.5px] font-semibold uppercase tracking-[0.12em] opacity-75">{s.name}</b>
                  {s.caption}
                </p>
                <button
                  onClick={() => setVideo(true)}
                  className="group/v inline-flex h-11 flex-none items-center gap-2.5 rounded-full bg-white py-0 pl-1.5 pr-4 text-sm font-bold text-navy shadow-[0_10px_24px_-10px_rgba(0,0,0,.5)] transition-colors hover:bg-brand hover:text-white"
                >
                  <span className="relative grid size-8 place-items-center rounded-full bg-brand transition-colors group-hover/v:bg-white">
                    <span className="absolute -inset-1 animate-pulse-ring rounded-full border-2 border-brand/55 motion-reduce:animate-none" aria-hidden />
                    <Play size={12} fill="currentColor" className="text-white group-hover/v:text-brand" aria-hidden />
                  </span>
                  {L.videoCta}
                </button>
              </div>
              <span className="sr-only">{active.name}</span>
            </div>
          </Reveal>
        </div>

        {/* facilities */}
        <Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 min-[701px]:grid-cols-4 min-[701px]:gap-2.5 min-[1081px]:grid-cols-8">
            {c.facilities.map((f) => {
              const target = (f.slide ?? 1) - 1;
              const on = target === cur;
              return (
                <button
                  key={f.label}
                  title={L.facilityHint}
                  onClick={() => {
                    go(target);
                    mediaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className={`flex min-h-[58px] cursor-pointer items-center gap-2.5 rounded-xl border bg-white px-2.5 py-2 text-left text-[13.5px] leading-tight shadow-[0_4px_12px_-8px_rgba(11,51,70,.18)] transition duration-300 hover:-translate-y-0.5 hover:border-[#bfe1f3] hover:shadow-[0_12px_22px_-14px_rgba(47,165,222,.55)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand ${
                    on ? "border-brand shadow-[0_0_0_3px_rgba(47,165,222,.18)]" : "border-[#e3ebf0]"
                  }`}
                >
                  <span className="grid size-[38px] flex-none place-items-center rounded-[10px] bg-[#eef7fd]">
                    <Image src={f.icon} alt="" width={26} height={26} className="size-[26px]" />
                  </span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* video modal */}
      {video && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(3,15,21,.86)] p-4" role="dialog" aria-modal="true" aria-label={L.videoCta} onClick={() => setVideo(false)}>
          <div className="relative aspect-video w-[min(1100px,100%)] bg-black" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setVideo(false)} className="absolute -top-10 right-0 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white">
              <X size={16} aria-hidden /> {L.close}
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${c.videoId}?autoplay=1&rel=0`}
              title={L.videoTitle}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const PEI_PANELS = [
  { img: "/media/about/art.jpg", side: "Riche et varié", title: "Un programme riche et varié", text: "Un curriculum diversifié qui stimule l'apprentissage." },
  { img: "/media/about/sport.jpg", side: "Méthodes dynamiques", title: "Des méthodes dynamiques", text: "Des approches pédagogiques actives et engageantes." },
  { img: "/media/about/labs.jpg", side: "Par la recherche", title: "Apprendre par la recherche", text: "Explorer, questionner et découvrir activement." },
  { img: "/media/about/classes.jpg", side: "Pensée critique", title: "La pensée critique", text: "Développer le raisonnement et l'application concrète." },
];

const DUR = 5000;

export type Panel = { img: string; side: string; title: string; text: string };

/** Accordion of 4 image panels; auto-advances while in view, pauses on hover/focus. */
export function PeiPanels({ panels = PEI_PANELS }: { panels?: Panel[] }) {
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (hold || !visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % panels.length), DUR);
    return () => clearTimeout(t);
  }, [cur, hold, visible, panels.length]);

  const focusPanel = (i: number) => refs.current[(i + panels.length) % panels.length]?.focus();

  return (
    <div
      ref={wrap}
      className="relative z-[1] flex h-[380px] gap-3 max-md:h-auto max-md:flex-col max-md:gap-2.5"
      onMouseLeave={() => setHold(false)}
    >
      {panels.map((p, i) => {
        const open = i === cur;
        return (
          <div
            role="button"
            key={p.title}
            ref={(el) => { refs.current[i] = el; }}
            tabIndex={0}
            aria-expanded={open}
            onMouseEnter={() => { setHold(true); setCur(i); }}
            onClick={() => { setHold(true); setCur(i); }}
            onFocus={() => { setHold(true); setCur(i); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); focusPanel(i + 1); }
              if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); focusPanel(i - 1); }
            }}
            className={`relative min-w-0 cursor-pointer overflow-hidden rounded-3xl outline-none transition-[flex-grow,height] duration-700 ease-out-expo focus-visible:shadow-[0_0_0_3px_var(--color-sun)] max-md:flex-none ${
              open ? "grow-[3.4] max-md:h-[260px]" : "grow max-md:h-[76px]"
            } basis-0 max-md:basis-auto`}
          >
            <Image
              src={p.img}
              alt=""
              fill
              sizes="(min-width:1024px) 700px, 100vw"
              className={`object-cover transition-transform duration-[1200ms] ease-out-expo ${open ? "scale-100" : "scale-[1.08]"}`}
            />
            <span
              aria-hidden
              className={`absolute inset-0 z-[1] transition-colors duration-500 ${
                open ? "bg-[linear-gradient(180deg,rgba(11,51,70,.35)_0%,rgba(11,51,70,.55)_45%,rgba(11,51,70,.92)_100%)]" : "bg-[rgba(11,51,70,.72)]"
              }`}
            />
            <span className="absolute left-6 top-[22px] z-[2] text-sm font-bold tracking-[0.08em] text-sun max-md:left-5 max-md:top-7">
              {String(i + 1).padStart(2, "0")}
            </span>
            {/* closed state: vertical title (horizontal on mobile) */}
            <span
              aria-hidden
              className={`absolute bottom-[26px] left-1/2 z-[2] origin-top-left -rotate-90 -translate-y-1/2 whitespace-nowrap text-[17px] font-semibold tracking-[-0.01em] text-white transition-opacity duration-300 max-md:bottom-auto max-md:left-16 max-md:top-[26px] max-md:translate-y-0 max-md:rotate-0 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            >
              {p.side}
            </span>
            {/* open state: content */}
            <div
              className={`absolute inset-x-8 bottom-[30px] z-[2] max-w-[460px] text-white transition-[opacity,transform] duration-500 max-md:inset-x-5 max-md:bottom-[22px] ${
                open ? "translate-y-0 opacity-100 delay-[250ms]" : "translate-y-4 opacity-0"
              }`}
            >
              <span aria-hidden className="mb-3.5 block text-6xl font-bold leading-[0.9] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.55)] md:text-[68px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(21px,2vw,28px)] font-bold leading-tight tracking-[-0.015em]">{p.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-[1.6] text-white/80">{p.text}</p>
            </div>
            {/* progress line */}
            <span
              aria-hidden
              className="absolute bottom-0 left-0 z-[3] h-[3px] bg-sun"
              style={{
                width: open && !hold && visible ? "100%" : "0%",
                transition: open && !hold && visible ? `width ${DUR}ms linear` : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

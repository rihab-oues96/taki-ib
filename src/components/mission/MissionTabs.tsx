"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

type Mission = {
  id: string;
  tab: string;
  tabLong?: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
  /** Optional logo shown above the text. */
  logo?: { src: string; alt: string; width: number; height: number };
  link?: { href: string; label: string };
};

const MISSIONS: Mission[] = [
  {
    id: "ib",
    tabLong: "Mission de ",
    tab: "l’IB",
    kicker: "Baccalauréat International",
    title: "Bâtir un monde meilleur et plus paisible",
    text: "Le Baccalauréat International a pour but de développer chez les jeunes la curiosité intellectuelle, les connaissances et la sensibilité nécessaires pour contribuer à bâtir un monde meilleur et plus paisible, dans un esprit d’entente mutuelle et de respect interculturel.",
    image: "/media/about/courtyard.jpg",
    logo: { src: "/brand/ib-logo.png", alt: "International Baccalaureate", width: 467, height: 145 },
    link: { href: "https://www.ibo.org/fr/", label: "En savoir plus sur ibo.org" },
  },
  {
    id: "ecole",
    tabLong: "Mission de ",
    tab: "l’établissement",
    kicker: "TakiAcademy International School",
    title: "Préparer nos élèves aux défis du monde",
    text: "Fournir une éducation de qualité conforme au système du Baccalauréat International (IB), favorisant ainsi le développement académique, inspirer et préparer nos élèves à relever les défis globaux avec intégrité et dévouement.",
    image: "/media/about/building.jpg",
  },
];

/** "Nos missions" tab switcher: sliding white pill, arrow-key navigation (Figma Mission page). */
export function MissionTabs() {
  const [current, setCurrent] = useState(1);
  const barRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  const place = useCallback(() => {
    const t = tabRefs.current[current];
    if (t) setPill({ x: t.offsetLeft, w: t.offsetWidth });
  }, [current]);

  useEffect(() => {
    place();
    window.addEventListener("resize", place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [place]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const next = (i + n + MISSIONS.length) % MISSIONS.length;
    setCurrent(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div
        ref={barRef}
        role="tablist"
        aria-label="Nos missions"
        className="relative mx-auto mt-9 flex w-max max-w-full overflow-x-auto rounded-full bg-[#eef6fb] p-2 shadow-[0_24px_48px_-36px_rgba(11,51,70,.35)] [scrollbar-width:none] max-[900px]:w-full max-[600px]:w-max max-[600px]:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-0 rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(11,51,70,.35),0_0_0_1px_rgba(11,51,70,.04)] transition-[transform,width] duration-500 ease-out-expo motion-reduce:transition-none"
          style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
        />
        {MISSIONS.map((m, i) => {
          const on = i === current;
          return (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${m.id}`}
              aria-controls={`pane-${m.id}`}
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => setCurrent(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`relative z-10 h-14 whitespace-nowrap rounded-full px-7 text-[17px] transition-colors duration-300 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun max-[900px]:h-12 max-[900px]:flex-[1_0_auto] max-[900px]:px-[18px] max-[900px]:text-[15px] max-[600px]:px-3.5 max-[600px]:text-[14.5px] ${
                on ? "font-bold text-navy" : "font-semibold text-brand-light hover:text-brand"
              }`}
            >
              <span className="max-[600px]:hidden">{m.tabLong}</span>
              {m.tab}
            </button>
          );
        })}
      </div>

      <div className="relative mt-10">
        {MISSIONS.map((m, i) => (
          <div
            key={m.id}
            role="tabpanel"
            id={`pane-${m.id}`}
            aria-labelledby={`tab-${m.id}`}
            hidden={i !== current}
            className="grid animate-fade-up items-center gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-14"
          >
            <figure className="relative aspect-[5/4] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-50px_rgba(11,51,70,.6)]">
              <Image
                src={m.image}
                alt=""
                fill
                sizes="(min-width:1024px) 560px, 100vw"
                className="object-cover"
              />
            </figure>
            <div>
              {m.logo && (
                <Image
                  src={m.logo.src}
                  alt={m.logo.alt}
                  width={m.logo.width}
                  height={m.logo.height}
                  className="-ml-3 mb-1 h-auto w-[200px]"
                />
              )}
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand">{m.kicker}</p>
              <h3 className="mt-3 text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.12] tracking-[-0.03em] text-navy">
                {m.title}
              </h3>
              <p className="mt-[18px] text-[17px] leading-[1.7] text-[#5d6f7c]">{m.text}</p>
              {m.link && (
                <a
                  href={m.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-[22px] inline-flex items-center gap-2 text-[15px] font-bold text-brand transition-colors hover:text-navy"
                >
                  {m.link.label}
                  <ArrowRight size={14} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

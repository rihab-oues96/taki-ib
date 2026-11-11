"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";

const PANELS = [
  { img: "classes", side: "Baccalauréat International", title: "Baccalauréat International (IB)", text: "Un diplôme reconnu par les universités du monde entier." },
  { img: "courtyard", side: "Ouverture aux autres", title: "Ouverture aux autres", text: "Des élèves curieux, à l’écoute et ouverts sur le monde." },
  { img: "sport", side: "Apprentissage intégral", title: "Un apprentissage intégral", text: "L’esprit, le corps et la créativité grandissent ensemble." },
  { img: "multimedia", side: "Des parents informés", title: "Des parents informés", text: "Suivez les présences, les notes, les bulletins, les devoirs et les messages via la plateforme Web School." },
];

const DUR = 5000;

export function Why() {
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const auto = visible && !hold;
  useEffect(() => {
    if (!auto) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % PANELS.length), DUR);
    return () => clearTimeout(t);
  }, [cur, auto]);

  const openAt = (i: number) => {
    setHold(true);
    setCur(i);
  };
  const focusAt = (i: number) => panelRefs.current[(i + PANELS.length) % PANELS.length]?.focus();

  return (
    <section ref={rootRef} id="pourquoi" aria-labelledby="whyTitle" className="relative overflow-hidden bg-[#114f6e] px-4 pb-[52px] pt-12 text-white sm:px-6 min-[701px]:pb-[68px] min-[701px]:pt-14">
      <div className="relative z-[1] mx-auto w-[min(1200px,100%)]">
        <div className="mb-6 grid items-end gap-x-[72px] gap-y-6 min-[701px]:mb-7 min-[1001px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Reveal>
            <p className="mb-3 inline-flex items-center gap-2.5 text-[13.5px] font-medium uppercase tracking-[0.06em] text-white/80">
              <span className="h-1 w-[26px] rounded bg-sun" aria-hidden />
              Pourquoi nous choisir
            </p>
            <h2 id="whyTitle" className="text-[clamp(30px,3.2vw,42px)] font-bold leading-[1.1] tracking-[-0.025em]">
              Une{" "}
              <em className="not-italic text-brand-light">
                éducation{" "}
                <span className="relative whitespace-nowrap">
                  internationale
                  <Image src="/media/why/3lines.svg" alt="" aria-hidden width={39} height={38} className="pointer-events-none absolute -right-[30px] -top-5 hidden w-[30px] -scale-x-100 brightness-[1.7] min-[701px]:block" />
                </span>
              </em>
              , au cœur de Sousse.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[15.5px] leading-[1.6] text-white/80">
              Le cursus conduit nos élèves à un baccalauréat reconnu mondialement et leur offrira ainsi des opportunités d’études universitaires à l’international.
            </p>
            <ButtonLink href="/mission" variant="solid" className="mt-6">Notre Mission</ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="flex flex-col gap-2.5 min-[701px]:h-80 min-[701px]:flex-row min-[701px]:gap-3"
            onMouseLeave={() => setHold(false)}
          >
            {PANELS.map((p, i) => {
              const open = i === cur;
              const num = String(i + 1).padStart(2, "0");
              return (
                <article
                  key={p.img}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  onMouseEnter={() => openAt(i)}
                  onClick={() => openAt(i)}
                  onFocus={() => openAt(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      focusAt(i + 1);
                    }
                    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      focusAt(i - 1);
                    }
                  }}
                  className={`relative min-w-0 cursor-pointer overflow-hidden rounded-3xl outline-none transition-[flex-grow,height] duration-700 ease-out-expo focus-visible:shadow-[0_0_0_3px_#f6c21c] max-[700px]:flex-none ${
                    open ? "max-[700px]:h-[250px] min-[701px]:grow-[3.4]" : "max-[700px]:h-[76px] min-[701px]:grow"
                  } min-[701px]:flex-1 min-[701px]:basis-0`}
                >
                  <Image
                    src={`/media/about/${p.img}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width:701px) 700px, 100vw"
                    className={`object-cover transition-transform duration-[1200ms] ease-out-expo ${open ? "scale-100" : "scale-[1.08]"}`}
                  />
                  <div
                    className={`absolute inset-0 z-[1] transition-colors duration-[600ms] ${
                      open ? "bg-[linear-gradient(180deg,rgba(11,51,70,.35)_0%,rgba(11,51,70,.55)_45%,rgba(11,51,70,.92)_100%)]" : "bg-[rgba(11,51,70,.72)]"
                    }`}
                  />
                  <span className="absolute left-5 top-7 z-[2] text-sm font-bold tracking-[0.08em] text-sun min-[701px]:left-6 min-[701px]:top-[22px]">{num}</span>

                  {/* closed: vertical title on desktop, inline on mobile */}
                  <span
                    aria-hidden
                    className={`absolute z-[2] whitespace-nowrap text-[17px] font-semibold tracking-[-0.01em] transition-opacity duration-[350ms] max-[700px]:left-16 max-[700px]:top-[26px] min-[701px]:bottom-[26px] min-[701px]:left-1/2 min-[701px]:origin-top-left min-[701px]:-rotate-90 min-[701px]:-translate-y-1/2 ${open ? "opacity-0" : ""}`}
                  >
                    {p.side}
                  </span>

                  {/* open: content */}
                  <div
                    className={`absolute bottom-[22px] left-5 right-5 z-[2] max-w-[460px] transition duration-500 min-[701px]:bottom-[30px] min-[701px]:left-8 min-[701px]:right-8 ${
                      open ? "translate-y-0 opacity-100 delay-[250ms]" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <span aria-hidden className="mb-3.5 block text-[60px] font-bold leading-[.9] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,.55)] min-[701px]:text-[68px]">{num}</span>
                    <h3 className="text-[21px] font-bold leading-[1.2] tracking-[-0.015em] min-[701px]:text-[clamp(22px,2vw,28px)]">{p.title}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-[1.6] text-white/80">{p.text}</p>
                  </div>

                  {/* progress line */}
                  <span
                    key={`${i}-${open}-${hold}`}
                    className="absolute bottom-0 left-0 z-[3] h-[3px] bg-sun"
                    style={open && !hold ? { animation: `why-bar ${DUR}ms linear forwards` } : { width: 0 }}
                  />
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

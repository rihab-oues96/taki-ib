"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink } from "@/components/ui";
import type { DiplomaContent } from "@/lib/content/home";

const fmt = (n: number) => n.toLocaleString("fr-FR");

function Count({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1600);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{fmt(v)}</>;
}

// Rendered width hints of the two IB logos (44px high).
const LOGO_SIZES = ["220px", "160px"];

export function Diploma({ content: c }: { content: DiplomaContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="diplome" aria-labelledby="dipTitle" className="bg-[#f4f8fb] px-4 py-[60px] text-navy min-[561px]:py-20">
      <div ref={ref} className="mx-auto grid w-[min(1200px,100%)] items-center gap-x-[72px] gap-y-10 min-[961px]:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2.5 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#5d6f7c]">
            <span className="h-1 w-[26px] rounded bg-sun" aria-hidden />
            {c.eyebrow}
          </p>
          <h2 id="dipTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em]">
            {rich(c.title, "not-italic text-brand")}
          </h2>
          <p className="mt-4 max-w-[440px] text-[17px] leading-[1.6] text-[#5d6f7c]">
            {c.text}
          </p>
          <ButtonLink href={c.cta.href} variant="navy" className="mt-7">{c.cta.label}</ButtonLink>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#e1eaf0] pt-[22px] text-sm leading-[1.45] text-[#5d6f7c]">
            <div className="flex flex-none items-center gap-3">
              {c.logos.map((logo, i) => (
                <Image key={logo.image} src={logo.image} alt={logo.alt} width={logo.width ?? 512} height={logo.height ?? 156} quality={100} sizes={LOGO_SIZES[i] ?? "220px"} className="h-11 w-auto flex-none" />
              ))}
            </div>
            <p>
              <strong className="block text-[14.5px] text-navy">{c.official.title}</strong>
              <a href={c.official.linkHref} target="_blank" rel="noopener" className="font-bold text-navy underline decoration-sun decoration-2 underline-offset-4 hover:text-brand hover:decoration-brand">
                {c.official.linkLabel}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_90%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-5 pb-6 pt-[26px] text-white shadow-[0_40px_80px_-46px_rgba(11,51,70,.85)] min-[561px]:px-9 min-[561px]:pb-[30px] min-[561px]:pt-[34px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/60">{c.journeyTitle}</p>
            <ol className="relative mt-[22px] grid grid-cols-3">
              <li aria-hidden className="absolute inset-x-[16.66%] top-[18px] h-[3px] rounded bg-white/15 min-[561px]:top-[21px]">
                <span
                  className="absolute inset-0 origin-left rounded bg-linear-to-r from-brand-light to-sun transition-transform duration-[1400ms] ease-out motion-reduce:transition-none"
                  style={{ transform: inView ? "scaleX(1)" : "scaleX(0)", transitionDelay: "500ms" }}
                />
              </li>
              {c.stops.map((s, i) => (
                <li key={s.name} className="relative flex flex-col items-center px-1.5 text-center">
                  <span
                    className={`grid size-[38px] place-items-center rounded-full text-[12.5px] font-bold min-[561px]:size-11 min-[561px]:text-sm ${
                      i === c.stops.length - 1 ? "bg-sun text-navy shadow-[0_0_0_6px_rgba(246,194,28,.2)]" : "bg-navy text-white shadow-[inset_0_0_0_2px_#6ebfe8]"
                    }`}
                  >
                    {s.dot || <ArrowUpRight size={18} strokeWidth={2.6} aria-hidden />}
                  </span>
                  <p className="mt-2.5 text-[14.5px] font-bold tracking-[-0.01em] min-[561px]:mt-3.5 min-[561px]:text-[17px]">{s.name}</p>
                  <p className="mt-1 text-xs text-white/60 min-[561px]:text-[13.5px]">{s.age}</p>
                </li>
              ))}
            </ol>
            <dl className="mt-[30px] grid grid-cols-2 border-t border-white/15">
              {c.stats.map((stat, i) => (
                <div key={stat.label} className={i === 0 ? "pt-[22px]" : "border-l border-white/15 pl-[18px] pt-[22px] min-[561px]:pl-7"}>
                  <dt className="text-[clamp(40px,4vw,56px)] font-bold leading-none tracking-[-0.045em] tabular-nums">
                    <Count to={stat.value ?? 0} run={inView} />
                    {stat.suffix && <sup className="ml-0.5 align-top text-[.5em] text-sun">{stat.suffix}</sup>}
                  </dt>
                  <dd className="mt-2 text-[13px] leading-[1.45] text-white/70 min-[561px]:text-[14.5px]">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-[18px] text-xs text-white/50">
              {c.source.label}{" "}
              <a href={c.source.linkHref} target="_blank" rel="noopener" className="underline underline-offset-[3px] hover:text-white">
                {c.source.linkLabel}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

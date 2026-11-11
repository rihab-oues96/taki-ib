"use client";

import { useEffect, useState } from "react";

const QUALITIES: [string, string][] = [
  ["Chercheurs", "Ils cultivent leur curiosité, apprennent à mener des recherches et gardent l'envie d'apprendre toute leur vie."],
  ["Informés et instruits", "Ils explorent des idées et des enjeux d'importance locale et mondiale, dans de nombreuses disciplines."],
  ["Sensés", "Ils analysent des problèmes complexes avec un esprit critique et créatif, et agissent de façon responsable."],
  ["Communicatifs", "Ils s'expriment avec assurance dans plusieurs langues et écoutent attentivement les autres."],
  ["Intègres", "Ils agissent avec honnêteté, avec un sens profond de l'équité et du respect de chacun."],
  ["Ouverts d'esprit", "Ils apprécient leur propre culture et restent ouverts aux valeurs et aux points de vue des autres."],
  ["Altruistes", "Ils font preuve d'empathie et s'engagent pour aider les autres et protéger leur environnement."],
  ["Audacieux", "Ils abordent l'incertitude avec courage, osent essayer de nouvelles idées et défendent leurs convictions."],
  ["Équilibrés", "Ils prennent soin de l'équilibre entre leur esprit, leur corps et leur bien-être."],
  ["Réfléchis", "Ils prennent du recul sur leurs apprentissages pour comprendre leurs forces et progresser."],
];

const DUR = 4500;

export function LearnerProfileExplorer() {
  const [cur, setCur] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setCur((c) => (c + 1) % QUALITIES.length), DUR);
    return () => clearTimeout(t);
  }, [cur, hold]);

  const [title, text] = QUALITIES[cur];

  return (
    <div onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div role="group" aria-label="Les dix qualités" className="flex flex-wrap gap-2">
        {QUALITIES.map(([name], i) => (
          <button
            key={name}
            type="button"
            aria-pressed={i === cur}
            onClick={() => { setHold(true); setCur(i); }}
            className={`h-10 cursor-pointer rounded-full px-4 text-[14.5px] font-semibold transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun ${
              i === cur ? "bg-brand text-white" : "bg-white text-navy hover:text-brand hover:shadow-[inset_0_0_0_1.5px_var(--color-brand)]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <div
        aria-live="polite"
        className="relative mt-[18px] min-h-[210px] overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_85%_0%,#14587a_0%,#0b3346_60%,#082a3a_100%)] px-[34px] pb-[34px] pt-[30px] text-white max-sm:px-6"
      >
        <div key={cur} className="animate-fade-up">
          <span className="text-[13px] font-bold tracking-[0.08em] text-sun">{String(cur + 1).padStart(2, "0")} / 10</span>
          <h3 className="mt-2.5 text-[clamp(26px,2.6vw,34px)] font-bold leading-[1.1] tracking-[-0.025em]">{title}</h3>
          <p className="mt-3 max-w-[540px] text-[16.5px] leading-[1.6] text-white/80">{text}</p>
        </div>
        <span
          key={`bar-${cur}-${hold}`}
          aria-hidden
          className="absolute bottom-0 left-0 h-[3px] bg-sun"
          style={hold ? { width: 0 } : { width: "100%", animation: `pei-bar ${DUR}ms linear` }}
        />
      </div>
    </div>
  );
}

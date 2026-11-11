"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { ButtonLink } from "../ui";

const QUALITIES = [
  ["Chercheurs", "Ils cultivent leur curiosité et aiment apprendre."],
  ["Informés et instruits", "Ils explorent de nombreuses disciplines."],
  ["Penseurs", "Ils analysent et agissent de façon responsable."],
  ["Communicatifs", "Ils s’expriment avec assurance, en plusieurs langues."],
  ["Intègres", "Ils agissent avec honnêteté et justice."],
  ["Ouverts d’esprit", "Ils apprécient leur culture et celles des autres."],
  ["Altruistes", "Ils font preuve d’empathie et s’engagent."],
  ["Audacieux", "Ils abordent l’incertitude avec courage."],
  ["Équilibrés", "Ils prennent soin de leur bien-être."],
  ["Réfléchis", "Ils évaluent leurs apprentissages pour progresser."],
] as const;

/** Positions of the ten cards around the centred text on desktop (Figma floating collage). */
const POS = [
  "left-0 top-2.5",
  "left-[230px] top-[70px]",
  "left-5 top-[250px]",
  "left-10 bottom-[120px]",
  "left-[250px] bottom-5",
  "right-0 top-2.5",
  "right-[230px] top-[60px]",
  "right-5 top-[250px]",
  "right-10 bottom-[120px]",
  "right-[250px] bottom-5",
] as const;

/** "Le profil de l'apprenant de l'IB": ten qualities floating around the heading. */
export function LearnerProfile() {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="profil" aria-labelledby="lpTitle" className="relative overflow-hidden bg-white px-4 py-[72px]">
      <div className="relative mx-auto flex w-[min(1200px,100%)] flex-col min-[1001px]:block min-[1001px]:h-[700px]">
        <div className="mx-auto mb-7 w-auto text-center min-[1001px]:absolute min-[1001px]:top-1/2 min-[1001px]:left-1/2 min-[1001px]:z-10 min-[1001px]:mb-0 min-[1001px]:w-[min(440px,38%)] min-[1001px]:-translate-x-1/2 min-[1001px]:-translate-y-1/2">
          <p className="mb-4 inline-flex items-center gap-2.5 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#5d6f7c]">
            <span className="h-1 w-[26px] rounded bg-sun" aria-hidden />
            Le profil de l’apprenant de l’IB
          </p>
          <h2
            id="lpTitle"
            className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
          >
            Dix qualités, <em className="not-italic text-brand">un même élève</em>.
          </h2>
          <p className="mx-auto mt-4 max-w-95 text-[17px] leading-[1.6] text-[#5d6f7c]">
            Le profil de l’apprenant guide l’enseignement et la vie de l’école, dans tous les programmes de l’IB.
          </p>
          <div className="mt-6">
            <ButtonLink href="https://ibtakiacademyschool.com/documents/learner-profile-fr.pdf" external>
              <Download size={16} strokeWidth={2.4} aria-hidden />
              Télécharger le profil (PDF)
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 min-[1001px]:block">
          {QUALITIES.map(([t, d], i) => (
            <div
              key={t}
              style={{ transitionDelay: seen ? `${0.06 * i + 0.1}s` : "0s" }}
              className={`group rounded-[18px] bg-[#f4f8fb] px-[18px] py-4 transition-[opacity,transform,background,box-shadow] duration-700 ease-out-expo hover:bg-navy hover:shadow-[0_26px_50px_-26px_rgba(11,51,70,.6)] min-[1001px]:absolute min-[1001px]:z-[2] min-[1001px]:w-[200px] min-[1001px]:hover:z-[4] ${POS[i]} ${
                seen ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-75 opacity-0"
              }`}
            >
              <b className="block text-[12.5px] font-bold tracking-[0.06em] text-brand transition-colors group-hover:text-sun">
                {String(i + 1).padStart(2, "0")}
              </b>
              <h3 className="mt-1.5 text-[18px] font-bold tracking-[-0.015em] text-navy transition-colors group-hover:text-white">
                {t}
              </h3>
              <p className="mt-1 text-[13.5px] leading-[1.45] text-[#5d6f7c] transition-colors group-hover:text-white/70">
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

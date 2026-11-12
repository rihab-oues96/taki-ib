"use client";

import { useEffect, useState } from "react";
import type { ValuesContent } from "@/lib/content/mission";

/** Navy card where the highlighted value travels down the list (Figma "Nos valeurs"). */
export function ValuesCard({ content }: { content: ValuesContent }) {
  const VALUES = content.items;
  const [on, setOn] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setOn((v) => (v + 1) % VALUES.length), 2600);
    return () => clearInterval(id);
  }, [hold, VALUES.length]);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_90%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-5 py-[26px] text-white shadow-[0_40px_80px_-46px_rgba(11,51,70,.85)] sm:px-9 sm:py-[34px]">
      <p className="mb-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white/60">{content.cardTitle}</p>
      <ul className="relative">
        <span
          aria-hidden
          className="absolute top-[30px] bottom-[30px] left-[21px] w-0.5 bg-linear-to-b from-brand-light to-sun opacity-60"
        />
        {VALUES.map(({ title: t, text: d }, i) => {
          const active = on === i;
          const last = i === VALUES.length - 1;
          return (
            <li
              key={t}
              onMouseEnter={() => {
                setHold(true);
                setOn(i);
              }}
              onMouseLeave={() => setHold(false)}
              className={`relative grid grid-cols-[44px_1fr] items-start gap-[18px] py-4 ${i > 0 ? "border-t border-white/10" : ""}`}
            >
              <span
                className={`relative z-10 grid size-11 place-items-center rounded-full text-sm font-bold transition-all duration-500 ${
                  active
                    ? last
                      ? "scale-[1.06] bg-sun text-navy shadow-[0_0_0_6px_rgba(246,194,28,.22)]"
                      : "scale-[1.06] bg-brand shadow-[0_0_0_6px_rgba(47,165,222,.22)]"
                    : "bg-navy shadow-[inset_0_0_0_2px_var(--color-brand-light)]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mt-2 text-[18px] font-bold tracking-[-0.01em]">{t}</h3>
                <p className="mt-1 text-[14.5px] leading-normal text-white/70">{d}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

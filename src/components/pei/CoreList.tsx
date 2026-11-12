"use client";

import { useEffect, useState } from "react";
import type { CoreItem } from "@/lib/content/programmes";

/** Dark card listing the DP core; the highlighted dot travels down every 2.6s, or follows hover. */
export function CoreList({ label, items }: { label: string; items: CoreItem[] }) {
  const [on, setOn] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (hold || items.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setOn((o) => (o + 1) % items.length), 2600);
    return () => clearTimeout(t);
  }, [on, hold, items.length]);

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_90%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-5 py-[26px] text-white shadow-[0_40px_80px_-46px_rgba(11,51,70,.85)] sm:px-9 sm:py-[34px]">
      <p className="mb-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white/60">{label}</p>
      <ul className="relative" onMouseLeave={() => setHold(false)}>
        <span aria-hidden className="absolute bottom-[30px] left-[21px] top-[30px] w-0.5 bg-linear-to-b from-brand-light to-sun opacity-60" />
        {items.map((item, i) => {
          const active = i === on;
          const last = i === items.length - 1;
          return (
            <li
              key={i}
              onMouseEnter={() => { setHold(true); setOn(i); }}
              className={`relative grid grid-cols-[44px_1fr] items-start gap-[18px] py-4 ${i > 0 ? "border-t border-white/10" : ""}`}
            >
              <span
                className={`relative z-[1] grid size-11 place-items-center rounded-full text-sm font-bold transition duration-500 ${
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
                <h3 className="mt-2 text-lg font-bold tracking-[-0.01em]">{item.title}</h3>
                <p className="mt-1 text-[14.5px] leading-[1.5] text-white/70">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

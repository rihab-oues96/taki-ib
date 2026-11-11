"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarClock } from "lucide-react";
import type { Policy } from "@/lib/policies";

/** `?activePolicy=N` is 1-based, matching the school's existing website. */
function indexFromUrl(count: number) {
  const n = Number(new URLSearchParams(window.location.search).get("activePolicy"));
  return Number.isInteger(n) && n >= 1 && n <= count ? n - 1 : 0;
}

export function PolicyViewer({ policies }: { policies: Policy[] }) {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Sync with the URL after hydration so the static HTML stays cacheable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(indexFromUrl(policies.length));
    const onPop = () => setActive(indexFromUrl(policies.length));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [policies.length]);

  function select(i: number, focus = false) {
    setActive(i);
    const url = new URL(window.location.href);
    url.searchParams.set("activePolicy", String(i + 1));
    window.history.replaceState(null, "", url);
    if (focus) tabs.current[i]?.focus();
    else if (window.innerWidth < 1024) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const last = policies.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? (i + 1) % policies.length
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? (i - 1 + policies.length) % policies.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : -1;
    if (next >= 0) {
      e.preventDefault();
      select(next, true);
    }
  }

  const p = policies[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-3 hidden text-sm font-bold uppercase tracking-[0.08em] text-brand-deep lg:block">
          Nos politiques
        </p>
        <div
          role="tablist"
          aria-label="Politiques de l'établissement"
          aria-orientation="vertical"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {policies.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={i === active}
              aria-controls="policy-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`group flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-left text-sm font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:rounded-2xl lg:px-5 lg:py-4 lg:text-base ${
                i === active
                  ? "bg-navy text-white shadow-lg lg:translate-x-1"
                  : "bg-[#f4f8fb] text-navy hover:bg-brand/15"
              }`}
            >
              <span
                className={`font-semibold tracking-[-0.03em] text-lg ${i === active ? "text-sun" : "text-brand-deep/60"}`}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="lg:hidden">{x.short}</span>
              <span className="hidden lg:inline">{x.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        ref={panel}
        role="tabpanel"
        id="policy-panel"
        aria-labelledby={`tab-${p.id}`}
        tabIndex={0}
        className="scroll-mt-28 outline-none"
      >
        <div key={p.id} className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-sun/25 px-4 py-1.5 text-sm font-bold">
            <CalendarClock size={16} aria-hidden /> {p.review}
          </p>
          <h2 className="mt-5 font-semibold text-[clamp(32px,3.6vw,50px)] leading-[1.08] tracking-[-0.035em]">{p.title}</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{p.intro}</p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {p.facts.map((f) => (
              <div key={f.label} className="rounded-3xl bg-navy p-6 text-white">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-semibold tracking-[-0.03em] text-4xl text-sun">{f.value}</dd>
                <dd className="mt-2 text-sm leading-snug text-white/75" aria-hidden>
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 divide-y divide-navy/10 border-t border-navy/10">
            {p.sections.map((s, i) => (
              <section key={s.heading} className="grid gap-4 py-8 md:grid-cols-[220px_1fr] md:gap-10">
                <h3 className="text-[20px] font-semibold tracking-[-0.015em] leading-snug">
                  <span className="mb-1 block font-semibold tracking-[-0.03em] text-3xl text-brand/40" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h3>
                <div className="space-y-4 leading-relaxed text-ink-soft">
                  {s.paras?.map((t) => (
                    <p key={t} className="text-[17px]">
                      {t}
                    </p>
                  ))}
                  {s.items && (
                    <ul className="space-y-3">
                      {s.items.map((t) => (
                        <li key={t} className="flex gap-3 text-[17px]">
                          <span className="mt-2.5 size-2 shrink-0 rounded-full bg-sun" aria-hidden />
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

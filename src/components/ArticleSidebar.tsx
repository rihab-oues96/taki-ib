"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";

export type TocItem = { id: string; label: string };

/** Thin reading-progress bar pinned to the top of the viewport. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <i className="block h-full w-full origin-left bg-linear-to-r from-brand to-sun" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

const SHARE_BTN =
  "relative grid size-[42px] place-items-center rounded-full bg-[#f4f8fb] text-navy transition duration-200 hover:-translate-y-0.5 hover:bg-navy hover:text-white";

/** Sticky sidebar: table of contents (scroll-spy) + share links. */
export function ArticleSidebar({ toc, url, title }: { toc: TocItem[]; url: string; title: string }) {
  const [active, setActive] = useState(toc[0]?.id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const onScroll = () => {
      let cur = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= 140) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const enc = encodeURIComponent(url);
  const label = "mb-3.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-[#5d6f7c]";

  return (
    <aside className="flex flex-col gap-8 max-lg:order-2 max-lg:mt-12 max-lg:border-t max-lg:border-[#e3ebf0] max-lg:pt-7 lg:sticky lg:top-[110px] lg:self-start">
      {toc.length > 1 && (
        <nav aria-label="Sommaire" className="max-lg:hidden">
          <p className={label}>Sommaire</p>
          <ol className="border-l-2 border-[#e3ebf0]">
            {toc.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className={`-ml-0.5 block border-l-2 py-2 pl-4 text-[14.5px] leading-[1.4] transition-colors ${
                    active === t.id ? "border-brand font-bold text-navy" : "border-transparent text-[#5d6f7c] hover:text-navy"
                  }`}
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div>
        <p className={label}>Partager</p>
        <div className="flex gap-2">
          <a className={SHARE_BTN} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook" href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" /></svg>
          </a>
          <a className={SHARE_BTN} target="_blank" rel="noopener noreferrer" aria-label="Partager sur LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6.9 8.6H3.6V20h3.3zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8M20.4 13.4c0-3.1-1.7-4.9-4.2-4.9-1.9 0-2.8 1-3.2 1.8V8.6H9.7V20H13v-5.9c0-1.5.3-3 2.2-3s1.9 1.8 1.9 3.1V20h3.3z" /></svg>
          </a>
          <a className={SHARE_BTN} target="_blank" rel="noopener noreferrer" aria-label="Partager sur WhatsApp" href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5m0 17.3a7.8 7.8 0 0 1-4-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A7.8 7.8 0 1 1 12 19.8m4.3-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.4 6.4 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.1 3.6c1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3" /></svg>
          </a>
          <button type="button" onClick={copy} aria-label="Copier le lien" className={SHARE_BTN}>
            {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
            <span
              role="status"
              className={`pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-2.5 py-[5px] text-xs font-semibold text-white transition-opacity ${copied ? "opacity-100" : "opacity-0"}`}
            >
              {copied ? "Lien copié" : ""}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

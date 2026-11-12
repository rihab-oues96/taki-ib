"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { rich } from "@/components/Rich";
import type { ClassActivitiesContent } from "@/lib/content/home-2";

const DEPTH = [18, 30, 14, 10, 28, 16, 24, 12];

export function ClassActivities({ content }: { content: ClassActivitiesContent }) {
  const { tiles, labels } = content;
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [video, setVideo] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // entrance when the section scrolls into view
  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    // fallback: reveal if already on screen (or after scrolling) even if the observer is slow
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) {
        setInView(true);
        io.disconnect();
      }
    };
    const t = setTimeout(check, 400);
    addEventListener("scroll", check, { passive: true });
    return () => {
      io.disconnect();
      clearTimeout(t);
      removeEventListener("scroll", check);
    };
  }, []);

  // close modal on Escape
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setVideo(null);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [video]);

  const onMove = (e: React.MouseEvent) => {
    const stage = stageRef.current;
    if (!stage || innerWidth <= 900 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    stage.querySelectorAll<HTMLElement>(".tile__par").forEach((p, i) => {
      const depth = DEPTH[i % DEPTH.length];
      p.style.transform = `translate(${-px * depth}px,${-py * depth}px)`;
    });
  };
  const onLeave = () => {
    stageRef.current?.querySelectorAll<HTMLElement>(".tile__par").forEach((p) => (p.style.transform = ""));
  };

  const enter = (yt: string) => {
    if (innerWidth <= 900 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hoverTimer.current = setTimeout(() => setPreview(yt), 250);
  };
  const leave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setPreview(null);
  };

  return (
    <section ref={secRef} className={`act ${inView ? "in" : ""}`} id="activites" aria-labelledby="actTitle">
      <div className="act__stage" ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave}>
        <div className="act__strip">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={`tile ${t.videoId ? "tile--v" : ""} t${i + 1}`}
              style={{ transitionDelay: inView ? "0s" : `${0.08 * i + 0.1}s` }}
              onMouseEnter={t.videoId ? () => enter(t.videoId) : undefined}
              onMouseLeave={t.videoId ? leave : undefined}
            >
              <div className="tile__par">
                <div className="tile__float">
                  {t.videoId ? (
                    <button
                      type="button"
                      className="tile__m"
                      aria-label={`${labels.playVideo} ${t.videoTitle}`}
                      onClick={() => {
                        leave();
                        setVideo(t.videoId);
                      }}
                    >
                      <Image src={t.image} alt="" fill sizes="200px" />
                      {preview === t.videoId && (
                        <span className="tile__prev" style={{ opacity: 1 }}>
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${t.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${t.videoId}&playsinline=1&rel=0&modestbranding=1`}
                            allow="autoplay; encrypted-media"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title={labels.previewTitle}
                            tabIndex={-1}
                          />
                        </span>
                      )}
                      <span className="tile__badge">{labels.videoBadge}</span>
                      <span className="tile__play" aria-hidden />
                      <span className="tile__lbl">{t.label}</span>
                    </button>
                  ) : (
                    <figure className="tile__m" style={{ margin: 0 }}>
                      <Image src={t.image} alt={t.alt} fill sizes="240px" />
                      <span className="tile__lbl">{t.label}</span>
                    </figure>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="act__center">
          <p className="act__eyebrow">{content.eyebrow}</p>
          <h2 className="act__title" id="actTitle">
            {rich(content.title)}
          </h2>
          <p className="act__text">{content.text}</p>
          <Link href={content.cta.href} className="act__cta">
            {content.cta.label}
            <i aria-hidden>
              <ArrowRight size={16} strokeWidth={2.6} />
            </i>
          </Link>
        </div>
      </div>

      {video && (
        <div
          className="act-modal"
          role="dialog"
          aria-modal="true"
          aria-label={labels.modalLabel}
          onClick={(e) => e.target === e.currentTarget && setVideo(null)}
        >
          <div className="act-modal__box">
            <button className="act-modal__close" onClick={() => setVideo(null)}>
              {labels.close} <X size={14} aria-hidden />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title={labels.modalTitle}
            />
            <a
              className="act-modal__yt"
              href={`https://www.youtube.com/shorts/${video}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {labels.youtubeFallback}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

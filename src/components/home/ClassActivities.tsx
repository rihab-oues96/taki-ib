"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

type Tile = {
  cls: string;
  src: string;
  alt: string;
  label: string;
  yt?: string;
  videoTitle?: string;
};

const TILES: Tile[] = [
  { cls: "t1", src: "/media/activites/act-1.jpg", alt: "Élèves pendant une expérience en classe", label: "Sciences" },
  { cls: "t2", src: "/media/activites/v-OGEgn4PXJUQ.jpg", alt: "", label: "Projet design", yt: "OGEgn4PXJUQ", videoTitle: "From design to impact" },
  { cls: "t3", src: "/media/activites/act-3.jpg", alt: "Deux élèves jouant aux échecs", label: "Échecs" },
  { cls: "t4", src: "/media/activites/sport.jpg", alt: "Élèves pendant une activité sportive en équipe", label: "Sport" },
  { cls: "t5", src: "/media/activites/v-FbQW6uC6Iv0.jpg", alt: "", label: "Tournoi de football", yt: "FbQW6uC6Iv0", videoTitle: "TakiAcademy Champions League" },
  { cls: "t6", src: "/media/activites/clubs.jpg", alt: "Élèves et encadrant réunis lors d’un club", label: "Clubs" },
  { cls: "t7", src: "/media/activites/v-sPvUT4VxuqY.jpg", alt: "", label: "Défis", yt: "sPvUT4VxuqY", videoTitle: "Ready to take on the challenge" },
  { cls: "t8", src: "/media/activites/act-2.jpg", alt: "Élèves mesurant pendant un atelier pratique", label: "Ateliers" },
];

const DEPTH = [18, 30, 14, 10, 28, 16, 24, 12];

export function ClassActivities() {
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
      p.style.transform = `translate(${-px * DEPTH[i]}px,${-py * DEPTH[i]}px)`;
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
          {TILES.map((t, i) => (
            <div
              key={t.cls}
              className={`tile ${t.yt ? "tile--v" : ""} ${t.cls}`}
              style={{ transitionDelay: inView ? "0s" : `${0.08 * i + 0.1}s` }}
              onMouseEnter={t.yt ? () => enter(t.yt!) : undefined}
              onMouseLeave={t.yt ? leave : undefined}
            >
              <div className="tile__par">
                <div className="tile__float">
                  {t.yt ? (
                    <button
                      type="button"
                      className="tile__m"
                      aria-label={`Lire la vidéo : ${t.videoTitle}`}
                      onClick={() => {
                        leave();
                        setVideo(t.yt!);
                      }}
                    >
                      <Image src={t.src} alt="" fill sizes="200px" />
                      {preview === t.yt && (
                        <span className="tile__prev" style={{ opacity: 1 }}>
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${t.yt}?autoplay=1&mute=1&controls=0&loop=1&playlist=${t.yt}&playsinline=1&rel=0&modestbranding=1`}
                            allow="autoplay; encrypted-media"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="Aperçu vidéo"
                            tabIndex={-1}
                          />
                        </span>
                      )}
                      <span className="tile__badge">Vidéo</span>
                      <span className="tile__play" aria-hidden />
                      <span className="tile__lbl">{t.label}</span>
                    </button>
                  ) : (
                    <figure className="tile__m" style={{ margin: 0 }}>
                      <Image src={t.src} alt={t.alt} fill sizes="240px" />
                      <span className="tile__lbl">{t.label}</span>
                    </figure>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="act__center">
          <p className="act__eyebrow">Les activités de classe</p>
          <h2 className="act__title" id="actTitle">
            Chaque jour, une<br />nouvelle <em>expérience</em>.
          </h2>
          <p className="act__text">Sciences, sport, clubs, projets, défis : nos élèves apprennent en faisant.</p>
          <Link href="/scholar-life" className="act__cta">
            Découvrir la vie scolaire
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
          aria-label="Vidéo des activités de classe"
          onClick={(e) => e.target === e.currentTarget && setVideo(null)}
        >
          <div className="act-modal__box">
            <button className="act-modal__close" onClick={() => setVideo(null)}>
              Fermer <X size={14} aria-hidden />
            </button>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title="Vidéo : activités de classe"
            />
            <a
              className="act-modal__yt"
              href={`https://www.youtube.com/shorts/${video}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              La vidéo ne se lance pas ? Regarder sur YouTube →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

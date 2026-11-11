"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Play, X } from "lucide-react";
import type { SchoolVideo } from "@/lib/school-videos";

type Open = (v: Pick<SchoolVideo, "id" | "kind" | "title">, trigger: HTMLElement | null) => void;
const Ctx = createContext<Open | null>(null);

/** Wraps the page: provides one shared YouTube lightbox for every thumbnail. */
export function VideoProvider({ children }: { children: ReactNode }) {
  const [video, setVideo] = useState<Pick<SchoolVideo, "id" | "kind" | "title"> | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open = useCallback<Open>((v, el) => {
    trigger.current = el;
    setVideo(v);
  }, []);

  const close = useCallback(() => {
    setVideo(null);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [video, close]);

  const short = video?.kind === "short";

  return (
    <Ctx.Provider value={open}>
      {children}
      {video && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
          onClick={(e) => e.target === e.currentTarget && close()}
          className="fixed inset-0 z-[100] grid place-items-center bg-[rgba(8,42,58,.82)] p-6 backdrop-blur-md"
        >
          <div className={`relative w-full animate-pop-in ${short ? "max-w-[380px]" : "max-w-[960px]"}`}>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Fermer la vidéo"
              className="absolute -top-[52px] -right-1.5 grid size-[42px] place-items-center rounded-full bg-white text-navy transition hover:bg-brand hover:text-white"
            >
              <X size={22} aria-hidden />
            </button>
            <div
              className={`mx-auto overflow-hidden rounded-[20px] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] ${
                short ? "aspect-[9/16] max-h-[82vh]" : "aspect-video"
              }`}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/** Thumbnail button that opens the shared lightbox. */
export function VideoThumb({
  video,
  className = "",
  sizes,
  tabIndex,
}: {
  video: SchoolVideo;
  className?: string;
  sizes: string;
  tabIndex?: number;
}) {
  const open = useContext(Ctx);
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      aria-label={`Lire la vidéo : ${video.title}`}
      onClick={(e) => open?.(video, e.currentTarget)}
      className={`group/v relative block cursor-pointer overflow-hidden bg-[#dbe8f0] p-0 focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun ${className}`}
    >
      <Image
        src={video.thumb}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out-expo group-hover/v:scale-[1.06]"
      />
      <span
        aria-hidden
        className="absolute bottom-3 left-3 grid size-10 place-items-center rounded-full bg-white/90 text-brand shadow-[0_8px_20px_-8px_rgba(0,0,0,.4)] transition duration-300 group-hover/v:scale-110 group-hover/v:bg-brand group-hover/v:text-white"
      >
        <Play size={14} fill="currentColor" strokeWidth={0} />
      </span>
    </button>
  );
}

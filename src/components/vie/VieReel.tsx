"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination } from "@/components/Pagination";
import { REEL_IDS, VIDEOS } from "@/lib/school-videos";
import { VideoThumb } from "./VideoPlayer";

const REEL = REEL_IDS.map((id) => VIDEOS.find((v) => v.id === id)).filter((v) => !!v);

/** Swipeable carousel of short videos: scroll-snap, arrow buttons, drag with the mouse. */
export function VieReel() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState({ active: 0, count: 1 });
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  // One "page" = the cards that fit in the viewport.
  const metrics = () => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? 200) + 14;
    const per = Math.max(1, Math.floor(el.clientWidth / step));
    const max = el.scrollWidth - el.clientWidth;
    return { el, pageW: step * per, max, count: Math.max(1, Math.ceil(max / (step * per)) + 1) };
  };

  const update = useCallback(() => {
    if (!track.current) return;
    const { el, pageW, max, count } = metrics();
    const atEnd = el.scrollLeft >= max - 4;
    setPage({ count, active: atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / pageW)) });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const goTo = (i: number) => {
    const { el, pageW, max } = metrics();
    el.scrollTo({ left: Math.min(max, i * pageW), behavior: "smooth" });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo((page.active + 1) % page.count);
    if (e.key === "ArrowLeft") goTo((page.active - 1 + page.count) % page.count);
  };

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Les dernières vidéos de l’école"
      className="relative bg-white pb-8 pt-2 sm:pb-16"
    >
      <div
        ref={track}
        tabIndex={-1}
        onScroll={update}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { down: true, x: e.clientX, left: track.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) d.moved = true;
          if (d.moved) track.current!.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
        onClickCapture={(e) => {
          // a drag must not open a video
          if (drag.current.moved) {
            e.stopPropagation();
            e.preventDefault();
            drag.current.moved = false;
          }
        }}
        className="flex cursor-grab snap-x snap-mandatory gap-3.5 overflow-x-auto scroll-smooth px-4 pb-18 [scrollbar-width:none] active:cursor-grabbing sm:px-[max(24px,calc((100vw-1280px)/2))] [&::-webkit-scrollbar]:hidden"
      >
        {REEL.map((v, i) => (
          <div key={v.id} role="group" aria-roledescription="diapositive" aria-label={`${i + 1} sur ${REEL.length}`} className="flex-none snap-start scroll-ml-4 sm:scroll-ml-6">
            <VideoThumb
              video={v}
              sizes="200px"
              className={`aspect-[9/16] w-[150px] rounded-[18px] shadow-[0_24px_40px_-30px_rgba(11,51,70,.6)] sm:w-[200px] sm:rounded-[22px] ${
                i % 2 ? "translate-y-[26px]" : ""
              }`}
            />
          </div>
        ))}
      </div>

      <Pagination className="mt-2" count={page.count} active={page.active} onChange={goTo} label="Vidéos" />
    </section>
  );
}

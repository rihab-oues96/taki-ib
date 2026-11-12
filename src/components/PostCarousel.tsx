"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination } from "./Pagination";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/content/actualites";

const GAP = 20;

export function PostCarousel({
  posts,
  labels,
}: {
  posts: Post[];
  labels: { readLabel: string; carouselLabel: string; paginationLabel: string };
}) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(posts.length);

  const step = () => {
    const card = track.current?.firstElementChild as HTMLElement | null;
    return (card?.offsetWidth ?? 280) + GAP;
  };

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const s = step();
    const max = Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / s));
    setCount(max + 1);
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setActive(atEnd ? max : Math.min(max, Math.round(el.scrollLeft / s)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = (i + count) % count; // défilement continu
    el.scrollTo({ left: n * step(), behavior: "smooth" });
  };

  return (
    <div className="mt-10">
      <ul
        ref={track}
        onScroll={measure}
        className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={labels.carouselLabel}
      >
        {posts.map((p) => (
          <li key={p.slug} className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]">
            <PostCard post={p} readLabel={labels.readLabel} />
          </li>
        ))}
      </ul>

      <Pagination className="mt-6" count={count} active={active} onChange={go} label={labels.paginationLabel} />
    </div>
  );
}

import Image from "next/image";
import { Camera, Video } from "lucide-react";
import type { MediaItem } from "@/lib/site";
import { Reveal } from "./Reveal";

function Tile({ item }: { item: MediaItem }) {
  const isVideo = item.kind !== "image";
  const hasMedia = item.kind === "youtube" ? !!item.youtubeId : !!item.src;

  return (
    <div className="group relative h-full overflow-hidden rounded-3xl bg-[#f4f8fb] ring-1 ring-navy/5">
      {hasMedia ? (
        item.kind === "image" ? (
          <Image
            src={item.src!}
            alt={item.title}
            fill
            sizes="(min-width:1024px) 40vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : item.kind === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            preload="metadata"
            playsInline
            aria-label={item.title}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
            title={item.title}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full border-0"
          />
        )
      ) : (
        <div className="absolute inset-0 m-3 grid place-items-center rounded-2xl border-2 border-dashed border-brand/30 text-center text-brand-deep">
          <div className="px-3">
            {isVideo ? <Video className="mx-auto" size={28} aria-hidden /> : <Camera className="mx-auto" size={28} aria-hidden />}
            <p className="mt-2 text-xs font-bold uppercase tracking-widest">
              {isVideo ? "Vidéo à ajouter" : "Photo à ajouter"}
            </p>
          </div>
        </div>
      )}
      {/* Légende */}
      {item.kind !== "youtube" && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 ${
            hasMedia ? "bg-linear-to-t from-navy/85 via-navy/40 to-transparent pt-12 text-white" : "text-navy"
          } ${isVideo && hasMedia ? "pb-14" : ""}`}
        >
          <p className={`font-bold leading-snug ${item.feature ? "text-[20px] sm:text-[22px]" : "text-sm sm:text-[15px]"}`}>{item.title}</p>
          {item.feature && item.caption && (
            <p className={`mt-1 text-sm ${hasMedia ? "text-white/80" : "text-ink-soft"}`}>{item.caption}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function MediaGallery({ items, label }: { items: MediaItem[]; label: string }) {
  return (
    <div
      role="list"
      aria-label={label}
      className="grid auto-rows-[190px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4"
    >
      {items.map((m, i) => (
        <Reveal
          key={m.title}
          delay={(i % 4) * 0.06}
          className={m.feature ? "col-span-2 row-span-2" : ""}
        >
          <div role="listitem" className="h-full">
            <Tile item={m} />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

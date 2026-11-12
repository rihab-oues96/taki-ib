import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/content/actualites";

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostCard({ post, readLabel, large = false }: { post: Post; readLabel: string; large?: boolean }) {
  return (
    <Link
      href={`/actuality/${post.slug}`}
      className={`group flex h-full overflow-hidden bg-white shadow-sm ring-1 ring-navy/5 transition-all hover:shadow-xl ${
        large ? "flex-col rounded-3xl lg:flex-row" : "flex-col rounded-2xl p-3 hover:-translate-y-1"
      }`}
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[4/3] lg:aspect-auto lg:w-1/2" : "aspect-[4/3] rounded-xl"}`}>
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width:1024px) 600px, 100vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-1 flex-col ${large ? "justify-center p-7 lg:p-12" : "px-2 pb-2 pt-4"}`}>
        <p className={`flex items-center gap-3 font-semibold text-ink-soft ${large ? "text-sm" : "text-xs"}`}>
          <span className="rounded-full bg-brand/10 px-3 py-1 text-brand-deep">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <h3 className={`${large ? "mt-4" : "mt-3"} font-semibold tracking-[-0.03em] leading-tight ${large ? "text-[clamp(28px,3vw,38px)]" : "text-[20px]"}`}>{post.title}</h3>
        <p className={`mt-2 leading-relaxed text-ink-soft ${large ? "" : "line-clamp-3 text-sm"}`}>{post.excerpt}</p>
        <span className={`${large ? "mt-6" : "mt-4"} inline-flex items-center gap-1.5 text-sm font-bold text-brand-deep`}>
          {readLabel}
          <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

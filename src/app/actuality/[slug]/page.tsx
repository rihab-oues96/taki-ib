import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ArticleSidebar, ReadingProgress } from "@/components/ArticleSidebar";
import { NewsCard } from "@/components/ActualityGrid";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { VideoProvider } from "@/components/vie/VideoPlayer";
import { NEWS_ITEMS } from "@/lib/news";
import { POSTS, SITE } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actuality/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const h2 = "scroll-mt-[110px] text-[clamp(25px,2.4vw,32px)] font-semibold leading-[1.18] tracking-[-0.025em] text-navy";

export default async function PostPage({ params }: PageProps<"/actuality/[slug]">) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const toc = post.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));
  const href = `/actuality/${post.slug}`;
  const more = NEWS_ITEMS.filter((i) => i.href !== href).slice(0, 3);
  const minutes = post.readMinutes ?? Math.max(1, Math.round(post.sections.flatMap((s) => s.body).join(" ").split(/\s+/).length / 200));

  return (
    <VideoProvider>
      <ReadingProgress targetId="article-body" />

      <section aria-labelledby="arTitle" className="bg-white px-4 pt-[120px] sm:pt-[150px]">
        <Reveal className="mx-auto w-[min(900px,100%)] text-center">
          <nav aria-label="Fil d’Ariane" className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#5d6f7c]">
            <Link
              href="/actuality"
              className="inline-flex items-center gap-2 rounded-full bg-[#f4f8fb] py-[7px] pr-3.5 pl-2.5 text-navy transition-colors hover:bg-[#e6f1f8] hover:text-brand"
            >
              <ArrowLeft size={16} strokeWidth={2.4} aria-hidden />
              Actualités
            </Link>
            <span aria-hidden>/</span>
            <span className="text-brand">{post.category}</span>
          </nav>
          <h1 id="arTitle" className="mt-6 text-balance text-[clamp(36px,4.6vw,64px)] font-semibold leading-[1.05] tracking-[-0.035em] text-navy">
            {post.title}
          </h1>
          <p className="mx-auto mt-[22px] max-w-[680px] text-[17px] leading-[1.6] text-[#5d6f7c] sm:text-[18.5px]">{post.excerpt}</p>
          <p className="mt-7 inline-flex items-center gap-3 text-left">
            <Image src="/brand/logo-light.svg" alt="" width={40} height={40} className="size-10 rounded-full bg-[#f4f8fb] object-contain p-1.5" />
            <span>
              <b className="block text-[14.5px] text-navy">{SITE.name.replace("Taki Academy", "TakiAcademy")}</b>
              <small className="block text-[13.5px] text-[#5d6f7c]">{minutes} min de lecture</small>
            </span>
          </p>
        </Reveal>
        <Reveal className="mx-auto mt-9 w-[min(1200px,100%)] sm:mt-12">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#dbe8f0] sm:aspect-[21/9] sm:rounded-[32px]">
            <Image src={post.image} alt="" fill priority sizes="(min-width:1200px) 1200px, 100vw" className="object-cover object-[50%_40%]" />
          </figure>
        </Reveal>
      </section>

      <section aria-label="Article" id="article-body" className="bg-white px-4 pt-12 pb-[72px] sm:pt-[72px] sm:pb-24">
        <div className="mx-auto grid w-[min(1200px,100%)] max-w-[720px] gap-0 lg:max-w-none lg:grid-cols-[240px_minmax(0,720px)] lg:justify-center lg:gap-[72px]">
          <ArticleSidebar toc={toc} url={`${SITE.url}${href}`} title={post.title} />
          <article>
            {post.keyPoints && (
              <Reveal>
                <div className="rounded-3xl bg-[#f4f8fb] px-5 py-[22px] sm:px-[30px] sm:py-7">
                  <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-brand">L’essentiel</p>
                  <ul className="mt-4 grid gap-3">
                    {post.keyPoints.map((k) => (
                      <li key={k} className="flex gap-3 text-[16.5px] font-semibold leading-[1.45] text-navy">
                        <span className="mt-px grid size-6 flex-none place-items-center rounded-full bg-sun text-navy">
                          <Check size={14} strokeWidth={3} aria-hidden />
                        </span>
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {post.sections.map((s, i) => (
              <div key={s.heading}>
                <h2 id={toc[i].id} className={`${h2} mt-11 sm:mt-14`}>{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-[18px] text-base leading-[1.75] text-[#3f5260] sm:text-[17.5px]">{p}</p>
                ))}
                {s.table && (
                  <div className="mt-[26px] overflow-x-auto rounded-[20px] shadow-[0_0_0_1px_#e3ebf0]">
                    <table className="w-full min-w-[520px] border-collapse text-[15px] leading-[1.45]">
                      <thead>
                        <tr>
                          <th scope="col" className="bg-navy p-4 text-left"><span className="sr-only">Critère</span></th>
                          <th scope="col" className="bg-brand px-[18px] py-4 text-left text-[13.5px] font-bold text-white">{s.table.head[0]}</th>
                          <th scope="col" className="bg-navy px-[18px] py-4 text-left text-[13.5px] font-bold text-white">{s.table.head[1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map(([k, a, b]) => (
                          <tr key={k} className="border-t border-[#e3ebf0] first:border-t-0 align-top">
                            <th scope="row" className="w-[28%] px-[18px] py-4 text-left font-bold text-navy">{k}</th>
                            <td className="bg-[#f2f8fc] px-[18px] py-4 font-semibold text-navy">
                              <span className="mr-2 -mb-1 inline-grid size-5 place-items-center rounded-full bg-sun text-navy">
                                <Check size={12} strokeWidth={3} aria-hidden />
                              </span>
                              {a}
                            </td>
                            <td className="px-[18px] py-4 text-[#5d6f7c]">{b}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {post.quote && (
              <blockquote className="mt-10 border-l-4 border-sun py-1 pl-7">
                <p className="text-[clamp(20px,1.9vw,24px)] font-semibold leading-[1.45] tracking-[-0.015em] text-navy">{post.quote}</p>
              </blockquote>
            )}
          </article>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="ctTitle" className="bg-white px-4 pb-[72px] sm:pb-24">
        <Reveal className="mx-auto w-[min(1200px,100%)]">
          <div className="grid items-center gap-7 overflow-hidden rounded-3xl bg-linear-to-br from-navy to-navy-900 p-[34px_22px] text-white sm:rounded-[32px] sm:p-14 lg:grid-cols-[1.25fr_.75fr] lg:gap-x-14">
            <div>
              <h2 id="ctTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em]">
                Une question sur <em className="not-italic text-brand-light">le programme IB</em>&nbsp;?
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-white/75">
                Notre équipe des admissions répond à toutes vos questions et vous accompagne dans l’inscription de votre enfant.
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-3 lg:items-start">
              <ButtonLink href={SITE.preRegistration} variant="solid" className="lg:min-w-60">Pré-inscription</ButtonLink>
              <ButtonLink href="/contact-us" variant="ghost" className="lg:min-w-60">Contactez-nous</ButtonLink>
              <p className="mt-1.5 text-[14.5px] text-white/75">
                Ou appelez les admissions au{" "}
                <a href={SITE.phoneHref} className="font-bold text-white underline decoration-sun decoration-2 underline-offset-4">{SITE.phone}</a>
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* À lire aussi */}
      <section aria-labelledby="moreTitle" className="bg-[#f4f8fb] px-4 py-16 sm:py-[88px] sm:pb-24">
        <div className="mx-auto w-[min(1200px,100%)]">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <h2 id="moreTitle" className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
              À lire <em className="not-italic text-brand">aussi</em>.
            </h2>
            <Link href="/actuality" className="group inline-flex items-center gap-2 text-[14.5px] font-bold text-navy transition-colors hover:text-brand">
              Toutes les actualités
              <ArrowRight size={14} strokeWidth={2.6} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
          <div className="mt-9 grid gap-x-[18px] gap-y-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {more.map((i) => <NewsCard key={i.title} item={i} />)}
          </div>
        </div>
      </section>
    </VideoProvider>
  );
}

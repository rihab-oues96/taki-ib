import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Diploma } from "@/components/home/Diploma";
import { Why } from "@/components/home/Why";
import { Inscription } from "@/components/home/Inscription";
import { ClassActivities } from "@/components/home/ClassActivities";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PostCarousel } from "@/components/PostCarousel";
import { Faq } from "@/components/Faq";
import { getEntries, getPage } from "@/lib/cms";
import type { Post } from "@/lib/content/actualites";
import type { HomeContent } from "@/lib/content/home";
import type { Testimonial, TestimonialVideo } from "@/lib/content/home-2";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPage<HomeContent>("home");
  // Empty fields fall back to the site-wide defaults defined in the root layout.
  return {
    ...(seo?.title ? { title: { absolute: seo.title } } : {}),
    ...(seo?.description ? { description: seo.description } : {}),
  };
}

export default async function Home() {
  const [c, posts, testimonials, testimonialVideos] = await Promise.all([
    getPage<HomeContent>("home"),
    getEntries<Post>("posts"),
    getEntries<Testimonial>("testimonials"),
    getEntries<TestimonialVideo>("testimonial-videos"),
  ]);

  return (
    <>
      {c.hero && <Hero content={c.hero} />}

      {c.about && <About content={c.about} />}

      {c.diploma && <Diploma content={c.diploma} />}

      {c.why && <Why content={c.why} />}

      {/* School life / class activities */}
      {c.classActivities && <ClassActivities content={c.classActivities} />}

      {c.inscription && <Inscription content={c.inscription} />}

      {/* Testimonials */}
      {c.testimonials && testimonials.length + testimonialVideos.length > 0 && (
        <section className="bg-white py-18 sm:py-12">
          <Container>
            <SectionHeading className="mx-auto text-center" eyebrow={c.testimonials.eyebrow} title={rich(c.testimonials.title, "text-brand")} />
          </Container>
          <TestimonialCarousel testimonials={testimonials} videos={testimonialVideos} labels={c.testimonials} />
        </section>
      )}

      {/* Actualités */}
      {c.news && posts.length > 0 && (
        <section className="bg-[#f4f8fb] py-18 sm:py-12">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow={c.news.eyebrow} title={rich(c.news.title, "text-brand")} />
              <Reveal><ButtonLink href={c.news.cta.href} variant="navy">{c.news.cta.label}</ButtonLink></Reveal>
            </div>
            <PostCarousel posts={posts} labels={c.news} />
          </Container>
        </section>
      )}

      <Faq />
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Diploma } from "@/components/home/Diploma";
import { Why } from "@/components/home/Why";
import { Inscription } from "@/components/home/Inscription";
import { ClassActivities } from "@/components/home/ClassActivities";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { PostCarousel } from "@/components/PostCarousel";
import { Faq } from "@/components/Faq";
import { POSTS } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />

      <About />

      <Diploma />

      <Why />

      {/* School life / class activities */}
      <ClassActivities />

      <Inscription />

      {/* Testimonials */}
      <section className="bg-white py-18 sm:py-12">
        <Container>
          <SectionHeading className="mx-auto text-center" eyebrow="En leurs mots" title={<>La voix de notre <em className="text-brand">communauté</em></>} />
        </Container>
        <TestimonialCarousel />
      </section>

      {/* Actualités */}
      <section className="bg-[#f4f8fb] py-18 sm:py-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Dernières actualités" title={<>Toutes nos <em className="text-brand">actualités</em></>} />
            <Reveal><ButtonLink href="/actuality" variant="navy">Tous les articles</ButtonLink></Reveal>
          </div>
          <PostCarousel posts={POSTS} />
        </Container>
      </section>

      <Faq />
    </>
  );
}

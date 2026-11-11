import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PolicyViewer } from "@/components/PolicyViewer";
import { ButtonLink, Container, PageHero } from "@/components/ui";
import { POLICIES } from "@/lib/policies";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politiques de l'établissement",
  description:
    "Admission, évaluation, inclusion, intégrité, langues et gestion des plaintes : les politiques de Taki Academy International School, pour le PEI et le DP de l'IB.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Politiques de l'établissement"
        title={<>Des règles claires, pour une <em className="text-brand-light">école de confiance</em></>}
        lead="Six politiques guident notre fonctionnement au quotidien, dans le PEI comme dans le Programme du diplôme de l'IB : elles sont écrites pour que les familles sachent à quoi s'attendre."
        image="/media/library.jpg"
      >
        <ButtonLink href="/contact-us">Poser une question</ButtonLink>
      </PageHero>

      <section className="py-16 sm:py-24">
        <Container>
          <PolicyViewer policies={POLICIES} />
        </Container>
      </section>

      <section className="bg-[#f4f8fb] py-16">
        <Container className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="font-semibold text-[clamp(32px,3.6vw,50px)] leading-[1.08] tracking-[-0.035em]">Une question sur l&apos;une de nos politiques ?</h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Les parents peuvent aussi poser leurs questions et suivre leurs demandes via la plateforme Webschool, canal officiel de communication avec l&apos;école.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3 md:justify-end">
            <ButtonLink href={SITE.parentPortal} external variant="dark">Portail parents</ButtonLink>
            <ButtonLink href="/contact-us" variant="brand">Contacter l&apos;école</ButtonLink>
          </Reveal>
        </Container>
      </section>

    </>
  );
}

import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-navy-900 pb-28 pt-48 text-white">
      <Container className="max-w-2xl text-center">
        <p className="font-semibold tracking-[-0.03em] text-8xl text-sun">404</p>
        <h1 className="mt-4 font-semibold tracking-[-0.03em] text-4xl">Cette page s&apos;est égarée</h1>
        <p className="mt-4 text-white/70">Retournons à l&apos;école.</p>
        <div className="mt-8 flex justify-center"><ButtonLink href="/" variant="sun">Retour à l&apos;accueil</ButtonLink></div>
      </Container>
    </section>
  );
}

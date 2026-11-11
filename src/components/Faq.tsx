import { Plus } from "lucide-react";
import { FAQ } from "@/lib/site";
import { Container, SectionHeading } from "./ui";

export function Faq() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow="Bon à savoir" title={<>Les questions que les parents <em className="text-brand">posent souvent</em></>} />
        <div className="divide-y divide-navy/10 border-y border-navy/10">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={22} className="shrink-0 text-brand-deep transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

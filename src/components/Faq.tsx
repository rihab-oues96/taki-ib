import { Plus } from "lucide-react";
import { getEntries, getGlobal } from "@/lib/cms";
import type { FaqItem } from "@/lib/content/global";
import { rich } from "./Rich";
import { Container, SectionHeading } from "./ui";

export async function Faq() {
  const [{ faq }, items] = await Promise.all([getGlobal(), getEntries<FaqItem>("faq")]);
  if (!faq || items.length === 0) return null;
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading eyebrow={faq.eyebrow} title={rich(faq.title, "text-brand")} />
        <div className="divide-y divide-navy/10 border-y border-navy/10">
          {items.map((f) => (
            <details key={f._id} className="group py-5">
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

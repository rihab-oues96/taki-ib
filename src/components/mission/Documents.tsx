import { Download } from "lucide-react";
import { Reveal } from "../Reveal";
import { Container, Eyebrow } from "../ui";

const RESOURCES = [
  { t: "Guide", p: "Les procédures, les services et les informations importantes, expliqués simplement." },
  { t: "Règlement intérieur", p: "Les règles et dispositions internes applicables au sein de l’établissement." },
  { t: "Certificats", p: "La liste et les modèles des certificats disponibles." },
];

const BASE = "https://ibtakiacademyschool.com/documents/";
const IB_DOCS = [
  { t: "Contextes mondiaux et explorations", p: "Les six contextes qui relient chaque apprentissage au monde réel.", f: "Contextes%20mondiaux%20et%20explorations%202.pdf" },
  { t: "Approches de l’apprentissage", p: "Les compétences qui aident chaque élève à apprendre à apprendre.", f: "Tableau%20des%20approches%20de%20l'apprentissage%201.pdf" },
  { t: "Chronologie de l’IB", p: "Les grandes étapes de l’histoire du Baccalauréat International.", f: "ib-history-timeline-fr.pdf" },
  { t: "Brochure de l’IB", p: "La présentation officielle de l’IB et de ses programmes.", f: "corporate-brochure-fr.pdf" },
  { t: "Profil de l’apprenant", p: "Les dix qualités que l’IB aide chaque élève à développer.", f: "learner-profile-fr.pdf" },
];

/** "Documents & ressources" (Figma Mission page): resource cards + navy IB documents board. */
export function Documents() {
  return (
    <section aria-labelledby="dcTitle" className="bg-[#f4f8fb] px-0 py-18 sm:py-24">
      <Container>
        <Reveal>
          <Eyebrow>Documents &amp; ressources</Eyebrow>
          <h2
            id="dcTitle"
            className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy"
          >
            Tout ce qu’il faut savoir, <em className="not-italic text-brand">en un clic</em>.
          </h2>
        </Reveal>

        <div className="mt-11 grid gap-4 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col gap-2.5 rounded-3xl bg-white px-[26px] pt-[26px] pb-6 shadow-[0_24px_50px_-40px_rgba(11,51,70,.5)]">
                <span
                  aria-hidden
                  className="text-[44px] leading-[0.8] font-bold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--color-brand-light)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3.5 text-[20px] font-bold tracking-[-0.015em] text-navy">{r.t}</h3>
                <p className="flex-1 text-[15px] leading-[1.55] text-[#5d6f7c]">{r.p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-5 overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_90%_0%,#14587a_0%,#0b3346_55%,#082a3a_100%)] px-[18px] pt-[26px] pb-5 text-white shadow-[0_40px_80px_-50px_rgba(11,51,70,.85)] sm:px-9 sm:pt-[34px] sm:pb-9">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white/60">Documents de l’IB</p>
                <h3 className="text-[clamp(22px,2.2vw,30px)] leading-[1.15] font-semibold tracking-[-0.025em]">
                  Les documents officiels, <em className="not-italic text-brand-light">à télécharger</em>.
                </h3>
              </div>
              <p className="rounded-full bg-white/8 px-3.5 py-[7px] text-[13px] font-semibold text-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]">
                {IB_DOCS.length} documents · PDF
              </p>
            </div>
            <div className="mt-[26px] grid gap-3 min-[701px]:grid-cols-3 min-[1101px]:grid-cols-5">
              {IB_DOCS.map((d) => (
                <a
                  key={d.t}
                  href={BASE + d.f}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-[20px] bg-white/6 px-[18px] pt-5 pb-[18px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.12)] transition duration-350 hover:-translate-y-1.5 hover:bg-white hover:text-navy hover:shadow-[0_26px_50px_-26px_rgba(0,0,0,.6)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-sun min-[701px]:min-h-[220px]"
                >
                  <span className="self-start rounded-[7px] bg-sun px-[9px] py-1 text-[11px] font-extrabold tracking-[0.08em] text-navy">
                    PDF
                  </span>
                  <h4 className="mt-[18px] text-[17px] leading-[1.25] font-bold tracking-[-0.01em]">{d.t}</h4>
                  <p className="mt-2 flex-1 text-[13.5px] leading-normal text-white/65 transition-colors group-hover:text-[#5d6f7c]">
                    {d.p}
                  </p>
                  <span className="mt-4 flex items-center justify-between border-t border-white/12 pt-3.5 text-[14px] font-bold transition-colors group-hover:border-[#e3ebf0]">
                    Télécharger
                    <i
                      aria-hidden
                      className="grid size-[34px] place-items-center rounded-full bg-white text-brand transition duration-350 group-hover:translate-y-[3px] group-hover:bg-brand group-hover:text-white"
                    >
                      <Download size={16} strokeWidth={2.4} />
                    </i>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

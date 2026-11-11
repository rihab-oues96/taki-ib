import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { Container, ButtonLink } from "./ui";

function Social({ href, label, path }: { href: string; label: string; path: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-brand hover:bg-brand"
    >
      <svg viewBox="0 0 24 24" className="size-5 fill-white" aria-hidden>
        <path d={path} />
      </svg>
    </a>
  );
}

const col = "space-y-3 text-[15px] text-white/70 [&_a]:transition-colors [&_a:hover]:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-brand/15 blur-3xl" />
      <Container className="relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image src="/brand/logo.png" alt={SITE.name} width={180} height={72} className="h-16 w-auto" />
            <p className="mt-6 max-w-xs leading-relaxed text-white/70">
              Une communauté scolaire IB à Sousse, où les élèves découvrent leur potentiel et
              se préparent au monde.
            </p>
            <div className="mt-6 flex gap-3">
              <Social
                href={SITE.social.facebook}
                label="Facebook"
                path="M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .3-1.7 1.7-1.7H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.300v2.100H7.500v3.400h2.800V22h3.200z"
              />
              <Social
                href={SITE.social.instagram}
                label="Instagram"
                path="M12 7.400A4.600 4.600 0 1 0 12 16.600 4.600 4.600 0 0 0 12 7.400zm0 7.600a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM17.800 5.500a1.100 1.100 0 1 0 0 2.200 1.100 1.100 0 0 0 0-2.200zM12 3c-2.300 0-2.600 0-3.500.1-2.900.1-4.300 1.500-4.400 4.400C4 8.400 4 8.700 4 11v2c0 2.300 0 2.600.1 3.500.1 2.900 1.500 4.300 4.400 4.400.9.1 1.200.1 3.500.1s2.600 0 3.500-.1c2.900-.1 4.300-1.500 4.400-4.400.1-.9.1-1.200.1-3.500v-2c0-2.300 0-2.600-.1-3.500-.1-2.900-1.500-4.300-4.400-4.400C14.600 3 14.300 3 12 3zm0 1.600c2.300 0 2.500 0 3.400.1 2.200.1 3.100 1 3.200 3.200.1.900.1 1.100.1 3.400v1.400c0 2.300 0 2.500-.1 3.400-.1 2.200-1 3.100-3.200 3.200-.9.1-1.100.1-3.400.1s-2.500 0-3.400-.1c-2.200-.1-3.100-1-3.200-3.200-.1-.9-.1-1.100-.1-3.400v-1.400c0-2.300 0-2.500.1-3.400.1-2.200 1-3.100 3.200-3.200.9-.1 1.100-.1 3.400-.1z"
              />
              <Social
                href={SITE.social.youtube}
                label="YouTube"
                path="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3L10 15z"
              />
              <Social
                href={SITE.social.linkedin}
                label="LinkedIn"
                path="M5 3.500a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3.300 9h3.400v11.500H3.300V9zm5.500 0h3.200v1.600h.1c.5-.9 1.600-1.900 3.400-1.900 3.600 0 4.300 2.400 4.300 5.500v6.300h-3.400v-5.600c0-1.300 0-3-1.900-3s-2.100 1.400-2.100 2.900v5.700H8.800V9z"
              />
            </div>
          </div>

          <nav aria-label="Explorer">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-light">Explorer</h2>
            <ul className={col}>
              <li><Link href="/mission">Notre mission</Link></li>
              <li><Link href="/middle-education-program">Éducation intermédiaire (PEI)</Link></li>
              <li><Link href="/diploma-program">Programme du diplôme (DP)</Link></li>
              <li><Link href="/scholar-life">Vie scolaire</Link></li>
              <li><Link href="/notre-equipe">Notre équipe</Link></li>
              <li><Link href="/establishment-policies">Politiques de l&apos;établissement</Link></li>
              <li><Link href="/actuality">Actualités</Link></li>
              <li><Link href="/jobs">Offres d&apos;emploi</Link></li>
            </ul>
          </nav>

          <nav aria-label="Familles">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-light">Familles</h2>
            <ul className={col}>
              <li><a href={SITE.preRegistration}>Pré-inscription</a></li>
              <li><Link href="/contact-us#visit">Réserver une visite de l&apos;école</Link></li>
              <li><a href={SITE.parentPortal} target="_blank" rel="noopener noreferrer">Portail parents</a></li>
              <li><a href={SITE.studentPortal} target="_blank" rel="noopener noreferrer">Portail élèves</a></li>
              <li><Link href="/contact-us">Contacter les admissions</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-brand-light">Nous rendre visite</h2>
            <ul className={col}>
              <li className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-sun" aria-hidden />{SITE.address}</li>
              <li className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-sun" aria-hidden /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
              <li className="flex gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-sun" aria-hidden /><a href={`mailto:${SITE.email}`} className="break-all">{SITE.email}</a></li>
            </ul>
            <ButtonLink href="/contact-us#visit" variant="sun" className="mt-6">
              Réserver une visite de l&apos;école
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:justify-between">
          <p>© 2026 {SITE.name}. Tous droits réservés.</p>
          <p>Les logos de l&apos;IB sont la propriété de l&apos;Organisation du Baccalauréat International.</p>
        </div>
      </Container>
    </footer>
  );
}

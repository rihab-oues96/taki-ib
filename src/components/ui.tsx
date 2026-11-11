import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[min(1280px,100%-2rem)] sm:w-[min(1280px,100%-3rem)] ${className}`}>
      {children}
    </div>
  );
}

type Variant = "solid" | "brand" | "ghost" | "dark" | "sun" | "navy" | "line";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-paper text-navy border-paper hover:bg-brand hover:text-white hover:border-brand",
  brand: "border-transparent bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(81,160,216,.65)]",
  sun: "bg-paper text-navy border-paper hover:bg-brand hover:text-white hover:border-brand",
  dark: "border-transparent bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(81,160,216,.65)]",
  navy:
    "border-transparent bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(81,160,216,.65)]",
  line: "bg-transparent text-navy border-[#cfdde6] hover:bg-brand hover:text-white hover:border-brand",
  ghost:
    "bg-white/10 text-white border-white/35 backdrop-blur hover:bg-brand hover:border-brand",
};

export function ButtonLink({
  href,
  children,
  variant = "brand",
  arrow = false,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-[1.5px] px-6 text-sm font-bold transition duration-300 focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full ${arrow ? "pr-[5px] max-[640px]:justify-between max-[640px]:pl-[22px]" : ""} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className={`grid size-9 flex-none place-items-center rounded-full bg-white transition duration-300 group-hover:translate-x-0.5 ${
            variant === "solid" ? "bg-navy! text-white group-hover:bg-white! group-hover:text-brand" : "text-brand"
          }`}
        >
          <ArrowRight size={14} strokeWidth={2.8} />
        </span>
      )}
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-3 inline-flex items-center gap-2.5 text-[13.5px] font-semibold uppercase tracking-[0.08em] ${
        light ? "text-brand-light" : "text-[#5d6f7c]"
      }`}
    >
      <span className="h-1 w-[26px] rounded bg-sun" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] [&_em]:not-italic ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className={`mt-4 text-[17px] leading-[1.6] ${light ? "text-white/75" : "text-[#5d6f7c]"}`}>
          {children}
        </p>
      )}
    </Reveal>
  );
}

/** Inner-page hero with its own accent photograph. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  /** Kept for compatibility; the banner no longer shows a photo. */
  image?: string;
  children?: ReactNode;
}) {
  return (
    // Banner from the Figma design (non-Home pages): white, centred, 80px fixed header offset above.
    <section className="relative isolate bg-white pt-[136px] pb-12 text-navy sm:pt-40 sm:pb-16">
      <Container>
        <Reveal className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(32px,4vw,56px)] font-semibold leading-[1.04] tracking-[-0.04em] text-navy [&_em]:not-italic [&_em]:text-brand">
            {title}
          </h1>
          <p className="mt-[18px] max-w-[600px] text-[17px] leading-[1.6] text-[#5d6f7c]">{lead}</p>
          {children && (
            <div className="mt-7 flex flex-wrap justify-center gap-3 max-[640px]:w-full max-[640px]:flex-col">
              {children}
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

/** Avatar générique, à remplacer par une vraie photo plus tard. */
export function Avatar({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-sky text-brand-deep ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <User size={Math.round(size / 2)} />
    </span>
  );
}

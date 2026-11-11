"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { ButtonLink } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  // A menu item with a dropdown is active when any of its children is the current page.
  const itemActive = (item: (typeof NAV)[number]) =>
    active(item.href) || ("children" in item && item.children.some((c) => active(c.href)));

  // Every page except Home uses the light header from the Figma design.
  const light = pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 z-40 transition-all duration-500 ${
        pathname === "/" && !scrolled && !open ? "top-10" : "top-0"
      } ${
        light
          ? "border-b border-[#e3ebf0] bg-white/92 text-navy backdrop-blur-xl"
          : scrolled || open
            ? "bg-navy-900/85 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-20 w-[min(1320px,100%-2rem)] items-center justify-between gap-8 sm:w-[min(1320px,100%-3rem)]"
      >
        <Link href="/" aria-label={`${SITE.name} — accueil`} className="shrink-0">
          <Image
            src="/brand/logo-light.svg"
            alt={SITE.name}
            width={180}
            height={72}
            priority
            unoptimized
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <ul
          className={`hidden items-center gap-5 text-[14px] font-medium lg:flex xl:gap-8 xl:text-[15px] ${
            light ? "text-navy" : "text-white"
          }`}
        >
          {NAV.slice(0, -1).map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={itemActive(item) ? "page" : undefined}
                className={`inline-flex items-center gap-1 py-2 transition-opacity hover:opacity-100 ${
                  itemActive(item) ? "opacity-100" : light ? "opacity-75" : "opacity-80"
                } ${
                  light && itemActive(item)
                    ? "font-bold shadow-[inset_0_-3px_0_var(--color-sun)]"
                    : ""
                }`}
              >
                {item.label}
                {"children" in item && <ChevronDown size={14} aria-hidden />}
              </Link>
              {"children" in item && (
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-2 rounded-2xl bg-white p-2 text-navy opacity-0 shadow-2xl transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#f4f8fb] hover:text-brand-deep"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {light ? (
            <>
              <ButtonLink href="/contact-us" variant="line" className="h-10 px-4.5 text-[13.5px]">
                Contactez-nous
              </ButtonLink>
              <ButtonLink href={SITE.preRegistration} variant="brand" className="h-10 px-4.5 text-[13.5px]">
                Pré-inscription
              </ButtonLink>
            </>
          ) : (
            <>
              <ButtonLink
                href="/contact-us"
                variant="ghost"
                className="h-10 border-paper/32! bg-paper/8! px-4.5 text-[13.5px] font-semibold! backdrop-blur-[6px] hover:border-brand! hover:bg-brand!"
              >
                Contactez-nous
              </ButtonLink>
              <ButtonLink
                href={SITE.preRegistration}
                variant="solid"
                className="h-10 px-4.5 text-[13.5px] font-semibold!"
              >
                Pré-inscription
              </ButtonLink>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className={`grid size-11 place-items-center rounded-full lg:hidden ${light ? "text-navy" : "text-white"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className={`h-[calc(100dvh-5rem)] overflow-y-auto px-6 pb-10 pt-4 lg:hidden ${light ? "bg-white text-navy" : "text-white"}`}
        >
          <ul className="space-y-1">
            {[
              { label: "Accueil", href: "/" },
              { label: "Notre mission", href: "/mission" },
              { label: "Éducation intermédiaire (PEI)", href: "/middle-education-program" },
              { label: "Programme du diplôme (DP)", href: "/diploma-program" },
              { label: "Vie scolaire", href: "/scholar-life" },
              { label: "Notre équipe", href: "/notre-equipe" },
              { label: "Politiques", href: "/establishment-policies" },
              { label: "Actualités", href: "/actuality" },
              { label: "Contact", href: "/contact-us" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b py-4 font-semibold tracking-[-0.03em] text-3xl ${
                    light ? "border-[#e3ebf0]" : "border-white/10"
                  } ${l.label.startsWith("—") ? "pl-5 text-xl text-white/70" : ""} ${
                    active(l.href) ? (light ? "text-brand" : "text-brand-light") : ""
                  }`}
                >
                  {l.label.replace("— ", "")}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <ButtonLink href="/contact-us" variant={light ? "line" : "ghost"}>
              Contactez-nous
            </ButtonLink>
            <ButtonLink href={SITE.preRegistration} variant={light ? "brand" : "solid"}>
              Pré-inscription
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}

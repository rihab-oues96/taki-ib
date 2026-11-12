"use client";

import { useEffect } from "react";

/** Rendered when a page cannot load its content (for instance when the CMS is unreachable). */
export default function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[70vh] place-items-center bg-white px-6 pt-32 pb-20 text-center">
      <div className="max-w-xl">
        <p className="mb-3 inline-flex items-center gap-2.5 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-[#5d6f7c]">
          <span className="h-1 w-[26px] rounded bg-sun" aria-hidden />
          Contenu indisponible
        </p>
        <h1 className="text-[clamp(30px,3.4vw,48px)] font-semibold leading-[1.08] tracking-[-0.035em] text-navy">
          Cette page ne peut pas s’afficher pour le moment.
        </h1>
        <p className="mt-4 text-[17px] leading-[1.6] text-[#5d6f7c]">
          Le contenu n’a pas pu être chargé. Merci de réessayer dans quelques instants.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] px-6 text-sm font-bold text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] transition duration-300 hover:-translate-y-0.5"
        >
          Réessayer
        </button>
      </div>
    </section>
  );
}

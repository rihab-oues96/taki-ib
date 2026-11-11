"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { SITE } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-navy/15 bg-white px-4 py-3.5 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20";

/** Spontaneous application. Opens the mail client (same approach as the contact form). */
export function JobApplicationForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Nom : ${d.get("name")}`,
      `Téléphone : ${d.get("phone")}`,
      `E-mail : ${d.get("email")}`,
      `Poste souhaité : ${d.get("role")}`,
      `Profil en ligne : ${d.get("link") || "-"}`,
      "",
      String(d.get("message") || ""),
      "",
      "(CV en pièce jointe)",
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Candidature spontanée — ${d.get("role")} — ${d.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-describedby="job-note">
      <label className="grid gap-2 text-sm font-bold">
        Nom et prénom
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Téléphone
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        E-mail
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Poste souhaité
        <input name="role" required placeholder="Ex. Enseignant de mathématiques" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">
        Lien vers votre CV ou profil LinkedIn (facultatif)
        <input name="link" type="url" placeholder="https://" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">
        Message
        <textarea name="message" rows={5} className={field} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] px-7 text-sm font-bold text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full max-[640px]:justify-center"
        >
          Envoyer une candidature <Send size={16} aria-hidden />
        </button>
        <p id="job-note" role="status" className="mt-4 text-sm text-ink-soft">
          {sent
            ? "Votre application de messagerie devrait s'ouvrir avec votre message prêt à être envoyé. N'oubliez pas d'y joindre votre CV."
            : "Cela ouvre votre application de messagerie : pensez à joindre votre CV avant d'envoyer."}
        </p>
      </div>
    </form>
  );
}

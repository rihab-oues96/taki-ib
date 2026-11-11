"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { SITE } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-navy/15 bg-white px-4 py-3.5 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Nom : ${d.get("name")}`,
      `Téléphone : ${d.get("phone")}`,
      `E-mail : ${d.get("email")}`,
      `Classe actuelle de l'enfant : ${d.get("grade") || "-"}`,
      `Sujet : ${d.get("topic")}`,
      "",
      String(d.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `${d.get("topic")} — ${d.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" aria-describedby="form-note">
      <label className="grid gap-2 text-sm font-bold">
        Nom du parent / tuteur
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
        Classe actuelle de l&apos;enfant (facultatif)
        <input name="grade" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">
        Je souhaite
        <select name="topic" className={field} defaultValue="Réserver une visite de l'école">
          <option>Réserver une visite de l&apos;école</option>
          <option>Me renseigner sur le Programme d&apos;éducation intermédiaire (PEI)</option>
          <option>Me renseigner sur le Programme du diplôme (DP)</option>
          <option>Commencer la pré-inscription</option>
          <option>Autre demande</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-bold sm:col-span-2">
        Message
        <textarea name="message" rows={5} className={field} />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-bold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          Envoyer aux admissions <Send size={16} aria-hidden />
        </button>
        <p id="form-note" role="status" className="mt-4 text-sm text-ink-soft">
          {sent
            ? "Votre application de messagerie devrait s'ouvrir avec votre message prêt à être envoyé. Si ce n'est pas le cas, écrivez-nous à l'adresse indiquée sur cette page."
            : "Cela ouvre votre application de messagerie avec votre message prêt à être envoyé à notre équipe des admissions."}
        </p>
      </div>
    </form>
  );
}

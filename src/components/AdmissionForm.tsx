"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { SITE } from "@/lib/site";

const field =
  "w-full rounded-2xl border border-navy/15 bg-white px-4 py-3.5 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20";
const label = "grid gap-2 text-sm font-bold";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-5 sm:grid-cols-2">
      <legend className="mb-5 text-[22px] font-semibold tracking-[-0.025em] text-navy">{title}</legend>
      {children}
    </fieldset>
  );
}

export function AdmissionForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) || "-");
    const body = [
      "PRÉ-INSCRIPTION 2026 – 2027",
      "",
      "— Premier responsable légal —",
      `Prénom : ${v("pFirst")}`,
      `Nom : ${v("pLast")}`,
      `Téléphone : ${v("pPhone")}`,
      `Adresse : ${v("pAddress")}`,
      `E-mail : ${v("pEmail")}`,
      "",
      "— Élève —",
      `Genre : ${v("gender")}`,
      `Niveau : ${v("level")}`,
      `Classe : ${v("grade")}`,
      `Prénom : ${v("sFirst")}`,
      `Nom : ${v("sLast")}`,
      `Date de naissance : ${v("birthdate")}`,
      `Lieu de naissance : ${v("birthplace")}`,
      `Téléphone : ${v("sPhone")}`,
      `Nationalité : ${v("nationality")}`,
      "",
      `École précédente : ${v("previous")}`,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Pré-inscription 2026-2027 — ${v("sFirst")} ${v("sLast")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-10" aria-describedby="admission-note">
      <Group title="Informations du parent">
        <label className={label}>Prénom<input name="pFirst" required autoComplete="given-name" className={field} /></label>
        <label className={label}>Nom<input name="pLast" required autoComplete="family-name" className={field} /></label>
        <label className={label}>Téléphone<input name="pPhone" type="tel" required autoComplete="tel" className={field} /></label>
        <label className={label}>E-mail<input name="pEmail" type="email" required autoComplete="email" className={field} /></label>
        <label className={`${label} sm:col-span-2`}>Adresse<input name="pAddress" required autoComplete="street-address" className={field} /></label>
      </Group>

      <Group title="Informations de l’élève">
        <label className={label}>Prénom<input name="sFirst" required className={field} /></label>
        <label className={label}>Nom<input name="sLast" required className={field} /></label>
        <label className={label}>
          Genre
          <select name="gender" defaultValue="Garçon" className={field}>
            <option>Garçon</option>
            <option>Fille</option>
          </select>
        </label>
        <label className={label}>Nationalité<input name="nationality" required className={field} /></label>
        <label className={label}>Date de naissance<input name="birthdate" type="date" required className={field} /></label>
        <label className={label}>Lieu de naissance<input name="birthplace" required className={field} /></label>
        <label className={label}>
          Niveau
          <select name="level" defaultValue="PEI" className={field}>
            <option value="PEI">Programme d’éducation intermédiaire (PEI)</option>
            <option value="DP">Programme du diplôme (DP)</option>
          </select>
        </label>
        <label className={label}>Classe<input name="grade" required className={field} /></label>
        <label className={`${label} sm:col-span-2`}>Téléphone de l’élève (facultatif)<input name="sPhone" type="tel" className={field} /></label>
      </Group>

      <fieldset>
        <legend className="mb-5 text-[22px] font-semibold tracking-[-0.025em] text-navy">École précédente</legend>
        <div className="flex flex-wrap gap-3">
          {[
            ["Locale", "En Tunisie"],
            ["Étranger", "À l’étranger"],
          ].map(([value, text], i) => (
            <label key={value} className="cursor-pointer">
              <input type="radio" name="previous" value={text} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-12 items-center rounded-full border-[1.5px] border-[#cfdde6] px-6 text-sm font-bold text-navy transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-sun">
                {value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-transparent bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] px-6 text-sm font-bold text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(81,160,216,.65)] focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full"
        >
          Envoyer la pré-inscription <Send size={16} aria-hidden />
        </button>
        <p id="admission-note" role="status" className="mt-4 text-sm text-ink-soft">
          {sent
            ? "Votre application de messagerie devrait s'ouvrir avec votre demande prête à être envoyée. Sinon, écrivez-nous à l'adresse indiquée sur cette page."
            : "Cela ouvre votre application de messagerie avec votre demande prête à être envoyée à notre équipe des admissions."}
        </p>
      </div>
    </form>
  );
}

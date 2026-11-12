import { draftMode } from "next/headers";

/** Shown only while an editor previews unpublished changes from the backoffice. */
export async function PreviewBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-sun px-4 py-2.5 text-center text-sm font-semibold text-navy shadow-[0_-8px_24px_-12px_rgba(11,51,70,.5)]">
      <span>Mode aperçu : vous voyez les brouillons non publiés.</span>
      <a href="/api/preview/exit" className="rounded-full bg-navy px-4 py-1.5 text-[13px] font-bold text-white hover:bg-brand">
        Quitter l’aperçu
      </a>
    </div>
  );
}

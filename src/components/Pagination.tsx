import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Shared carousel pagination: ← [ • ▬ • • • ] →
 * Arrows wrap around unless `loop` is false (then they disable at the ends).
 */
export function Pagination({
  count,
  active,
  onChange,
  label = "Diapositive",
  loop = true,
  className = "",
}: {
  count: number;
  active: number;
  onChange: (index: number) => void;
  /** Used for the accessible name of each dot: "<label> 3". */
  label?: string;
  loop?: boolean;
  className?: string;
}) {
  if (count < 2) return null;
  const go = (i: number) => onChange(loop ? (i + count) % count : Math.min(count - 1, Math.max(0, i)));
  const arrow =
    "grid size-9 cursor-pointer place-items-center rounded-full text-navy transition hover:text-brand focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-sun disabled:pointer-events-none disabled:opacity-30";

  return (
    <nav aria-label="Pagination" className={`flex items-center justify-center gap-7 ${className}`}>
      <button type="button" onClick={() => go(active - 1)} disabled={!loop && active === 0} aria-label="Précédent" className={arrow}>
        <ArrowLeft size={20} strokeWidth={2} aria-hidden />
      </button>
      <div className="flex items-center gap-2 rounded-full bg-[#f1f3f3] px-4 py-3">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`${label} ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun ${
              i === active ? "w-8 bg-navy" : "w-1.5 bg-[#adb5bd] hover:bg-navy/50"
            }`}
          />
        ))}
      </div>
      <button type="button" onClick={() => go(active + 1)} disabled={!loop && active === count - 1} aria-label="Suivant" className={arrow}>
        <ArrowRight size={20} strokeWidth={2} aria-hidden />
      </button>
    </nav>
  );
}

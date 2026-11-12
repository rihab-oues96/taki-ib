import { Fragment, type ReactNode } from "react";

/**
 * Renders CMS text that uses the editor's light markup:
 * - `*mot*` highlights (an <em>, styled by the surrounding heading or by `emClassName`),
 * - `**mot**` is bold (a <strong>, optionally with `strongClassName`),
 * - a line break in the text becomes a <br />.
 */
export function rich(text: string | undefined | null, emClassName?: string, strongClassName?: string): ReactNode {
  if (!text) return null;
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, j) => {
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className={strongClassName}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={j} className={emClassName}>
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      })}
    </Fragment>
  ));
}

/** Text without the markup, for attributes such as alt, aria-label or metadata. */
export function plain(text: string | undefined | null): string {
  return (text ?? "").replace(/\*/g, "");
}

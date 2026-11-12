"use client";

/** Last resort: the shared layout itself (menu, footer) could not load its content. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#fafafa", color: "#0b3346", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: 24 }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ fontSize: 34, lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0 }}>Le site est momentanément indisponible.</h1>
          <p style={{ color: "#5d6f7c", fontSize: 17, lineHeight: 1.6 }}>Le contenu n’a pas pu être chargé. Merci de réessayer dans quelques instants.</p>
          <button
            type="button"
            onClick={reset}
            style={{ height: 48, padding: "0 24px", borderRadius: 9999, border: 0, background: "linear-gradient(90deg,#2fa5de,#6ebfe8)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}

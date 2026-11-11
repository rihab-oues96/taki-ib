import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://takiacademy-redesign.example"),
  title: {
    default: `${SITE.name} — Programmes IB PEI et Diplôme à Sousse`,
    template: `%s | ${SITE.short}`,
  },
  description:
    "Taki Academy International School, à Sahloul (Sousse), propose le Programme d'éducation intermédiaire (PEI) et le Programme du diplôme (DP) de l'IB au sein d'une communauté multiculturelle centrée sur l'élève.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    images: ["/media/building.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${dmSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:font-bold focus:text-navy"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

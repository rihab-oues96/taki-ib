import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PreviewBanner } from "@/components/PreviewBanner";
import { SiteProvider } from "@/components/SiteProvider";
import { getGlobal, getSite } from "@/lib/cms";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL("https://takiacademy-redesign.example"),
    title: {
      default: site.seo.titleDefault,
      template: `%s | ${site.short}`,
    },
    description: site.seo.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      images: [site.seo.image],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { site, navigation } = await getGlobal();
  return (
    <html lang="fr" className={`${dmSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun focus:px-5 focus:py-3 focus:font-bold focus:text-navy"
        >
          {site.skipLink}
        </a>
        <SiteProvider site={site}>
          <Header nav={navigation} site={site} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SiteProvider>
        <Suspense fallback={null}>
          <PreviewBanner />
        </Suspense>
      </body>
    </html>
  );
}

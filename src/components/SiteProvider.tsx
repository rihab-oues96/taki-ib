"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteSettings } from "@/lib/content/global";

const SiteContext = createContext<SiteSettings | null>(null);

/** Makes the school's identity and contact details (managed in the CMS) available to client components. */
export function SiteProvider({ site, children }: { site: SiteSettings; children: ReactNode }) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteSettings {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite must be used inside <SiteProvider>");
  return site;
}

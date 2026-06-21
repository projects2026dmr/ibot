import wojewodztwa from "./wojewodztwa.json";
import powiaty from "./powiaty.json";

export interface Wojewodztwo {
  name: string;
  slug: string;
}

export interface Powiat {
  name: string;
  slug: string;
  wojSlug: string;
}

/* -------------------------------------------------------
   WOJEWÓDZTWA
------------------------------------------------------- */

export function getAllWojewodztwa(): Wojewodztwo[] {
  return wojewodztwa;
}

export function getWojewodztwoBySlug(slug: string): Wojewodztwo | undefined {
  return wojewodztwa.find((w) => w.slug === slug);
}

/* -------------------------------------------------------
   POWIATY
------------------------------------------------------- */

export function getAllPowiaty(): Powiat[] {
  return powiaty;
}

export function getPowiatBySlug(
  slug: string
): (Powiat & { woj: Wojewodztwo }) | undefined {
  const powiat = powiaty.find((p) => p.slug === slug);
  if (!powiat) return undefined;

  const woj = getWojewodztwoBySlug(powiat.wojSlug);
  if (!woj) return undefined;

  return { ...powiat, woj };
}

export function getPowiatyByWojewodztwo(wojSlug: string): Powiat[] {
  return powiaty.filter((p) => p.wojSlug === wojSlug);
}

/* -------------------------------------------------------
   SEO — WOJEWÓDZTWO
------------------------------------------------------- */

export function getWojSeoTitle(woj: Wojewodztwo): string {
  return `SEO w województwie ${woj.name} — Pozycjonowanie lokalne`;
}

export function getWojSeoDescription(woj: Wojewodztwo): string {
  return `Profesjonalne usługi SEO w województwie ${woj.name}. Skuteczne pozycjonowanie lokalne, optymalizacja stron i zwiększanie widoczności firm w Google.`;
}

/* -------------------------------------------------------
   SEO — POWIAT
------------------------------------------------------- */

export function getPowiatSeoTitle(powiat: Powiat & { woj: Wojewodztwo }): string {
  return `SEO w powiecie ${powiat.name} — Pozycjonowanie lokalne w ${powiat.woj.name}`;
}

export function getPowiatSeoDescription(
  powiat: Powiat & { woj: Wojewodztwo }
): string {
  return `Skuteczne pozycjonowanie lokalne w powiecie ${powiat.name} (${powiat.woj.name}). Zwiększamy widoczność firm w Google i pomagamy zdobywać klientów.`;
}

/* -------------------------------------------------------
   BREADCRUMB
------------------------------------------------------- */

export function getWojBreadcrumb(woj: Wojewodztwo) {
  return [
    { label: "Strona główna", href: "/" },
    { label: woj.name, href: `/wojewodztwo/${woj.slug}` }
  ];
}

export function getPowiatBreadcrumb(powiat: Powiat & { woj: Wojewodztwo }) {
  return [
    { label: "Strona główna", href: "/" },
    { label: powiat.woj.name, href: `/wojewodztwo/${powiat.woj.slug}` },
    { label: powiat.name, href: `/powiat/${powiat.slug}` }
  ];
}

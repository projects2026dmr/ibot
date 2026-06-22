import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { getPremiumWojContent } from "@/data/premiumWojContent";

import {
  getWojewodztwoBySlug,
  getPowiatyByWojewodztwo,
  getWojSeoTitle,
  getWojSeoDescription,
  getWojBreadcrumb
} from "@/data/poland";

export default function WojewodztwoPage() {
  const { wojSlug } = useParams();

  if (!wojSlug) {
    return (
      <div className="container mx-auto px-4 py-10">
        Brak danych.
      </div>
    );
  }

  const woj = getWojewodztwoBySlug(wojSlug);

  // ❗ HATA BURADAYDI — premium buraya taşındı
  if (!woj) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Nie znaleziono województwa</h1>
        <p className="text-slate-600">Sprawdź poprawność adresu URL.</p>
      </div>
    );
  }

  // ⭐ Artık güvenli
  const premium = getPremiumWojContent(woj.slug, woj.name);

  const powiaty = getPowiatyByWojewodztwo(woj.slug);
  const breadcrumb = getWojBreadcrumb(woj);

  // JSON-LD
useEffect(() => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `SEO w województwie ${woj.name}`,
    "description": getWojSeoDescription(woj),
    "url": `${window.location.origin}/wojewodztwo/${woj.slug}`,

    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `${window.location.origin}${item.href}`
      }))
    },

    "about": {
      "@type": "Thing",
      "name": `SEO w województwie ${woj.name}`,
      "description": `Analiza SEO, konkurencji i potencjału wyszukiwania w województwie ${woj.name}.`
    },

    "mainEntity": {
      "@type": "AdministrativeArea",
      "name": woj.name,
      "alternateName": `Województwo ${woj.name}`,
      "url": `${window.location.origin}/wojewodztwo/${woj.slug}`,
      "containedInPlace": {
        "@type": "Country",
        "name": "Polska"
      },
      "hasPart": powiaty.map((p) => ({
        "@type": "AdministrativeArea",
        "name": p.name,
        "url": `${window.location.origin}/powiat/${p.slug}`
      }))
    },

    "areaServed": {
      "@type": "AdministrativeArea",
      "name": woj.name
    },

    "itemListElement": powiaty.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": p.name,
      "url": `${window.location.origin}/powiat/${p.slug}`
    }))
  };

  const old = document.getElementById("woj-jsonld");
  if (old) old.remove();

  const script = document.createElement("script");
  script.id = "woj-jsonld";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);

  return () => {
    const cleanup = document.getElementById("woj-jsonld");
    if (cleanup) cleanup.remove();
  };
}, [woj, powiaty, breadcrumb]);

  return (
    <div className="container mx-auto px-4 py-10">
      <SEOHead
        title={getWojSeoTitle(woj)}
        description={getWojSeoDescription(woj)}
        canonicalPath={`/wojewodztwo/${woj.slug}`}
        ogType="website"
      />

      <Breadcrumb items={breadcrumb} />

      {/* HERO */}
<section className="mb-12">
  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
    SEO w województwie{" "}
    <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
      {woj.name}
    </span>
  </h1>

  <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
    Kompleksowe pozycjonowanie lokalne w województwie {woj.name}. Zwiększamy
    widoczność firm w Google, budujemy przewagę konkurencyjną oraz pomagamy
    zdobywać klientów z wyszukiwarki. Sprawdź analizę regionu, najważniejsze
    powiaty oraz potencjał SEO w Twojej lokalizacji.
  </p>
</section>


      {/* PREMIUM CONTENT */}
<section className="mb-16 space-y-10">

  <div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">
      Dlaczego SEO w województwie {woj.name} jest tak skuteczne?
    </h2>
    <p className="text-slate-700 leading-relaxed text-lg">
      {premium.whyEffective}
    </p>
  </div>

  <div>
    <h3 className="text-2xl font-semibold text-slate-900 mb-3">
      Najważniejsze czynniki wpływające na SEO w regionie
    </h3>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {premium.factors.map((f) => (
        <li
          key={f}
          className="flex items-start gap-2 text-slate-700 text-base"
        >
          <span className="text-emerald-500 mt-1">✔</span>
          {f}
        </li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">
      Jak wygląda konkurencja w Google?
    </h2>
    <p className="text-slate-700 leading-relaxed text-lg">
      {premium.competition}
    </p>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">
      Najczęściej pozycjonowane branże
    </h2>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {premium.industries.map((b) => (
        <li
          key={b}
          className="flex items-start gap-2 text-slate-700 text-base"
        >
          <span className="text-indigo-500 mt-1">•</span>
          {b}
        </li>
      ))}
    </ul>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-slate-900 mb-4">
      Potencjał SEO w powiatach województwa {woj.name}
    </h2>
    <p className="text-slate-700 leading-relaxed text-lg">
      {premium.powiatIntro}
    </p>
  </div>

</section>
      {/* POWIAT LIST */}
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        Powiaty w województwie {woj.name}
      </h2>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
  {powiaty.map((p) => (
    <Link
      key={p.slug}
      to={`/powiat/${p.slug}`}
      className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 transition-all shadow-sm"
    >
      {p.name}
    </Link>
  ))}
</div>


      {/* CTA */}
<section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl p-10 text-center shadow-lg">
  <h2 className="text-3xl font-bold mb-4">
    Chcesz zwiększyć widoczność swojej firmy?
  </h2>
  <p className="text-lg opacity-90 mb-6">
    Oferujemy profesjonalne pozycjonowanie lokalne w całym województwie {woj.name}.
    Skontaktuj się z nami i otrzymaj darmową analizę SEO.
  </p>
  <a
    href="/#kontakt"
    className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow hover:bg-slate-100 transition"
  >
    Darmowa konsultacja SEO
  </a>
</section>
    </div>
  );
}

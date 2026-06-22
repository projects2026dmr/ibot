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
      "@type": "ItemList",
      itemListElement: powiaty.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: p.name,
        url: `${window.location.origin}/powiat/${p.slug}`
      }))
    };

    const old = document.getElementById("itemlist-jsonld");
    if (old) old.remove();

    const script = document.createElement("script");
    script.id = "itemlist-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById("itemlist-jsonld");
      if (cleanup) cleanup.remove();
    };
  }, [powiaty]);

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
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          SEO w województwie {woj.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Kompleksowe pozycjonowanie lokalne w województwie {woj.name}. Zwiększamy
          widoczność firm w Google, budujemy przewagę konkurencyjną oraz pomagamy
          zdobywać klientów z wyszukiwarki.
        </p>
      </section>

      {/* PREMIUM CONTENT */}
      <section className="prose prose-slate max-w-none mb-12">
        <h2>Dlaczego SEO w województwie {woj.name} jest tak skuteczne?</h2>
        <p>{premium.whyEffective}</p>

        <h3>Najważniejsze czynniki wpływające na SEO w regionie</h3>
        <ul>
          {premium.factors.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2>Jak wygląda konkurencja w Google?</h2>
        <p>{premium.competition}</p>

        <h2>Najczęściej pozycjonowane branże</h2>
        <ul>
          {premium.industries.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <h2>Potencjał SEO w powiatach województwa {woj.name}</h2>
        <p>{premium.powiatIntro}</p>
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
            className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors shadow-sm"
          >
            {p.name}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3">
          Chcesz zwiększyć widoczność swojej firmy?
        </h2>
        <p className="text-slate-700 mb-6">
          Oferujemy profesjonalne pozycjonowanie lokalne w całym województwie {woj.name}.
          Skontaktuj się z nami i otrzymaj darmową analizę SEO.
        </p>
        <a
          href="/#kontakt"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Darmowa konsultacja SEO
        </a>
      </section>
    </div>
  );
}

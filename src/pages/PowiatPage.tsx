import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";

import {
  getPowiatBySlug,
  getPowiatSeoTitle,
  getPowiatSeoDescription,
  getPowiatBreadcrumb
} from "@/data/poland";

import { getPremiumPowiatContent } from "@/data/premiumPowiatContent";

export default function PowiatPage() {
  const { powiatSlug } = useParams();

  if (!powiatSlug) {
    return <div className="container mx-auto px-4 py-10">Brak danych.</div>;
  }

  const powiat = getPowiatBySlug(powiatSlug);

  if (!powiat) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Nie znaleziono powiatu</h1>
        <p className="text-slate-600">Sprawdź poprawność adresu URL.</p>
      </div>
    );
  }

  const breadcrumb = getPowiatBreadcrumb(powiat);

  // ⭐ PREMIUM CONTENT
  const premium = getPremiumPowiatContent(powiat.name, powiat.woj.name);

  /* -------------------------------------------------------
     JSON-LD — WebPage + Local SEO context
  ------------------------------------------------------- */
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `SEO w powiecie ${powiat.name}`,
      description: getPowiatSeoDescription(powiat),
      url: `${window.location.origin}/powiat/${powiat.slug}`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `${window.location.origin}${item.href}`
        }))
      }
    };

    const old = document.getElementById("powiat-jsonld");
    if (old) old.remove();

    const script = document.createElement("script");
    script.id = "powiat-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById("powiat-jsonld");
      if (cleanup) cleanup.remove();
    };
  }, [powiat, breadcrumb]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* SEO */}
      <SEOHead
        title={getPowiatSeoTitle(powiat)}
        description={getPowiatSeoDescription(powiat)}
        canonicalPath={`/powiat/${powiat.slug}`}
        ogType="article"
      />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumb} />

      {/* HERO */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
          SEO w powiecie{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
            {powiat.name}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
          Kompleksowe pozycjonowanie lokalne w powiecie {powiat.name}. Zwiększamy
          widoczność firm w Google, budujemy przewagę konkurencyjną oraz pomagamy
          zdobywać klientów z wyszukiwarki.
        </p>
      </section>

      {/* PREMIUM CONTENT */}
      <section className="mb-16 space-y-10">

        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Dlaczego SEO w powiecie {powiat.name} jest tak skuteczne?
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
              <li key={f} className="flex items-start gap-2 text-slate-700 text-base">
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
              <li key={b} className="flex items-start gap-2 text-slate-700 text-base">
                <span className="text-indigo-500 mt-1">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Powiat {powiat.name} w województwie {powiat.woj.name}
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            {premium.wojSection}
          </p>

          <Link
            to={`/wojewodztwo/${powiat.woj.slug}`}
            className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
          >
            Zobacz SEO w województwie {powiat.woj.name}
          </Link>
        </div>

      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl p-10 text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">
          Chcesz zwiększyć widoczność swojej firmy?
        </h2>
        <p className="text-lg opacity-90 mb-6">
          Oferujemy profesjonalne pozycjonowanie lokalne w powiecie {powiat.name}.
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

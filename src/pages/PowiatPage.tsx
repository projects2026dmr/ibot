import { getPowiatFaqContent } from "@/data/powiatFaq";
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

  const premium = getPremiumPowiatContent(powiat.name, powiat.woj.name);
  const faq = getPowiatFaqContent(powiat.name, powiat.woj.name);

  // JSON-LD
  useEffect(() => {
    const origin = window.location.origin;
    const url = `${origin}/powiat/${powiat.slug}`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `SEO w powiecie ${powiat.name}`,
      "description": getPowiatSeoDescription(powiat),
      "url": url,

      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.label,
          "item": `${origin}${item.href}`
        }))
      },

      "mainEntity": {
        "@type": "Article",
        "headline": `SEO w powiecie ${powiat.name}`,
        "description": getPowiatSeoDescription(powiat),
        "image": `${origin}/og/powiat/${powiat.slug}.jpg`,
        "author": {
          "@type": "Organization",
          "name": "iBOT — Agencja SEO"
        },
        "publisher": {
          "@type": "Organization",
          "name": "iBOT — Agencja SEO",
          "logo": {
            "@type": "ImageObject",
            "url": `${origin}/og/default.jpg`
          }
        },
        "mainEntityOfPage": url
      },

      "about": {
        "@type": "AdministrativeArea",
        "name": powiat.name,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": powiat.woj.name,
          "containedInPlace": {
            "@type": "Country",
            "name": "Polska"
          }
        }
      },

      "areaServed": {
        "@type": "AdministrativeArea",
        "name": powiat.name
      },

      "faq": {
        "@type": "FAQPage",
        "mainEntity": faq.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
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
  import { pingIndexNow } from "@/utils/indexNow";

useEffect(() => {
  const origin = window.location.origin;
  const url = `${origin}/powiat/${powiat.slug}`;

  pingIndexNow(url);
}, [powiat.slug]);
  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 py-10">

        {/* SEO */}
        <SEOHead
          title={getPowiatSeoTitle(powiat)}
          description={getPowiatSeoDescription(powiat)}
          canonicalPath={`/powiat/${powiat.slug}`}
          ogType="article"
          imageUrl={`/og/powiat/${powiat.slug}.jpg`}
        />

        {/* ⭐ PREMIUM WRAPPER */}
        <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 space-y-12">

          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumb} />

          {/* ⭐ HERO */}
          <section className="mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              SEO lokalne • Powiat {powiat.name}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight mb-4">
              SEO w powiecie{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">
                {powiat.name}
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl leading-relaxed">
              Kompleksowe pozycjonowanie lokalne w powiecie {powiat.name}. Zwiększamy
              widoczność firm w Google, budujemy przewagę konkurencyjną oraz pomagamy
              zdobywać klientów z wyszukiwarki.
            </p>
          </section>

          {/* ⭐ PREMIUM CONTENT */}
          <section className="mb-4 md:mb-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-6 md:px-7 md:py-8 space-y-8">

              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
                  Dlaczego SEO w powiecie {powiat.name} jest tak skuteczne?
                </h2>
                <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                  {premium.whyEffective}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  Najważniejsze czynniki wpływające na SEO w regionie
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {premium.factors.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-slate-700 text-sm md:text-base"
                    >
                      <span className="text-emerald-500 mt-1">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                  Jak wygląda konkurencja w Google?
                </h2>
                <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                  {premium.competition}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                  Najczęściej pozycjonowane branże
                </h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {premium.industries.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-slate-700 text-sm md:text-base"
                    >
                      <span className="text-indigo-500 mt-1">•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                  Powiat {powiat.name} w województwie {powiat.woj.name}
                </h2>
                <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                  {premium.wojSection}
                </p>

                <Link
                  to={`/wojewodztwo/${powiat.woj.slug}`}
                  className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
                >
                  Zobacz SEO w województwie {powiat.woj.name}
                </Link>
              </div>

            </div>
          </section>

          {/* ⭐ FAQ */}
          <section className="mb-4 md:mb-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">
              Najczęściej zadawane pytania (FAQ)
            </h2>

            <div className="space-y-4 md:space-y-5">
              {faq.map((item) => (
                <div
                  key={item.q}
                  className="border border-slate-200 rounded-2xl bg-white px-5 py-4 md:px-6 md:py-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-1.5">
                    {item.q}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ⭐ CTA */}
          <section className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white px-6 py-8 md:px-10 md:py-10 text-center shadow-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              Chcesz zwiększyć widoczność swojej firmy?
            </h2>
            <p className="text-sm md:text-lg opacity-90 mb-5 md:mb-6 max-w-2xl mx-auto">
              Oferujemy profesjonalne pozycjonowanie lokalne w powiecie {powiat.name}.
              Skontaktuj się z nami i otrzymaj darmową analizę SEO.
            </p>
            <a
              href="/#"
              className="inline-flex items-center justify-center rounded-full bg-white/95 text-indigo-700 font-semibold px-7 py-3 md:px-9 md:py-3.5 text-sm md:text-base shadow-sm hover:bg-slate-100 hover:shadow-md transition-all"
            >
              Darmowa konsultacja SEO
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}

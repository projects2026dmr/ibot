import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { findMiasto } from "../data/miastaService";
import SEOHead from "../components/SEOHead";

export default function MiastoPage() {
  const { slug } = useParams();
  const miasto = findMiasto(slug);

  if (!miasto) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Nie znaleziono miasta</h1>
        <p className="text-slate-600">Sprawdź poprawność adresu URL.</p>
      </div>
    );
  }

  // JSON-LD
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": miasto.title,
      "description": miasto.description,
      "url": `${window.location.origin}/miasto/${miasto.slug}`,
      "areaServed": {
        "@type": "City",
        "name": miasto.name
      },
      "knowsAbout": miasto.keywords,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${window.location.origin}/miasto/${miasto.slug}`
      }
    };

    const old = document.getElementById("miasto-jsonld");
    if (old) old.remove();

    const script = document.createElement("script");
    script.id = "miasto-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById("miasto-jsonld");
      if (cleanup) cleanup.remove();
    };
  }, [miasto]);

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-4 py-10">

        <SEOHead
          title={miasto.title}
          description={miasto.description}
          canonicalPath={`/miasto/${miasto.slug}`}
          ogType="website"
          imageUrl={`/og/miasto/${miasto.slug}.jpg`}
        />

        <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 space-y-12">

          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-indigo-600">Strona główna</Link> {" / "}
            <span className="text-slate-700">{miasto.name}</span>
          </nav>

          {/* HERO */}
          <section>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              SEO lokalne • {miasto.name}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight mb-4">
              {miasto.h1}
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl leading-relaxed">
              Profesjonalne pozycjonowanie stron w mieście {miasto.name}. 
              Kompleksowe działania SEO dopasowane do lokalnego rynku, konkurencji i potencjału wyszukiwania.
            </p>
          </section>

          {/* PREMIUM CONTENT */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-6 md:px-7 md:py-8 space-y-8">

            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                Dlaczego SEO w {miasto.name} jest tak skuteczne?
              </h2>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                {miasto.name} to dynamicznie rozwijający się rynek lokalny, w którym firmy aktywnie walczą o widoczność w Google. 
                Odpowiednio zaplanowane SEO pozwala zdobywać klientów organicznie, bez konieczności płacenia za reklamy.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                Najczęściej pozycjonowane branże w {miasto.name}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                  <span className="text-indigo-500 mt-1">•</span>
                  Lokalne usługi (fryzjerzy, kosmetyczki, mechanicy)
                </li>
                <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                  <span className="text-indigo-500 mt-1">•</span>
                  Restauracje i gastronomia
                </li>
                <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                  <span className="text-indigo-500 mt-1">•</span>
                  Sklepy internetowe
                </li>
                <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                  <span className="text-indigo-500 mt-1">•</span>
                  Specjaliści (prawnicy, lekarze, księgowi)
                </li>
              </ul>
            </div>

          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white px-6 py-8 md:px-10 md:py-10 text-center shadow-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              Chcesz zdobywać klientów w {miasto.name}?
            </h2>
            <p className="text-sm md:text-lg opacity-90 mb-5 md:mb-6 max-w-2xl mx-auto">
              Oferujemy profesjonalne pozycjonowanie lokalne dopasowane do rynku w {miasto.name}. 
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

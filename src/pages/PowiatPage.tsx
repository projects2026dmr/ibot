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

export default function PowiatPage() {
  const { powiatSlug } = useParams();

  if (!powiatSlug) {
    return (
      <div className="container mx-auto px-4 py-10">
        Brak danych.
      </div>
    );
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
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          SEO w powiecie {powiat.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Kompleksowe pozycjonowanie lokalne w powiecie {powiat.name}. 
          Zwiększamy widoczność firm w Google, budujemy przewagę konkurencyjną 
          oraz pomagamy zdobywać klientów z wyszukiwarki. Sprawdź analizę regionu, 
          konkurencję oraz potencjał SEO w Twojej lokalizacji.
        </p>
      </section>

      {/* PREMIUM CONTENT */}
      <section className="prose prose-slate max-w-none mb-12">
        <h2>Dlaczego SEO w powiecie {powiat.name} jest tak ważne?</h2>
        <p>
          Powiat {powiat.name} charakteryzuje się rosnącą aktywnością lokalnych firm, 
          które coraz częściej inwestują w widoczność online. Wzrost konkurencji oraz 
          zmieniające się zachowania użytkowników sprawiają, że pozycjonowanie stron 
          internetowych stało się kluczowym elementem strategii marketingowej.
        </p>

        <h3>Najważniejsze czynniki wpływające na SEO w regionie</h3>
        <ul>
          <li>Wysoka aktywność lokalnych przedsiębiorców</li>
          <li>Duża liczba zapytań lokalnych w Google</li>
          <li>Silna konkurencja w branżach usługowych</li>
          <li>Rosnące znaczenie Google Maps i opinii klientów</li>
          <li>Dynamiczny rozwój e-commerce</li>
        </ul>

        <h2>Jak wygląda konkurencja w Google?</h2>
        <p>
          W powiecie {powiat.name} konkurencja SEO zależy od branży oraz wielkości 
          lokalnego rynku. W większych miejscowościach widoczność w Google wymaga 
          bardziej zaawansowanych działań, natomiast w mniejszych lokalizacjach 
          można osiągnąć szybkie efekty dzięki precyzyjnej optymalizacji i lokalnym treściom.
        </p>

        <h2>Najczęściej pozycjonowane branże</h2>
        <ul>
          <li>Usługi budowlane i remontowe</li>
          <li>Gabinety medyczne i kosmetyczne</li>
          <li>Firmy transportowe i logistyczne</li>
          <li>Restauracje i gastronomia</li>
          <li>Sklepy internetowe</li>
        </ul>

        <h2>Powiat {powiat.name} w województwie {powiat.woj.name}</h2>
        <p>
          Powiat należy do województwa {powiat.woj.name}, które składa się z wielu 
          dynamicznie rozwijających się regionów. Sprawdź również analizę SEO dla 
          całego województwa, aby zobaczyć pełny obraz konkurencji.
        </p>

        <Link
          to={`/wojewodztwo/${powiat.woj.slug}`}
          className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
        >
          Zobacz SEO w województwie {powiat.woj.name}
        </Link>
      </section>

      {/* CTA */}
      <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3">
          Chcesz zwiększyć widoczność swojej firmy?
        </h2>
        <p className="text-slate-700 mb-6">
          Oferujemy profesjonalne pozycjonowanie lokalne w powiecie {powiat.name}.  
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

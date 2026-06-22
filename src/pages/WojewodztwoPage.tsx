import { useParams, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";

import {
  getWojewodztwoBySlug,
  getPowiatyByWojewewodztwo,
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

  if (!woj) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Nie znaleziono województwa</h1>
        <p className="text-slate-600">Sprawdź poprawność adresu URL.</p>
      </div>
    );
  }

  const powiaty = getPowiatyByWojewodztwo(woj.slug);
  const breadcrumb = getWojBreadcrumb(woj);

  /* -------------------------------------------------------
     JSON-LD — ItemList (Powiaty)
  ------------------------------------------------------- */
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: powiaty.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: p.name,
      url: `${window.location.origin}/powiat/${p.slug}`
    }))
  };

  // Inject ItemList JSON-LD
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "itemlist-jsonld";
  script.textContent = JSON.stringify(itemListJsonLd);
  document.head.appendChild(script);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* SEO */}
      <SEOHead
        title={getWojSeoTitle(woj)}
        description={getWojSeoDescription(woj)}
        canonicalPath={`/wojewodztwo/${woj.slug}`}
        ogType="website"
      />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumb} />

      {/* HERO */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          SEO w województwie {woj.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          Kompleksowe pozycjonowanie lokalne w województwie {woj.name}. 
          Zwiększamy widoczność firm w Google, budujemy przewagę konkurencyjną 
          oraz pomagamy zdobywać klientów z wyszukiwarki. Sprawdź analizę regionu, 
          najważniejsze powiaty oraz potencjał SEO w Twojej lokalizacji.
        </p>
      </section>

      {/* PREMIUM CONTENT */}
      <section className="prose prose-slate max-w-none mb-12">
        <h2>Dlaczego SEO w województwie {woj.name} jest tak skuteczne?</h2>
        <p>
          Województwo {woj.name} to dynamicznie rozwijający się region, w którym 
          lokalne firmy coraz częściej inwestują w widoczność online. 
          Wzrost liczby przedsiębiorstw, rosnąca konkurencja oraz zmieniające się 
          zachowania użytkowników sprawiają, że pozycjonowanie stron internetowych 
          stało się kluczowym elementem strategii marketingowej.
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
          W województwie {woj.name} konkurencja SEO zależy od powiatu i branży. 
          W większych powiatach widoczność w Google wymaga bardziej zaawansowanych 
          działań, natomiast w mniejszych lokalizacjach można osiągnąć szybkie efekty 
          dzięki precyzyjnej optymalizacji i lokalnym treściom.
        </p>

        <h2>Najczęściej pozycjonowane branże</h2>
        <ul>
          <li>Usługi budowlane i remontowe</li>
          <li>Gabinety medyczne i kosmetyczne</li>
          <li>Firmy transportowe i logistyczne</li>
          <li>Restauracje i gastronomia</li>
          <li>Sklepy internetowe</li>
        </ul>

        <h2>Potencjał SEO w powiatach województwa {woj.name}</h2>
        <p>
          Region składa się z {powiaty.length} powiatów, z których każdy posiada 
          własną specyfikę rynkową. Poniżej znajdziesz pełną listę powiatów, 
          które możesz wybrać, aby zobaczyć szczegółową analizę lokalnego SEO.
        </p>
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

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

  // JSON-LD dla lokalnego biznesu / strony miasta
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
              Kompleksowe działania SEO dopasowane do lokalnego rynku, konkurencji i potencjału wyszukiwania
              w województwie {miasto.wojewodztwo}.
            </p>
          </section>

          {/* SEKCJA: Dlaczego SEO w {miasto.name}? */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-6 md:px-7 md:py-8 space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                Dlaczego SEO w {miasto.name} jest kluczowe dla firm?
              </h2>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg">
                {miasto.name} to jeden z najważniejszych lokalnych rynków w województwie {miasto.wojewodztwo}. 
                Firmy działające tutaj aktywnie walczą o widoczność w Google, a konkurencja w wynikach wyszukiwania 
                rośnie z miesiąca na miesiąc. Dobrze zaplanowane SEO pozwala zdobywać klientów organicznie, 
                bez konieczności ciągłego inwestowania w reklamy płatne.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Co daje skuteczne SEO lokalne w {miasto.name}?
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm md:text-base">
                <li>• stały napływ klientów z wyszukiwarki Google,</li>
                <li>• przewagę nad lokalną konkurencją, która nie inwestuje w SEO,</li>
                <li>• większą rozpoznawalność marki w mieście {miasto.name} i okolicy,</li>
                <li>• stabilne źródło ruchu, niezależne od kampanii reklamowych.</li>
              </ul>
            </div>
          </section>

          {/* SEKCJA: Branże */}
          <section className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-3">
                Najczęściej pozycjonowane branże w {miasto.name}
              </h2>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg mb-4">
                W {miasto.name} SEO szczególnie mocno działa w branżach, w których klienci szukają usług lokalnie 
                i porównują oferty bezpośrednio w Google. Dobrze zoptymalizowana strona pozwala znaleźć się 
                przed konkurencją w najważniejszych momentach decyzji zakupowej.
              </p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                <span className="text-indigo-500 mt-1">•</span>
                Lokalne usługi (fryzjerzy, kosmetyczki, mechanicy, firmy remontowe)
              </li>
              <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                <span className="text-indigo-500 mt-1">•</span>
                Restauracje, kawiarnie i gastronomia
              </li>
              <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                <span className="text-indigo-500 mt-1">•</span>
                Sklepy internetowe obsługujące klientów z {miasto.name} i całego regionu
              </li>
              <li className="flex items-start gap-2 text-slate-700 text-sm md:text-base">
                <span className="text-indigo-500 mt-1">•</span>
                Specjaliści (prawnicy, lekarze, psychoterapeuci, księgowi)
              </li>
            </ul>
          </section>

          {/* SEKCJA: Proces SEO */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 py-6 md:px-7 md:py-8 space-y-6">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Jak wygląda proces SEO dla firm z {miasto.name}?
            </h2>

            <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed">
              <p>
                Praca nad SEO w {miasto.name} zaczyna się od dokładnego audytu strony oraz analizy konkurencji 
                w lokalnych wynikach wyszukiwania. Następnie budujemy strategię, która łączy optymalizację techniczną, 
                content marketing oraz działania off‑site (link building, sygnały lokalne).
              </p>

              <ul className="space-y-2">
                <li>• audyt techniczny strony (Core Web Vitals, indeksacja, błędy 404, struktura linków),</li>
                <li>• analiza konkurencji w {miasto.name} i województwie {miasto.wojewodztwo},</li>
                <li>• przygotowanie strategii contentowej pod frazy lokalne,</li>
                <li>• optymalizacja pod kątem konwersji (formularze, CTA, UX),</li>
                <li>• budowa autorytetu domeny poprzez wartościowe linki i obecność w lokalnych serwisach.</li>
              </ul>
            </div>
          </section>

          {/* SEKCJA: Czas i efekty */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              Ile trwa SEO w {miasto.name} i kiedy widać efekty?
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              Czas potrzebny na osiągnięcie widocznych efektów SEO zależy od konkurencji w danej branży 
              oraz aktualnego stanu strony. W wielu przypadkach pierwsze wzrosty ruchu organicznego 
              w {miasto.name} widać już po kilku tygodniach, natomiast stabilne pozycje na najważniejsze frazy 
              buduje się w perspektywie kilku miesięcy.
            </p>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
              Najważniejsze jest to, że dobrze wykonane SEO w {miasto.name} przynosi długoterminowe efekty 
              i pozwala budować przewagę nad konkurencją, która polega wyłącznie na reklamach płatnych.
            </p>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white px-6 py-8 md:px-10 md:py-10 text-center shadow-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              Chcesz zdobywać klientów w {miasto.name}?
            </h2>
            <p className="text-sm md:text-lg opacity-90 mb-5 md:mb-6 max-w-2xl mx-auto">
              Oferujemy profesjonalne pozycjonowanie lokalne dopasowane do rynku w {miasto.name} i województwie {miasto.wojewodztwo}. 
              Skontaktuj się z nami i otrzymaj darmową analizę SEO oraz rekomendacje działań dla Twojej branży.
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

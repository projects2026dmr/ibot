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

        <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 space-y-16">

          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500 mb-4">
            <Link to="/" className="hover:text-indigo-600">Strona główna</Link> {" / "}
            <span className="text-slate-700">{miasto.name}</span>
          </nav>

          {/* HERO */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              SEO lokalne • {miasto.name}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight">
              {miasto.h1}
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl leading-relaxed">
              Profesjonalne pozycjonowanie stron w mieście {miasto.name}. Kompleksowe działania SEO dopasowane
              do lokalnego rynku, konkurencji i potencjału wyszukiwania w województwie {miasto.wojewodztwo}.
              Skupiamy się na realnych wynikach: wzroście ruchu organicznego, liczbie zapytań od klientów
              oraz widoczności na najważniejsze frazy lokalne.
            </p>
          </section>

          {/* 1. Dlaczego SEO w tym mieście jest kluczowe */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Dlaczego SEO w {miasto.name} jest kluczowe dla lokalnych firm?
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              {miasto.name} to rynek, w którym użytkownicy codziennie korzystają z Google, aby znaleźć usługi,
              produkty i specjalistów w najbliższej okolicy. Niezależnie od tego, czy prowadzisz małą firmę
              usługową, restaurację, sklep internetowy czy kancelarię, Twoi potencjalni klienci zaczynają
              swoją ścieżkę decyzyjną właśnie w wyszukiwarce. Brak widoczności w wynikach organicznych oznacza
              utratę realnych szans sprzedażowych.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Konkurencja w {miasto.name} rośnie z roku na rok. Coraz więcej firm inwestuje w SEO, kampanie
              Google Ads oraz działania w social media. W takiej rzeczywistości nie wystarczy już prosta strona
              internetowa z kilkoma podstronami. Potrzebna jest przemyślana strategia, która łączy techniczną
              optymalizację, rozbudowany content, lokalne sygnały rankingowe oraz budowę autorytetu domeny.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              SEO w {miasto.name} to nie tylko pozycje w Google, ale przede wszystkim przewaga nad lokalną
              konkurencją. Firma, która jest widoczna na kluczowe frazy, buduje zaufanie, rozpoznawalność
              i stabilne źródło nowych klientów. To inwestycja, która pracuje dla Ciebie każdego dnia,
              niezależnie od tego, czy aktualnie prowadzisz kampanie reklamowe, czy nie.
            </p>
          </section>

          {/* 2. Intencje wyszukiwania */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Jakie intencje wyszukiwania dominują w {miasto.name}?
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Użytkownicy w {miasto.name} wpisują w Google setki różnych zapytań każdego dnia. Część z nich
              ma charakter informacyjny, część porównawczy, a część jest typowo transakcyjna. Skuteczne SEO
              polega na tym, aby zrozumieć te intencje i przygotować treści, które odpowiadają na realne
              potrzeby użytkowników na każdym etapie procesu decyzyjnego.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              W praktyce oznacza to pracę nad frazami typu:
            </p>
            <ul className="space-y-2 text-slate-700 text-lg">
              <li>• zapytania usługowe (np. fryzjer, mechanik, prawnik, dentysta w {miasto.name}),</li>
              <li>• zapytania lokalizacyjne (np. {miasto.name} centrum, {miasto.name} południe, {miasto.name} północ),</li>
              <li>• zapytania porównawcze (najlepszy, ranking, opinie, rekomendacje),</li>
              <li>• zapytania zakupowe (cena, koszt, oferta, promocja).</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-lg">
              Dobrze zaprojektowana strategia SEO w {miasto.name} uwzględnia wszystkie te typy intencji.
              Tworzymy treści, które nie tylko odpowiadają na pytania użytkowników, ale także prowadzą ich
              krok po kroku do kontaktu z Twoją firmą: poprzez formularze, telefon, zapytania ofertowe
              czy rezerwacje online.
            </p>
          </section>

          {/* 3. Branże i potencjał */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Największy potencjał SEO w {miasto.name} — które branże wygrywają?
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              W {miasto.name} szczególnie duży potencjał mają branże, w których klienci szukają usług lokalnie
              i porównują oferty bezpośrednio w Google. To między innymi:
            </p>
            <ul className="space-y-2 text-slate-700 text-lg">
              <li>• lokalne usługi (fryzjerzy, kosmetyczki, mechanicy, firmy remontowe),</li>
              <li>• gastronomia (restauracje, kawiarnie, bary, catering),</li>
              <li>• specjaliści (prawnicy, lekarze, psychoterapeuci, księgowi),</li>
              <li>• firmy budowlane i wykończeniowe,</li>
              <li>• sklepy internetowe obsługujące klientów z {miasto.name} i całego regionu,</li>
              <li>• branża nieruchomości (agencje, deweloperzy, zarządzanie najmem).</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-lg">
              Każda z tych branż wymaga innego podejścia do SEO. Inaczej optymalizuje się stronę lokalnego
              fryzjera, inaczej kancelarii prawnej, a jeszcze inaczej sklepu internetowego. Dlatego strategia
              SEO w {miasto.name} zawsze powinna być dopasowana do specyfiki rynku, typu usług oraz sposobu,
              w jaki klienci podejmują decyzje.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Kluczem jest zrozumienie, jakie frazy są naprawdę wartościowe. Nie chodzi tylko o wysokie
              wolumeny wyszukiwań, ale o zapytania, które prowadzą do realnych konwersji: telefonów, maili,
              rezerwacji, zakupów. To właśnie na takich frazach budujemy widoczność Twojej strony w {miasto.name}.
            </p>
          </section>

          {/* 4. Proces SEO */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Jak wygląda proces SEO dla firm z {miasto.name}?
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Skuteczne SEO w {miasto.name} to proces, który łączy analizę, strategię i konsekwentne działania.
              Zaczynamy od dokładnego audytu strony oraz analizy konkurencji w lokalnych wynikach wyszukiwania.
              Następnie projektujemy plan działań, który obejmuje optymalizację techniczną, rozbudowę treści,
              budowę autorytetu domeny oraz poprawę konwersji.
            </p>
            <ul className="space-y-2 text-slate-700 text-lg">
              <li>• audyt techniczny (Core Web Vitals, indeksacja, błędy 404, struktura linków),</li>
              <li>• analiza konkurencji w {miasto.name} i województwie {miasto.wojewodztwo},</li>
              <li>• strategia contentowa pod frazy lokalne i branżowe,</li>
              <li>• optymalizacja UX i ścieżek konwersji na stronie,</li>
              <li>• link building lokalny i branżowy,</li>
              <li>• praca nad opiniami, wizytówką Google i sygnałami lokalnymi.</li>
            </ul>
            <p className="text-slate-700 leading-relaxed text-lg">
              Każdy etap jest mierzalny. Patrzymy na wzrost widoczności, ruchu organicznego, liczbę zapytań
              oraz realne efekty biznesowe. SEO w {miasto.name} nie jest dla nas abstrakcyjnym celem — to
              narzędzie, które ma przynieść Twojej firmie konkretny zwrot z inwestycji.
            </p>
          </section>

          {/* 5. Techniczne SEO */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Techniczne SEO w {miasto.name} — fundament widoczności
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Nawet najlepszy content nie będzie widoczny, jeśli strona ma poważne problemy techniczne.
              Dlatego jednym z filarów naszej pracy w {miasto.name} jest techniczne SEO. Sprawdzamy szybkość
              ładowania, strukturę kodu, poprawność indeksacji, wykorzystanie meta tagów, nagłówków, danych
              strukturalnych oraz wewnętrznego linkowania.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Wysoka jakość techniczna strony jest szczególnie ważna w kontekście Core Web Vitals oraz
              doświadczenia użytkownika. Google coraz mocniej premiuje serwisy, które są szybkie, stabilne
              i wygodne w użyciu na urządzeniach mobilnych. W {miasto.name}, gdzie konkurencja jest duża,
              przewaga techniczna może zdecydować o tym, kto znajdzie się w TOP 3, a kto pozostanie niewidoczny.
            </p>
          </section>

          {/* 6. Content i topical authority */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Rozbudowany content i topical authority w {miasto.name}
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Google coraz lepiej rozumie kontekst i powiązania między tematami. Dlatego budowa widoczności
              w {miasto.name} wymaga nie tylko pojedynczych podstron usługowych, ale całego ekosystemu treści,
              który pokazuje, że Twoja firma jest ekspertem w swojej dziedzinie. To właśnie nazywamy topical
              authority — autorytetem tematycznym.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Tworzymy artykuły, poradniki, sekcje FAQ, studia przypadków i treści edukacyjne, które odpowiadają
              na pytania użytkowników z {miasto.name} na różnych etapach procesu decyzyjnego. Dzięki temu
              Twoja strona staje się naturalnym wyborem dla osób szukających rzetelnych informacji, a Google
              chętniej pokazuje ją w wynikach wyszukiwania, także w ramach nowych funkcji opartych na AI.
            </p>
          </section>

          {/* 7. Link building i sygnały lokalne */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Link building i sygnały lokalne w {miasto.name}
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Autorytet domeny jest jednym z kluczowych czynników rankingowych. W {miasto.name} pracujemy
              nad pozyskiwaniem wartościowych linków z lokalnych serwisów, portali branżowych, katalogów
              wysokiej jakości oraz partnerstw biznesowych. Nie chodzi o masowe linkowanie, ale o przemyślaną
              strategię, która wzmacnia wiarygodność Twojej strony w oczach Google.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Równolegle dbamy o sygnały lokalne: wizytówkę Google, opinie klientów, spójność danych NAP
              (nazwa, adres, telefon) oraz obecność w lokalnych serwisach informacyjnych. To elementy,
              które mają ogromne znaczenie w wynikach lokalnych, szczególnie w mapach i pakiecie lokalnym.
            </p>
          </section>

          {/* 8. Czas i efekty */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Ile trwa SEO w {miasto.name} i kiedy widać efekty?
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Czas potrzebny na osiągnięcie widocznych efektów SEO w {miasto.name} zależy od wielu czynników:
              konkurencji w branży, aktualnego stanu strony, historii domeny oraz intensywności działań.
              W mniej konkurencyjnych segmentach pierwsze wzrosty ruchu organicznego można zauważyć już po
              kilku tygodniach. W branżach o wysokiej konkurencji praca nad TOP 3 wymaga kilku miesięcy
              konsekwentnych działań.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Najważniejsze jest to, że dobrze zaprojektowane SEO w {miasto.name} przynosi długoterminowe
              efekty. Pozycje wypracowane w organicznych wynikach nie znikają z dnia na dzień, jak kampanie
              reklamowe po zakończeniu budżetu. To kapitał, który pracuje dla Twojej firmy przez lata.
            </p>
          </section>

          {/* 9. Dlaczego my */}
          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-slate-900">
              Dlaczego firmy z {miasto.name} wybierają właśnie nas?
            </h2>
            <p className="text-slate-700 leading-relaxed text-lg">
              Pracując z firmami z {miasto.name}, stawiamy na transparentność, dane i realne wyniki. Nie
              obiecujemy cudów w tydzień, ale pokazujemy konkretny plan działań, mierzymy efekty i regularnie
              raportujemy postępy. Naszym celem jest to, aby SEO było dla Ciebie jasnym, zrozumiałym procesem,
              a nie czarną skrzynką.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              Łączymy doświadczenie w pracy z lokalnymi biznesami z wiedzą o najnowszych trendach w SEO,
              zmianach algorytmów oraz rozwoju funkcji opartych na sztucznej inteligencji. Dzięki temu
              strategia, którą wdrażamy w {miasto.name}, jest aktualna, skuteczna i odporna na krótkoterminowe
              zmiany w wynikach wyszukiwania.
            </p>
          </section>
<section className="space-y-4">
  <h2 className="text-3xl font-semibold text-slate-900">
    Typowe błędy SEO, które widzimy u firm z {miasto.name}
  </h2>
  <p className="text-slate-700 leading-relaxed text-lg">
    W wielu firmach z {miasto.name} SEO było już kiedyś „robione”, ale bez jasnej strategii,
    bez raportowania i bez zrozumienia, jakie działania faktycznie przynoszą efekty. 
    Często spotykamy się z sytuacją, w której strona ma przypadkowo dobrane frazy, 
    zbyt ogólne treści lub sztucznie upchane słowa kluczowe, które nie odpowiadają 
    realnym zapytaniom użytkowników.
  </p>
  <p className="text-slate-700 leading-relaxed text-lg">
    Jednym z najczęstszych błędów jest skupienie się wyłącznie na pozycjach, 
    zamiast na ruchu i konwersjach. Sama obecność w Google na kilka fraz 
    nie oznacza jeszcze, że SEO działa. Liczy się to, czy użytkownicy 
    faktycznie trafiają na stronę, czy znajdują tam odpowiedzi na swoje pytania 
    i czy podejmują działanie: kontakt, rezerwację, zakup. 
    Dlatego w naszej pracy w {miasto.name} patrzymy szerzej niż tylko na ranking.
  </p>
  <p className="text-slate-700 leading-relaxed text-lg">
    Kolejnym problemem jest brak spójności technicznej: wolne ładowanie strony, 
    błędy 404, nieaktualne treści, brak responsywności na urządzeniach mobilnych. 
    W połączeniu z rosnącymi wymaganiami użytkowników z {miasto.name} 
    takie niedociągnięcia mogą skutecznie zniechęcić potencjalnych klientów, 
    nawet jeśli strona teoretycznie jest widoczna w wynikach wyszukiwania.
  </p>
</section>
<section className="space-y-4">
  <h2 className="text-3xl font-semibold text-slate-900">
    Najczęściej zadawane pytania o SEO w {miasto.name}
  </h2>

  <h3 className="text-xl font-semibold text-slate-900">
    Ile kosztuje SEO w {miasto.name}?
  </h3>
  <p className="text-slate-700 leading-relaxed text-lg">
    Koszt SEO zależy od konkurencji w branży, zakresu działań oraz stanu wyjściowego strony. 
    Inaczej wycenia się pozycjonowanie lokalnego specjalisty, inaczej dużego sklepu internetowego. 
    Zawsze zaczynamy od analizy, na podstawie której przygotowujemy konkretną propozycję 
    dopasowaną do realiów rynku w {miasto.name}.
  </p>

  <h3 className="text-xl font-semibold text-slate-900">
    Czy SEO w {miasto.name} działa szybciej niż reklamy?
  </h3>
  <p className="text-slate-700 leading-relaxed text-lg">
    Reklamy płatne mogą przynieść ruch niemal natychmiast, ale znikają po zakończeniu budżetu. 
    SEO w {miasto.name} wymaga czasu, ale efekty są długoterminowe. 
    Najlepsze rezultaty osiąga się, łącząc oba kanały: reklamy dla szybkiego efektu 
    i SEO dla stabilnej, rosnącej widoczności.
  </p>

  <h3 className="text-xl font-semibold text-slate-900">
    Czy mała firma z {miasto.name} ma szansę konkurować z dużymi markami?
  </h3>
  <p className="text-slate-700 leading-relaxed text-lg">
    Tak, pod warunkiem że strategia jest dobrze zaprojektowana. 
    Małe firmy mogą wygrywać w niszowych frazach, w konkretnych dzielnicach 
    lub w wyspecjalizowanych usługach. SEO w {miasto.name} nie polega tylko na walce 
    o najbardziej ogólne frazy — często większy potencjał mają precyzyjne zapytania 
    z wysoką intencją zakupu.
  </p>
</section>
<section className="space-y-4">
  <h2 className="text-3xl font-semibold text-slate-900">
    Jak wygląda współpraca przy SEO w {miasto.name} krok po kroku?
  </h2>
  <p className="text-slate-700 leading-relaxed text-lg">
    Współpracę zaczynamy od rozmowy i poznania Twojej firmy: branży, oferty, 
    grupy docelowej oraz dotychczasowych działań marketingowych. 
    Następnie wykonujemy audyt SEO oraz analizę konkurencji w {miasto.name} 
    i województwie {miasto.wojewodztwo}. Na tej podstawie powstaje plan działań 
    rozpisany na kolejne miesiące.
  </p>
  <p className="text-slate-700 leading-relaxed text-lg">
    W trakcie współpracy regularnie raportujemy wyniki: wzrost widoczności, 
    ruchu organicznego, liczby zapytań oraz kluczowe zmiany w pozycjach. 
    Dzięki temu dokładnie wiesz, co dzieje się z Twoją stroną i jakie działania 
    przynoszą najlepsze efekty. SEO w {miasto.name} traktujemy jak proces biznesowy, 
    a nie jednorazową usługę.
  </p>
  <p className="text-slate-700 leading-relaxed text-lg">
    Naszym celem jest zbudowanie długoterminowej przewagi konkurencyjnej. 
    Nie pracujemy na krótkie „skoki” w pozycjach, tylko na stabilną, 
    rosnącą obecność Twojej marki w Google. Dzięki temu klienci z {miasto.name} 
    widzą Twoją firmę jako naturalny wybór w swojej kategorii.
  </p>
</section>
<section className="space-y-4">
  <h2 className="text-3xl font-semibold text-slate-900">
    Przykładowe scenariusze sukcesu SEO w {miasto.name}
  </h2>
  <p className="text-slate-700 leading-relaxed text-lg">
    Wyobraź sobie lokalną firmę usługową w {miasto.name}, która do tej pory 
    pozyskiwała klientów głównie z poleceń. Po wdrożeniu strategii SEO 
    zaczyna pojawiać się w Google na frazy związane z kluczowymi usługami 
    oraz dzielnicami, w których działa. W ciągu kilku miesięcy liczba zapytań 
    z wyszukiwarki rośnie, a firma może wybierać z większej liczby zleceń.
  </p>
  <p className="text-slate-700 leading-relaxed text-lg">
    Inny scenariusz dotyczy sklepu internetowego obsługującego klientów z {miasto.name} 
    i całego regionu. Dzięki rozbudowie contentu, optymalizacji kategorii, 
    opisów produktów oraz sekcji poradnikowych, sklep zaczyna pojawiać się 
    na coraz większą liczbę fraz długiego ogona. Ruch organiczny rośnie, 
    a wraz z nim sprzedaż, bez konieczności ciągłego zwiększania budżetu reklamowego.
  </p>
  <p className="text-slate-700 leading-relaxed text-lg">
    Takie historie nie są wyjątkiem — to naturalny efekt dobrze zaprojektowanego SEO 
    w {miasto.name}. Kluczem jest konsekwencja, jakość treści i zrozumienie, 
    jak użytkownicy faktycznie korzystają z Google w tym mieście.
  </p>
</section>
          {/* CTA */}
          <section className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white px-6 py-8 md:px-10 md:py-10 text-center shadow-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
              Chcesz zdobywać klientów w {miasto.name}?
            </h2>
            <p className="text-sm md:text-lg opacity-90 mb-5 md:mb-6 max-w-2xl mx-auto">
              Oferujemy profesjonalne pozycjonowanie lokalne dopasowane do rynku w {miasto.name} i województwie {miasto.wojewodztwo}.
              Skontaktuj się z nami, aby otrzymać darmową analizę SEO, listę rekomendowanych działań oraz
              plan budowy widoczności Twojej firmy w Google.
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

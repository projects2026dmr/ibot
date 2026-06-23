import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import wojewodztwa from "@/data/wojewodztwa.json";
const jsonLd = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "iBOT — Agencja SEO",
    "url": "https://twojadomena.pl/",
    "logo": "https://twojadomena.pl/logo.png",
    "description": "Agencja SEO specjalizująca się w pozycjonowaniu lokalnym w całej Polsce.",
    "sameAs": [
      "https://www.facebook.com/...",
      "https://www.linkedin.com/...",
      "https://www.instagram.com/..."
    ]
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://twojadomena.pl/",
    "name": "iBOT — Agencja SEO",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://twojadomena.pl/szukaj?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  homepage: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://twojadomena.pl/",
    "name": "iBOT — Agencja SEO | Lokalne SEO w całej Polsce",
    "description": "Agencja SEO specjalizująca się w pozycjonowaniu lokalnym. Obsługujemy 16 województw i 380 powiatów w całej Polsce.",
    "inLanguage": "pl-PL",
    "isPartOf": {
      "@type": "WebSite",
      "url": "https://twojadomena.pl/"
    }
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "iBOT — Agencja SEO",
    "image": "https://twojadomena.pl/logo.png",
    "url": "https://twojadomena.pl/",
    "telephone": "+48 123 456 789",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Przykładowa 1",
      "addressLocality": "Gdańsk",
      "postalCode": "80-000",
      "addressCountry": "PL"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Polska"
    }
  }
};

/** Smooth-scroll to an element by ID. Used by all in-page CTAs. */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ================================================================
   DATA — all section content co-located for easy future extraction
   ================================================================ */

const HERO_BENEFITS = [
  "Wzrost widoczności w Google Maps i wynikach lokalnych o +150–300%",
  "Więcej telefonów, zapytań i klientów z Twojego regionu każdego dnia",
  "Transparentne raporty i mierzalne efekty widoczne już od pierwszego miesiąca",
  "Dedykowany specjalista SEO dostępny dla Ciebie przez cały okres współpracy",
];

const SOCIAL_PROOF = [
  { icon: "🏆", text: "1200+ firm zaufało iBOT" },
  { icon: "📈", text: "Średni wzrost ruchu lokalnego: +187%" },
  { icon: "✅", text: "Certyfikowani specjaliści Google" },
];

const METHODOLOGY = [
  {
    step: "01",
    title: "Audyt",
    description:
      "Dogłębna analiza Twojej strony, konkurencji i lokalnego rynku. Identyfikujemy mocne strony, słabe punkty i ukryte możliwości wzrostu.",
  },
  {
    step: "02",
    title: "Strategia",
    description:
      "Tworzymy spersonalizowaną strategię SEO dopasowaną do Twojej branży, lokalizacji i celów biznesowych. Bez szablonów.",
  },
  {
    step: "03",
    title: "Wdrożenie",
    description:
      "Realizujemy zaplanowane działania: optymalizacja techniczna, content marketing, link building i Google Business Profile.",
  },
  {
    step: "04",
    title: "Raportowanie",
    description:
      "Co miesiąc dostajesz przejrzysty raport z wynikami, analizą postępów i rekomendacjami na kolejny okres.",
  },
];

const SERVICES_FULL = [
  {
    icon: "🔍",
    title: "Audyt SEO",
    desc1:
      "Kompleksowa analiza techniczna, treściowa i off-site Twojej strony internetowej. Sprawdzamy ponad 200 czynników rankingowych stosowanych przez Google.",
    desc2:
      "Otrzymujesz szczegółowy raport z konkretnymi rekomendacjami i priorytetami wdrożenia — gotowy plan działania.",
    bullets: [
      "Analiza 200+ czynników rankingowych",
      "Raport z priorytetami wdrożenia",
      "Benchmarking konkurencji w Twojej branży",
    ],
  },
  {
    icon: "📍",
    title: "Pozycjonowanie lokalne",
    desc1:
      "Zwiększamy widoczność Twojej firmy w lokalnych wynikach wyszukiwania — w Google Maps i wynikach organicznych dla Twojego miasta.",
    desc2:
      "Optymalizujemy Twoją obecność online pod kątem zapytań z intencją lokalną, np. 'usługa + miasto' lub 'blisko mnie'.",
    bullets: [
      "Top pozycje w Google Maps",
      "Optymalizacja NAP i lokalnych cytowań",
      "Strategia słów kluczowych lokalnych",
    ],
  },
  {
    icon: "🏪",
    title: "Google Business Profile",
    desc1:
      "Profesjonalna optymalizacja i zarządzanie Twoim profilem firmowym w Google — fundamentem skutecznego lokalnego SEO.",
    desc2:
      "Regularnie aktualizujemy profil, odpowiadamy na recenzje i publikujemy posty, które przyciągają lokalnych klientów.",
    bullets: [
      "Pełna optymalizacja profilu GBP",
      "Strategia zarządzania recenzjami",
      "Regularne posty i aktualizacje",
    ],
  },
  {
    icon: "✍️",
    title: "Content Marketing",
    desc1:
      "Tworzymy wartościowe, zoptymalizowane treści, które odpowiadają na pytania Twoich potencjalnych klientów i budują autorytet marki.",
    desc2:
      "Strategia contentowa oparta na analizie intencji wyszukiwania i lokalnych trendów w Twojej branży.",
    bullets: [
      "Artykuły blogowe zoptymalizowane pod SEO",
      "Strony usługowe dla lokalizacji",
      "Strategia topical authority",
    ],
  },
  {
    icon: "🔗",
    title: "Link Building",
    desc1:
      "Budujemy wysokiej jakości profil linków zwrotnych z autorytarnych źródeł — lokalnych portali, katalogów i branżowych serwisów.",
    desc2:
      "Każdy link jest pozyskiwany etycznie, zgodnie z wytycznymi Google, zapewniając bezpieczne i długoterminowe efekty.",
    bullets: [
      "Linki z lokalnych portali i katalogów",
      "Guest posting na branżowych blogach",
      "Analiza profilu linkowego konkurencji",
    ],
  },
  {
    icon: "⚙️",
    title: "Optymalizacja techniczna",
    desc1:
      "Zapewniamy, że Twoja strona spełnia wszystkie wymagania techniczne Google — szybkość, Core Web Vitals, indeksacja i mobilność.",
    desc2:
      "Eliminujemy błędy techniczne, które blokują indeksację i obniżają pozycje w wynikach wyszukiwania.",
    bullets: [
      "Optymalizacja Core Web Vitals",
      "Schema markup i dane strukturalne",
      "Audyt indeksacji i crawlability",
    ],
  },
  {
    icon: "🛒",
    title: "SEO dla e-commerce",
    desc1:
      "Specjalistyczne SEO dla sklepów internetowych — od optymalizacji kart produktów po architekturę kategorii i filtrów.",
    desc2:
      "Pomagamy sklepom online zwiększać ruch organiczny i konwersje dzięki strategiom sprawdzonym w praktyce.",
    bullets: [
      "Optymalizacja kart produktów",
      "Architektura kategorii i filtrów",
      "Rich snippets dla produktów",
    ],
  },
  {
    icon: "🏠",
    title: "SEO dla małych firm",
    desc1:
      "Rozwiązania SEO zaprojektowane specjalnie dla małych i średnich firm — efektywne i dostosowane do Twoich możliwości.",
    desc2:
      "Skontaktuj się z nami, aby otrzymać indywidualną ofertę dopasowaną do potrzeb Twojej firmy i lokalnego rynku.",
    bullets: [
      "Rozwiązania dostosowane do Twojej firmy",
      "Szybkie efekty lokalne",
      "Dedykowane wsparcie specjalisty",
    ],
  },
];

const USP_ITEMS = [
  {
    icon: "⚡",
    title: "Realne wyniki w 30–90 dni",
    description:
      "Nie czekaj miesiącami. Nasze strategie przynoszą widoczne efekty już w pierwszym kwartale współpracy — potwierdzamy to raportami.",
  },
  {
    icon: "📊",
    title: "Transparentne raporty",
    description:
      "Co miesiąc otrzymujesz przejrzysty raport z danymi, wykresami i konkretnymi rekomendacjami. Bez żargonu — tylko fakty.",
  },
  {
    icon: "🎯",
    title: "Strategia szyta na miarę",
    description:
      "Żadnych szablonów. Każda strategia jest indywidualnie dopasowana do Twojej branży, lokalizacji i celów biznesowych.",
  },
  {
    icon: "🤝",
    title: "Brak długoterminowych umów",
    description:
      "Współpracujesz z nami, bo widzisz wyniki — nie dlatego, że podpisałeś roczną umowę. Oferujemy elastyczne warunki współpracy.",
  },
  {
    icon: "👤",
    title: "Dedykowany specjalista SEO",
    description:
      "Masz jedną osobę kontaktową, która zna Twój projekt od A do Z. Szybka komunikacja i pełne zaangażowanie w Twój sukces.",
  },
  {
    icon: "🛠️",
    title: "Najnowsze narzędzia i technologie",
    description:
      "Korzystamy z Ahrefs, Semrush, Screaming Frog i własnych narzędzi analitycznych. Podejmujemy decyzje na podstawie danych.",
  },
];

const FAQ_ITEMS_FULL = [
  {
    question: "Jak mogę otrzymać wycenę SEO dla mojej firmy?",
    answer:
      "Skontaktuj się z nami przez formularz, email, telefon lub komunikatory — odpowiadamy w ciągu 15 minut. Podczas bezpłatnej konsultacji przeanalizujemy Twoją stronę, konkurencję i lokalny rynek, a następnie przygotujemy indywidualną ofertę dopasowaną do Twoich celów i możliwości. Żadnych zobowiązań — decyzja należy do Ciebie.",
  },
  {
    question: "Jak długo trwa pozycjonowanie?",
    answer:
      "Pierwsze efekty SEO lokalnego są widoczne po 4–8 tygodniach od wdrożenia. Stabilne pozycje w top 3 wyników lokalnych osiągamy zazwyczaj w ciągu 3–6 miesięcy. Tempo zależy od konkurencyjności branży, aktualnego stanu strony i historii domeny. Zawsze ustalamy realistyczne oczekiwania na początku współpracy i regularnie raportujemy postępy.",
  },
  {
    question: "Czy SEO działa w małych miastach?",
    answer:
      "Tak, i często nawet lepiej niż w dużych! W małych miastach konkurencja jest mniejsza, co oznacza szybsze efekty pozycjonowania. Wielu naszych klientów z mniejszych miejscowości osiąga top 1 w ciągu 2–3 miesięcy. SEO lokalne jest idealnym rozwiązaniem dla firm działających na rynkach lokalnych — od małych gmin po średnie miasta.",
  },
  {
    question: "Czym różni się SEO lokalne od ogólnego?",
    answer:
      "SEO lokalne koncentruje się na widoczności w wynikach geolokalizowanych — Google Maps, Local Pack i zapytaniach typu 'usługa + miasto'. Obejmuje optymalizację Google Business Profile, budowanie lokalnych cytowań (NAP), zarządzanie recenzjami i tworzenie treści pod lokalne słowa kluczowe. SEO ogólne skupia się na rankingach krajowych lub globalnych bez uwzględnienia lokalizacji.",
  },
  {
    question: "Czy potrzebuję wizytówki Google?",
    answer:
      "Zdecydowanie tak. Google Business Profile (dawniej Google Moja Firma) to fundament lokalnego SEO. Zoptymalizowana wizytówka pozwala pojawiać się w Google Maps i Local Pack — sekcjach, które generują nawet 42% kliknięć w lokalnych wynikach wyszukiwania. Pomagamy w zakładaniu, weryfikacji i ciągłej optymalizacji profilu, aby maksymalizować Twoją widoczność.",
  },
  {
    question: "Jak mierzyć efekty SEO?",
    answer:
      "Mierzymy efekty SEO na wielu poziomach: pozycje kluczowych fraz, ruch organiczny (Google Analytics/Search Console), konwersje (telefony, formularze, wizyty w lokalizacji), widoczność w Google Maps, ilość i jakość recenzji. Co miesiąc dostarczamy przejrzysty raport ze wszystkimi wskaźnikami KPI i porównaniem do poprzednich okresów.",
  },
  {
    question: "Czy SEO jest lepsze niż Google Ads?",
    answer:
      "SEO i Google Ads to komplementarne strategie. SEO daje długoterminowe, organiczne efekty — raz zdobyte pozycje utrzymują się bez ciągłych opłat za kliknięcia i budują wiarygodność marki. Google Ads daje natychmiastowe wyniki, ale wymaga stałego budżetu. Najlepsza strategia często łączy oba kanały — SEO buduje fundament, a Ads wspiera w krótkim terminie.",
  },
  {
    question: "Czy mogę sam robić SEO?",
    answer:
      "Podstawowe działania SEO możesz wykonywać samodzielnie — np. optymalizacja wizytówki Google, zbieranie recenzji czy publikowanie treści na blogu. Jednak zaawansowane SEO techniczne, skuteczny link building i kompleksowa strategia contentowa wymagają specjalistycznej wiedzy, doświadczenia i profesjonalnych narzędzi. Współpraca z agencją pozwala osiągać lepsze efekty szybciej.",
  },
  {
    question: "Jak działa audyt SEO?",
    answer:
      "Audyt SEO to kompleksowa analiza Twojej strony pod kątem ponad 200 czynników rankingowych. Sprawdzamy aspekty techniczne (szybkość, mobilność, indeksacja), treściowe (jakość contentu, słowa kluczowe, struktura) i off-site (profil linków, cytowania, reputacja). Efektem jest szczegółowy raport z konkretnymi rekomendacjami uszeregowanymi według priorytetu i wpływu na wyniki.",
  },
  {
    question: "Co to jest NAP?",
    answer:
      "NAP to skrót od Name, Address, Phone number — podstawowe dane Twojej firmy, które muszą być spójne we wszystkich miejscach w internecie: na stronie, w Google Business Profile, katalogach, social mediach. Niespójność NAP (np. różne adresy lub numery telefonów w różnych katalogach) negatywnie wpływa na lokalne rankingi i zaufanie Google do Twojej firmy.",
  },
  {
    question: "Czy linki są nadal ważne?",
    answer:
      "Tak, linki zwrotne pozostają jednym z trzech najważniejszych czynników rankingowych Google. Jednak jakość zdecydowanie przewyższa ilość — jeden link z autorytarnego, tematycznie powiązanego źródła jest wart więcej niż setki linków z niskiej jakości stron. Nasza strategia link buildingu opiera się na etycznym pozyskiwaniu wartościowych linków zgodnie z wytycznymi Google.",
  },
  {
    question: "Jak wybrać agencję SEO?",
    answer:
      "Dobra agencja SEO powinna: pokazać realne case studies z mierzalnymi wynikami, oferować transparentne raportowanie, nie gwarantować pozycji #1 (bo nikt nie może tego uczciwie zagwarantować), mieć certyfikaty i udokumentowane doświadczenie, stosować etyczne metody (white hat SEO) i zapewniać dedykowanego specjalistę do kontaktu. W iBOT spełniamy wszystkie te kryteria.",
  },
];

// Enhanced contact items with social media
const CONTACT_ITEMS = [
  {
    icon: "📧",
    label: "Email",
    value: "kontakt@ibot.pl",
    href: "mailto:kontakt@ibot.pl",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: "📞",
    label: "Telefon",
    value: "+48 123 456 789",
    href: "tel:+48123456789",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "Napisz na WhatsApp",
    href: "https://wa.me/48123456789",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: "✈️",
    label: "Telegram",
    value: "@ibot_seo",
    href: "https://t.me/ibot_seo",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: "@ibot.seo",
    href: "https://instagram.com/ibot.seo",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: "📍",
    label: "Lokalizacja",
    value: "Warszawa, Polska",
    href: undefined,
    color: "bg-slate-100 text-slate-600",
  },
];

const TRUST_BOOSTERS = [
  { icon: "⚡", text: "Odpowiadamy w 15 minut" },
  { icon: "🔍", text: "Bezpłatna analiza Twojej strony" },
  { icon: "🤝", text: "Zero zobowiązań" },
];

/* ================================================================
   SECTION COMPONENTS
   ================================================================ */

/* ────────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-20 sm:py-24 md:py-32">

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-600/15 blur-[140px] sm:h-[650px] sm:w-[650px]" />
        <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-purple-600/10 blur-[120px] sm:h-[550px] sm:w-[550px]" />
        <div className="absolute top-1/3 left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[100px] sm:h-[340px] sm:w-[340px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ⭐ WIDE HERO CONTAINER */}
      <div className="relative mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1600px]">

        {/* ⭐ CONTENT COLUMN — WIDE, CENTERED, PREMIUM */}
        <div className="mx-auto max-w-[1200px] text-center">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-5 py-2.5 backdrop-blur-sm sm:gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-indigo-200">
              Przyjmujemy nowych klientów — wolne terminy w tym miesiącu
            </span>
          </div>

{/* Headline — now fits in ONE LINE on desktop */}
          <h1 className="mx-auto max-w-[1100px] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
  Zdobądź więcej klientów w swoim mieście
          </h1>


          <h2 className="sr-only">
            Profesjonalne pozycjonowanie lokalne w całej Polsce
          </h2>

          {/* Subheadline */}
          <p className="mt-6 mx-auto max-w-[900px] text-lg md:text-xl text-slate-300 leading-relaxed">
            Lokalne SEO, które przynosi realne wyniki. Pomagamy firmom
            w całej Polsce dominować w lokalnych wynikach Google i zdobywać
            klientów z ich regionu.
          </p>

          <p className="mt-4 mx-auto max-w-[900px] text-base text-slate-400 leading-relaxed">
            Nasze strategie SEO oparte są na danych, analizie konkurencji i lokalnych trendach wyszukiwania. 
            Dzięki temu Twoja firma może skutecznie docierać do klientów z Twojego miasta i okolic.
          </p>

          <section className="sr-only">
            <p>
              iBOT to agencja SEO specjalizująca się w pozycjonowaniu lokalnym w całej Polsce.
              Oferujemy kompleksowe usługi SEO dla firm działających w 16 województwach i 380 powiatach.
            </p>
          </section>

          {/* Benefits */}
          <ul className="mt-10 mx-auto max-w-[850px] flex flex-col gap-3 text-left sm:text-lg">
            {HERO_BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-slate-300"
              >
                <svg
                  className="mt-1 h-5 w-5 shrink-0 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("kontakt")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              Bezpłatna konsultacja SEO
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("uslugi")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-8 py-4 text-lg font-semibold text-slate-300 transition-all duration-200 hover:border-slate-500 hover:bg-white/5 hover:text-white"
            >
              Poznaj nasze usługi
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 grid max-w-[900px] mx-auto grid-cols-1 sm:grid-cols-3 gap-4">
            {SOCIAL_PROOF.map((item) => (
              <div
                key={item.text}
                className="flex items-center justify-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/40 px-5 py-4 backdrop-blur-sm"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-slate-300">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   2) O NAS — E-E-A-T Boost
   ────────────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="onas" className="scroll-mt-20 bg-white py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            O nas
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Dlaczego możesz nam zaufać?
          </h2>
        </div>

        {/* Content */}
        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-slate-600 sm:mt-10 sm:space-y-6 md:text-lg">
          <p>
            <strong className="font-semibold text-slate-800">
              Ponad 10 lat doświadczenia
            </strong>{" "}
            w pozycjonowaniu stron internetowych nauczyło nas, że nie ma dwóch
            takich samych projektów. Każdy klient, każda branża i każda
            lokalizacja wymaga indywidualnego podejścia. Dlatego nie stosujemy
            szablonów — budujemy strategie od podstaw, oparte na dogłębnej analizie
            danych i zrozumieniu Twojego rynku.
          </p>
          <p>
            Mamy na koncie{" "}
            <strong className="font-semibold text-slate-800">
              setki zrealizowanych projektów SEO
            </strong>{" "}
            — od lokalnych gabinetów lekarskich i kancelarii prawnych po sieci
            sklepów e-commerce i firmy usługowe. Nasze zespoły pracowały z firmami
            z każdego województwa w Polsce. Wiemy, jak wygląda lokalna konkurencja
            w Krakowie, Wrocławiu, Gdańsku, Poznaniu i dziesiątkach mniejszych miast.
          </p>
          <p>
            Jako{" "}
            <strong className="font-semibold text-slate-800">
              certyfikowany Google Partner
            </strong>
            , stale podnosimy kwalifikacje i śledzimy najnowsze zmiany
            algorytmów — w tym aktualizacje Helpful Content i Core Updates.
            Stawiamy na{" "}
            <strong className="font-semibold text-slate-800">
              pełną transparentność
            </strong>{" "}
            — masz dostęp do danych, raportów i naszego specjalisty zawsze,
            gdy tego potrzebujesz. Żadnych ukrytych działań, żadnych
            niezrozumiałych raportów pełnych żargonu.
          </p>
        </div>

        {/* Methodology */}
        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <h3 className="mb-8 text-center text-lg font-bold text-slate-900 sm:mb-10 sm:text-xl md:text-2xl">
            Nasza sprawdzona metodologia
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {METHODOLOGY.map((item, i) => (
              <div
                key={item.step}
                className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 sm:p-6"
              >
                {/* Connector line on desktop */}
                {i < METHODOLOGY.length - 1 && (
                  <div className="pointer-events-none absolute top-8 -right-3 hidden h-0.5 w-6 bg-indigo-200 lg:block" />
                )}
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-12 sm:w-12 sm:text-lg">
                  {item.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   3) USŁUGI — 8 Service Cards
   ────────────────────────────────────────────────────────────────── */
function ServicesSection() {
  return (
    <section
      id="uslugi"
      className="scroll-mt-20 bg-slate-50 py-14 sm:py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            Usługi
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Nasze usługi SEO
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Kompleksowe rozwiązania SEO dopasowane do Twojej branży i lokalizacji.
            Skontaktuj się, aby otrzymać indywidualną ofertę.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {SERVICES_FULL.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xl transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:text-2xl">
                {service.icon}
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 sm:mt-4 sm:text-lg">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:mt-3">
                {service.desc1}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {service.desc2}
              </p>
              <ul className="mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
                {service.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-4 sm:pt-5">
                <button
                  type="button"
                  onClick={() => scrollToSection("kontakt")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-800"
                >
                  Zapytaj o ofertę
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   4) USP — Dlaczego my?
   ────────────────────────────────────────────────────────────────── */
function UspSection() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            Dlaczego my
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Co nas wyróżnia?
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Nie jesteśmy kolejną agencją SEO. Oto 6 powodów, dla których firmy
            w całej Polsce wybierają iBOT.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {USP_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-50 sm:p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-xl transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 sm:text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900 sm:mt-4">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   5) WOJEWÓDZTWA
   ────────────────────────────────────────────────────────────────── */
function WojewodztwaSection() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            Zasięg
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            SEO w każdym województwie
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Działamy na terenie całej Polski. Obsługujemy firmy we wszystkich
            16&nbsp;województwach, 380&nbsp;powiatach i&nbsp;2478&nbsp;gminach.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
          {wojewodztwa.map((woj) => (
            <Link
              key={woj.slug}
              to={`/wojewodztwo/${woj.slug}`}
              className="group relative flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:gap-3 sm:p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm transition-all duration-200 group-hover:scale-110 group-hover:bg-indigo-100 sm:h-10 sm:w-10 sm:text-lg">
                📍
              </span>
              <span className="min-w-0 truncate text-xs font-semibold text-slate-700 transition-colors duration-200 group-hover:text-indigo-600 sm:text-sm">
                {woj.name}
              </span>
              <svg
                className="ml-auto h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-indigo-400 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 sm:mt-10 sm:gap-8 sm:px-6">
          {[
            { value: "16", label: "Województw" },
            { value: "380", label: "Powiatów" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-4 sm:gap-8">
              {i > 0 && (
                <div className="h-6 w-px bg-slate-200 sm:h-8" aria-hidden="true" />
              )}
              <div className="text-center">
                <div className="text-lg font-extrabold text-indigo-600 sm:text-xl md:text-2xl">
                  {s.value}
                </div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   7) FAQ — 12 Questions Accordion
   ────────────────────────────────────────────────────────────────── */
function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:gap-4 sm:py-5"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-slate-900 sm:text-base md:text-lg">
          {item.question}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-7 sm:w-7 ${
            isOpen
              ? "rotate-180 border-indigo-300 bg-indigo-50 text-indigo-600"
              : "border-slate-300 text-slate-400"
          }`}
        >
          <svg
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] pb-4 sm:pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-1 text-sm leading-relaxed text-slate-600 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Split into two columns for desktop
  const mid = Math.ceil(FAQ_ITEMS_FULL.length / 2);
  const col1 = FAQ_ITEMS_FULL.slice(0, mid);
  const col2 = FAQ_ITEMS_FULL.slice(mid);

  return (
    <section id="faq" className="scroll-mt-20 bg-slate-50 py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            FAQ
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Najczęściej zadawane pytania
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Odpowiadamy na pytania, które najczęściej słyszymy od klientów
            zainteresowanych lokalnym SEO w Polsce.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-2">
          {/* Column 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:px-6 md:px-8">
            {col1.map((item, index) => (
              <FaqItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
          {/* Column 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:px-6 md:px-8">
            {col2.map((item, index) => {
              const realIndex = index + mid;
              return (
                <FaqItem
                  key={realIndex}
                  item={item}
                  isOpen={openIndex === realIndex}
                  onToggle={() =>
                    setOpenIndex(openIndex === realIndex ? null : realIndex)
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   8) KONTAKT — Enhanced with Social Media
   ────────────────────────────────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="kontakt" className="scroll-mt-20 bg-white py-14 sm:py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            Kontakt
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Porozmawiajmy o Twoim SEO
          </h2>
          <p className="mt-4 text-base text-slate-600 md:text-lg">
            Skontaktuj się z nami w wygodny dla Ciebie sposób — odpowiemy błyskawicznie
            i&nbsp;przygotujemy indywidualną ofertę dopasowaną do Twojej firmy.
          </p>
        </div>

        {/* Contact cards grid */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-50 sm:p-5"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:text-2xl ${item.color}`}
              >
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {item.label}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-1 block truncate text-sm font-semibold text-slate-800 transition-colors duration-200 hover:text-indigo-600 sm:text-base"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1 truncate text-sm font-semibold text-slate-800 sm:text-base">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust boosters */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-6">
          {TRUST_BOOSTERS.map((tb) => (
            <div
              key={tb.text}
              className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 sm:gap-2.5 sm:px-5 sm:py-2.5"
            >
              <span className="text-base sm:text-lg">{tb.icon}</span>
              {tb.text}
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 text-center sm:mt-12 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
            Otrzymaj bezpłatną analizę SEO
          </h3>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Napisz do nas lub zadzwoń — przeanalizujemy Twoją stronę i pokażemy,
            jak możemy pomóc Twojej firmie zdobyć więcej klientów z internetu.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="mailto:kontakt@ibot.pl"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-300 sm:w-auto sm:px-8"
            >
              📧 Napisz do nas
            </a>
            <a
              href="https://wa.me/48123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-green-50 px-6 py-3.5 text-sm font-bold text-green-700 transition-all duration-200 hover:bg-green-600 hover:text-white sm:w-auto sm:px-8"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   9) CTA BOTTOM
   ────────────────────────────────────────────────────────────────── */
function CtaBottomSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 py-16 sm:py-20 md:py-28">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] rounded-full bg-purple-600/10 blur-[100px] sm:h-[400px] sm:w-[400px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Zdobądź więcej klientów w swoim mieście
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              — zacznijmy dziś
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:mt-6 sm:text-lg">
            Pierwsza konsultacja jest bezpłatna i&nbsp;niezobowiązująca.
            Przeanalizujemy Twoją stronę i&nbsp;przygotujemy plan działania.
          </p>
          <div className="mt-8 sm:mt-10">
            <button
              type="button"
              onClick={() => scrollToSection("kontakt")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:px-10 sm:py-4"
            >
              Umów bezpłatną konsultację
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                 />
              </svg>
            </button>
          </div>
          {/* Micro trust */}
          <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-4 text-xs text-slate-500 sm:mt-8 sm:gap-6 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Bez zobowiązań
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Bezpłatna analiza
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Odpowiedź w 15 min
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   HOME PAGE — Main export
   ================================================================ */
export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = hash.replace("#/", "").replace("#", "");
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

return (
  <>
    <SEOHead
      title="iBOT — Agencja SEO | Lokalne SEO w całej Polsce"
      description="Agencja SEO specjalizująca się w pozycjonowaniu lokalnym..."
      canonicalPath="/"
    />

    {/* JSON-LD — Organization */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.organization) }}
    />

    {/* JSON-LD — WebSite */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.website) }}
    />

    {/* JSON-LD — WebPage (Home) */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.homepage) }}
    />

    {/* JSON-LD — LocalBusiness */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.localBusiness) }}
    />

    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <UspSection />
    <WojewodztwaSection />
    <FaqSection />
    <ContactSection />
    <CtaBottomSection />
  </>
);
}

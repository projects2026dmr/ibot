// src/data/premiumWojContent.ts

export interface PremiumWojContent {
  intro: string;
  whyEffective: string;
  factors: string[];
  competition: string;
  industries: string[];
  powiatIntro: string;
}

const BASE_FACTORS = [
  "Wysoka aktywność lokalnych przedsiębiorców",
  "Duża liczba zapytań lokalnych w Google",
  "Silna konkurencja w branżach usługowych",
  "Rosnące znaczenie Google Maps i opinii klientów",
  "Dynamiczny rozwój e-commerce"
];

const BASE_INDUSTRIES = [
  "Usługi budowlane i remontowe",
  "Gabinety medyczne i kosmetyczne",
  "Firmy transportowe i logistyczne",
  "Restauracje i gastronomia",
  "Sklepy internetowe"
];

// 🔥 Województwa – slug → premium content
// slug'lar senin JSON'daki ile aynı olmalı (np. "dolnoslaskie", "lubelskie" itd.)
const PREMIUM_WOJ_CONTENT: Record<string, PremiumWojContent> = {
  dolnoslaskie: {
    intro: `
Województwo Dolnośląskie to jeden z najbardziej konkurencyjnych i jednocześnie 
najbardziej perspektywicznych regionów w Polsce pod kątem SEO lokalnego. 
Silny sektor usługowy, turystyczny i e-commerce sprawia, że widoczność w Google 
ma bezpośrednie przełożenie na liczbę klientów.
    `,
    whyEffective: `
SEO lokalne w województwie Dolnośląskim jest wyjątkowo skuteczne dzięki dużej liczbie 
zapytań typu „usługa + miasto” oraz wysokiej aktywności użytkowników w Google Maps. 
Firmy, które inwestują w pozycjonowanie, zyskują realną przewagę nad konkurencją.
    `,
    factors: BASE_FACTORS,
    competition: `
Konkurencja SEO w Dolnośląskim jest zróżnicowana. 
We Wrocławiu i większych miastach (Legnica, Jelenia Góra, Wałbrzych) 
potrzebna jest zaawansowana strategia contentowa i link building, 
natomiast w mniejszych powiatach często wystarczy dobrze zoptymalizowana strona 
i wizytówka Google, aby osiągnąć topowe pozycje.
    `,
    industries: [
      "Usługi budowlane i remontowe",
      "Turystyka i noclegi",
      "Gabinety medyczne i kosmetyczne",
      "Firmy transportowe i logistyczne",
      "Lokalne sklepy i e-commerce"
    ],
    powiatIntro: `
Region składa się z 26 powiatów o różnej specyfice rynkowej. 
W powiatach o dużej gęstości zaludnienia konkurencja jest wyższa, 
ale jednocześnie rośnie liczba potencjalnych klientów z wyszukiwarki. 
W mniejszych powiatach można osiągnąć szybkie efekty przy dobrze zaplanowanej strategii lokalnej.
    `
  },

  lubelskie: {
    intro: `
Województwo Lubelskie to kluczowy region Polski Wschodniej, 
w którym lokalne firmy coraz częściej przenoszą swoją ofertę do internetu. 
Rosnąca liczba zapytań lokalnych sprawia, że SEO staje się jednym z najważniejszych kanałów pozyskiwania klientów.
    `,
    whyEffective: `
SEO w województwie Lubelskim jest szczególnie skuteczne dzięki połączeniu 
rozwijającego się sektora usługowego, medycznego i rolniczo-spożywczego 
z relatywnie niższą konkurencją w wielu powiatach. 
Dobrze zaplanowana strategia lokalna pozwala szybko zbudować widoczność.
    `,
    factors: BASE_FACTORS,
    competition: `
Konkurencja SEO w Lubelskim jest mocno zróżnicowana. 
W Lublinie i większych miastach (Chełm, Zamość, Puławy) 
potrzebne są działania długofalowe, natomiast w mniejszych powiatach 
często wystarczy optymalizacja techniczna, lokalne treści i aktywna wizytówka Google, 
aby wygenerować stabilny napływ zapytań.
    `,
    industries: [
      "Usługi medyczne i prywatne gabinety",
      "Kosmetologia i fryzjerstwo",
      "Transport i logistyka",
      "Rolnictwo i przetwórstwo spożywcze",
      "Lokalne sklepy i e-commerce"
    ],
    powiatIntro: `
Województwo Lubelskie składa się z 20 powiatów, 
z których każdy ma własną specyfikę gospodarczą. 
W części powiatów dominuje sektor usługowy, w innych – rolnictwo lub turystyka. 
Dobrze dopasowana strategia SEO pozwala wykorzystać ten potencjał w pełni.
    `
  }

  // 👉 Buraya zamanla kolejne województwa ekleyebilirsin:
  // mazowieckie, pomorskie, malopolskie, podlaskie itd.
};

// 🔥 Fallback – henüz özel içerik yazmadıysan, generic ama województwo adına göre özelleşmiş içerik
export function getPremiumWojContent(slug: string, name: string): PremiumWojContent {
  const existing = PREMIUM_WOJ_CONTENT[slug];
  if (existing) return existing;

  return {
    intro: `
Województwo ${name} to region o rosnącym znaczeniu gospodarczym, 
w którym coraz więcej firm inwestuje w widoczność online. 
Dobrze zaplanowane SEO lokalne pozwala skutecznie docierać do klientów z wyszukiwarki Google.
    `,
    whyEffective: `
SEO w województwie ${name} jest skuteczne dzięki rosnącej liczbie zapytań lokalnych, 
aktywności przedsiębiorców oraz coraz większej roli Google Maps w procesie wyboru usługodawcy.
    `,
    factors: BASE_FACTORS,
    competition: `
Konkurencja SEO w województwie ${name} zależy od powiatu i branży. 
W większych miastach potrzebne są działania długofalowe, 
natomiast w mniejszych lokalizacjach można osiągnąć szybkie efekty 
dzięki precyzyjnej optymalizacji i lokalnym treściom.
    `,
    industries: BASE_INDUSTRIES,
    powiatIntro: `
Region składa się z wielu powiatów o zróżnicowanej specyfice rynkowej. 
Dla każdego powiatu można przygotować osobną strategię SEO, 
dopasowaną do lokalnej konkurencji i potencjału wyszukiwań.
    `
  };
}

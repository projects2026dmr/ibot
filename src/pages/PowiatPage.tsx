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

  return (
    <div className="container mx-auto px-4 py-10">
      {/* SEO */}
      <SEOHead
        title={getPowiatSeoTitle(powiat)}
        description={getPowiatSeoDescription(powiat)}
        canonicalPath={`/powiat/${powiat.slug}`}
        ogType="website"
      />

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumb} />

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        SEO w powiecie {powiat.name}
      </h1>

      <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
        Poznaj możliwości pozycjonowania lokalnego w powiecie {powiat.name}.
        Analizujemy widoczność firm, konkurencję oraz potencjał wyszukiwań,
        aby pomóc Twojej firmie zdobywać klientów w regionie.
      </p>

      {/* Województwo info */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Województwo
        </h2>
        <Link
          to={`/wojewodztwo/${powiat.woj.slug}`}
          className="inline-block rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
        >
          {powiat.woj.name}
        </Link>
      </div>

      {/* Local SEO info */}
      <div className="prose prose-slate max-w-none">
        <h2>Pozycjonowanie lokalne w powiecie {powiat.name}</h2>
        <p>
          Powiat {powiat.name} to region o rosnącym potencjale biznesowym.
          Lokalne SEO pozwala firmom zwiększyć widoczność w Google, dotrzeć do
          klientów z okolicy oraz budować przewagę nad konkurencją.
        </p>

        <p>
          Optymalizacja wizytówki Google Business Profile, lokalne linki,
          treści dopasowane do regionu oraz analiza konkurencji to kluczowe
          elementy skutecznej strategii SEO w tym powiecie.
        </p>
      </div>
    </div>
  );
}

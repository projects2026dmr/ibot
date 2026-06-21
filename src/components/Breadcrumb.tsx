import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // JSON-LD BreadcrumbList
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `${window.location.origin}${item.href}`
      }))
    };

    // Remove old JSON-LD if exists
    const old = document.getElementById("breadcrumb-jsonld");
    if (old) old.remove();

    const script = document.createElement("script");
    script.id = "breadcrumb-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const cleanup = document.getElementById("breadcrumb-jsonld");
      if (cleanup) cleanup.remove();
    };
  }, [items]);

  return (
    <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={index}>
            {!isLast ? (
              <Link
                to={item.href}
                className="hover:text-indigo-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-slate-700 font-medium">
                {item.label}
              </span>
            )}

            {!isLast && <span className="mx-1">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

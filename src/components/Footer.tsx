import { Link, useLocation, useNavigate } from "react-router-dom";

const QUICK_LINKS = [
  { label: "Strona główna", hash: "" },
  { label: "O nas", hash: "onas" },
  { label: "Usługi", hash: "uslugi" },
  { label: "FAQ", hash: "faq" },
  { label: "Kontakt", hash: "kontakt" },
];

const SOCIAL_LINKS = [
  { icon: "💬", label: "WhatsApp", href: "https://wa.me/48123456789" },
  { icon: "✈️", label: "Telegram", href: "https://t.me/ibot_seo" },
  { icon: "📸", label: "Instagram", href: "https://instagram.com/ibot.seo" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to element helper
  const scrollToElement = (hash: string) => {
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (hash: string) => {
    // If we're already on the homepage, just scroll
    if (location.pathname === "/") {
      scrollToElement(hash);
    } else {
      // Navigate to homepage first, then scroll after navigation
      navigate("/");
      setTimeout(() => {
        scrollToElement(hash);
      }, 100);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-16">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleNavClick("")}
              className="group inline-flex items-center gap-2"
            >
              <span className="text-2xl transition-transform duration-200 group-hover:scale-110">
                🤖
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-white">iBOT</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-400">
                  Agencja SEO iBOT
                </span>
              </div>
            </button>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Pomagamy firmom w całej Polsce zdobywać klientów dzięki
              skutecznemu lokalnemu SEO. Działamy w każdym województwie, powiecie
              i gminie.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-base transition-all duration-200 hover:bg-indigo-600 hover:text-white"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Szybkie linki
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link.hash)}
                    className="inline-flex text-sm text-slate-400 transition-colors duration-200 hover:text-indigo-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-base">
                  📧
                </span>
                <a
                  href="mailto:kontakt@ibot.pl"
                  className="transition-colors duration-200 hover:text-indigo-400"
                >
                  kontakt@ibot.pl
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-base">
                  📞
                </span>
                <a
                  href="tel:+48123456789"
                  className="transition-colors duration-200 hover:text-indigo-400"
                >
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-base">
                  💬
                </span>
                <a
                  href="https://wa.me/48123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-indigo-400"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Województwa Grid */}
        <div className="mt-10 border-t border-slate-800 pt-8 sm:mt-12 sm:pt-10">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white sm:mb-6">
            SEO w województwach
          </h3>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-2 md:grid-cols-8">
            {WOJEWODZTWA_PLACEHOLDERS.map((woj) => (
              <Link
                key={woj.slug}
                to={`/wojewodztwo/${woj.slug}`}
                className="truncate rounded px-1 py-0.5 text-xs text-slate-500 transition-colors duration-200 hover:text-indigo-400 sm:px-1.5 sm:py-1"
              >
                {woj.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 sm:py-5">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-500">
              © {year} iBOT Agencja SEO. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-xs text-slate-600">
              Obsługujemy 16 województw · 380 powiatów · 2478 gmin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

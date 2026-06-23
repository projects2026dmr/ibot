import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Strona główna", hash: "", icon: "🏠" },
  { label: "O nas", hash: "onas", icon: "👥" },
  { label: "Usługi", hash: "uslugi", icon: "⚙️" },
  { label: "FAQ", hash: "faq", icon: "❓" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll state for header styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Scroll to element helper
  const scrollToElement = useCallback((hash: string) => {
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = useCallback(
    (hash: string) => {
      closeMobile();

      // If we're already on the homepage, just scroll
      if (location.pathname === "/") {
        scrollToElement(hash);
      } else {
        // Navigate to homepage first, then scroll after navigation
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    },
    [closeMobile, location.pathname, navigate, scrollToElement]
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-slate-100 bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between md:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              onClick={() => handleNavClick("")}
            >
              <span className="text-3xl transition-transform duration-200 group-hover:scale-110">
                🐧
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  iBOT
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-600">
                  Agencja SEO iBOT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              role="navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavClick(link.hash)}
                  className="relative rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNavClick("kontakt")}
                className="ml-3 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-indigo-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              >
                Bezpłatna konsultacja
              </button>
            </nav>

            {/* Mobile Hamburger Button — only visible when menu is CLOSED */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 lg:hidden ${
                mobileOpen ? "pointer-events-none opacity-0" : ""
              }`}
              aria-label="Otwórz menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex h-5 w-6 flex-col items-center justify-center">
                <span className="block h-0.5 w-6 rounded-full bg-current" />
                <span className="mt-1.5 block h-0.5 w-6 rounded-full bg-current" />
                <span className="mt-1.5 block h-0.5 w-6 rounded-full bg-current" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Full-Screen Mobile Menu Overlay ─── */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-white transition-all duration-300 ease-out lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Top bar with logo + X close button */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4 md:h-18">
          {/* Logo (mirrors header) */}
          <Link
            to="/"
            className="group flex items-center gap-2"
            onClick={() => handleNavClick("")}
          >
            <span className="text-3xl">🐧</span>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                iBOT
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-indigo-600">
                Agencja SEO iBOT
              </span>
            </div>
          </Link>

          {/* X Close Button */}
          <button
            type="button"
            onClick={closeMobile}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label="Zamknij menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
          <div className="flex flex-1 flex-col gap-2">
            {NAV_LINKS.map((link, index) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link.hash)}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left text-xl font-semibold text-slate-800 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-base">
                  {link.icon}
                </span>
                {link.label}
              </button>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div
            className={`mt-auto border-t border-slate-100 pt-6 transition-all duration-300 ${
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? "250ms" : "0ms" }}
          >
            <button
              type="button"
              onClick={() => handleNavClick("kontakt")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              Bezpłatna konsultacja SEO
              <svg
                className="h-5 w-5"
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

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
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
                Zero zobowiązań
              </span>
            </div>

            <p className="mt-6 text-center text-sm text-slate-400">
              🐧 iBOT — Agencja SEO
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}

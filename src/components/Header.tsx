import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LangSwitcher from "./LangSwitcher";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isRTL = i18n.language === "ar";
  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.prayerTimes"), href: "/prayer-times" },
    { name: t("nav.education"), href: "/education" },
  ];

  const isActiveLink = (href: string) =>
    location.pathname === href ||
    (href !== "/" && location.pathname.startsWith(href));

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div
          className={`flex items-center justify-between ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex items-center gap-8 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Link
              to="/"
              className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <img
                src="/images/logo.svg"
                alt="Al Salam Logo"
                className="h-15 w-15 mx-2"
              />
              <div>
                <div className="text-l font-bold text-[#262262]">
                  {t("welcome")}
                </div>
                <div className="text-[#009245]">{t("subtitle")}</div>
              </div>
            </Link>

            <div
              className={`hidden lg:flex items-center gap-6 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActiveLink(item.href)
                      ? "text-[#009245]"
                      : "text-[#262262] hover:text-[#009245]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LangSwitcher />
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#262262]" />
              ) : (
                <Menu className="h-6 w-6 text-[#262262]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block py-2 text-sm font-medium transition-colors ${
                  isRTL ? "text-right" : ""
                } ${
                  isActiveLink(item.href)
                    ? "text-[#009245]"
                    : "text-[#262262] hover:text-[#009245]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

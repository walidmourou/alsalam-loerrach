import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Header = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div
          className={`flex justify-between items-center ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <Link
            to="/"
            className={`flex items-center gap-2 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <img src="images/logo.svg" className="h-14 w-14" />
            <div>
              <div className="text-2xl font-bold text-[#262262]">
                {t("welcome")}
              </div>
              <div className="text-l text-[#009245]">{t("subtitle")}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-4 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <Link
              to="/about"
              className="text-gray-600 font-bold hover:text-green-600"
            >
              {t("about.title")}
            </Link>
            <Link
              to="/education"
              className="text-gray-600 font-bold hover:text-green-600"
            >
              {t("education.title")}
            </Link>
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link
              to="/about"
              className="block text-gray-600 font-bold hover:text-green-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("about.title")}
            </Link>
            <Link
              to="/education"
              className="block text-gray-600 font-bold hover:text-green-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("education.title")}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

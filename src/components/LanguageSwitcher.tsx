import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => i18n.changeLanguage('de')}
        className={`px-3 py-1 rounded transition-colors ${
          i18n.language === 'de' 
            ? 'bg-[#009245] text-white' 
            : 'bg-gray-100 text-[#262262] hover:bg-gray-200'
        }`}
      >
        DE
      </button>
      <button
        onClick={() => i18n.changeLanguage('ar')}
        className={`px-3 py-1 rounded transition-colors ${
          i18n.language === 'ar'
            ? 'bg-[#009245] text-white'
            : 'bg-gray-100 text-[#262262] hover:bg-gray-200'
        }`}
      >
        عربي
      </button>
      <button
        onClick={() => i18n.changeLanguage('fr')}
        className={`px-3 py-1 rounded transition-colors ${
          i18n.language === 'fr'
            ? 'bg-[#009245] text-white'
            : 'bg-gray-100 text-[#262262] hover:bg-gray-200'
        }`}
      >
        FR
      </button>
    </div>
  );
}
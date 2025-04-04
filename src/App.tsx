import React from 'react';
import { Phone, Mail, MapPin, Clock, Book, Users, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './i18n/i18n';
import { PrayerTimes } from './components/PrayerTimes';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className={`min-h-screen bg-gray-50 ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>
      <header className="bg-white text-primary shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Al Salam Logo" className="h-16 w-16 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-[#262262]">{t('welcome')}</h1>
                <p className="text-[#009245] font-medium">{t('subtitle')}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=2000&q=80"
            alt="Mosque Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#262262]/60"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-5xl font-bold mb-6">{t('heroTitle')}</h2>
            <p className="text-xl mb-8">{t('heroSubtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Clock className="h-8 w-8 text-[#009245] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('dailyPrayers')}</h3>
                <p className="text-gray-200">{t('prayersDesc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Book className="h-8 w-8 text-[#009245] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('quranLessons')}</h3>
                <p className="text-gray-200">{t('lessonsDesc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <Users className="h-8 w-8 text-[#009245] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t('community')}</h3>
                <p className="text-gray-200">{t('communityDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <PrayerTimes />
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#009245]">
            <h2 className="text-2xl font-bold mb-8 text-[#262262]">{t('contact')}</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-[#009245] mr-3 flex-shrink-0" />
                <span className="text-gray-700">Hauptstraße 123, 79541 Lörrach-Maulburg</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-[#009245] mr-3 flex-shrink-0" />
                <span className="text-gray-700">+49 123 456789</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-[#009245] mr-3 flex-shrink-0" />
                <span className="text-gray-700">info@alsalam-loerrach.de</span>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-16 grid md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1585129777188-9934d2f6c997?auto=format&fit=crop&w=800&q=80"
            alt="Mosque Exterior"
            className="rounded-lg shadow-lg h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&w=800&q=80"
            alt="Mosque Interior"
            className="rounded-lg shadow-lg h-full object-cover"
          />
        </section>
      </main>

      <footer className="bg-[#262262] text-white mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img src="/logo.svg" alt="Al Salam Logo" className="h-10 w-10 mr-3" />
              <span className="text-xl font-semibold">Al Salam</span>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2">© 2025 Al Salam Islamic Center Lörrach-Maulburg</p>
              <p className="text-gray-300 text-sm">{t('footerText')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
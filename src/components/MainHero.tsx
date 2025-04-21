import { Book, Clock, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function MainHero() {
  const { t } = useTranslation();

  return (
    <section className="relative lg:h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=2000&q=80"
          alt="Mosque Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#262262]/60"></div>
      </div>
      <div className="relative container mx-auto p-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h2 className="text-5xl font-bold mb-6">{t("heroTitle")}</h2>
          <p className="text-xl mb-8">{t("heroSubtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Clock className="h-8 w-8 text-[#009245] mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("dailyPrayers")}
              </h3>
              <p className="text-gray-200">{t("prayersDesc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Book className="h-8 w-8 text-[#009245] mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t("quranLessons")}
              </h3>
              <p className="text-gray-200">{t("lessonsDesc")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Users className="h-8 w-8 text-[#009245] mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t("community")}</h3>
              <p className="text-gray-200">{t("communityDesc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

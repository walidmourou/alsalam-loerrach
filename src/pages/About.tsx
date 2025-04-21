import { useTranslation } from "react-i18next";

function createIncrementalArray(n: number) {
  if (n <= 0) {
    return [];
  }
  return Array.from({ length: n }, (_, index) => index + 1);
}

export default function About() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="min-h-screen" dir={`${isRTL ? "rtl" : "ltr"}`}>
      <div className="relative h-[50vh] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#262262]/80 to-[#009245]/80" />
        <div className="relative container mx-auto pt-10 h-full flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {t("about.title")}
          </h1>
          <h4 className="text-lg font-bold text-yellow-100 mb-4">
            {t("about.subtitle")}
          </h4>
          <p className="mt-4 text-lg md:text-xl text-white">
            {t("about.description")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-[#262262] mb-4">
              {t("about.mission.title")}
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {t("about.mission.description")}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-[#262262] mb-4">
              {t("about.vision.title")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("about.vision.description")}
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#262262]/10 to-[#009245]/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-[#262262] mb-6 text-center">
            {t("about.values.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {createIncrementalArray(parseInt(t("about.values.item_nbr"))).map(
              (item) => (
                <div key={item} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold text-[#009245] mb-3">
                    {t(`about.values.item${item}.title`)}
                  </h3>
                  <p className="text-gray-600">
                    {t(`about.values.item${item}.description`)}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="mt-12 bg-gradient-to-r from-[#262262]/10 to-[#009245]/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-[#262262] mb-6 text-center">
            {t("about.activities.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {createIncrementalArray(
              parseInt(t("about.activities.item_nbr"))
            ).map((item) => (
              <div key={item} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-[#009245] mb-3">
                  {t(`about.activities.item${item}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`about.activities.item${item}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6 transform hover:scale-105 transition-transform">
          <h2 className="text-2xl font-bold text-[#262262] mb-4">
            {t("about.participation.title")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("about.participation.description")}
          </p>
        </div>
      </div>
    </div>
  );
}

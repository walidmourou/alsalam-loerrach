import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar, de, fr } from "date-fns/locale";

interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

interface HijriDate {
  day: string;
  month: string;
  year: string;
}

const locales = {
  ar,
  de,
  fr,
};

export default function PrayerTimes() {
  const { t, i18n } = useTranslation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);

  const currentLocale = locales[i18n.language as keyof typeof locales] || de;

  const getHijriMonthTranslation = (month: string) => {
    const normalizedMonth = month
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const monthMap: { [key: string]: string } = {
      muharram: "muharram",
      safar: "safar",
      "rabi al-awwal": "rabialawal",
      "rabi al-thani": "rabialthani",
      "jumada al-awwal": "jumadalawal",
      "jumada al-thani": "jumadalthani",
      rajab: "rajab",
      shaban: "shaban",
      ramadan: "ramadan",
      shawwal: "shawwal",
      "dhul-qidah": "dhualqida",
      "dhul-hijjah": "dhualhijja",
    };

    const key = monthMap[normalizedMonth] || normalizedMonth;
    return t(`hijriMonths.${key}`) || month;
  };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Lorrach&country=Germany&method=3"
        );
        const data = await response.json();
        setPrayerTimes({
          fajr: data.data.timings.Fajr,
          sunrise: data.data.timings.Sunrise,
          dhuhr: data.data.timings.Dhuhr,
          asr: data.data.timings.Asr,
          maghrib: data.data.timings.Maghrib,
          isha: data.data.timings.Isha,
        });
        setHijriDate({
          day: data.data.date.hijri.day,
          month: data.data.date.hijri.month.en,
          year: data.data.date.hijri.year,
        });
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (currentTime.getHours() === 0 && currentTime.getMinutes() === 0) {
        fetchPrayerTimes();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!prayerTimes || !hijriDate) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const isRTL = i18n.language === "ar";

  return (
    <section>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border-t-4 border-primary">
        <h2
          className={`flex justify-center text-2xl font-bold text-center mb-4 text-primary ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {t("prayerTimes")}
        </h2>

        <div className="text-center mb-6">
          <div className="text-2xl font-semibold text-secondary">
            {format(currentTime, "HH:mm:ss")}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {format(currentTime, "EEEE, d MMMM yyyy", {
              locale: currentLocale,
            })}
          </div>
          <div
            className="text-sm text-gray-600"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
          >
            {hijriDate.day} {getHijriMonthTranslation(hijriDate.month)}{" "}
            {hijriDate.year} {i18n.language === "ar" ? "هجري" : "AH"}
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(prayerTimes).map(([prayer, time]) => (
            <div
              key={prayer}
              className={`flex justify-between items-center p-3 rounded bg-gray-50 hover:bg-gray-100 transition-colors ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <span
                className={`font-medium text-primary ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t(prayer)}
              </span>
              <span className="text-secondary font-semibold">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

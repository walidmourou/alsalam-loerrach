import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { PrayerTimesData, locales } from "../types/prayerTimes";
import { fetchMonthPrayerTimes } from "../utils/prayerTimesService";
import { ErrorBoundary } from "./ErrorBoundary";

function PrayerTimeRow({
  label,
  time,
  isRTL,
}: {
  label: string;
  time: string;
  isRTL?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center py-2 border-b border-gray-100 ${
        isRTL ? "flex-row-reverse" : ""
      }`}
    >
      <span className="font-medium text-[#262262]">{label}</span>
      <span className="text-[#009245]">{time}</span>
    </div>
  );
}

function PrayerTimesContent() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentLocale =
    locales[i18n.language as keyof typeof locales] || locales.de;

  useEffect(() => {
    const loadPrayerTimes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const times = await fetchMonthPrayerTimes(currentTime);
        const todayIndex = currentTime.getDate() - 1;
        const todayTimes = times[todayIndex];
        setPrayerTimes(todayTimes);
      } catch (err) {
        console.error("Error loading prayer times:", err);
        if (
          err instanceof Error &&
          err.message.includes("Invalid time format")
        ) {
          setError(t("errors.invalidTimeFormat"));
        } else {
          setError(t("errors.fetchPrayerTimes"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPrayerTimes();

    // Update current time every minute
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Refresh prayer times at midnight
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        loadPrayerTimes();
      }
    }, 60000);

    return () => clearInterval(timeInterval);
  }, [t]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-[#262262]">{t("loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!prayerTimes) {
    return null;
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#009245]">
      <h2 className="text-center text-2xl font-bold text-[#262262] mb-6">
        {t("prayerTimes")}
      </h2>

      <div className="mb-6 text-center space-y-1">
        <p className="text-[#009245] font-semibold">
          {format(currentTime, "EEEE, d MMMM yyyy", { locale: currentLocale })}
        </p>
        <p
          className={`flex gap-1 justify-center text-[#262262] font-medium ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div>{prayerTimes.hijriDay}</div>
          <div>{t(`hijriMonths.${prayerTimes.hijriMonth?.en}`)}</div>
          <div>{prayerTimes.hijriYear}</div>
        </p>
      </div>

      <div className="space-y-4">
        <PrayerTimeRow
          label={t("fajr")}
          time={prayerTimes.fajr}
          isRTL={isRTL}
        />
        <PrayerTimeRow
          label={t("sunrise")}
          time={prayerTimes.sunrise}
          isRTL={isRTL}
        />
        <PrayerTimeRow
          label={t("dhuhr")}
          time={prayerTimes.dhuhr}
          isRTL={isRTL}
        />
        <PrayerTimeRow label={t("asr")} time={prayerTimes.asr} isRTL={isRTL} />
        <PrayerTimeRow
          label={t("maghrib")}
          time={prayerTimes.maghrib}
          isRTL={isRTL}
        />
        <PrayerTimeRow
          label={t("isha")}
          time={prayerTimes.isha}
          isRTL={isRTL}
        />
      </div>
    </section>
  );
}

export default function PrayerTimes() {
  return (
    <ErrorBoundary>
      <PrayerTimesContent />
    </ErrorBoundary>
  );
}

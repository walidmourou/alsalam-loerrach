import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { PrayerTimesData } from "../types/prayerTimes";
import MonthPrayerView from "../components/MonthPrayerView";
import { fetchMonthPrayerTimes } from "../utils/prayerTimesService";

export default function PrayerTimesPage() {
  const { t, i18n } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [monthPrayerTimes, setMonthPrayerTimes] = useState<
    Map<string, PrayerTimesData>
  >(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadPrayerTimes = async () => {
      setError(null);
      setLoading(true);
      try {
        const monthStart = startOfMonth(selectedMonth);
        const monthEnd = endOfMonth(selectedMonth);
        const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
        const times = await fetchMonthPrayerTimes(selectedMonth);
        const timesMap = new Map(
          times.map((time, index) => [format(days[index], "yyyy-MM-dd"), time])
        );
        setMonthPrayerTimes(timesMap);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        if (
          error instanceof Error &&
          error.message.includes("Invalid time format")
        ) {
          setError(t("errors.invalidTimeFormat"));
        } else {
          setError(t("errors.fetchPrayerTimes"));
        }
      } finally {
        setLoading(false);
      }
    };

    loadPrayerTimes();
  }, [selectedMonth, t]);

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#262262] mb-8">
            {t("prayerTimes")}
          </h1>

          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-8">
              {error}
            </div>
          ) : (
            <MonthPrayerView
              selectedMonth={selectedMonth}
              monthPrayerTimes={monthPrayerTimes}
              loading={loading}
              onMonthChange={setSelectedMonth}
            />
          )}
        </div>
      </div>
    </div>
  );
}

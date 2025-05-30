import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { useTranslation } from "react-i18next";
import { PrayerTimesData, locales } from "../types/prayerTimes";
import { Calendar } from "lucide-react";

interface Props {
  selectedMonth: Date;
  monthPrayerTimes: Map<string, PrayerTimesData>;
  loading: boolean;
  onMonthChange: (date: Date) => void;
}

export default function MonthPrayerView({
  selectedMonth,
  monthPrayerTimes,
  loading,
  onMonthChange,
}: Props) {
  const { t, i18n } = useTranslation();
  const currentLocale =
    locales[i18n.language as keyof typeof locales] || locales.de;

  // Add function to check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value + "-01");
    onMonthChange(newDate);
  };

  const days = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth),
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-x-auto">
      <div className="flex items-center gap-4 mb-6">
        <Calendar className="h-6 w-6 text-[#009245]" />
        <input
          type="month"
          value={format(selectedMonth, "yyyy-MM")}
          onChange={handleMonthChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009245]"
        />
      </div>

      {loading ? (
        <div className="text-center py-8">{t("loading")}</div>
      ) : monthPrayerTimes.size > 0 ? (
        <div className="min-w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("tableHeaders.date")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("tableHeaders.hijriDate")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("fajr")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("sunrise")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("dhuhr")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("asr")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("maghrib")}
                </th>
                <th className="px-3 py-2 bg-gray-50 text-[#262262]">
                  {t("isha")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {days.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const times = monthPrayerTimes.get(dateKey);
                const todayHighlight = isToday(day)
                  ? "bg-[#009245]/10 font-semibold"
                  : "hover:bg-gray-50";

                return (
                  <tr key={dateKey} className={todayHighlight}>
                    <td className="px-3 py-2 text-[#262262] font-medium">
                      {format(day, "d MMM yy", { locale: currentLocale })}
                    </td>
                    <td className="px-3 py-2 text-[#262262] font-medium">
                      {times &&
                        [
                          times.hijriDay,
                          t(`hijriMonths.${times.hijriMonth?.en}`),
                          times.hijriYear,
                        ]
                          .filter(Boolean)
                          .join(" ")}
                    </td>
                    <td className="px-3 py-2">{times?.fajr}</td>
                    <td className="px-3 py-2">{times?.sunrise}</td>
                    <td className="px-3 py-2">{times?.dhuhr}</td>
                    <td className="px-3 py-2">{times?.asr}</td>
                    <td className="px-3 py-2">{times?.maghrib}</td>
                    <td className="px-3 py-2">{times?.isha}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">{t("selectMonth")}</div>
      )}
    </div>
  );
}

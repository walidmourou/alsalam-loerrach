import { format } from "date-fns";
import { PrayerTimesData } from "../types/prayerTimes";
import { getCachedData, setCachedData } from "./cache";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Lörrach coordinates
const LATITUDE = 47.611698;
const LONGITUDE = 7.6589;
const METHOD = "12";

interface DayData {
  timings: {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
  };
  date: {
    readable: string;
    timestamp: string;
    gregorian: {
      date: string;
      format: string;
      day: string;
      weekday: { en: string };
      month: { number: number; en: string };
      year: string;
    };
    hijri: {
      date: string;
      format: string;
      day: string;
      weekday: { ar: string; en: string };
      month: {
        number: number;
        ar: string;
        en: string;
      };
      year: string;
    };
  };
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
  };
}

interface ApiResponse {
  code: number;
  status: string;
  data: DayData[];
}

function buildApiUrl(baseUrl: string): string {
  const params = new URLSearchParams({
    latitude: LATITUDE.toString(),
    longitude: LONGITUDE.toString(),
    method: METHOD,
    adjustment: "1", // Use local timezone adjustment
    iso8601: "true", // Get standardized time format
  });
  return `${baseUrl}?${params.toString()}`;
}

function validateAndFormatTime(timeStr: string): string {
  try {
    // Parse the ISO string to get just the time part
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } catch (err) {
    throw new Error(`Invalid time format: ${timeStr}`);
  }
}

async function handleApiResponse(response: Response): Promise<any> {
  if (!response.ok) {
    const errorText = await response
      .text()
      .catch(() => "No error details available");
    console.error("API Response Error:", {
      status: response.status,
      statusText: response.statusText,
      error: errorText,
    });
    throw new Error(`API error (${response.status}): ${errorText}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchMonthPrayerTimes(
  date: Date
): Promise<PrayerTimesData[]> {
  const cacheKey = `prayer-times-month-${format(date, "yyyy-MM")}`;
  const cachedData = getCachedData<PrayerTimesData[]>(cacheKey);

  if (cachedData) {
    console.log("Using cached prayer times for:", {
      date: format(date, "yyyy-MM"),
      sampleDay: cachedData[0],
    });
    return cachedData;
  }

  const baseUrl = `https://api.aladhan.com/v1/calendar/${format(
    date,
    "yyyy/M"
  )}`;
  const url = buildApiUrl(baseUrl);
  console.log("Fetching prayer times from:", url);

  try {
    const response = await fetch(url);
    console.log("🚀 ~ response:", response);
    const responseData = (await handleApiResponse(response)) as ApiResponse;

    // Validate data structure
    if (!Array.isArray(responseData.data)) {
      console.error("Invalid API response format:", responseData);
      throw new Error("Invalid API response format");
    }

    const monthPrayerTimes = responseData.data.map((dayData) => {
      try {
        if (!dayData.timings) {
          throw new Error("Missing timings data");
        }

        const prayerTimes: PrayerTimesData = {
          fajr: validateAndFormatTime(dayData.timings.Fajr),
          sunrise: validateAndFormatTime(dayData.timings.Sunrise),
          dhuhr: validateAndFormatTime(dayData.timings.Dhuhr),
          asr: validateAndFormatTime(dayData.timings.Asr),
          maghrib: validateAndFormatTime(dayData.timings.Maghrib),
          isha: validateAndFormatTime(dayData.timings.Isha),
          hijriDay: dayData.date.hijri.day,
          hijriMonth: dayData.date.hijri.month
            ? {
                ar: dayData.date.hijri.month.ar,
                en: dayData.date.hijri.month.en,
              }
            : undefined,
          hijriYear: dayData.date.hijri.year,
        };

        return prayerTimes;
      } catch (err) {
        console.error("Error processing prayer times for day:", {
          date: dayData.date?.gregorian?.date,
          error: err,
        });
        throw new Error("Error processing prayer times data");
      }
    });

    setCachedData(cacheKey, monthPrayerTimes, CACHE_DURATION);
    return monthPrayerTimes;
  } catch (err) {
    console.error("Error fetching or processing monthly prayer times:", {
      date: format(date, "yyyy-MM"),
      error: err,
    });
    throw new Error("Error fetching or processing monthly prayer times");
  }
}

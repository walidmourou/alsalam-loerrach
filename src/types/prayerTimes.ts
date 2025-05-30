import { ar, de, fr } from "date-fns/locale";

export interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  hijriDay?: string;
  hijriMonth?: {
    ar: string;
    en: string;
  };
  hijriYear?: string;
}

export interface HijriDate {
  day: string;
  month: string;
  year: string;
}

export const locales = {
  ar,
  de,
  fr,
} as const;

export type SupportedLocale = keyof typeof locales;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export function PrayerTimes() {
  const { t } = useTranslation();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          'https://api.aladhan.com/v1/timingsByCity?city=Lorrach&country=Germany&method=3'
        );
        const data = await response.json();
        setPrayerTimes({
          fajr: data.data.timings.Fajr,
          sunrise: data.data.timings.Sunrise,
          dhuhr: data.data.timings.Dhuhr,
          asr: data.data.timings.Asr,
          maghrib: data.data.timings.Maghrib,
          isha: data.data.timings.Isha
        });
      } catch (error) {
        console.error('Error fetching prayer times:', error);
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

  if (!prayerTimes) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border-t-4 border-primary">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">{t('prayerTimes')}</h2>
      <div className="text-center mb-6">
        <div className="text-2xl font-semibold text-secondary">
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(prayerTimes).map(([prayer, time]) => (
          <div
            key={prayer}
            className="flex justify-between items-center p-3 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-primary">{t(prayer)}</span>
            <span className="text-secondary font-semibold">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
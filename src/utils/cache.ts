interface CacheItem<T> {
  data: T;
  expiry: number;
}

export function getCachedData<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const cachedItem: CacheItem<T> = JSON.parse(item);
    if (Date.now() > cachedItem.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return cachedItem.data;
  } catch {
    return null;
  }
}

export function setCachedData<T>(key: string, data: T, duration: number): void {
  const item: CacheItem<T> = {
    data,
    expiry: Date.now() + duration,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

class PrayerTimesCache {
  private cache: Map<
    string,
    {
      data: any;
      timestamp: number;
    }
  > = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const now = Date.now();
    if (now - item.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  get(key: string): any {
    return this.cache.get(key)?.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

export const prayerTimesCache = new PrayerTimesCache();

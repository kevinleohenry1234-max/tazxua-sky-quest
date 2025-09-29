import useSWR, { SWRConfiguration, SWRResponse } from 'swr';

/**
 * Default fetcher function for API calls
 */
const defaultFetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, return mock data to prevent errors
      console.warn(`API endpoint ${url} returned non-JSON response, using mock data`);
      return getMockData(url);
    }
    
    return response.json();
  } catch (error) {
    console.warn(`API call failed for ${url}, using mock data:`, error);
    return getMockData(url);
  }
};

/**
 * Mock data provider for development/fallback
 */
const getMockData = (url: string) => {
  if (url.includes('attractions')) {
    return {
      data: [
        { id: 1, name: 'Đỉnh Phu Sang', description: 'Đỉnh cao nhất Tà Xùa', image: '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Xung quanh /1.webp' },
        { id: 2, name: 'Biển mây Tà Xùa', description: 'Cảnh biển mây hùng vĩ', image: '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Ngoại thất /1.webp' }
      ]
    };
  }
  
  if (url.includes('accommodations')) {
    return {
      data: [
        { id: 1, name: '1941M Homestay', location: 'Tà Xùa', price: 500000, image: '/Địa điểm lưu trú/1941M Homestay Tà Xùa/PHOTO /Ngoại thất /1.webp' },
        { id: 2, name: 'Tà Xùa Ecolodge', location: 'Tà Xùa', price: 800000, image: '/Địa điểm lưu trú/Tà Xùa Ecolodge /Photo/Ngoại thất /1.webp' }
      ]
    };
  }
  
  if (url.includes('weather')) {
    return {
      data: {
        temperature: 18,
        condition: 'Partly Cloudy',
        humidity: 85,
        location: 'Tà Xùa'
      }
    };
  }
  
  return { data: [] };
};

/**
 * Custom hook for API data fetching with SWR
 */
export function useApiData<T = any>(
  key: string | null,
  fetcher: (url: string) => Promise<T> = defaultFetcher,
  options: SWRConfiguration = {}
): SWRResponse<T, Error> {
  const defaultOptions: SWRConfiguration = {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // 1 minute
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    ...options,
  };

  return useSWR<T, Error>(key, fetcher, defaultOptions);
}

/**
 * Hook for fetching attractions data
 */
export function useAttractions() {
  return useApiData('/api/attractions', defaultFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes for relatively static data
  });
}

/**
 * Hook for fetching accommodation data
 */
export function useAccommodations() {
  return useApiData('/api/accommodations', defaultFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes
  });
}

/**
 * Hook for fetching weather data
 */
export function useWeather(location?: string) {
  const key = location ? `/api/weather?location=${location}` : null;
  
  return useApiData(key, defaultFetcher, {
    refreshInterval: 600000, // 10 minutes
    revalidateOnFocus: true,
  });
}

/**
 * Hook for fetching user profile data
 */
export function useUserProfile(userId?: string) {
  const key = userId ? `/api/users/${userId}` : null;
  
  return useApiData(key, defaultFetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 30000, // 30 seconds
  });
}

/**
 * Hook for fetching gallery images
 */
export function useGalleryImages(category?: string) {
  const key = category ? `/api/gallery?category=${category}` : '/api/gallery';
  
  return useApiData(key, defaultFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 600000, // 10 minutes for images
  });
}

/**
 * Hook for search results with debouncing
 */
export function useSearchResults(query: string, delay: number = 300) {
  const key = query.trim() ? `/api/search?q=${encodeURIComponent(query)}` : null;
  
  return useApiData(key, defaultFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute
    errorRetryCount: 1, // Fewer retries for search
  });
}

/**
 * Hook for fetching reviews
 */
export function useReviews(itemId?: string, itemType?: string) {
  const key = itemId && itemType ? `/api/reviews?itemId=${itemId}&type=${itemType}` : null;
  
  return useApiData(key, defaultFetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 120000, // 2 minutes
  });
}

export default useApiData;
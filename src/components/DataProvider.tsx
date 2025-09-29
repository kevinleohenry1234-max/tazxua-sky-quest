import React, { createContext, useContext, ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { useAttractions, useAccommodations, useWeather } from '@/hooks/useSWR';

interface DataContextType {
  attractions: any;
  accommodations: any;
  weather: any;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

/**
 * Global SWR configuration for the application
 */
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  // Global fetcher function
  fetcher: async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn(`API endpoint ${url} returned non-JSON response, using mock data`);
        return { data: [] }; // Return empty data structure
      }
      
      return response.json();
    } catch (error) {
      console.warn(`API call failed for ${url}, using fallback data:`, error);
      return { data: [] }; // Return empty data structure on error
    }
  },
  // Cache provider for better performance
  provider: () => new Map(),
  // Error handling
  onError: (error: Error) => {
    console.error('SWR Error:', error);
  },
  // Loading state management
  loadingTimeout: 3000,
};

/**
 * Data provider component that wraps the app with SWR configuration
 * and provides centralized data access
 */
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  return (
    <SWRConfig value={swrConfig}>
      <DataProviderInner>
        {children}
      </DataProviderInner>
    </SWRConfig>
  );
};

/**
 * Inner provider that uses SWR hooks and provides data context
 */
const DataProviderInner: React.FC<DataProviderProps> = ({ children }) => {
  // Use SWR hooks for data fetching
  const attractions = useAttractions();
  const accommodations = useAccommodations();
  const weather = useWeather('Ta Xua');

  const contextValue: DataContextType = {
    attractions,
    accommodations,
    weather,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

/**
 * Custom hook to use the data context
 */
export const useAppData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within a DataProvider');
  }
  return context;
};

/**
 * Hook for accessing attractions data with loading and error states
 */
export const useAttractionsData = () => {
  const { attractions } = useAppData();
  return {
    data: attractions.data,
    isLoading: attractions.isLoading,
    error: attractions.error,
    mutate: attractions.mutate,
  };
};

/**
 * Hook for accessing accommodations data with loading and error states
 */
export const useAccommodationsData = () => {
  const { accommodations } = useAppData();
  return {
    data: accommodations.data,
    isLoading: accommodations.isLoading,
    error: accommodations.error,
    mutate: accommodations.mutate,
  };
};

/**
 * Hook for accessing weather data with loading and error states
 */
export const useWeatherData = () => {
  const { weather } = useAppData();
  return {
    data: weather.data,
    isLoading: weather.isLoading,
    error: weather.error,
    mutate: weather.mutate,
  };
};

export default DataProvider;
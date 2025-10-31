// Search API Types và Interfaces

export type ServiceType = 'all' | 'accommodation' | 'restaurant' | 'tour' | 'transportation' | 'attraction';

export interface SearchFilters {
  type?: ServiceType;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  distance?: number;
  tags?: string[];
  location?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'challenging';
  priceRange?: 'budget' | 'mid' | 'luxury';
  tourType?: 'trekking' | 'cultural' | 'eco' | 'camping' | 'sunrise' | 'village';
  serviceType?: 'bus' | 'motorbike_rental' | 'shuttle' | 'private_driver' | 'taxi';
  category?: 'mountain' | 'forest' | 'viewpoint' | 'cultural';
}

export interface SearchParams extends SearchFilters {
  page?: number;
  limit?: number;
  sortBy?: 'relevance' | 'rating' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResultItem {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  avatar: string; // Ảnh đại diện (ảnh đầu tiên)
  rating: number;
  priceRange?: string;
  price?: string;
  type: ServiceType;
  location: string;
  detailLink: string;
  tags: string[];
  features?: string[];
  amenities?: string[];
  highlights?: string[];
}

export interface SearchResponse {
  results: SearchResultItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: SearchFilters;
  executionTime: number; // ms
  suggestions?: string[]; // Gợi ý từ khóa nếu không có kết quả
}

export interface SearchError {
  error: string;
  message: string;
  code: number;
  timestamp: string;
}

// Utility types cho price parsing
export interface PriceInfo {
  min: number;
  max: number;
  currency: string;
  original: string;
}

// Geolocation types
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationFilter {
  coordinates?: Coordinates;
  radius?: number; // km
}

// Search suggestion types
export interface SearchSuggestion {
  query: string;
  type: 'keyword' | 'location' | 'service';
  count: number;
}

// Popular searches
export interface PopularSearch {
  query: string;
  type: ServiceType;
  count: number;
}

// Search analytics
export interface SearchAnalytics {
  query: string;
  filters: SearchFilters;
  resultCount: number;
  timestamp: string;
  userAgent?: string;
  ip?: string;
}
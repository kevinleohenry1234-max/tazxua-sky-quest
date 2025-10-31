import { SearchParams, SearchResponse, SearchResultItem, ServiceType } from '../types/search';
import {
  sanitizeQuery,
  createSearchTerms,
  matchesText,
  matchesArray,
  calculateRelevanceScore,
  filterByPrice,
  filterByRating,
  createDetailLink,
  extractTags,
  validateSearchParams,
  calculateDistance
} from '../utils/searchUtils';

// Import data
import { homestayRealData } from '../data/homestayRealData';
import { restaurantData } from '../data/restaurantData';
import { tourData } from '../data/tourData';
import { transportData } from '../data/transportData';
import { ATTRACTIONS_DATA } from '../data/attractionsData';

export class SearchService {
  private cache = new Map<string, SearchResponse>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  // Normalize data từ các nguồn khác nhau
  private normalizeAccommodationData(items: any[]): SearchResultItem[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      shortDescription: item.description.substring(0, 150) + '...',
      avatar: item.images?.[0] || '/images/placeholder.jpg',
      rating: item.rating || 0,
      price: item.price,
      priceRange: item.priceRange,
      type: 'accommodation' as ServiceType,
      location: item.location,
      detailLink: createDetailLink('accommodation', item.id),
      tags: extractTags(item, 'accommodation'),
      features: item.features || [],
      amenities: item.amenities || []
    }));
  }

  private normalizeRestaurantData(items: any[]): SearchResultItem[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      shortDescription: item.description.substring(0, 150) + '...',
      avatar: item.images?.[0] || '/images/placeholder.jpg',
      rating: item.rating || 0,
      priceRange: item.priceRange,
      type: 'restaurant' as ServiceType,
      location: item.location,
      detailLink: createDetailLink('restaurant', item.id),
      tags: extractTags(item, 'restaurant'),
      features: item.features || []
    }));
  }

  private normalizeTourData(items: any[]): SearchResultItem[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      shortDescription: item.description.substring(0, 150) + '...',
      avatar: item.images?.[0] || '/images/placeholder.jpg',
      rating: item.rating || 0,
      price: item.price,
      type: 'tour' as ServiceType,
      location: item.location,
      detailLink: createDetailLink('tour', item.id),
      tags: extractTags(item, 'tour'),
      features: item.features || []
    }));
  }

  private normalizeTransportData(items: any[]): SearchResultItem[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      shortDescription: item.description.substring(0, 150) + '...',
      avatar: item.images?.[0] || '/images/placeholder.jpg',
      rating: item.rating || 0,
      price: item.price,
      type: 'transportation' as ServiceType,
      location: item.route ? `${item.route.from} - ${item.route.to}` : item.location || '',
      detailLink: createDetailLink('transportation', item.id),
      tags: extractTags(item, 'transportation'),
      features: item.features || [],
      amenities: item.amenities || []
    }));
  }

  private normalizeAttractionData(items: any[]): SearchResultItem[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      shortDescription: item.shortDescription || item.description.substring(0, 150) + '...',
      avatar: item.images?.[0] || '/images/placeholder.jpg',
      rating: 0, // Attractions don't have ratings in current data
      type: 'attraction' as ServiceType,
      location: item.location,
      detailLink: createDetailLink('attraction', item.id),
      tags: extractTags(item, 'attraction'),
      highlights: item.highlights || []
    }));
  }

  // Lấy tất cả dữ liệu đã normalize
  private getAllData(): SearchResultItem[] {
    const accommodations = this.normalizeAccommodationData(homestayRealData);
    const restaurants = this.normalizeRestaurantData(restaurantData);
    const tours = this.normalizeTourData(tourData);
    const transports = this.normalizeTransportData(transportData);
    const attractions = this.normalizeAttractionData(ATTRACTIONS_DATA);

    return [...accommodations, ...restaurants, ...tours, ...transports, ...attractions];
  }

  // Filter theo type
  private filterByType(items: SearchResultItem[], type?: ServiceType): SearchResultItem[] {
    if (!type || type === 'all') return items;
    return items.filter(item => item.type === type);
  }

  // Filter theo query text
  private filterByQuery(items: SearchResultItem[], query?: string): SearchResultItem[] {
    if (!query) return items;
    
    const searchTerms = createSearchTerms(query);
    if (searchTerms.length === 0) return items;

    return items.filter(item => {
      return (
        matchesText(item.name, searchTerms) ||
        matchesText(item.description, searchTerms) ||
        matchesText(item.location, searchTerms) ||
        matchesArray(item.tags, searchTerms) ||
        matchesArray(item.features || [], searchTerms) ||
        matchesArray(item.amenities || [], searchTerms) ||
        matchesArray(item.highlights || [], searchTerms)
      );
    });
  }

  // Filter theo tags
  private filterByTags(items: SearchResultItem[], tags?: string[]): SearchResultItem[] {
    if (!tags || tags.length === 0) return items;
    
    return items.filter(item => {
      const itemTags = [
        ...item.tags,
        ...(item.features || []),
        ...(item.amenities || []),
        ...(item.highlights || [])
      ].map(tag => tag.toLowerCase());
      
      return tags.some(tag => 
        itemTags.some(itemTag => itemTag.includes(tag.toLowerCase()))
      );
    });
  }

  // Sort results
  private sortResults(
    items: SearchResultItem[],
    sortBy: string = 'relevance',
    sortOrder: string = 'desc',
    searchTerms: string[] = []
  ): SearchResultItem[] {
    return items.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'relevance':
          const scoreA = calculateRelevanceScore(a, searchTerms);
          const scoreB = calculateRelevanceScore(b, searchTerms);
          comparison = scoreB - scoreA; // Higher score first
          break;
        case 'rating':
          comparison = (b.rating || 0) - (a.rating || 0);
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name, 'vi');
          break;
        case 'price':
          // This is simplified - would need proper price parsing
          const priceA = a.price || a.priceRange || '0';
          const priceB = b.price || b.priceRange || '0';
          comparison = priceA.localeCompare(priceB);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  // Paginate results
  private paginateResults(
    items: SearchResultItem[],
    page: number = 1,
    limit: number = 10
  ): { results: SearchResultItem[]; pagination: any } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const results = items.slice(startIndex, endIndex);
    
    const totalResults = items.length;
    const totalPages = Math.ceil(totalResults / limit);
    
    return {
      results,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  // Generate cache key
  private generateCacheKey(params: SearchParams): string {
    return JSON.stringify(params);
  }

  // Get popular results (when no query)
  private getPopularResults(): SearchResultItem[] {
    const allData = this.getAllData();
    
    // Sort by rating and return top items
    return allData
      .filter(item => item.rating && item.rating > 4.0)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 20);
  }

  // Main search method
  public async search(params: SearchParams): Promise<SearchResponse> {
    const startTime = Date.now();
    
    // Validate params
    const validation = validateSearchParams(params);
    if (!validation.valid) {
      throw new Error(`Invalid search parameters: ${validation.errors.join(', ')}`);
    }

    // Check cache
    const cacheKey = this.generateCacheKey(params);
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - startTime < this.cacheTimeout) {
      return cached;
    }

    try {
      // Get base data
      let results: SearchResultItem[];
      
      if (!params.query && !params.type) {
        // No query - return popular results
        results = this.getPopularResults();
      } else {
        results = this.getAllData();
      }

      // Apply filters
      results = this.filterByType(results, params.type);
      results = this.filterByQuery(results, params.query);
      results = this.filterByTags(results, params.tags);
      
      // Apply price and rating filters
      results = results.filter(item => 
        filterByPrice(item, params.minPrice, params.maxPrice) &&
        filterByRating(item, params.minRating)
      );

      // Sort results
      const searchTerms = createSearchTerms(params.query || '');
      results = this.sortResults(results, params.sortBy, params.sortOrder, searchTerms);

      // Paginate
      const { results: paginatedResults, pagination } = this.paginateResults(
        results,
        params.page || 1,
        params.limit || 10
      );

      const response: SearchResponse = {
        results: paginatedResults,
        pagination,
        filters: {
          type: params.type,
          query: params.query,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          minRating: params.minRating,
          distance: params.distance,
          tags: params.tags
        },
        executionTime: Date.now() - startTime,
        suggestions: results.length === 0 ? this.generateSuggestions(params.query) : undefined
      };

      // Cache result
      this.cache.set(cacheKey, response);

      return response;
    } catch (error) {
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Generate suggestions when no results found
  private generateSuggestions(query?: string): string[] {
    if (!query) return [];
    
    const suggestions = [
      'homestay',
      'nhà hàng',
      'tour trekking',
      'phương tiện',
      'điểm tham quan',
      'view núi',
      'gần trung tâm',
      'giá rẻ'
    ];
    
    return suggestions.filter(s => 
      !query.toLowerCase().includes(s.toLowerCase())
    ).slice(0, 3);
  }

  // Get search suggestions for autocomplete
  public async getSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 2) return [];
    
    const allData = this.getAllData();
    const suggestions = new Set<string>();
    
    const searchTerms = createSearchTerms(query);
    
    allData.forEach(item => {
      // Add matching names
      if (matchesText(item.name, searchTerms)) {
        suggestions.add(item.name);
      }
      
      // Add matching locations
      if (matchesText(item.location, searchTerms)) {
        suggestions.add(item.location);
      }
      
      // Add matching tags
      item.tags.forEach(tag => {
        if (matchesText(tag, searchTerms)) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  }
}

// Export singleton instance
export const searchService = new SearchService();
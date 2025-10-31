import { SearchFilters, SearchResultItem, PriceInfo, Coordinates } from '../types/search';

// Utility để parse giá từ string sang number
export const parsePrice = (priceStr: string): PriceInfo => {
  if (!priceStr) return { min: 0, max: 0, currency: 'VND', original: priceStr };
  
  // Remove currency symbols and dots
  const cleanPrice = priceStr.replace(/[đ.,]/g, '').replace(/\s+/g, '');
  
  // Handle ranges like "800.000đ - 1.200.000đ"
  if (cleanPrice.includes('-')) {
    const [minStr, maxStr] = cleanPrice.split('-');
    return {
      min: parseInt(minStr) || 0,
      max: parseInt(maxStr) || 0,
      currency: 'VND',
      original: priceStr
    };
  }
  
  // Single price
  const price = parseInt(cleanPrice) || 0;
  return {
    min: price,
    max: price,
    currency: 'VND',
    original: priceStr
  };
};

// Utility để tính khoảng cách Haversine
export const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return value * Math.PI / 180;
};

// Utility để sanitize search query
export const sanitizeQuery = (query: string): string => {
  if (!query) return '';
  
  return query
    .trim()
    .toLowerCase()
    .replace(/[<>\"'&]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' '); // Normalize whitespace
};

// Utility để tạo search terms từ query
export const createSearchTerms = (query: string): string[] => {
  const sanitized = sanitizeQuery(query);
  if (!sanitized) return [];
  
  // Split by spaces and filter out short terms
  return sanitized
    .split(' ')
    .filter(term => term.length >= 2)
    .map(term => term.toLowerCase());
};

// Utility để check match với text
export const matchesText = (text: string, searchTerms: string[]): boolean => {
  if (!text || searchTerms.length === 0) return true;
  
  const normalizedText = text.toLowerCase();
  return searchTerms.some(term => normalizedText.includes(term));
};

// Utility để check match với array of strings
export const matchesArray = (arr: string[], searchTerms: string[]): boolean => {
  if (!arr || arr.length === 0 || searchTerms.length === 0) return true;
  
  return arr.some(item => matchesText(item, searchTerms));
};

// Utility để tính relevance score
export const calculateRelevanceScore = (
  item: SearchResultItem,
  searchTerms: string[]
): number => {
  if (searchTerms.length === 0) return item.rating || 0;
  
  let score = 0;
  
  // Name match (highest weight)
  if (matchesText(item.name, searchTerms)) {
    score += 10;
  }
  
  // Description match
  if (matchesText(item.description, searchTerms)) {
    score += 5;
  }
  
  // Tags/features match
  if (matchesArray(item.tags, searchTerms)) {
    score += 3;
  }
  
  if (item.features && matchesArray(item.features, searchTerms)) {
    score += 3;
  }
  
  if (item.amenities && matchesArray(item.amenities, searchTerms)) {
    score += 2;
  }
  
  // Location match
  if (matchesText(item.location, searchTerms)) {
    score += 2;
  }
  
  // Add rating bonus
  score += (item.rating || 0) * 0.5;
  
  return score;
};

// Utility để filter theo price range
export const filterByPrice = (
  item: SearchResultItem,
  minPrice?: number,
  maxPrice?: number
): boolean => {
  if (!minPrice && !maxPrice) return true;
  if (!item.price && !item.priceRange) return true;
  
  const priceInfo = parsePrice(item.price || item.priceRange || '');
  
  if (minPrice && priceInfo.max < minPrice) return false;
  if (maxPrice && priceInfo.min > maxPrice) return false;
  
  return true;
};

// Utility để filter theo rating
export const filterByRating = (
  item: SearchResultItem,
  minRating?: number
): boolean => {
  if (!minRating) return true;
  return (item.rating || 0) >= minRating;
};

// Utility để tạo detail link
export const createDetailLink = (type: string, id: string): string => {
  const typeMap: Record<string, string> = {
    accommodation: '/accommodation',
    restaurant: '/restaurants',
    tour: '/tours',
    transportation: '/transport',
    attraction: '/attractions'
  };
  
  const basePath = typeMap[type] || '/';
  return `${basePath}/${id}`;
};

// Utility để extract tags từ item
export const extractTags = (item: any, type: string): string[] => {
  const tags: string[] = [];
  
  // Common tags
  if (item.amenities) tags.push(...item.amenities);
  if (item.features) tags.push(...item.features);
  
  // Type-specific tags
  switch (type) {
    case 'accommodation':
      if (item.location) tags.push(item.location);
      break;
    case 'restaurant':
      if (item.cuisine) tags.push(item.cuisine);
      if (item.priceRange) tags.push(item.priceRange);
      break;
    case 'tour':
      if (item.tourType) tags.push(item.tourType);
      if (item.difficulty) tags.push(item.difficulty);
      if (item.duration) tags.push(item.duration);
      break;
    case 'transportation':
      if (item.serviceType) tags.push(item.serviceType);
      if (item.route) {
        tags.push(item.route.from, item.route.to);
      }
      break;
    case 'attraction':
      if (item.category) tags.push(item.category);
      if (item.difficulty) tags.push(item.difficulty);
      if (item.highlights) tags.push(...item.highlights);
      break;
  }
  
  return [...new Set(tags)]; // Remove duplicates
};

// Utility để validate search params
export const validateSearchParams = (params: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate page
  if (params.page && (isNaN(params.page) || params.page < 1)) {
    errors.push('Page must be a positive number');
  }
  
  // Validate limit
  if (params.limit && (isNaN(params.limit) || params.limit < 1 || params.limit > 100)) {
    errors.push('Limit must be between 1 and 100');
  }
  
  // Validate price range
  if (params.minPrice && isNaN(params.minPrice)) {
    errors.push('Min price must be a number');
  }
  
  if (params.maxPrice && isNaN(params.maxPrice)) {
    errors.push('Max price must be a number');
  }
  
  if (params.minPrice && params.maxPrice && params.minPrice > params.maxPrice) {
    errors.push('Min price cannot be greater than max price');
  }
  
  // Validate rating
  if (params.minRating && (isNaN(params.minRating) || params.minRating < 0 || params.minRating > 10)) {
    errors.push('Min rating must be between 0 and 10');
  }
  
  // Validate distance
  if (params.distance && (isNaN(params.distance) || params.distance < 0)) {
    errors.push('Distance must be a positive number');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};
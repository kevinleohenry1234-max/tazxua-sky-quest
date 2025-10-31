const fs = require('fs');
const path = require('path');

// Cache for loaded data
let dataCache = null;

// Load data using dynamic imports
async function loadData() {
  if (dataCache) return dataCache;
  
  try {
    // Use dynamic imports for ES modules
    const [
      { homestayRealData },
      { restaurantData },
      { tourData },
      { transportData },
      { ATTRACTIONS_DATA }
    ] = await Promise.all([
      import('../data/homestayRealData.ts'),
      import('../data/restaurantData.ts'),
      import('../data/tourData.ts'),
      import('../data/transportData.ts'),
      import('../data/attractionsData.ts')
    ]);

    dataCache = {
      homestayRealData,
      restaurantData,
      tourData,
      transportData,
      ATTRACTIONS_DATA
    };

    return dataCache;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

// Utility functions
function sanitizeQuery(query) {
  if (!query || typeof query !== 'string') return '';
  return query.trim().toLowerCase().replace(/[^\w\s]/g, '');
}

function createSearchTerms(query) {
  return sanitizeQuery(query).split(/\s+/).filter(term => term.length > 0);
}

function matchesText(text, searchTerms) {
  if (!text || !searchTerms.length) return false;
  const normalizedText = text.toLowerCase();
  return searchTerms.some(term => normalizedText.includes(term));
}

function matchesArray(array, searchTerms) {
  if (!Array.isArray(array) || !searchTerms.length) return false;
  return array.some(item => matchesText(item, searchTerms));
}

function parsePrice(priceStr) {
  if (!priceStr) return { min: 0, max: 0 };
  const numStr = priceStr.replace(/[^\d]/g, '');
  const price = parseInt(numStr) || 0;
  return { min: price, max: price };
}

function filterByPrice(items, minPrice, maxPrice) {
  if (!minPrice && !maxPrice) return items;
  
  return items.filter(item => {
    const { min, max } = parsePrice(item.price);
    const itemPrice = (min + max) / 2 || min || max;
    
    if (minPrice && itemPrice < minPrice) return false;
    if (maxPrice && itemPrice > maxPrice) return false;
    return true;
  });
}

function filterByRating(items, minRating) {
  if (!minRating) return items;
  return items.filter(item => (item.rating || 0) >= minRating);
}

function calculateRelevanceScore(item, searchTerms) {
  if (!searchTerms.length) return 1;
  
  let score = 0;
  const weights = {
    name: 3,
    description: 2,
    location: 2,
    features: 1,
    amenities: 1,
    tags: 1
  };

  // Check name matches
  if (matchesText(item.name, searchTerms)) {
    score += weights.name;
  }

  // Check description matches
  if (matchesText(item.description, searchTerms)) {
    score += weights.description;
  }

  // Check location matches
  if (matchesText(item.location, searchTerms)) {
    score += weights.location;
  }

  // Check features/amenities matches
  if (item.features && matchesArray(item.features, searchTerms)) {
    score += weights.features;
  }

  if (item.amenities && matchesArray(item.amenities, searchTerms)) {
    score += weights.amenities;
  }

  return score;
}

// Data normalization functions
function normalizeHomestay(homestay) {
  return {
    id: homestay.id,
    type: 'homestay',
    name: homestay.name,
    description: homestay.description,
    location: homestay.location,
    rating: homestay.rating,
    price: homestay.price,
    images: homestay.images || [],
    features: homestay.features || [],
    amenities: homestay.amenities || [],
    contact: homestay.contact,
    tags: [...(homestay.features || []), ...(homestay.amenities || [])],
    relevanceScore: 0
  };
}

function normalizeRestaurant(restaurant) {
  return {
    id: restaurant.id,
    type: 'restaurant',
    name: restaurant.name,
    description: restaurant.description,
    location: restaurant.location,
    rating: restaurant.rating,
    price: restaurant.priceRange,
    images: restaurant.images || [],
    features: restaurant.specialties || [],
    amenities: restaurant.amenities || [],
    contact: restaurant.contact,
    tags: [...(restaurant.specialties || []), ...(restaurant.amenities || []), restaurant.cuisine].filter(Boolean),
    relevanceScore: 0
  };
}

function normalizeTour(tour) {
  return {
    id: tour.id,
    type: 'tour',
    name: tour.name,
    description: tour.description,
    location: tour.location,
    rating: tour.rating,
    price: tour.price,
    images: tour.images || [],
    features: tour.highlights || [],
    amenities: tour.included || [],
    contact: tour.contact,
    tags: [...(tour.highlights || []), ...(tour.included || []), tour.tourType, tour.difficulty].filter(Boolean),
    relevanceScore: 0
  };
}

function normalizeTransport(transport) {
  return {
    id: transport.id,
    type: 'transport',
    name: transport.name,
    description: transport.description,
    location: transport.route?.from || transport.location,
    rating: transport.rating,
    price: transport.price,
    images: transport.images || [],
    features: transport.features || [],
    amenities: transport.amenities || [],
    contact: transport.contact,
    tags: [...(transport.features || []), ...(transport.amenities || []), transport.serviceType].filter(Boolean),
    relevanceScore: 0
  };
}

function normalizeAttraction(attraction) {
  return {
    id: attraction.id,
    type: 'attraction',
    name: attraction.name,
    description: attraction.description,
    location: attraction.location,
    rating: 0, // Attractions don't have ratings in the data
    price: 'Miễn phí', // Most attractions are free
    images: attraction.images || [],
    features: attraction.highlights || [],
    amenities: [],
    contact: {},
    tags: [...(attraction.highlights || []), attraction.category, attraction.difficulty].filter(Boolean),
    relevanceScore: 0
  };
}

// Main search service class
class SearchService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async getAllData() {
    const data = await loadData();
    
    const allItems = [
      ...data.homestayRealData.map(normalizeHomestay),
      ...data.restaurantData.map(normalizeRestaurant),
      ...data.tourData.map(normalizeTour),
      ...data.transportData.map(normalizeTransport),
      ...data.ATTRACTIONS_DATA.map(normalizeAttraction)
    ];

    return allItems;
  }

  async search(params) {
    try {
      const cacheKey = JSON.stringify(params);
      const cached = this.cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
      }

      const allData = await this.getAllData();
      let results = [...allData];

      // Filter by type
      if (params.type && params.type !== 'all') {
        results = results.filter(item => item.type === params.type);
      }

      // Filter by search query
      if (params.query) {
        const searchTerms = createSearchTerms(params.query);
        results = results.filter(item => {
          const score = calculateRelevanceScore(item, searchTerms);
          item.relevanceScore = score;
          return score > 0;
        });
      }

      // Filter by tags
      if (params.tags && params.tags.length > 0) {
        results = results.filter(item => 
          params.tags.some(tag => 
            item.tags.some(itemTag => 
              itemTag.toLowerCase().includes(tag.toLowerCase())
            )
          )
        );
      }

      // Filter by price range
      results = filterByPrice(results, params.minPrice, params.maxPrice);

      // Filter by rating
      results = filterByRating(results, params.minRating);

      // Sort results
      results.sort((a, b) => {
        switch (params.sortBy) {
          case 'price':
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);
            const avgA = (priceA.min + priceA.max) / 2 || priceA.min || priceA.max;
            const avgB = (priceB.min + priceB.max) / 2 || priceB.min || priceB.max;
            return params.sortOrder === 'asc' ? avgA - avgB : avgB - avgA;
          
          case 'rating':
            return params.sortOrder === 'asc' ? 
              (a.rating || 0) - (b.rating || 0) : 
              (b.rating || 0) - (a.rating || 0);
          
          case 'name':
            return params.sortOrder === 'asc' ? 
              a.name.localeCompare(b.name) : 
              b.name.localeCompare(a.name);
          
          default: // relevance
            return b.relevanceScore - a.relevanceScore;
        }
      });

      // Pagination
      const total = results.length;
      const startIndex = (params.page - 1) * params.limit;
      const endIndex = startIndex + params.limit;
      const paginatedResults = results.slice(startIndex, endIndex);

      const response = {
        results: paginatedResults,
        pagination: {
          page: params.page,
          limit: params.limit,
          total,
          totalPages: Math.ceil(total / params.limit),
          hasNext: endIndex < total,
          hasPrev: params.page > 1
        },
        filters: {
          type: params.type,
          query: params.query,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          minRating: params.minRating,
          tags: params.tags
        }
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      });

      return response;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  async getPopular(limit = 10) {
    try {
      const allData = await this.getAllData();
      
      // Sort by rating and return top items
      const popular = allData
        .filter(item => item.rating > 0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit);

      return popular;
    } catch (error) {
      console.error('Get popular error:', error);
      throw error;
    }
  }

  async getSuggestions(query, limit = 5) {
    try {
      if (!query || query.length < 2) return [];

      const allData = await this.getAllData();
      const searchTerms = createSearchTerms(query);
      
      const suggestions = allData
        .filter(item => {
          const score = calculateRelevanceScore(item, searchTerms);
          return score > 0;
        })
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit)
        .map(item => ({
          id: item.id,
          name: item.name,
          type: item.type,
          location: item.location
        }));

      return suggestions;
    } catch (error) {
      console.error('Get suggestions error:', error);
      throw error;
    }
  }
}

// Create and export service instance
const searchService = new SearchService();

module.exports = { searchService };
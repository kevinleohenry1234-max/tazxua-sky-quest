const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Import search service (Node.js version)
const { searchService } = require('./src/services/searchService.node.cjs');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main search endpoint
app.get('/api/search', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Extract and validate query parameters
    const {
      type = 'all',
      q: query = '',
      minPrice,
      maxPrice,
      minRating,
      distance,
      tags,
      page = 1,
      limit = 10,
      sortBy = 'relevance',
      sortOrder = 'desc'
    } = req.query;

    // Parse numeric parameters
    const searchParams = {
      type: type === 'all' ? undefined : type,
      query: query.trim(),
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      minRating: minRating ? parseFloat(minRating) : undefined,
      distance: distance ? parseFloat(distance) : undefined,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',')) : undefined,
      page: parseInt(page),
      limit: Math.min(parseInt(limit), 50), // Max 50 items per page
      sortBy,
      sortOrder
    };

    // Validate parameters
    if (searchParams.page < 1) {
      return res.status(400).json({
        error: 'Invalid page number',
        message: 'Page must be greater than 0'
      });
    }

    if (searchParams.limit < 1 || searchParams.limit > 50) {
      return res.status(400).json({
        error: 'Invalid limit',
        message: 'Limit must be between 1 and 50'
      });
    }

    // Perform search
    const results = await searchService.search(searchParams);
    
    // Add execution time
    results.executionTime = Date.now() - startTime;

    // Log search for analytics
    console.log(`Search: ${JSON.stringify(searchParams)} - ${results.pagination.totalResults} results in ${results.executionTime}ms`);

    res.json(results);

  } catch (error) {
    console.error('Search error:', error);
    
    res.status(500).json({
      error: 'Search failed',
      message: 'Không thể thực hiện tìm kiếm, vui lòng thử lại sau.',
      timestamp: new Date().toISOString()
    });
  }
});

// Search suggestions endpoint
app.get('/api/suggest', async (req, res) => {
  try {
    const { q: query = '' } = req.query;
    
    if (!query || query.length < 2) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await searchService.getSuggestions(query);
    
    res.json({ 
      suggestions,
      query: query.trim()
    });

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({
      error: 'Suggestions failed',
      message: 'Không thể lấy gợi ý tìm kiếm.'
    });
  }
});

// Popular searches endpoint
app.get('/api/popular', async (req, res) => {
  try {
    // Get popular/trending searches
    const popularSearches = [
      { query: 'homestay view núi', type: 'accommodation', count: 150 },
      { query: 'tour trekking', type: 'tour', count: 120 },
      { query: 'nhà hàng địa phương', type: 'restaurant', count: 95 },
      { query: 'xe máy thuê', type: 'transportation', count: 80 },
      { query: 'cây cô đơn', type: 'attraction', count: 200 },
      { query: 'mỏm cá heo', type: 'attraction', count: 180 },
      { query: 'trà shan tuyết', type: 'restaurant', count: 70 },
      { query: 'camping', type: 'tour', count: 60 }
    ];

    res.json({ 
      popular: popularSearches,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Popular searches error:', error);
    res.status(500).json({
      error: 'Failed to get popular searches',
      message: 'Không thể lấy danh sách tìm kiếm phổ biến.'
    });
  }
});

// Service types endpoint
app.get('/api/service-types', (req, res) => {
  try {
    const serviceTypes = [
      { value: 'all', label: 'Tất cả', count: 0 },
      { value: 'accommodation', label: 'Khách sạn & Homestay', count: 0 },
      { value: 'restaurant', label: 'Nhà hàng', count: 0 },
      { value: 'tour', label: 'Tour', count: 0 },
      { value: 'transportation', label: 'Di chuyển', count: 0 },
      { value: 'attraction', label: 'Điểm tham quan', count: 0 }
    ];

    res.json({ 
      serviceTypes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Service types error:', error);
    res.status(500).json({
      error: 'Failed to get service types',
      message: 'Không thể lấy danh sách loại dịch vụ.'
    });
  }
});

// Analytics endpoint (for tracking search queries)
app.post('/api/analytics/search', (req, res) => {
  try {
    const { query, filters, resultCount, userAgent } = req.body;
    
    // Log search analytics
    const analyticsData = {
      query: query || '',
      filters: filters || {},
      resultCount: resultCount || 0,
      timestamp: new Date().toISOString(),
      userAgent: userAgent || req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress
    };

    // In production, you would save this to a database
    console.log('Search Analytics:', JSON.stringify(analyticsData));

    res.json({ 
      status: 'logged',
      timestamp: analyticsData.timestamp
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'Analytics logging failed'
    });
  }
});

// Attractions endpoint - serve attractions data
app.get('/api/attractions', (req, res) => {
  try {
    // Read attractions data from the TypeScript file
    const attractionsDataPath = path.join(__dirname, 'src/data/attractionsData.ts');
    
    if (!fs.existsSync(attractionsDataPath)) {
      return res.status(404).json({
        error: 'Attractions data not found',
        message: 'File dữ liệu attractions không tồn tại.'
      });
    }

    // Read and parse the TypeScript file
    const fileContent = fs.readFileSync(attractionsDataPath, 'utf8');
    
    // Extract the ATTRACTIONS_DATA array using regex
    const dataMatch = fileContent.match(/export const ATTRACTIONS_DATA[^=]*=\s*(\[[\s\S]*?\]);/);
    
    if (!dataMatch) {
      return res.status(500).json({
        error: 'Invalid data format',
        message: 'Không thể đọc dữ liệu attractions từ file.'
      });
    }

    // Parse the JavaScript array (remove TypeScript types)
    let dataString = dataMatch[1];
    
    // Remove TypeScript type annotations
    dataString = dataString.replace(/:\s*Attraction/g, '');
    dataString = dataString.replace(/as\s+const/g, '');
    
    // Evaluate the JavaScript array safely
    const attractionsData = eval(`(${dataString})`);
    
    res.json({
      success: true,
      data: attractionsData,
      count: attractionsData.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Attractions endpoint error:', error);
    res.status(500).json({
      error: 'Failed to load attractions',
      message: 'Không thể tải dữ liệu điểm tham quan.',
      timestamp: new Date().toISOString()
    });
  }
});

// Serve React app for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  res.status(500).json({
    error: 'Internal server error',
    message: 'Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Search API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Search endpoint: http://localhost:${PORT}/api/search`);
  console.log(`💡 Suggestions: http://localhost:${PORT}/api/suggest`);
  console.log(`📊 Popular searches: http://localhost:${PORT}/api/popular`);
  console.log(`🏔️ Attractions: http://localhost:${PORT}/api/attractions`);
});

module.exports = app;
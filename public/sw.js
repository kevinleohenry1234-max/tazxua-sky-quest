// ViViet Safety Center Service Worker
const CACHE_NAME = 'viviet-safety-v1';
const STATIC_CACHE_NAME = 'viviet-safety-static-v1';
const DYNAMIC_CACHE_NAME = 'viviet-safety-dynamic-v1';

// Pre-cache essential static resources
const STATIC_ASSETS = [
  '/',
  '/safety',
  '/manifest.json',
  '/favicon.ico',
  // CSS and JS will be added dynamically by build process
];

// Cache strategies configuration
const CACHE_STRATEGIES = {
  // Cache first with TTL for images and fonts (30 days)
  CACHE_FIRST_TTL: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  
  // Stale while revalidate for dynamic data
  STALE_WHILE_REVALIDATE: [
    '/api/weather',
    '/api/alerts', 
    '/api/safety-locations'
  ],
  
  // Network first for critical updates
  NETWORK_FIRST: [
    '/api/emergency'
  ]
};

// Install event - pre-cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error pre-caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isDynamicAPI(request)) {
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else if (isNetworkFirstAPI(request)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (isGoogleMapsRequest(request)) {
    event.respondWith(handleGoogleMapsRequest(request));
  } else {
    event.respondWith(networkFirstWithFallback(request));
  }
});

// Cache-first strategy for static assets (images, fonts, etc.)
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Check if cache is still valid (TTL check)
      const cacheDate = new Date(cachedResponse.headers.get('sw-cache-date') || 0);
      const now = new Date();
      
      if (now.getTime() - cacheDate.getTime() < CACHE_STRATEGIES.CACHE_FIRST_TTL) {
        return cachedResponse;
      }
    }
    
    // Fetch from network and update cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      const responseWithDate = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: {
          ...Object.fromEntries(responseClone.headers.entries()),
          'sw-cache-date': new Date().toISOString()
        }
      });
      
      cache.put(request, responseWithDate);
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first strategy failed:', error);
    const cache = await caches.open(STATIC_CACHE_NAME);
    return cache.match(request) || new Response('Offline', { status: 503 });
  }
}

// Stale-while-revalidate strategy for dynamic data
async function staleWhileRevalidateStrategy(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    // Always try to fetch from network in background
    const networkPromise = fetch(request)
      .then(async (networkResponse) => {
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          await cache.put(request, responseClone);
          
          // Notify clients about data refresh
          self.clients.matchAll().then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'SAFETY_DATA_REFRESHED',
                url: request.url,
                timestamp: new Date().toISOString()
              });
            });
          });
        }
        return networkResponse;
      })
      .catch((error) => {
        console.error('[SW] Network fetch failed:', error);
        return null;
      });
    
    // Return cached response immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Wait for network response if no cache
    return await networkPromise || new Response(
      JSON.stringify({ error: 'Offline and no cached data available' }), 
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('[SW] Stale-while-revalidate strategy failed:', error);
    return new Response('Service unavailable', { status: 503 });
  }
}

// Network-first strategy for critical APIs
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Network-first strategy failed, trying cache:', error);
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    return cachedResponse || new Response(
      JSON.stringify({ error: 'Network unavailable and no cached data' }), 
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle Google Maps requests with fallback
async function handleGoogleMapsRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Google Maps request failed:', error);
    
    // Try to return cached version
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return a fallback response for Maps API
    return new Response('', { 
      status: 503,
      statusText: 'Maps service unavailable'
    });
  }
}

// Network-first with fallback for other requests
async function networkFirstWithFallback(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.error('[SW] Network request failed:', error);
    
    // Try cache
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const cache = await caches.open(STATIC_CACHE_NAME);
      return cache.match('/') || new Response('Offline', { status: 503 });
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Helper functions to identify request types
function isStaticAsset(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  return pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i) ||
         pathname.startsWith('/images/') ||
         pathname.startsWith('/fonts/') ||
         pathname.startsWith('/icons/');
}

function isDynamicAPI(request) {
  const url = new URL(request.url);
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.some(path => 
    url.pathname.includes(path)
  );
}

function isNetworkFirstAPI(request) {
  const url = new URL(request.url);
  return CACHE_STRATEGIES.NETWORK_FIRST.some(path => 
    url.pathname.includes(path)
  );
}

function isGoogleMapsRequest(request) {
  const url = new URL(request.url);
  return url.hostname.includes('googleapis.com') || 
         url.hostname.includes('maps.google.com') ||
         url.hostname.includes('gstatic.com');
}

// Handle messages from clients
self.addEventListener('message', (event) => {
  const { data } = event;
  
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (data.type === 'GET_CACHE_STATUS') {
    // Return cache status to client
    caches.keys().then(cacheNames => {
      event.ports[0].postMessage({
        type: 'CACHE_STATUS',
        caches: cacheNames,
        timestamp: new Date().toISOString()
      });
    });
  } else if (data.type === 'CLEAR_CACHE') {
    // Clear specific cache
    if (data.cacheName) {
      caches.delete(data.cacheName).then(success => {
        event.ports[0].postMessage({
          type: 'CACHE_CLEARED',
          success,
          cacheName: data.cacheName
        });
      });
    }
  }
});

console.log('[SW] Service Worker script loaded');
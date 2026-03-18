// ============================================
// SERVICE WORKER - Offline Support & Caching
// ============================================

const CACHE_NAME = 'soul-of-medico-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/login.html',
    '/index.html',
    '/lectures.html',
    '/tests.html',
    '/admin.html',
    '/style.css',
    '/login.js',
    '/lectures.js',
    '/tests.js',
    '/data.js',
    '/manifest.json'
];

// ============================================
// INSTALL EVENT - Cache assets
// ============================================
self.addEventListener('install', (event) => {
    console.log('🔧 Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Caching app assets...');
            return cache.addAll(ASSETS_TO_CACHE).catch(err => {
                console.warn('⚠️ Some assets could not be cached:', err);
                // Continue even if some assets fail to cache
                return Promise.resolve();
            });
        })
    );
    
    // Skip waiting - activate immediately
    self.skipWaiting();
});

// ============================================
// ACTIVATE EVENT - Clean up old caches
// ============================================
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activated');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    // Claim all clients immediately
    self.clients.claim();
});

// ============================================
// FETCH EVENT - Serve from cache, fallback to network
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Only handle HTTP(S) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Network first strategy
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Cache successful responses
                if (response.ok) {
                    const cache = caches.open(CACHE_NAME);
                    cache.then((c) => c.put(request, response.clone()));
                }
                return response;
            })
            .catch((error) => {
                // Fall back to cache
                console.log('📡 Network failed, using cache:', request.url);
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        // Return offline page if available
                        if (request.destination === 'document') {
                            return caches.match('/login.html');
                        }
                        
                        // Return offline response
                        return new Response(
                            'Offline - Resource not available',
                            {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain'
                                })
                            }
                        );
                    });
            })
    );
});

// ============================================
// MESSAGE EVENT - Handle messages from clients
// ============================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('⏭️ Skipping waiting and activating immediately');
        self.skipWaiting();
    }
});

// ============================================
// SYNC EVENT - Background sync (future feature)
// ============================================
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-videos') {
        event.waitUntil(
            // Sync video data when online
            self.clients.matchAll().then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({
                        type: 'SYNC_VIDEOS'
                    });
                });
            })
        );
    }
});

console.log('✅ Service Worker loaded');

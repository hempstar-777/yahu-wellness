const CACHE_NAME = 'deliverance-app-v3';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) =>
          cacheName !== CACHE_NAME ? caches.delete(cacheName) : undefined
        )
      )
    )
  );
  self.clients.claim();
});

// Network-first for navigations to always get latest deploy
async function networkFirst(event) {
  try {
    const fresh = await fetch(event.request, { cache: 'no-store' });
    const cache = await caches.open(CACHE_NAME);
    cache.put(event.request, fresh.clone());
    return fresh;
  } catch (_) {
    // Fallback to cached index when offline
    return caches.match('/index.html');
  }
}

// Stale-while-revalidate for static assets
async function staleWhileRevalidate(event) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(event.request);
  const networkPromise = fetch(event.request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(event.request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Never cache the service worker itself
  if (new URL(req.url).pathname === '/sw.js') return;

  // Use network-first for navigation/documents (ensures new deploy is visible)
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(networkFirst(event));
    return;
  }

  // Skip cross-origin requests
  if (!req.url.startsWith(self.location.origin)) return;

  // Use SWR for other same-origin requests
  event.respondWith(staleWhileRevalidate(event));
});
const CACHE = 'sidequests-v1';
const OFFLINE_ASSETS = [
  '/sidequests/',
  '/sidequests/index.html',
  '/sidequests/manifest.json'
];

// Install: cache core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(OFFLINE_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache
self.addEventListener('fetch', e => {
  // Skip non-GET and Firebase/Cloudinary requests
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  if (url.includes('firestore') || url.includes('firebase') || url.includes('cloudinary') || url.includes('openweather')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache fresh response
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

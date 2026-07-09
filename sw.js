const CACHE_NAME = 'dicorzki-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/assets/logo.png',
  '/assets/logo-amikom.png',
  '/assets/dico-fathatul-rizki-portrait.jpg',
  '/assets/dico-fathatul-rizki-portrait-400.jpg',
  '/assets/project-cv-thumb.jpg',
  '/assets/project-social-thumb.jpg',
  '/assets/project-automation-thumb.jpg',
  '/assets/icon-72x72.png',
  '/assets/icon-96x96.png',
  '/assets/icon-128x128.png',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/assets/apple-touch-icon.png',
  '/assets/safari-pinned-tab.svg',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        return fetch(event.request).catch(() => {
          // Fallback for offline navigation
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

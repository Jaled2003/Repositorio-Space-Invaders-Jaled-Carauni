const CACHE_NAME = "v4";
const OFFLINE_PAGE = [
  '/',
  '/index.html',
  '/style.css',
  '/game.js',
];

self.addEventListener('install', (event) => {
  event.waitUntill(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

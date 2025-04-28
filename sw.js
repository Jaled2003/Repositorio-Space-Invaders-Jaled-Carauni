const CACHE_NAME = "space-invaders-cache-v1";
const OFFLINE_PAGE = "offline.html";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  OFFLINE_PAGE,
  "/style.css",
  "/src/space-invaders/game.js",
  // Añade aquí otros recursos estáticos (JS, CSS, imágenes)
];

// Instalación: Cachear recursos esenciales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Estrategia de fetch: Network First, fallback a caché
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_PAGE); // Muestra offline.html si no hay conexión
      })
    );
  } else {
    // Para otros recursos (JS, CSS, imágenes)
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

const CACHE_NAME = "v6";
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/src/space-invaders/game.js',
  '/src/space-invaders/gameStates/initialState.js',
  '/src/space-invaders/gameStates/playState.js',
  // Añade aquí todos los archivos estáticos necesarios
  '/manifest.json',
  // Incluye las rutas de tus imágenes
  '/src/space-invaders/res/player_ship.png',
  '/src/space-invaders/res/menuBG.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando recursos esenciales');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // Solo manejamos solicitudes GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Devuelve el recurso cacheado si existe
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en caché, haz la petición a red
        return fetch(event.request)
          .then(response => {
            // Opcional: Cachear la respuesta para futuras visitas
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return response;
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log('Service Worker activado y listo');
});


self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text() || 'Nueva notificación de Space Invaders',
    icon: '/Iconos/android-launchericon-192-192.png', // Asegúrate de que esta ruta sea correcta
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      { action: 'explore', title: 'Abrir Juego', icon: 'images/checkmark.png' },
      { action: 'close', title: 'Cerrar', icon: 'images/xmark.png' },
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Space Invaders Actualización', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Cierra la notificación
  var fullPath = self.location.origin + event.notification.data.path; // Puedes pasar una 'path' en los datos de la notificación
  event.waitUntil(
    clients.openWindow(fullPath || '/') // Abre la aplicación o una URL específica
  );
});

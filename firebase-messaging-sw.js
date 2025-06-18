importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Usa la misma configuración que en tu index.html
firebase.initializeApp({
  apiKey: "AIzaSyAVOsLiveDoaWRAXo8WGavQIhWZWUDW1b8",
  authDomain: "notificaciones-push-57965.firebaseapp.com",
  projectId: "notificaciones-push-57965",
  storageBucket: "notificaciones-push-57965.appspot.com",
  messagingSenderId: "488687424643",
  appId: "1:488687424643:web:0aa04bb1775d444b9efb7b6",
  measurementId: "G-YR89GW1735"
});

const messaging = firebase.messaging();

// Maneja mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  
  const notificationTitle = payload.notification?.title || 'Space Invaders';
  const notificationOptions = {
    body: payload.notification?.body || '¡Nueva notificación!',
    icon: '/Iconos/android-launchericon-192-192.png',
    badge: '/Iconos/android-launchericon-192-192.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
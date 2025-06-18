// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Importa getMessaging, getToken y onMessage

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAV0slivsDoawR4Xo8WGayQhMVZWUDM1b8",
  authDomain: "notificaciones-push-57965.firebaseapp.com",
  projectId: "notificaciones-push-57965",
  storageBucket: "notificaciones-push-57965.appspot.com", // Corregido: storageBucket usa appspot.com
  messagingSenderId: "488687424643",
  appId: "1:488687424643:web:8a0ab81775d4d44b9efb7b6",
  measurementId: "G-YR89GMT735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app); // Inicializa Messaging

export { app, messaging, getToken, onMessage };
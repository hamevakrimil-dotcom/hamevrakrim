// Fix: Add Vite client types to resolve issues with environment variables and module imports.
/// <reference types="vite/client" />

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase à partir des variables d'environnement
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialisation de Firebase
let app;
let db;

// Vérifie que les clés sont présentes avant d'initialiser
if (firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  console.error("Firebase config is missing. Make sure to set up your environment variables with the VITE_ prefix.");
}

export { db };
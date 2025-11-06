// Fix(firebase): The reference to "vite/client" was removed as it was not being found.
// Fix(firebase): Corrected Firebase import to use a named import for `initializeApp`.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase à partir des variables d'environnement
const firebaseConfig = {
  // Fix(typescript): Cast import.meta to any to access env variables without vite/client types.
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID
};

// Initialisation de Firebase
let app;
let db;

// Vérifie que les clés sont présentes avant d'initialiser
if (firebaseConfig.apiKey) {
  // Fix(firebase): Call `initializeApp` directly after being imported.
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} else {
  console.error("Firebase config is missing. Make sure to set up your environment variables with the VITE_ prefix.");
}

export { db };

// Fix(firebase): Switched to using `firebase/compat/app` to resolve an issue where `initializeApp` could not be imported from `firebase/app`.
// This allows for v8-style initialization while providing a v9 Firestore instance for the rest of the application.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';

// Configuration de Firebase à partir des variables d'environnement
const firebaseConfig = {
  // Cast import.meta to any to access env variables without vite/client types.
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
  // Use compat initialization, which is robust against HMR re-execution.
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  // Get v9 firestore instance from the compat app instance
  db = getFirestore(app);
} else {
  console.error("Firebase config is missing. Make sure to set up your environment variables with the VITE_ prefix.");
}

export { db };

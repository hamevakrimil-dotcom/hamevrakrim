// FIX: Use Firebase v8 compat library to solve import error.
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// IMPORTANT: This configuration is now read from environment variables.
// You need to set these variables in your deployment environment (e.g., Vercel).
// They must be prefixed with 'VITE_' to be exposed to the browser.
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
// This will throw an error if the config values are undefined, which is helpful for debugging.
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore service
// FIX: Use v8 compat syntax.
export const db = app.firestore();

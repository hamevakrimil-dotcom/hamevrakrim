// FIX: Use Firebase v8 compat library to solve import error.
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from './firebaseConfig.js';


let dbInstance;

// Vérifie si la configuration a été correctement injectée par le script de build
const isConfigured = firebaseConfig.projectId && !firebaseConfig.projectId.includes('VOTRE_');

if (isConfigured) {
  try {
    // Initialise Firebase uniquement si une configuration valide est trouvée
    if (!firebase.apps.length) {
      const app = firebase.initializeApp(firebaseConfig);
      dbInstance = app.firestore();
    } else {
      dbInstance = firebase.app().firestore();
    }
  } catch (e) {
    console.error('Firebase initialization error', e);
  }
} else {
  console.warn("La configuration de Firebase est manquante. Assurez-vous que vos variables d'environnement VITE_ sont bien configurées sur Vercel et que la commande de build s'exécute correctement.");
}

export const db = dbInstance;

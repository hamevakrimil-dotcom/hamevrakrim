import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from './firebaseConfig.js';

let dbInstance;

try {
  if (!firebase.apps.length) {
    const app = firebase.initializeApp(firebaseConfig);
    dbInstance = app.firestore();
  } else {
    dbInstance = firebase.app().firestore();
  }
} catch (e) {
  console.error('Firebase initialization error', e);
  // dbInstance restera indéfini, ce qui sera détecté dans App.tsx
}

export const db = dbInstance;
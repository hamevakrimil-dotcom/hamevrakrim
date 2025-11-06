import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from './firebaseConfig.js';
import { Place } from './types';

// Initialize Firebase
// This check prevents re-initializing the app on hot reloads.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

/**
 * Fetches all places from the 'places' collection in Firestore.
 * @returns A promise that resolves to an array of Place objects.
 */
export const getPlaces = async (): Promise<Place[]> => {
  try {
    const snapshot = await db.collection('places').get();
    if (snapshot.empty) {
      console.warn("No documents found in 'places' collection.");
      return [];
    }
    // Map snapshot documents to Place type, ensuring id is included.
    const placesData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Place[];
    return placesData;
  } catch (error) {
    console.error("Error fetching documents from 'places' collection: ", error);
    // Re-throw the error so the calling component can handle it (e.g., show an error message).
    throw error;
  }
};

export { db };

import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';
import Footer from './components/Footer';
import { Region, Place } from './types';
import { db } from './firebase';
// FIX: Remove unused v9 imports. The logic is now using v8 compat syntax.
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const App: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        // Basic check if firebase config is provided.
        // Environment variables must be prefixed with VITE_ to be exposed to the browser.
        if (!process.env.VITE_FIREBASE_PROJECT_ID) {
          throw new Error("Firebase configuration is missing. Make sure to set up your environment variables with the VITE_ prefix.");
        }
        // FIX: Update Firestore query to use v8 compat syntax.
        const placesCollection = db.collection('places');
        const q = placesCollection.orderBy('rating', 'desc');
        const placesSnapshot = await q.get();
        const placesList = placesSnapshot.docs.map(doc => {
            // Note: Ensure your Firestore documents match the 'Place' type structure.
            return { ...doc.data(), id: doc.id } as Place
        });
        setPlaces(placesList);
        setError(null);
      } catch (err) {
        console.error("Error fetching places from Firestore:", err);
        setError("לא ניתן היה לטעון את המידע. אנא ודאו שמשתני הסביבה (environment variables) שלכם מתחילים בקידומת 'VITE_'.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);


  const handleSelectRegion = (region: Region) => {
    window.scrollTo(0, 0);
    setSelectedRegion(region);
  };

  const handleBackToHome = () => {
    setSelectedRegion(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-700 mx-auto"></div>
          <p className="mt-4 text-lg text-stone-600">טוען המלצות...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white p-4">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-800">אופס! משהו השתבש</h2>
          <p className="mt-2 text-red-700">{error}</p>
          <p className="mt-4 text-sm text-stone-600">
            לדוגמה, המשתנה <code>FIREBASE_PROJECT_ID</code> צריך להיקרא <code>VITE_FIREBASE_PROJECT_ID</code>.
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow">
        {selectedRegion ? (
          <RegionPage 
            region={selectedRegion} 
            places={places} 
            onBack={handleBackToHome} 
          />
        ) : (
          <HomePage onSelectRegion={handleSelectRegion} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;

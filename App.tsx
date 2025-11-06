import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';
import Footer from './components/Footer';
import FeaturedModal from './components/FeaturedModal';
import { db } from './firebase';
import { Place, Region } from './types';

function App() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showFeatured, setShowFeatured] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!db) {
        setError("La configuration de Firebase est manquante ou incorrecte. Veuillez vérifier le fichier firebaseConfig.js.");
        setLoading(false);
        return;
      }
      try {
        const snapshot = await db.collection('places').get();
        const placesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Place));
        setPlaces(placesData);
      } catch (err) {
        console.error("Error fetching places from Firestore:", err);
        setError("Impossible de charger les informations depuis la base de données.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // Show featured modal on first visit (after a small delay)
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('visited');
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setShowFeatured(true);
        localStorage.setItem('visited', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectRegion = (region: Region) => {
    setSelectedRegion(region);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedRegion(null);
    window.scrollTo(0, 0);
  };
  
  const featuredPlace = places.find(p => p.rating >= 5.0) || places[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <p className="text-xl text-stone-700">טוען המלצות...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-800">אופס! משהו השתבש</h2>
          <p className="text-red-700 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-['Heebo']">
      <div className="flex-grow">
        {selectedRegion ? (
          <RegionPage region={selectedRegion} places={places} onBack={handleBack} />
        ) : (
          <HomePage onSelectRegion={handleSelectRegion} />
        )}
      </div>
      <Footer />
      {showFeatured && featuredPlace && (
        <FeaturedModal place={featuredPlace} onClose={() => setShowFeatured(false)} />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';
import Footer from './components/Footer';
import { Region, Place } from './types';
import { db } from './firebase';

const App: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!db) {
        setError("La connexion à la base de données a échoué. Veuillez vérifier la configuration de Firebase.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const placesCollection = db.collection('places');
        const q = placesCollection.orderBy('rating', 'desc');
        const placesSnapshot = await q.get();
        const placesList = placesSnapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id } as Place
        });
        setPlaces(placesList);
        setError(null);
      } catch (err) {
        console.error("Error fetching places from Firestore:", err);
        setError("Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.");
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
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-red-800">אופס! בעיית תצורה</h2>
          <p className="mt-2 text-red-700">{error}</p>
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
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';
import Footer from './components/Footer';
import { Place, Region } from './types';
import { getPlaces } from './firebase';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Region | 'home'>('home');
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        setLoading(true);
        const fetchedPlaces = await getPlaces();
        setPlaces(fetchedPlaces);
        setError(null);
      } catch (err) {
        console.error("Error fetching places from Firestore:", err);
        setError("Impossible de charger les recommandations. Veuillez vérifier votre connexion et réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlacesData();
  }, []);

  const handleSelectRegion = (region: Region) => {
    setCurrentPage(region);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-2xl font-bold text-stone-700 animate-pulse">
            טוען המלצות...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-grow flex items-center justify-center text-center p-4">
          <div>
            <h2 className="text-2xl font-bold text-red-700">אופס! משהו השתבש.</h2>
            <p className="text-stone-600 mt-2">{error}</p>
          </div>
        </div>
      );
    }
    
    if (currentPage === 'home') {
      return <HomePage onSelectRegion={handleSelectRegion} />;
    } else {
      return <RegionPage region={currentPage} places={places} onBack={handleBackToHome} />;
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col antialiased">
      <div className="flex-grow flex flex-col">
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default App;

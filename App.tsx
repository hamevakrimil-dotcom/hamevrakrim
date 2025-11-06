import React, { useState, useEffect } from 'react';
import { Region } from './types';
import { places } from './data/places';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';
import Footer from './components/Footer';
import FeaturedModal from './components/FeaturedModal';

// Fix: Created the main App component, which was missing. This component handles routing between the home page and region-specific pages.
const App: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  
  // Show featured modal on first visit (using session storage)
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenFeaturedModal');
    if (!hasSeenModal) {
      setTimeout(() => {
        setShowFeaturedModal(true);
        sessionStorage.setItem('hasSeenFeaturedModal', 'true');
      }, 2000); // Delay for effect
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

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans">
      <div className="flex-grow">
        {selectedRegion ? (
          <RegionPage 
            region={selectedRegion} 
            places={places} 
            onBack={handleBack} 
          />
        ) : (
          <HomePage onSelectRegion={handleSelectRegion} />
        )}
      </div>
      <Footer />
      {showFeaturedModal && featuredPlace && (
        <FeaturedModal 
          place={featuredPlace} 
          onClose={() => setShowFeaturedModal(false)}
        />
      )}
    </div>
  );
};

export default App;

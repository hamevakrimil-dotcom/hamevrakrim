// Fix: Implemented the main App component to handle routing and state management.
// This resolves the errors caused by placeholder content in this file
// and the resulting module resolution error in index.tsx.
import React, { useState, useEffect } from 'react';
import { Region } from './types';
import { places } from './data/places';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';
import Footer from './components/Footer';
import FeaturedModal from './components/FeaturedModal';

// Find the most featured place (highest rating) to show in the modal
const featuredPlace = [...places].sort((a, b) => b.rating - a.rating)[0];

function App() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);

  // Show a featured modal on the first visit of a session
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('featuredModalShown')) {
        setShowFeaturedModal(true);
        sessionStorage.setItem('featuredModalShown', 'true');
      }
    }, 3000); // 3-second delay

    return () => clearTimeout(timer);
  }, []);

  const handleSelectRegion = (region: Region) => {
    setSelectedRegion(region);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleBack = () => {
    setSelectedRegion(null);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleCloseModal = () => {
    setShowFeaturedModal(false);
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col font-sans text-stone-800">
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
        <FeaturedModal place={featuredPlace} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;

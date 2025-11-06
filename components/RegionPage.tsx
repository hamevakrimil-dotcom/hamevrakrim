import React, { useState } from 'react';
import { Place, RegionData, SocialLinks, Category } from '../types';
import PlaceCard from './PlaceCard';
import CallToActionCard from './CallToActionCard';
import Logo from './Logo';
import Footer from './Footer';

interface RegionPageProps {
  region: RegionData;
  places: Place[];
  onBack: () => void;
  socialLinks: SocialLinks;
}

const RegionPage: React.FC<RegionPageProps> = ({ region, places, onBack, socialLinks }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');

  if (!region) {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
            <p className="text-stone-500 text-lg">אזור לא נמצא.</p>
            <button onClick={onBack} className="mt-4 bg-red-700 text-white font-bold py-2 px-5 rounded-full hover:bg-red-600 transition-colors duration-300">
                חזרה
            </button>
        </div>
    );
  }

  const filteredPlaces = places.filter(place => 
    activeCategory === 'all' || place.category === activeCategory
  );

  const FilterButton: React.FC<{
    label: string;
    category: Category | 'all';
    isActive: boolean;
    onClick: () => void;
  }> = ({ label, category, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 sm:px-6 py-2.5 text-sm sm:text-base font-bold rounded-full transition-all duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-opacity-50 ${
        isActive
          ? 'bg-red-700 text-white shadow-md shadow-red-600/20'
          : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 flex flex-col">
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center sticky top-0 bg-stone-50/80 backdrop-blur-sm z-10 border-b border-stone-200">
            <Logo />
            <button onClick={onBack} className="font-semibold text-stone-600 hover:text-red-700 transition-colors">
                &larr; חזרה לכל האזורים
            </button>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-grow">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                 <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight">
                    {region.name}
                </h1>
                <p className="mt-6 text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
                    {region.description}
                </p>
            </div>

            <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
                <FilterButton label="הכל" category="all" isActive={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
                <FilterButton label="ספא" category="spa" isActive={activeCategory === 'spa'} onClick={() => setActiveCategory('spa')} />
                <FilterButton label="אירוח ולינה" category="hotel" isActive={activeCategory === 'hotel'} onClick={() => setActiveCategory('hotel')} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                ))}
                 <CallToActionCard />
            </div>
        </main>
        
        <Footer socialLinks={socialLinks} />
    </div>
  );
};

export default RegionPage;
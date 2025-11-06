import React, { useState, useMemo } from 'react';
import { Place, Region, Category } from '../types';
import PlaceCard from './PlaceCard';
import CallToActionCard from './CallToActionCard';

interface RegionPageProps {
  region: Region;
  places: Place[];
  onBack: () => void;
}

const regionData = {
  north: { name: 'צפון', image: 'https://picsum.photos/seed/hula_valley/1600/400' },
  center: { name: 'מרכז', image: 'https://picsum.photos/seed/jaffa_port/1600/400' },
  south: { name: 'דרום', image: 'https://picsum.photos/seed/ein_gedi_desert/1600/400' },
};

const categoryData = {
    spa: { name: 'עיסויים וספא' },
    hotel: { name: 'אירוח ולינה' },
}

const RegionPage: React.FC<RegionPageProps> = ({ region, places, onBack }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('spa');

  const filteredAndSortedPlaces = useMemo(() => {
    return places
      .filter((place) => place.region === region && place.category === activeCategory)
      .sort((a, b) => b.rating - a.rating);
  }, [places, region, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <header 
        className="h-64 md:h-80 bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${regionData[region].image})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative text-center z-10 px-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight [text-shadow:0_3px_6px_rgba(0,0,0,0.5)]">אזור {regionData[region].name}</h1>
            <p className="mt-2 text-base sm:text-lg md:text-xl [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">המלצות שנבדקו. מקומות ששווה להכיר.</p>
        </div>
        <button 
            onClick={onBack}
            aria-label="חזרה לדף הבית"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/30 text-white rounded-full p-2 hover:bg-black/50 transition-colors backdrop-blur-sm z-10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </button>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="bg-stone-100 rounded-full p-1 flex flex-wrap justify-center gap-1 border border-stone-200">
            {(['spa', 'hotel'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 sm:px-6 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 ${
                  activeCategory === cat
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-200'
                }`}
              >
                {categoryData[cat].name}
              </button>
            ))}
          </div>
        </div>

        {filteredAndSortedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredAndSortedPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
            ))}
            <CallToActionCard />
            </div>
        ) : (
            <div className="text-center py-16">
                <p className="text-xl text-stone-700">לא נמצאו המלצות בקטגוריה זו עדיין.</p>
                <p className="text-stone-500 mt-2">מוזמנים לבדוק שוב בקרוב!</p>
            </div>
        )}

      </main>
    </div>
  );
};

export default RegionPage;
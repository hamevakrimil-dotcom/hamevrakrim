import React from 'react';
import { Place, RegionData, SocialLinks } from '../types';
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {places.map((place) => (
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

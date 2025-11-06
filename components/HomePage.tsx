import React, { useState, useEffect } from 'react';
import { Place, Region } from '../types';
import Logo from './Logo';
import Footer from './Footer';
import FeaturedModal from './FeaturedModal';
import { VerifiedIcon, OliveBranchIcon } from './icons';

interface HomePageProps {
  places: Place[];
  onSelectRegion: (region: Region) => void;
  isLoading: boolean;
}

const regionData = {
  north: { name: 'צפון', image: 'https://picsum.photos/seed/north_israel/800/600', description: 'נופים ירוקים, אוויר צלול והרבה שלווה. גלו את ההמלצות שלנו לגליל, לגולן ולעמקים.' },
  center: { name: 'מרכז', image: 'https://picsum.photos/seed/center_israel/800/600', description: 'הלב הפועם של ישראל, מלא באנרגיה, תרבות וקולינריה. מצאו את המקומות שלא תרצו לפספס.' },
  south: { name: 'דרום', image: 'https://picsum.photos/seed/south_israel/800/600', description: 'מדבר עוצמתי, ים אדום וחוויות בלתי נשכחות. בואו לראות מה מסתתר מעבר לחולות.' },
};

const RegionCard: React.FC<{ region: Region; onClick: () => void }> = ({ region, onClick }) => {
  const data = regionData[region];
  return (
    <div 
      className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
      onClick={onClick}
    >
      <img src={data.image} alt={data.name} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
        <h3 className="text-3xl md:text-4xl font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">{data.name}</h3>
        <p className="mt-2 text-sm md:text-base opacity-90 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">{data.description}</p>
        <div className="mt-4 inline-block bg-red-700 text-white font-bold py-2 px-5 rounded-full group-hover:bg-red-600 transition-colors duration-300">
          לכל ההמלצות
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ places, onSelectRegion, isLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [featuredPlace, setFeaturedPlace] = useState<Place | null>(null);

  useEffect(() => {
    if (!isLoading && places.length > 0) {
      const highestRatedPlace = [...places].sort((a, b) => b.rating - a.rating)[0];
      if (highestRatedPlace) {
        setFeaturedPlace(highestRatedPlace);
        const hasSeenModal = sessionStorage.getItem('seenFeaturedModal');
        if (!hasSeenModal) {
          setShowModal(true);
          sessionStorage.setItem('seenFeaturedModal', 'true');
        }
      }
    }
  }, [isLoading, places]);

  if (isLoading) {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center transition-opacity duration-300">
            <Logo />
            <p className="text-stone-500 mt-4 text-lg">טוענים את ההמלצות השוות ביותר...</p>
        </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Logo />
        <a href="mailto:HamevakrimIL@gmail.com " className="font-semibold text-stone-600 hover:text-red-700 transition-colors">
          צרו קשר
        </a>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                <OliveBranchIcon className="w-5 h-5"/>
                <span>ההמלצות האמיתיות של ישראל</span>
            </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight">
            מקומות שבאמת שווה להכיר.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
            עזבו אתכם מביקורות קנויות ודירוגים מזויפים. אנחנו מבקרים בעצמנו בכל מקום, ומביאים לכם רק את ההמלצות שעברו את הבדיקה שלנו. בלי שטויות, רק איכות.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-stone-500">
              <span className="flex items-center gap-1.5"><VerifiedIcon className="w-5 h-5 text-red-600"/> 100% בדיקה אישית</span>
              <span className="text-stone-300">|</span>
              <span className="flex items-center gap-1.5"><VerifiedIcon className="w-5 h-5 text-red-600"/> 0% תוכן ממומן</span>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(['north', 'center', 'south'] as Region[]).map((region) => (
            <RegionCard key={region} region={region} onClick={() => onSelectRegion(region)} />
          ))}
        </div>
      </main>

      <Footer />

      {showModal && featuredPlace && (
        <FeaturedModal place={featuredPlace} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default HomePage;

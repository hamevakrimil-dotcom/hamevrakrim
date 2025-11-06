import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import PlaceCard from './PlaceCard';
import CallToActionCard from './CallToActionCard';
import FeaturedModal from './FeaturedModal';
import { PLACES } from '../data/places';
import { OliveBranchIcon, VerifiedIcon } from './icons';

const HomePage: React.FC = () => {
  const [featuredPlace, setFeaturedPlace] = useState<Place | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const featured = PLACES.find(p => p.featured);
    if (featured) {
      setFeaturedPlace(featured);
      const timer = setTimeout(() => {
        if (!sessionStorage.getItem('featuredModalShown')) {
          setShowModal(true);
          sessionStorage.setItem('featuredModalShown', 'true');
        }
      }, 2000); // Show modal after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const regions = [...new Set(PLACES.map(p => p.region))];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="bg-stone-50 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight">
                המקומות ש<span className="text-red-700">באמת</span> שווים ביקור.
                </h1>
                <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-stone-600">
                אנחנו בודקים כל מקום בעצמנו, כדי שאתם תוכלו פשוט ליהנות. בלי פילטרים, בלי שטויות. רק המלצות אמיתיות.
                </p>
                <div className="mt-8 flex justify-center gap-x-6 gap-y-4 flex-wrap">
                    <div className="flex items-center gap-2 text-stone-700">
                        <VerifiedIcon className="w-5 h-5 text-red-700" />
                        <span>100% ביקורות מאומתות</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                        <OliveBranchIcon className="w-5 h-5 text-red-700" />
                        <span>ללא תשלום או שיתופי פעולה</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Places sections */}
        <div className="bg-white py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {regions.map(region => (
                    <section key={region} className="mb-16">
                        <h2 className="text-3xl font-bold text-stone-900 mb-8 border-b-4 border-red-600 pb-2 inline-block">
                            {region}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {PLACES.filter(p => p.region === region).map((place) => (
                                <PlaceCard key={place.id} place={place} />
                            ))}
                             {region === regions[regions.length-1] && <CallToActionCard />}
                        </div>
                    </section>
                ))}
            </div>
        </div>
      </main>

      {showModal && featuredPlace && (
        <FeaturedModal place={featuredPlace} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default HomePage;

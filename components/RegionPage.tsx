import React from 'react';
import { Place } from '../types';
import PlaceCard from './PlaceCard';
import CallToActionCard from './CallToActionCard';

interface RegionPageProps {
  region: string;
  places: Place[];
}

const RegionPage: React.FC<RegionPageProps> = ({ region, places }) => {
  const filteredPlaces = places.filter(p => p.region === region);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-4 text-stone-900">
        המלצות ב<span className="text-red-700">אזור {region}</span>
      </h1>
      <p className="text-lg text-stone-600 text-center max-w-2xl mx-auto mb-12">
        גלו את המקומות השווים ביותר באזור {region} שבחרנו עבורכם בקפידה.
      </p>

      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
          <CallToActionCard />
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-stone-800">אופס! אין עדיין המלצות באזור זה</h2>
          <p className="text-stone-500 mt-2">אנחנו עובדים על זה. בינתיים, אולי תרצו לבדוק אזורים אחרים?</p>
          <CallToActionCard />
        </div>
      )}
    </div>
  );
};

export default RegionPage;

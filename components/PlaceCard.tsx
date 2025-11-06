import React from 'react';
import { Place } from '../types';
import { GlobeIcon, VideoIcon, LocationIcon, CalendarIcon } from './icons';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-stone-900/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-600/10 hover:ring-2 hover:ring-red-700 flex flex-col group border border-stone-200 hover:-translate-y-2">
      <div className="relative">
        <img className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" src={place.image} alt={place.name} />
        <div className="absolute top-4 right-4 bg-red-700 text-white py-1.5 px-3 rounded-full font-bold text-sm flex items-center gap-1 shadow-md">
            <span>{place.rating.toFixed(1)}</span>
            <span className="text-yellow-300">★</span>
        </div>
      </div>
      
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {place.tags.map((tag) => (
            <span key={tag} className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">{place.name}</h3>
        
        <div className="space-y-2 text-sm text-stone-500 mb-4">
            <div className="flex items-center">
                <LocationIcon className="w-4 h-4 me-2 text-stone-400"/>
                <span>{place.location}</span>
            </div>
            <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 me-2 text-stone-400"/>
                <span>נבדק ב-{place.reviewDate}</span>
            </div>
        </div>
        
        <p className="text-sm md:text-base text-stone-600 mb-6 flex-grow">{place.description}</p>
        
        <div className="mt-auto grid grid-cols-2 gap-3">
          <a
            href={place.links.video}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`צפה בסרטון על ${place.name}`}
            className="flex items-center justify-center gap-2 w-full bg-red-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-600/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-700 focus-visible:ring-opacity-50 text-sm sm:text-base"
          >
            <VideoIcon className="w-5 h-5" />
            <span>צפה בסרטון</span>
          </a>
          <a
            href={place.links.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`עבור לאתר של ${place.name}`}
            className="flex items-center justify-center gap-2 w-full border border-stone-300 text-stone-700 font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 text-sm sm:text-base"
          >
            <GlobeIcon className="w-5 h-5" />
            <span>לאתר</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
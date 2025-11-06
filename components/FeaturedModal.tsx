import React from 'react';
import { Place } from '../types';
import { GlobeIcon, LocationIcon } from './icons';

interface FeaturedModalProps {
  place: Place;
  onClose: () => void;
}

const FeaturedModal: React.FC<FeaturedModalProps> = ({ place, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl shadow-black/20 overflow-hidden transition-all duration-300 max-w-lg w-full relative border border-stone-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-stone-500 hover:text-stone-900 transition-colors z-20 p-1 bg-white/50 hover:bg-white/80 rounded-full" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <div className="relative">
          <img className="w-full h-56 sm:h-64 object-cover" src={place.image} alt={place.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
             <span className="bg-red-600 text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full tracking-wider">ההמלצה החמה שלנו</span>
             <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">{place.name}</h3>
             <div className="flex items-center text-stone-100 text-sm mt-1 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                <LocationIcon className="w-4 h-4 me-2"/>
                <span>{place.location}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-stone-600 mb-6">{place.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={place.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-md shadow-red-500/20 text-sm sm:text-base"
            >
              <GlobeIcon className="w-5 h-5" />
              <span>לפרטים נוספים</span>
            </a>
             <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full border border-stone-300 text-stone-700 font-bold py-3 px-4 rounded-lg hover:bg-stone-100 hover:border-stone-400 transition-colors duration-300 text-sm sm:text-base"
            >
              <span>המשך גלישה</span>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FeaturedModal;
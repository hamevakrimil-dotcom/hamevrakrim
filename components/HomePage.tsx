import React from 'react';
import { Region } from '../types';

interface HomePageProps {
  onSelectRegion: (region: Region) => void;
}

const regions: { id: Region; name: string; image: string; description: string }[] = [
  { id: 'north', name: 'צפון', image: 'https://picsum.photos/seed/banias_stream/800/1000', description: 'נופים ירוקים, אוויר צלול וחוויות גליליות' },
  { id: 'center', name: 'מרכז', image: 'https://picsum.photos/seed/tel_aviv_coast/800/1000', description: 'הלב הפועם של ישראל, מלא באנרגיה אורבנית' },
  { id: 'south', name: 'דרום', image: 'https://picsum.photos/seed/ramon_crater_view/800/1000', description: 'מרחבים מדבריים, שקט אינסופי וצבעים חמים' },
];

const HomePage: React.FC<HomePageProps> = ({ onSelectRegion }) => {
  const handleKeyDown = (e: React.KeyboardEvent, regionId: Region) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent scrolling on spacebar press
      onSelectRegion(regionId);
    }
  };
  
  return (
    <>
    <div className="flex flex-col items-center p-4 sm:p-6">
      <header className="text-center pt-12 pb-8 md:pt-16 md:pb-12 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-6 animate-fade-in" style={{ animationDuration: '0.8s' }}>
          <div className="bg-red-700 py-4 px-8 rounded-2xl shadow-lg shadow-red-600/20 inline-block">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              המבקרים!
            </h1>
          </div>
          <h2 className="mt-6 text-stone-900 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            ההמלצות שלנו - כי רק מה שטוב באמת נכנס לפה
          </h2>
        </div>
        
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-stone-600 animate-fade-in" style={{ animationDuration: '0.8s', animationDelay: '200ms' }}>
            גלו את מיטב מתחמי הספא והמלונות בישראל, דרך העיניים שלנו. כל המלצה נבדקה בקפידה כדי להבטיח לכם את החוויה המושלמת.
        </p>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {regions.map((region) => (
            <div
                key={region.id}
                onClick={() => onSelectRegion(region.id)}
                onKeyDown={(e) => handleKeyDown(e, region.id)}
                role="button"
                tabIndex={0}
                aria-label={`בחר אזור ${region.name}`}
                className="rounded-2xl overflow-hidden cursor-pointer group relative h-[400px] sm:h-[450px] border border-stone-200 hover:border-red-700/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-600/10 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-700 focus-visible:ring-offset-2"
            >
                <img 
                    src={region.image} 
                    alt={region.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white flex flex-col justify-end h-full">
                    <div>
                        <h3 className="text-4xl sm:text-5xl font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">{region.name}</h3>
                        <p className="mt-2 text-base sm:text-lg opacity-90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">{region.description}</p>
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                            <span className="inline-block bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg shadow-red-600/20">
                                לכל ההמלצות &rarr;
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </main>
    </div>
    <style>{`
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fade-in ease-in-out forwards;
        opacity: 0;
      }
    `}</style>
    </>
  );
};

export default HomePage;
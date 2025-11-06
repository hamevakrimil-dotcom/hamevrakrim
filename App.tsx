import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Place, Region, RegionData, SocialLinks } from './types';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';

const App: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [regionsData, setRegionsData] = useState<RegionData[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!db) {
        console.error("Firestore is not initialized.");
        setIsLoading(false);
        return;
      }
      try {
        // Fetch places
        const placesQuery = query(collection(db, 'places'), orderBy('rating', 'desc'));
        const placesSnapshot = await getDocs(placesQuery);
        const placesList = placesSnapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id,
                name: data.name || 'Sans nom',
                region: data.region || 'north',
                category: data.category || 'spa',
                image: data.image || '',
                description: data.description || '',
                location: data.location || '',
                links: data.links || { website: '#', instagram: '#', video: '#' },
                tags: data.tags || [],
                reviewDate: data.reviewDate || '',
                rating: data.rating || 0
            } as Place
        });
        setPlaces(placesList);

        // Fetch regions
        const regionsQuery = query(collection(db, 'regions'), orderBy('sortOrder'));
        const regionsSnapshot = await getDocs(regionsQuery);
        const regionsList = regionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RegionData));
        setRegionsData(regionsList);
        
        // Fetch social links
        const socialLinksDocRef = doc(db, 'config', 'socialLinks');
        const socialLinksDoc = await getDoc(socialLinksDocRef);
        if (socialLinksDoc.exists()) {
          setSocialLinks(socialLinksDoc.data() as SocialLinks);
        } else {
          console.log("No socialLinks document found in config collection!");
        }

      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectRegion = (region: Region) => {
    window.scrollTo(0, 0);
    setSelectedRegion(region);
  };

  const handleBackToHome = () => {
    window.scrollTo(0, 0);
    setSelectedRegion(null);
  };

  if (selectedRegion) {
    const regionInfo = regionsData.find(r => r.id === selectedRegion);
    const filteredPlaces = places.filter(p => p.region === selectedRegion);
    
    if (!regionInfo) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center">
                <p className="text-stone-500 text-lg">טוען נתונים או שאירעה שגיאה...</p>
                <button onClick={handleBackToHome} className="mt-4 bg-red-700 text-white font-bold py-2 px-5 rounded-full hover:bg-red-600 transition-colors duration-300">
                    חזרה
                </button>
            </div>
        );
    }
      
    return (
      <RegionPage
        region={regionInfo}
        places={filteredPlaces}
        onBack={handleBackToHome}
        socialLinks={socialLinks}
      />
    );
  }

  return (
    <HomePage
      places={places}
      regionsData={regionsData}
      socialLinks={socialLinks}
      onSelectRegion={handleSelectRegion}
      isLoading={isLoading}
    />
  );
};

export default App;
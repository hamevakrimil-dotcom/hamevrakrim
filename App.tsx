import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore';
import { Place, Region, RegionData, SocialLinks } from './types';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';

const App: React.FC = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [regionsData, setRegionsData] = useState<RegionData[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!db) {
                console.error("Firestore not initialized");
                setError("La connexion à la base de données a échoué.");
                setIsLoading(false);
                return;
            }
            try {
                // Fetch all data concurrently for better performance
                const [placesPromise, regionsPromise, socialLinksPromise] = [
                    getDocs(collection(db, 'places')),
                    getDocs(query(collection(db, 'regions'), orderBy('sortOrder'))),
                    getDoc(doc(db, 'config', 'socialLinks'))
                ];

                const [placesSnapshot, regionsSnapshot, socialLinksSnap] = await Promise.all([placesPromise, regionsPromise, socialLinksPromise]);

                // Process places
                const placesList = placesSnapshot.docs.map(doc => {
                    const data = doc.data();
                    // Robust data parsing with defaults
                    return {
                        id: doc.id,
                        name: data.name || 'Sans nom',
                        region: data.region || 'north',
                        category: data.category || 'spa',
                        image: data.image || '',
                        description: data.description || 'Aucune description.',
                        location: data.location || 'Lieu non spécifié',
                        links: {
                            website: data.links?.website || '#',
                            instagram: data.links?.instagram || '#',
                            video: data.links?.video || '#',
                        },
                        tags: data.tags || [],
                        reviewDate: data.reviewDate || 'N/A',
                        rating: data.rating || 0,
                    } as Place;
                });
                setPlaces(placesList);
                
                // Process regions
                const regionsList = regionsSnapshot.docs.map(doc => ({
                    id: doc.id as Region,
                    ...doc.data()
                } as RegionData));
                setRegionsData(regionsList);

                // Process social links
                if (socialLinksSnap.exists()) {
                    setSocialLinks(socialLinksSnap.data() as SocialLinks);
                }

            } catch (error) {
                console.error("Error fetching data from Firestore:", error);
                setError("Les informations n'ont pas pu être chargées. Veuillez vérifier vos règles de sécurité Firestore.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSelectRegion = (region: Region) => {
        setSelectedRegion(region);
    };

    const handleBackToHome = () => {
        setSelectedRegion(null);
    };
    
    if (error) {
        return (
            <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-3xl font-bold text-red-700">Oups ! Une erreur s'est produite.</h1>
                <p className="mt-4 text-red-600">{error}</p>
                <p className="mt-2 text-sm text-stone-500">Essayez de rafraîchir la page.</p>
            </div>
        );
    }

    if (selectedRegion) {
        return <RegionPage region={selectedRegion} places={places} onBack={handleBackToHome} />;
    }

    return <HomePage 
        places={places} 
        regionsData={regionsData}
        socialLinks={socialLinks}
        onSelectRegion={handleSelectRegion} 
        isLoading={isLoading} 
    />;
};

export default App;

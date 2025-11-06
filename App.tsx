import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Place, Region } from './types';
import HomePage from './components/HomePage';
import RegionPage from './components/RegionPage';

const App: React.FC = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            if (!db) {
                console.error("Firestore not initialized");
                setIsLoading(false);
                return;
            }
            try {
                const placesCollection = collection(db, 'places');
                const placesSnapshot = await getDocs(placesCollection);
                const placesList = placesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Place));
                setPlaces(placesList);
            } catch (error) {
                console.error("Error fetching places:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    const handleSelectRegion = (region: Region) => {
        setSelectedRegion(region);
    };

    const handleBackToHome = () => {
        setSelectedRegion(null);
    };

    if (selectedRegion) {
        return <RegionPage region={selectedRegion} places={places} onBack={handleBackToHome} />;
    }

    return <HomePage places={places} onSelectRegion={handleSelectRegion} isLoading={isLoading} />;
};

export default App;

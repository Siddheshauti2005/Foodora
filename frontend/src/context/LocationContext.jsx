import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState('');
    const [addressDetails, setAddressDetails] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState(null);

    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const locateUser = async () => {
        setLoadingLocation(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Fallback if no API key is present (dev mode/testing)
                    console.log("[LocationContext] API Key:", GOOGLE_MAPS_API_KEY ? "Present" : "Missing");
                    if (!GOOGLE_MAPS_API_KEY) {
                        console.warn('Google Maps API Key missing. Using OpenStreetMap as fallback.');
                        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        if (response.data.display_name) {
                            setLocation(response.data.display_name);
                            setAddressDetails(response.data);
                        }
                    } else {
                        // Google Maps Geocoding API
                        console.log("[LocationContext] Fetching from Google Maps...");
                        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
                        console.log("[LocationContext] Google Response:", response.data);

                        if (response.data.status === 'OK' && response.data.results.length > 0) {
                            const formattedAddress = response.data.results[0].formatted_address;
                            setLocation(formattedAddress);
                            setAddressDetails(response.data.results[0]);
                        } else {
                            throw new Error('Google Maps could not determine location');
                        }
                    }
                } catch (error) {
                    console.error('Error fetching location:', error);
                    setLocationError('Failed to fetch location details: ' + (error.message || 'Unknown error'));
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                if (error.code === 1) {
                    setLocationError('Location permission denied. Please enable it in your browser settings.');
                } else {
                    setLocationError('Unable to retrieve your location');
                }
                setLoadingLocation(false);
            }
        );
    };

    const clearLocation = () => {
        setLocation('');
        setAddressDetails(null);
        setLocationError(null);
    };

    return (
        <LocationContext.Provider value={{
            location,
            setLocation,
            addressDetails,
            loadingLocation,
            locationError,
            locateUser,
            clearLocation
        }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    return useContext(LocationContext);
};

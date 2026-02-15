import { useState, useCallback, useRef } from 'react';
import axios from 'axios';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

export const useNominatim = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const debounceTimeout = useRef(null);

    const searchAddress = useCallback((query) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            try {
                const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                        countrycodes: 'in' // Limit to India for this project
                    },
                    headers: {
                        'User-Agent': 'Foodora-App-Location-Module'
                    }
                });
                setSuggestions(response.data);
            } catch (err) {
                console.error("Nominatim API Error:", err);
                setError("Failed to fetch location suggestions.");
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 500); // 500ms debounce
    }, []);

    const reverseGeocode = useCallback(async (lat, lon) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${NOMINATIM_BASE_URL}/reverse`, {
                params: {
                    lat,
                    lon,
                    format: 'json',
                    addressdetails: 1,
                    zoom: 14, // Force Area-level precision
                },
                headers: {
                    'User-Agent': 'Foodora-App-Location-Audit'
                }
            });

            // Improved Parsing Logic for "Area-Level" Accuracy
            const { address } = response.data;

            // Priority: Suburb -> Neighbourhood -> City District -> Town
            const preciseArea = address.suburb || address.neighbourhood || address.city_district || address.town;
            const preciseCity = address.city || address.state_district || address.state;

            const components = [
                preciseArea,
                preciseCity
            ].filter(Boolean); // Clean undefined

            // Format: "Panch Pakadi, Thane"
            const preciseAddress = components.length > 0
                ? components.join(', ')
                : response.data.display_name;

            return {
                ...response.data,
                display_name: preciseAddress
            };
        } catch (err) {
            console.error("Reverse Geocode Error:", err);
            setError("Failed to get address.");
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearSuggestions = useCallback(() => {
        setSuggestions([]);
    }, []);

    return {
        suggestions,
        isLoading,
        error,
        searchAddress,
        reverseGeocode,
        clearSuggestions
    };
};

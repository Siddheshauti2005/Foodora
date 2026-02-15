import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';
import { useNominatim } from './useNominatim';
import SuggestionsDropdown from './SuggestionsDropdown';

const LocationSearch = ({ onLocationSelect, initialValue = '' }) => {
    const [query, setQuery] = useState(initialValue);
    const [isLocating, setIsLocating] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { suggestions, searchAddress, reverseGeocode, clearSuggestions, isLoading } = useNominatim();
    const wrapperRef = useRef(null);

    // Initial value sync
    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            searchAddress(value);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelect = (place) => {
        // Parse the selected place to get a clean name
        const addr = place.address || {};
        const suburb = addr.suburb || addr.neighbourhood || addr.city_district || addr.hamlet;
        const city = addr.city || addr.town || addr.state;

        const cleanAddress = suburb && city ? `${suburb}, ${city}` : place.display_name;

        setQuery(cleanAddress);
        setShowSuggestions(false);

        if (onLocationSelect) {
            onLocationSelect({
                address: cleanAddress,
                lat: place.lat,
                lon: place.lon
            });
        }
    };

    const handleLocateMe = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const data = await reverseGeocode(latitude, longitude);

                if (data) {
                    setQuery(data.display_name);
                    if (onLocationSelect) {
                        onLocationSelect({
                            address: data.display_name,
                            lat: latitude,
                            lon: longitude
                        });
                    }
                }
                setIsLocating(false);
            },
            (error) => {
                console.error("Geolocation Error:", error);
                setIsLocating(false);
                alert("Unable to retrieve your location");
            }
        );
    };

    return (
        <div className="relative w-full max-w-2xl" ref={wrapperRef}>
            <div className="bg-white p-2 rounded-full shadow-xl flex items-center transition-all focus-within:ring-2 focus-within:ring-primary/20">
                <MapPin className="text-primary ml-4 mr-2 shrink-0" />
                <div className="flex-1 relative min-w-0">
                    {/* Skeleton Loader Overlay */}
                    {isLocating && (
                        <div className="absolute inset-0 z-10 flex items-center">
                            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                        </div>
                    )}

                    <input
                        type="text"
                        placeholder="Enter delivery location..."
                        className={`w-full outline-none text-secondary placeholder-gray-400 text-sm md:text-base bg-transparent transition-opacity duration-300 ${isLocating ? 'opacity-0' : 'opacity-100'}`}
                        value={query}
                        onChange={handleInputChange}
                        onFocus={() => { if (query.length > 2) setShowSuggestions(true); }}
                    />
                </div>

                {/* Locate Me Action */}
                <button
                    onClick={handleLocateMe}
                    disabled={isLocating}
                    className="hidden md:flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors mr-2 whitespace-nowrap"
                >
                    {isLocating ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                    {isLocating ? 'Locating...' : 'Locate Me'}
                </button>

                {/* Mobile Locate Icon */}
                <button
                    onClick={handleLocateMe}
                    disabled={isLocating}
                    className="md:hidden p-2 text-primary rounded-full hover:bg-primary/5 mr-1"
                >
                    {isLocating ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />}
                </button>

                <button
                    onClick={() => { }} // Usually triggers generic search or navigation
                    className="bg-primary text-white px-6 md:px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/30 text-sm md:text-base"
                >
                    Search
                </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <SuggestionsDropdown
                    suggestions={suggestions}
                    onSelect={handleSelect}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default LocationSearch;

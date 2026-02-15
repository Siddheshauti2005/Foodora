import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

const SuggestionsDropdown = ({ suggestions, onSelect, isLoading }) => {
    return (
        <AnimatePresence>
            {(suggestions.length > 0) && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]"
                >
                    <ul className="max-h-60 overflow-y-auto no-scrollbar py-2">
                        {suggestions.map((place) => {
                            // Smart Formatting Logic
                            const addr = place.address || {};
                            const suburb = addr.suburb || addr.neighbourhood || addr.city_district || addr.hamlet || addr.village;
                            const city = addr.city || addr.town || addr.state_district || addr.state;

                            // Fallback if specific fields are missing
                            const mainText = suburb || place.display_name.split(',')[0];
                            const subText = city ? `${city}, ${addr.state || ''}` : place.display_name;

                            return (
                                <li
                                    key={place.place_id}
                                    onClick={() => onSelect(place)}
                                    className="px-5 py-3.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors group border-b border-gray-50 last:border-none"
                                >
                                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-emerald-50 transition-colors shrink-0">
                                        <MapPin size={18} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-800 text-sm truncate group-hover:text-emerald-700 transition-colors">
                                            {mainText}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {subText}
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SuggestionsDropdown;

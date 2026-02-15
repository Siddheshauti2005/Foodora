import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Star, Clock, Heart, MapPin, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '../context/LocationContext';

const Menu = () => {
    const { addressDetails, location } = useLocation();
    const [loading, setLoading] = useState(true);
    const [sortByOpen, setSortByOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Relevance');
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    // Indian Food Categories
    const categories = [
        { name: 'Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80' },
        { name: 'Paneer', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80' },
        { name: 'Dosa', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80' },
        { name: 'Rolls', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&auto=format&fit=crop&q=80' },
        { name: 'Momos', img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=300&auto=format&fit=crop&q=80' },
        { name: 'Pizza', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop&q=80' },
        { name: 'Burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&auto=format&fit=crop&q=80' },
        { name: 'Chinese', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&auto=format&fit=crop&q=80' },
    ];

    // Mock Data with Coordinates (Thane/Mumbai Focused)
    const allRestaurants = [
        {
            id: 1,
            name: 'Pizza Hut',
            rating: 4.1,
            cuisines: 'Pizzas',
            location: 'Kalyan',
            lat: 19.2403,
            lon: 73.1305,
            offer: '50% OFF UPTO ₹100',
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 2,
            name: 'Chinese Wok',
            rating: 4.3,
            cuisines: 'Chinese, Asian',
            location: 'Dombivli',
            lat: 19.2184,
            lon: 73.0867,
            offer: 'ITEMS AT ₹149',
            img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 3,
            name: 'Burger King',
            rating: 4.2,
            cuisines: 'Burgers, American',
            location: 'Thane',
            lat: 19.2183,
            lon: 72.9781,
            offer: '60% OFF UPTO ₹120',
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 4,
            name: 'KFC',
            rating: 4.0,
            cuisines: 'Burgers, Biryani',
            location: 'Kalyan',
            lat: 19.2350,
            lon: 73.1290,
            offer: '20% OFF UPTO ₹50',
            img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 5,
            name: 'McDonald\'s',
            rating: 4.4,
            cuisines: 'Burgers, Beverages',
            location: 'Bhiwandi',
            lat: 19.2900,
            lon: 73.0500,
            offer: 'FREE DELIVERY',
            img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80'
        },
        {
            id: 6,
            name: 'Domino\'s Pizza',
            rating: 4.5,
            cuisines: 'Pizzas, Italian',
            location: 'Thane',
            lat: 19.2100,
            lon: 72.9700,
            offer: 'FLAT ₹125 OFF',
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80'
        },
    ];

    // Haversine Formula for Distance (km)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1) return 0;
        const R = 6371;
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseFloat((R * c).toFixed(1));
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Calculate Dynamic Data
    useEffect(() => {
        setLoading(true);

        // Coords for distance calc (fallback to Thane center if missing)
        const userLat = parseFloat(addressDetails?.lat || 0);
        const userLon = parseFloat(addressDetails?.lon || 0);

        const processed = allRestaurants.map(rest => {
            // Serviceability: String Matching Logic
            // If no location set, everything is serviceable
            // Normalize strings
            const userLoc = location ? location.toLowerCase().trim() : '';
            const restLoc = rest.location.toLowerCase().trim();

            // isServiceable = match found OR no location set
            let isServiceable = true;
            if (userLoc) {
                isServiceable = userLoc.includes(restLoc) || restLoc.includes(userLoc);
            }

            // Distance & Time (Visual only now, logic handled by string match)
            let distance = 0;
            let eta = 30; // Default base time

            if (userLat && userLon) {
                distance = calculateDistance(userLat, userLon, rest.lat, rest.lon);
                eta = Math.ceil(distance * 3) + 15;
            }

            return {
                ...rest,
                distance,
                isServiceable,
                time: `${eta}-${eta + 5} mins`
            };
        }).sort((a, b) => {
            // Sort serviceable first, then by distance/relevance
            if (a.isServiceable === b.isServiceable) return 0; // Maintain existing logic order
            return a.isServiceable ? -1 : 1;
        });

        setTimeout(() => {
            setFilteredRestaurants(processed);
            setLoading(false);
        }, 800);
    }, [location, addressDetails]);

    const Skeleton = ({ className }) => (
        <div className={`bg-gray-200 animate-pulse rounded-xl ${className}`}></div>
    );

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/400x300/F5F5F5/1A1A1A?text=Food+Preparation';
    };

    const sortOptions = [
        { label: 'Relevance', value: 'Relevance' },
        { label: 'Delivery Time', value: 'Delivery Time' },
        { label: 'Rating', value: 'Rating' },
        { label: 'Cost: Low to High', value: 'Cost: Low to High' },
        { label: 'Cost: High to Low', value: 'Cost: High to Low' },
    ];

    return (
        <motion.div
            className="min-h-screen bg-accent pb-24 md:pb-10 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* Categories */}
                <div className="mb-10">
                    <h2 className="text-2xl font-heading font-bold text-secondary mb-6">Explore by Category</h2>
                    <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col items-center shrink-0">
                                    <Skeleton className="w-24 h-24 rounded-full mb-3" />
                                    <Skeleton className="w-16 h-4" />
                                </div>
                            ))
                        ) : (
                            categories.map((cat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center shrink-0 cursor-pointer group"
                                >
                                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-primary transition-all p-0.5 shadow-md group-hover:shadow-lg">
                                        <img
                                            src={cat.img}
                                            alt={cat.name}
                                            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                                            onError={handleImageError}
                                        />
                                    </div>
                                    <span className="text-secondary font-medium text-sm group-hover:text-primary transition-colors">{cat.name}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="sticky top-20 z-50 bg-accent/95 backdrop-blur-sm py-4 mb-4">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full shadow-lg font-medium whitespace-nowrap hover:bg-opacity-90 transition-colors text-sm transform hover:scale-105 duration-200">
                            <Filter size={16} />
                            Filter
                        </button>

                        <div className="relative">
                            <button
                                className={`flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm font-medium whitespace-nowrap transition-colors text-sm hover:shadow-md ${sortByOpen ? 'border-primary bg-primary/5 text-primary' : 'bg-white border-gray-100 text-secondary'}`}
                                onClick={() => setSortByOpen(!sortByOpen)}
                            >
                                <span>Sort By</span>
                                <span className="font-bold border-l border-gray-300 pl-2 ml-1">{sortBy}</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${sortByOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {sortByOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden ring-1 ring-black/5"
                                    >
                                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 mb-1">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sort Restaurants By</p>
                                        </div>
                                        {sortOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-between group"
                                                onClick={() => { setSortBy(opt.value); setSortByOpen(false); }}
                                            >
                                                <span className={`${sortBy === opt.value ? 'text-primary font-bold' : 'text-secondary group-hover:text-primary'}`}>
                                                    {opt.label}
                                                </span>
                                                {sortBy === opt.value && <Check size={16} className="text-primary" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-3 overflow-x-auto no-scrollbar items-center pl-2">
                            <button className="px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-secondary font-medium whitespace-nowrap hover:border-primary transition-colors text-sm hover:shadow-md">
                                Fast Delivery
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-secondary font-medium whitespace-nowrap hover:border-primary transition-colors text-sm hover:shadow-md">
                                Ratings 4.0+
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-secondary font-medium whitespace-nowrap hover:border-primary transition-colors text-sm hover:shadow-md">
                                Pure Veg
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-secondary font-medium whitespace-nowrap hover:border-primary transition-colors text-sm hover:shadow-md">
                                Offers
                            </button>
                        </div>
                    </div>
                </div>

                {/* Restaurant Grid */}
                <div>
                    <h2 className="text-2xl font-heading font-bold text-secondary mb-6">All Restaurants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="w-full h-48 rounded-2xl mb-3" />
                                    <Skeleton className="w-3/4 h-6 mb-2" />
                                    <Skeleton className="w-1/2 h-4" />
                                </div>
                            ))
                        ) : (
                            filteredRestaurants.map((rest, index) => (
                                <motion.div
                                    key={rest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {rest.isServiceable ? (
                                        <Link to={`/restaurant/${rest.id}`}>
                                            <RestaurantCard data={rest} onError={handleImageError} />
                                        </Link>
                                    ) : (
                                        <div className="opacity-60 pointer-events-none grayscale relative">
                                            <RestaurantCard data={rest} onError={handleImageError} />
                                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-2xl p-4 text-center">
                                                <span className="bg-gray-800 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-xl">
                                                    Not delivering to {location}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Reusable Restaurant Card
const RestaurantCard = ({ data, onError }) => {
    return (
        <div className="group cursor-pointer bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-100">
            <div className="relative h-48 rounded-xl overflow-hidden mb-3">
                <img
                    src={data.img}
                    alt={data.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={onError}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <p className="text-white font-bold text-lg leading-tight uppercase truncate">
                        {data.offer}
                    </p>
                </div>
                <button className="absolute top-2 right-2 bg-white/20 backdrop-blur-md p-1.5 rounded-full hover:bg-white/40 transition-colors">
                    <Heart className="w-4 h-4 text-white" />
                </button>
            </div>

            <div className="px-1">
                <h3 className="font-heading font-bold text-secondary text-xl mb-1 truncate">{data.name}</h3>

                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-md text-xs font-bold shadow-sm">
                        <Star size={12} fill="white" />
                        <span>{data.rating}</span>
                    </div>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="font-bold text-secondary text-sm flex items-center gap-1">
                        <Clock size={14} className="text-primary" /> {data.time}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm text-text-muted">
                    <p className="truncate max-w-[60%]">{data.cuisines}</p>
                    <p className="flex items-center gap-1"><MapPin size={12} /> {data.location}</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;

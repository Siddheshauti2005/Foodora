import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Search, ChevronDown, ChevronUp, CirclePercent, ArrowLeft } from 'lucide-react';
import QuantityControl from '../components/QuantityControl';
import { useCart } from '../context/CartContext';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantDetails = () => {
    // 1. Param-Based Fetching
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, toggleCart, grandTotal } = useCart();

    // 2. Unique Menu Logic via Custom Hook
    const { restaurant, menuCategories, loading } = useRestaurantMenu(id);

    // State for UI toggles
    const [collapsed, setCollapsed] = useState({});
    const [isVegOnly, setIsVegOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleCategory = (title) => {
        setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
    };

    // 5. Professional UI Sync (Loading State) - Skeleton Loader
    if (loading) {
        return (
            <div className="min-h-screen bg-accent pb-24 animate-pulse">
                {/* Header Skeleton */}
                <div className="bg-white shadow-sm pt-6 pb-4 sticky top-0 z-20">
                    <div className="max-w-[800px] mx-auto px-4">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-16 w-[70px] bg-gray-200 rounded-xl"></div>
                        </div>
                    </div>
                </div>
                {/* Menu Skeleton */}
                <div className="max-w-[800px] mx-auto px-4 mt-6 space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 p-4">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2].map((j) => (
                                    <div key={j} className="flex gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-48 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="w-32 h-28 bg-gray-200 rounded-xl"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // 4. Rendering Logic (Error Handling)
    if (!restaurant) {
        return (
            <div className="min-h-screen bg-accent flex flex-col items-center justify-center space-y-4 p-4 text-center">
                <h2 className="text-2xl font-bold text-secondary">Restaurant Not Found</h2>
                <p className="text-text-muted">The restaurant you are looking for doesn't exist or is currently unavailable.</p>
                <button
                    onClick={() => navigate('/menu')}
                    className="px-6 py-2 bg-primary text-white rounded-full font-bold hover:bg-opacity-90 transition-colors"
                >
                    Browse Restaurants
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-accent pb-24 animate-fadeIn">
            {/* Header/Info Card */}
            <div className="bg-white shadow-sm pt-6 pb-4 sticky top-0 z-20">
                <div className="max-w-[800px] mx-auto px-4">
                    <button onClick={() => navigate('/menu')} className="mb-4 flex items-center text-text-muted hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft size={16} className="mr-1" /> Back to Menu
                    </button>

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-2">{restaurant.name}</h1>
                            <p className="text-text-muted text-sm mb-1">{restaurant.cuisines}</p>
                            <p className="text-text-muted text-sm flex items-center gap-1">
                                <MapPin size={14} className="text-primary" /> {restaurant.location}
                            </p>
                        </div>
                        <div className="border border-gray-100 rounded-xl p-2 text-center shadow-sm bg-gray-50 flex flex-col items-center min-w-[70px]">
                            <div className="flex items-center gap-1 text-green-700 font-bold border-b border-gray-200 pb-1 mb-1 justify-center w-full">
                                <Star size={16} fill="currentColor" strokeWidth={0} />
                                <span>{restaurant.rating}</span>
                            </div>
                            <p className="text-[10px] text-secondary font-medium leading-tight">{restaurant.ratingCount} ratings</p>
                        </div>
                    </div>

                    <div className="flex gap-6 text-secondary font-bold text-sm mb-4 border-b border-dashed border-gray-200 pb-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                            <Clock size={16} className="text-primary" />
                            {restaurant.time}
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                            <CirclePercent size={16} className="text-primary" />
                            <span className="text-xs">Offers Available</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Veg Toggle */}
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                            onClick={() => setIsVegOnly(!isVegOnly)}
                        >
                            <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${isVegOnly ? 'bg-green-600' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${isVegOnly ? 'left-6' : 'left-1'}`}></div>
                            </div>
                            <span className={`text-xs font-bold ${isVegOnly ? 'text-green-700' : 'text-text-muted'}`}>VEG ONLY</span>
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search for dishes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-100 p-2.5 rounded-xl pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu List */}
            <div className="max-w-[800px] mx-auto px-4 mt-6">
                <div className="space-y-4">
                    {menuCategories.map((category) => {
                        // 4. Rendering Logic: Map and Filter
                        const filteredItems = category.items.filter(item => {
                            const matchesVeg = isVegOnly ? item.isVeg : true;
                            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
                            return matchesVeg && matchesSearch;
                        });

                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={category.title} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                <button
                                    onClick={() => toggleCategory(category.title)}
                                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-gray-50/50 transition-colors"
                                >
                                    <h2 className="text-lg font-heading font-bold text-secondary">{category.title} ({filteredItems.length})</h2>
                                    {collapsed[category.title] ? <ChevronDown className="text-gray-400" /> : <ChevronUp className="text-gray-400" />}
                                </button>

                                {!collapsed[category.title] && (
                                    <div className="divide-y divide-gray-50">
                                        {filteredItems.map((item) => (
                                            <div key={item.id} className="p-4 flex justify-between gap-4 hover:bg-gray-50/30 transition-colors">
                                                <div className="flex-1">
                                                    <div className={`w-4 h-4 rounded-sm border flex items-center justify-center mb-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                                    </div>
                                                    <h3 className="font-bold text-secondary text-base mb-1">{item.name}</h3>
                                                    <p className="font-bold text-secondary text-sm mb-2">₹{item.price}</p>
                                                    <p className="text-text-muted text-xs line-clamp-2 leading-relaxed">{item.description}</p>
                                                </div>
                                                <div className="relative w-32 h-28 shrink-0">
                                                    {item.img ? (
                                                        <img
                                                            src={item.img}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-xl shadow-sm"
                                                            onError={(e) => { e.target.src = 'https://placehold.co/400x300/F5F5F5/1A1A1A?text=Food+Preparation'; }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse"></div>
                                                    )}
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 shadow-lg bg-white rounded-lg">
                                                        <QuantityControl item={{ ...item, restaurantId: restaurant.id }} restaurant={restaurant} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Cart Floating Button */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-20 left-0 right-0 p-4 z-40 md:hidden flex justify-center pointer-events-none">
                    <button
                        onClick={toggleCart}
                        className="bg-secondary text-white font-bold py-3 px-5 rounded-full flex items-center justify-between shadow-2xl w-full max-w-sm pointer-events-auto border border-white/10"
                    >
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-sm">{cartItems.length} Items</span>
                            <span className="text-xs font-medium text-gray-400">Total: ₹{grandTotal}</span>
                        </div>
                        <span className="uppercase text-xs font-bold flex items-center gap-1 bg-primary text-secondary px-3 py-1.5 rounded-full">
                            View Cart <ChevronUp size={14} className="rotate-90" />
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;

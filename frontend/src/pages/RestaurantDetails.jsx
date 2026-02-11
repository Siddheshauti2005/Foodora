import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Search, ChevronDown, ChevronUp, CirclePercent } from 'lucide-react'; // Added CirclePercent for offers
import QuantityControl from '../components/QuantityControl';
import { useCart } from '../context/CartContext';
import useRestaurantMenu from '../hooks/useRestaurantMenu';

const RestaurantDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { cartItems, toggleCart, grandTotal } = useCart();

    // Use Custom Hook
    const { restaurant, menuCategories, loading } = useRestaurantMenu(id);

    const [collapsed, setCollapsed] = useState({});
    const [isVegOnly, setIsVegOnly] = useState(false); // Veg Toggle State

    const toggleCategory = (title) => {
        setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
    };

    if (loading || !restaurant) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium">Loading delicious food...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header/Info Card */}
            <div className="bg-white shadow-sm pt-8 pb-4 sticky top-0 z-20">
                <div className="max-w-[800px] mx-auto px-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                            <p className="text-gray-500 text-sm mb-1">{restaurant.cuisines}</p>
                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                <MapPin size={14} /> {restaurant.location}
                            </p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 text-center shadow-sm">
                            <div className="flex items-center gap-1 text-green-700 font-bold border-b border-gray-200 pb-1 mb-1 justify-center">
                                <Star size={16} fill="currentColor" strokeWidth={0} />
                                <span>{restaurant.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">{restaurant.ratingCount} ratings</p>
                        </div>
                    </div>

                    {/* Time & Cost Info */}
                    <div className="flex gap-6 text-gray-700 font-bold text-sm mb-4 border-b border-dashed border-gray-300 pb-4">
                        <div className="flex items-center gap-2">
                            <Clock size={18} />
                            {restaurant.time}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1"><CirclePercent size={18} /> Offers Available</span>
                        </div>
                    </div>

                    {/* Veg Toggle & Search */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsVegOnly(!isVegOnly)}>
                            <div className={`w-10 h-5 rounded-full relative transition-colors ${isVegOnly ? 'bg-green-600' : 'bg-gray-300'}`}>
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isVegOnly ? 'left-6' : 'left-1'}`}></div>
                            </div>
                            <span className={`text-sm font-bold ${isVegOnly ? 'text-green-700' : 'text-gray-500'}`}>VEG ONLY</span>
                        </div>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search for dishes"
                                className="w-full bg-gray-100 p-2 rounded-lg pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto px-4 mt-6">
                {/* Menu Categories */}
                <div className="space-y-4">
                    {menuCategories.map((category) => {
                        // Filter items based on Veg Toggle
                        const displayedItems = isVegOnly ? category.items.filter(item => item.isVeg) : category.items;

                        if (displayedItems.length === 0) return null;

                        return (
                            <div key={category.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <button
                                    onClick={() => toggleCategory(category.title)}
                                    className="w-full p-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <h2 className="text-lg font-bold text-gray-800">{category.title} ({displayedItems.length})</h2>
                                    {collapsed[category.title] ? <ChevronDown /> : <ChevronUp />}
                                </button>

                                {!collapsed[category.title] && (
                                    <div>
                                        {displayedItems.map((item) => (
                                            <div key={item.id} className="p-4 border-t border-gray-100 flex justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center mb-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                                    </div>
                                                    <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                                                    <p className="font-medium text-gray-700 text-sm mb-2">₹{item.price}</p>
                                                    <p className="text-gray-500 text-xs line-clamp-2">{item.description}</p>
                                                </div>
                                                <div className="relative w-32 h-28 shrink-0">
                                                    {item.img && <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-lg" />}
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 shadow-md bg-white rounded-md">
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

            {/* Float Cart Button - Sticky Bottom for Mobile */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 p-4 z-40 md:hidden flex justify-center pointer-events-none">
                    <button
                        onClick={toggleCart}
                        className="bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-between shadow-xl w-full max-w-md pointer-events-auto transform translate-y-0 transition-transform"
                    >
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-sm">{cartItems.length} Items | ₹{grandTotal}</span>
                            <span className="text-xs opacity-90 font-medium">Extra charges may apply</span>
                        </div>
                        <span className="uppercase text-sm font-bold flex items-center gap-1">
                            View Cart <ChevronUp size={16} className="rotate-90" />
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetails;

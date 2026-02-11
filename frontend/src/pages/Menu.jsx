import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Star, Clock, Percent, Heart, Search } from 'lucide-react';
import { useLocation } from '../context/LocationContext';

const Menu = () => {
    const [loading, setLoading] = useState(true);
    const [sortByOpen, setSortByOpen] = useState(false);
    const [sortBy, setSortBy] = useState('Relevance');

    // Mock Data
    const categories = [
        { name: 'Biryani', img: 'https://loremflickr.com/150/150/biryani,food' },
        { name: 'Burger', img: 'https://loremflickr.com/150/150/burger,food' },
        { name: 'Pizza', img: 'https://loremflickr.com/150/150/pizza,food' },
        { name: 'Chinese', img: 'https://loremflickr.com/150/150/chinese,food' },
        { name: 'Cake', img: 'https://loremflickr.com/150/150/cake,food' },
        { name: 'Rolls', img: 'https://loremflickr.com/150/150/rolls,food' },
        { name: 'Ice Cream', img: 'https://loremflickr.com/150/150/icecream,food' },
        { name: 'North Indian', img: 'https://loremflickr.com/150/150/curry,food' },
        { name: 'South Indian', img: 'https://loremflickr.com/150/150/dosa,food' },
    ];

    const restaurants = [
        {
            id: 1,
            name: 'Pizza Hut',
            rating: 4.1,
            time: '30-35 mins',
            cuisines: 'Pizzas',
            location: 'Kalyan',
            offer: '50% OFF UPTO ₹100',
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60' // Cheesy Pizza
        },
        {
            id: 2,
            name: 'Chinese Wok',
            rating: 4.3,
            time: '45-50 mins',
            cuisines: 'Chinese, Asian, Tibetan',
            location: 'Dombivli',
            offer: 'ITEMS AT ₹149',
            img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=60' // Noodles
        },
        {
            id: 3,
            name: 'Burger King',
            rating: 4.2,
            time: '25-30 mins',
            cuisines: 'Burgers, American',
            location: 'Thane',
            offer: '60% OFF UPTO ₹120',
            img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=800&auto=format&fit=crop&q=60' // Loaded Burger
        },
        {
            id: 4,
            name: 'KFC',
            rating: 4.0,
            time: '20-25 mins',
            cuisines: 'Burgers, Biryani, American',
            location: 'Kalyan',
            offer: '20% OFF UPTO ₹50',
            img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=60' // Fried Chicken
        },
        {
            id: 5,
            name: 'McDonald\'s',
            rating: 4.4,
            time: '25-30 mins',
            cuisines: 'Burgers, Beverages',
            location: 'Bhiwandi',
            offer: 'FREE DELIVERY',
            img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=60' // Burger & Fries
        },
        {
            id: 6,
            name: 'Domino\'s Pizza',
            rating: 4.5,
            time: '30 mins',
            cuisines: 'Pizzas, Italian',
            location: 'Thane',
            offer: 'FLAT ₹125 OFF',
            img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=60' // Pizza
        },
        {
            id: 7,
            name: 'Subway',
            rating: 4.2,
            time: '20-25 mins',
            cuisines: 'Salads, Snacks',
            location: 'Kalyan',
            offer: 'BUY 1 GET 1 FREE',
            img: 'https://images.unsplash.com/photo-1509722747713-09247f329f45?w=800&auto=format&fit=crop&q=60' // Sub Sandwich
        },
        {
            id: 8,
            name: 'Baskin Robbins',
            rating: 4.6,
            time: '15-20 mins',
            cuisines: 'Desserts, Ice Cream',
            location: 'Dombivli',
            offer: '20% OFF',
            img: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&auto=format&fit=crop&q=60' // Ice Cream
        }
    ];

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Skeleton Component
    const Skeleton = ({ className }) => (
        <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
    );

    return (
        <div className="min-h-screen bg-white pb-20 pt-4">
            <div className="max-w-[1200px] mx-auto px-4">

                {/* 1. What's on your mind? */}
                <div className="mb-12 border-b border-gray-100 pb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">What's on your mind?</h2>
                    <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col items-center shrink-0">
                                    <Skeleton className="w-36 h-36 rounded-full mb-3" />
                                    <Skeleton className="w-20 h-4" />
                                </div>
                            ))
                        ) : (
                            categories.map((cat, index) => (
                                <div key={index} className="flex flex-col items-center shrink-0 cursor-pointer group">
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="w-36 h-36 object-cover rounded-full mb-3 shadow-sm group-hover:shadow-md transition-shadow"
                                    />
                                    <span className="text-gray-700 font-medium text-lg">{cat.name}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* 2. Top Restaurant Chains */}
                <div className="mb-12 border-b border-gray-100 pb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Top restaurant chains in your city</h2>
                    <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 snap-x">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="min-w-[280px] md:min-w-[320px] shrink-0">
                                    <Skeleton className="w-full h-52 rounded-2xl mb-3" />
                                    <Skeleton className="w-3/4 h-6 mb-2" />
                                    <Skeleton className="w-1/2 h-4" />
                                </div>
                            ))
                        ) : (
                            restaurants.slice(0, 5).map((rest) => (
                                <Link to={`/restaurant/${rest.id}`} key={rest.id}>
                                    <RestaurantCard data={rest} />
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* 3. Main Grid & Sticky Filter */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Restaurants with online food delivery in your city</h2>

                    {/* Sticky Filter Bar */}
                    <div className="sticky top-[72px] bg-white z-40 py-4 mb-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] -mx-4 px-4 flex gap-3 overflow-x-auto no-scrollbar items-center">

                        {/* Filter Button */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium whitespace-nowrap hover:bg-gray-50 transition-colors">
                            <Filter size={18} />
                            Filter
                        </button>

                        {/* Sort By Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium whitespace-nowrap hover:bg-gray-50 transition-colors"
                                onClick={() => setSortByOpen(!sortByOpen)}
                            >
                                Sort By
                                <span className="font-bold text-gray-900">{sortBy}</span>
                                <ChevronDown size={18} />
                            </button>
                            {sortByOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                                    {['Relevance', 'Delivery Time', 'Rating', 'Cost: Low to High', 'Cost: High to Low'].map((opt) => (
                                        <button
                                            key={opt}
                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm font-medium"
                                            onClick={() => { setSortBy(opt); setSortByOpen(false); }}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Other Filters */}
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium whitespace-nowrap hover:bg-gray-50 transition-colors">
                            Fast Delivery
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium whitespace-nowrap hover:bg-gray-50 transition-colors">
                            Ratings 4.0+
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 font-medium whitespace-nowrap hover:bg-gray-50 transition-colors">
                            Offers
                        </button>
                    </div>

                    {/* Restaurant Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {loading ? (
                            Array(8).fill(0).map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="w-full h-56 rounded-2xl mb-3" />
                                    <Skeleton className="w-3/4 h-6 mb-2" />
                                    <Skeleton className="w-1/2 h-4 mb-2" />
                                    <Skeleton className="w-2/3 h-4" />
                                </div>
                            ))
                        ) : (
                            restaurants.map((rest) => (
                                <Link to={`/restaurant/${rest.id}`} key={rest.id}>
                                    <RestaurantCard data={rest} className="hover:scale-105 transition-transform duration-300" />
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Restaurant Card
const RestaurantCard = ({ data, className = "" }) => {
    return (
        <div className={`min-w-[280px] md:min-w-[280px] shrink-0 cursor-pointer group transtion-transform ${className}`}>
            <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden shadow-sm mb-3 group-hover:shadow-lg transition-shadow">
                <img src={data.img} alt={data.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-white font-black text-xl md:text-2xl tracking-tight leading-none uppercase">
                        {data.offer}
                    </p>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                    <Heart className="w-4 h-4 text-white" />
                </div>
            </div>

            <div className="px-1">
                <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{data.name}</h3>
                <div className="flex items-center gap-1 mb-1 font-bold text-gray-700 text-base">
                    <div className="flex items-center gap-1 bg-green-700 text-white px-1.5 py-[1px] rounded-[4px] text-xs">
                        <Star size={12} fill="white" strokeWidth={0} />
                        <span>{data.rating}</span>
                    </div>
                    <span>•</span>
                    <span className="font-bold">{data.time}</span>
                </div>
                <p className="text-gray-500 text-base truncate font-medium">{data.cuisines}</p>
                <p className="text-gray-500 text-base font-medium">{data.location}</p>
            </div>
        </div>
    );
}

export default Menu;

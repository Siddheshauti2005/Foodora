import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { ArrowRight, MapPin, Search, ChevronLeft, ChevronRight, Star, X, Loader2 } from 'lucide-react';
import Toast from '../components/Toast';

const foodCategories = [
    'Biryani', 'Pizza', 'Burger', 'Cake', 'Rolls', 'Noodles',
    'Shawarma', 'Pastry', 'Pasta', 'Kebab', 'Dosa'
];

const featureCards = [
    {
        title: 'FOOD DELIVERY',
        subtitle: 'FROM RESTAURANTS',
        tag: 'UPTO 60% OFF',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop'
    },
    {
        title: 'INSTAMART',
        subtitle: 'INSTANT GROCERY',
        tag: 'UPTO 60% OFF',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop'
    },
    {
        title: 'DINEOUT',
        subtitle: 'EAT OUT & SAVE MORE',
        tag: 'UPTO 50% OFF',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop'
    }
];

const mockRestaurants = [
    {
        id: 1,
        name: "Pizza Paradise",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=60", // Paneer/Veg Pizza
        rating: 4.5,
        time: "30-40 mins",
        cuisines: "Italian, Pizzas"
    },
    {
        id: 2,
        name: "Burger King",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60", // Juicy Burger
        rating: 4.2,
        time: "25-30 mins",
        cuisines: "American, Burgers"
    },
    {
        id: 3,
        name: "Biryani Blues",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=60", // Dum Biryani
        rating: 4.8,
        time: "40-50 mins",
        cuisines: "Indian, Biryani"
    },
    {
        id: 4,
        name: "Sushi House",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60", // Sushi
        rating: 4.6,
        time: "35-45 mins",
        cuisines: "Japanese, Sushi"
    }
];

const Home = () => {
    const { location, setLocation, locateUser, loadingLocation, locationError, clearLocation } = useLocation();
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [toastMessage, setToastMessage] = React.useState(null);

    React.useEffect(() => {
        if (locationError) {
            setToastMessage(locationError);
        }
    }, [locationError]);

    const handleLocateMe = async () => {
        await locateUser();
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 400;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-[#fc8019] pb-20 pt-16 px-4 relative">
                <div className="container mx-auto flex flex-col items-center z-10 relative">
                    {toastMessage && (
                        <Toast
                            message={toastMessage}
                            onClose={() => setToastMessage(null)}
                        />
                    )}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Order food & groceries. Discover best restaurants. Swiggy it!
                        </h1>
                    </div>

                    {/* Search Bar Row */}
                    <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden h-auto md:h-16">
                        <div className="flex items-center flex-1 px-6 py-4 md:py-0 border-b md:border-b-0 md:border-r border-gray-200 relative">
                            <MapPin className={`text-[#fc8019] w-6 h-6 mr-4 shrink-0 ${loadingLocation ? 'animate-bounce' : ''}`} />
                            <input
                                type="text"
                                placeholder={locationError || "Enter your delivery location"}
                                className={`w-full focus:outline-none placeholder-gray-400 font-medium text-lg capitalize ${locationError ? 'text-red-500' : 'text-gray-700'}`}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                disabled={loadingLocation}
                            />
                            {location && !loadingLocation && (
                                <X
                                    className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-600 mr-2"
                                    onClick={clearLocation}
                                />
                            )}
                            <div
                                className="flex items-center gap-2 cursor-pointer ml-3 hover:text-[#fc8019] transition-colors"
                                onClick={handleLocateMe}
                            >
                                {loadingLocation ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin text-[#fc8019]" />
                                        <span className="text-gray-500 text-sm font-bold">Locating...</span>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 text-sm whitespace-nowrap hidden sm:block font-bold">
                                        Locate Me
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center flex-[1.5] px-6 py-4 md:py-0">
                            <input
                                type="text"
                                placeholder="Search for restaurant, item or more"
                                className="w-full focus:outline-none text-gray-700 placeholder-gray-400 font-medium text-lg"
                            />
                            <Search className="text-gray-400 w-6 h-6 ml-4 shrink-0" />
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-16">
                        {featureCards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-[2rem] p-6 relative h-72 overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
                                onClick={() => {
                                    const routes = {
                                        'FOOD DELIVERY': '/menu',
                                        'INSTAMART': '/instamart', // Placeholder route
                                        'DINEOUT': '/dineout' // Placeholder route
                                    };

                                    if (user) {
                                        // Navigate to the specific route for the card
                                        const route = routes[card.title];
                                        if (route) navigate(route);
                                    } else {
                                        navigate('/login');
                                    }
                                }}
                            >
                                <div className="z-10 relative">
                                    <h3 className="text-3xl font-black text-gray-800 tracking-tight leading-tight mb-1 pr-28">{card.title}</h3>
                                    <p className="text-gray-500 font-bold text-base tracking-wide uppercase">{card.subtitle}</p>
                                </div>
                                <span className="absolute top-6 right-6 text-xs font-black bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{card.tag}</span>

                                <button className="absolute bottom-6 left-6 bg-[#fc8019] text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors">
                                    <ArrowRight className="w-6 h-6" />
                                </button>

                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="absolute bottom-0 right-0 w-40 h-40 object-cover rounded-tl-[2rem]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Food Carousel Section */}
            <div className="container mx-auto px-4 mt-12 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Order our best food options</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-10 overflow-x-auto no-scrollbar pb-8 scroll-smooth"
                >
                    {foodCategories.map((item, index) => (
                        <div key={index} className="flex flex-col items-center min-w-[140px] cursor-pointer shrink-0">
                            <div className="w-36 h-36 rounded-full overflow-hidden mb-4 shadow-md hover:shadow-lg transition-shadow">
                                <img
                                    src={`https://loremflickr.com/300/300/${item},food`}
                                    alt={item}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-gray-700 font-bold text-lg">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Restaurants Section (Kept for content) */}
            <div className="container mx-auto px-4 mt-8 max-w-6xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Restaurants</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {mockRestaurants.map((restaurant) => (
                        <div key={restaurant.id} className="bg-white rounded-2xl overflow-hidden hover:scale-95 transition-transform duration-200 cursor-pointer shadow-sm hover:shadow-md">
                            <div className="relative h-48">
                                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{restaurant.name}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                                        <Star size={12} fill="white" />
                                        <span>{restaurant.rating}</span>
                                    </div>
                                    <span className="text-gray-500 font-bold text-sm">•</span>
                                    <span className="text-gray-700 font-bold text-sm">{restaurant.time}</span>
                                </div>
                                <p className="text-gray-500 text-sm truncate">{restaurant.cuisines}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;

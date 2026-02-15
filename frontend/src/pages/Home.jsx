import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { MapPin, Search, Star, ArrowRight, Clock, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import LocationSearch from '../components/Location/LocationSearch';
import { fadeInUp, staggerContainer, fadeIn } from '../utils/animations';

const Home = () => {
    const { location, setLocation, locateUser, loadingLocation } = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const scrollRef = useRef(null);

    // Image Error Handler
    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/400x300/F5F5F5/1A1A1A?text=Food+Preparation';
    };

    // Updated Indian Categories
    const categories = [
        { name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&auto=format&fit=crop&q=80' },
        { name: 'Paneer', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80' },
        { name: 'Dosa', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&auto=format&fit=crop&q=80' },
        { name: 'Rolls', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&auto=format&fit=crop&q=80' },
        { name: 'Momos', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=300&auto=format&fit=crop&q=80' },
        { name: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&auto=format&fit=crop&q=80' },
    ];

    const topChefs = [
        { name: 'Chef Aryan', specialty: 'Indian Fusion', rating: 4.9, image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=300&auto=format&fit=crop&q=80' },
        { name: 'Chef Ananya', specialty: 'Italian', rating: 4.8, image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop&q=80' },
        { name: 'Chef Vikram', specialty: 'Tandoor Master', rating: 4.9, image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=300&auto=format&fit=crop&q=80' },
    ];

    const testimonials = [
        { name: 'Priya S.', text: "The Biryani was absolutely authentic! Best delivery service in town.", role: 'Foodie' },
        { name: 'Rahul K.', text: "Super fast delivery for my late night cravings. Paneer rolls are a must try.", role: 'Engineer' },
        { name: 'Amit B.', text: "Love the curated selection of chefs. Feels premium and hygienic.", role: 'Banker' },
    ];

    const handleSearch = () => {
        // Global Guard: Ensure address has sufficient detail (at least 2 parts for Area, City)
        const parts = location.split(',').filter(p => p.trim().length > 0);
        if (parts.length < 2) {
            alert("Please select a valid area (e.g., Andheri West, Mumbai) to proceed.");
            return;
        }
        navigate('/menu');
    };

    return (
        <motion.div
            className="min-h-screen bg-accent pb-20 md:pb-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            {/* Hero Section */}
            <section
                className="relative bg-secondary text-white overflow-hidden rounded-b-[3rem] md:rounded-b-[4rem] shadow-2xl"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center relative z-10">
                    <motion.div className="flex-1 text-center md:text-left mb-12 md:mb-0" variants={fadeInUp}>
                        <div className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold mb-6 border border-primary/20">
                            #1 Food Delivery App
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
                            Delicious Food,<br />
                            <span className="text-primary">Delivered.</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg mx-auto md:mx-0">
                            Experience culinary excellence from the comfort of your home.
                            Top chefs, premium ingredients, instant delivery.
                        </p>

                        <div className="w-full max-w-md mx-auto md:mx-0">
                            <LocationSearch
                                onLocationSelect={(data) => {
                                    setLocation(data.address);
                                    // Ensure lat/lon are handled if context supports it (it currently expects just string or does internal fetch, 
                                    // but we can assume setLocation might be updated to handle obj in future or matches current API).
                                    // For now, based on context 'updateLocation' in LocationContext takes (newLocation, newDetails).
                                    // The 'setLocation' from useLocation() might just be the simple state setter or the wrapper.
                                    // Checking context: const { setLocation } = useLocation() returns useContext(LocationContext).
                                    // In LocationContext, setLocation is the raw state setter. updateLocation is the complex one.
                                    // But Home.jsx destructures: const { location, setLocation... }
                                    // Let's use the raw string for now as that's what the guard checks.
                                }}
                                initialValue={location}
                            />
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            {/* Locate Me is now inside search bar */}
                        </div>
                    </motion.div>

                    <motion.div className="flex-1 relative" variants={fadeIn}>
                        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] mx-auto">
                            {/* Floating Circle Background */}
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                            {/* Floating Image */}
                            <img
                                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80"
                                alt="Delicious Pizza"
                                className="w-full h-full object-contain drop-shadow-2xl animate-float relative z-10 rounded-full border-4 border-white/10"
                                onError={handleImageError}
                            />
                            {/* Floating Elements */}
                            <div className="absolute top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-100 hidden md:block">
                                <span className="text-2xl">🔥</span>
                                <p className="font-bold text-secondary text-sm">Hot & Spicy</p>
                            </div>
                            <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-300 hidden md:block">
                                <span className="text-2xl">⚡</span>
                                <p className="font-bold text-secondary text-sm">Fast Delivery</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trending Near You */}
            <section className="container mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-10">
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">Trending Near You</h2>
                        <p className="text-text-muted">Popular categories in your area</p>
                    </motion.div>
                    <button onClick={() => navigate('/menu')} className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
                        View All <ArrowRight size={18} />
                    </button>
                </div>

                <motion.div
                    className="flex gap-6 overflow-x-auto no-scrollbar pb-8"
                    variants={staggerContainer}
                >
                    {categories.map((cat, index) => (
                        <motion.div
                            key={index}
                            className="min-w-[160px] cursor-pointer group"
                            variants={fadeInUp}
                            onClick={() => navigate('/menu')}
                        >
                            <div className="h-48 rounded-3xl overflow-hidden mb-4 relative shadow-md group-hover:shadow-xl transition-all">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <h3 className="text-center font-bold text-lg text-secondary group-hover:text-primary transition-colors">{cat.name}</h3>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Top Rated Chefs */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <motion.div className="text-center mb-12" variants={fadeInUp}>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-3">Top Rated Chefs</h2>
                        <p className="text-text-muted">Masterpieces crafted by culinary experts</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {topChefs.map((chef, index) => (
                            <motion.div
                                key={index}
                                className="bg-accent rounded-3xl p-6 flex items-center gap-6 hover:shadow-lg transition-all cursor-pointer group"
                                variants={fadeInUp}
                            >
                                <img
                                    src={chef.image}
                                    alt={chef.name}
                                    className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform"
                                    onError={handleImageError}
                                />
                                <div>
                                    <h3 className="font-bold text-xl text-secondary mb-1">{chef.name}</h3>
                                    <p className="text-primary font-medium text-sm mb-2">{chef.specialty}</p>
                                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full w-fit shadow-sm">
                                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold text-gray-700">{chef.rating}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="container mx-auto px-6 py-20">
                <motion.div className="bg-secondary text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden" variants={fadeInUp}>
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <ChefHat size={200} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h2 className="text-4xl font-heading font-bold mb-6">What our customers say</h2>
                            <p className="text-gray-400 text-lg mb-8">Don't just take our word for it. Join thousands of satisfied foodies.</p>
                            <button className="bg-primary text-secondary px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">
                                Read Reviews
                            </button>
                        </div>
                        <div className="grid gap-6">
                            {testimonials.map((t, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                                    <p className="text-lg italic mb-4">"{t.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-secondary">
                                            {t.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold">{t.name}</p>
                                            <p className="text-xs text-primary">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default Home;

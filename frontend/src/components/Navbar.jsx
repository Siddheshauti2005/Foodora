import React, { useState } from 'react';
import { Search, ShoppingBag, User, LogOut, ChevronDown, UtensilsCrossed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { location } = useLocation();
    const navigate = useNavigate();
    const { toggleCart, cartItems } = useCart();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Calculate total quantity across all items
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="hidden md:block sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                        <UtensilsCrossed className="text-primary" size={24} />
                    </div>
                    <span className="text-2xl font-heading font-bold text-secondary tracking-tight">
                        Foodora
                    </span>
                </Link>

                {/* Center Navigation */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-secondary font-medium hover:text-primary transition-colors">Home</Link>
                    <Link to="/menu" className="text-secondary font-medium hover:text-primary transition-colors">Menu</Link>
                    <Link to="/about" className="text-text-muted hover:text-primary transition-colors">About</Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-6">
                    <button className="text-secondary hover:text-primary transition-colors">
                        <Search size={20} />
                    </button>

                    <div className="relative group cursor-pointer" onClick={toggleCart}>
                        <ShoppingBag size={20} className="text-secondary group-hover:text-primary transition-colors" />
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm animate-bounce-short">
                                {totalItems}
                            </span>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-full transition-all border border-transparent hover:border-gray-100"
                        >
                            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-emerald-300 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                {user?.name ? user.name[0].toUpperCase() : <User size={14} />}
                            </div>
                            <div className="flex flex-col items-start leading-tight">
                                <span className="font-medium text-sm text-secondary">
                                    {user?.name ? `Hi, ${user.name.split(' ')[0]}` : 'Account'}
                                </span>
                                {location && (
                                    <span className="text-[10px] text-primary font-bold truncate max-w-[80px]">
                                        {location.split(',')[0]}
                                    </span>
                                )}
                            </div>
                            <ChevronDown size={14} className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-12 right-0 w-48 bg-white rounded-xl shadow-xl py-2 border border-gray-100 overflow-hidden"
                                >
                                    <div className="px-4 py-2 border-b border-gray-50">
                                        <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                                        <p className="text-sm font-bold text-secondary truncate">{user?.email}</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-secondary hover:bg-gray-50 hover:text-primary"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        to="/orders"
                                        className="block px-4 py-2 text-sm text-secondary hover:bg-gray-50 hover:text-primary"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Your Orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 mt-1"
                                    >
                                        <LogOut size={14} />
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

import React from 'react';
import { Home, Search, ShoppingBag, User, Menu as MenuIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const BottomNav = () => {
    const location = useLocation();
    const { user } = useAuth();

    // Mock cart count
    const cartCount = user ? 2 : 0;

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/menu' },
        { icon: ShoppingBag, label: 'Orders', path: '/orders' },
        { icon: User, label: 'Profile', path: '/profile' }
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 px-6 py-2 pb-safe">
            <div className="flex justify-between items-center">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 p-2 relative ${isActive ? 'text-primary' : 'text-gray-400'}`}
                        >
                            <div className="relative">
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                {item.badge > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="bottomNavIndicator"
                                    className="absolute -top-2 w-8 h-1 bg-primary rounded-b-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;

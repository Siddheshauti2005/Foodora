import React, { useState } from 'react';
import { Search, Percent, User, LogOut, ChevronDown, ShoppingBag, HelpCircle } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation as useGeoLocation } from '../context/LocationContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { location } = useGeoLocation();
    const navigate = useNavigate();
    const routerLocation = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Mock cart count - replace with actual cart context later
    const cartCount = user ? 2 : 0;

    const handleLogout = () => {
        logout();
        navigate('/');
        setDropdownOpen(false);
    };

    const NavItem = ({ icon: Icon, text, to, onClick, badge }) => {
        const Content = (
            <div className={`flex items-center gap-3 cursor-pointer group hover:text-[#fc8019] transition-colors duration-300 ${to ? '' : 'h-full'}`}>
                <div className="relative">
                    <Icon size={20} strokeWidth={2} />
                    {badge > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#ffa700] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
                            {badge}
                        </span>
                    )}
                </div>
                <span className="font-medium text-[#3d4152] group-hover:text-[#fc8019] text-base">
                    {text}
                </span>
            </div>
        );

        if (to) {
            return <Link to={to}>{Content}</Link>;
        }
        return <div onClick={onClick}>{Content}</div>;
    };

    return (
        <div className="sticky top-0 z-50 bg-white shadow-lg h-20">
            <div className="max-w-[1200px] mx-auto h-full flex justify-between items-center px-4">
                {/* Left Side: Logo & Location */}
                {/* Left Side: Logo */}
                <div className="flex items-center gap-10">
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* Swiggy-like logo style */}
                        <svg className="w-8 h-10 fill-current text-[#fc8019] group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-2xl font-bold text-[#3d4152] tracking-tighter group-hover:text-[#fc8019] transition-colors">
                            Foodora
                        </span>
                    </Link>
                </div>

                {/* Right Side: Navigation */}
                <div className="flex items-center gap-10">
                    <ul className="hidden md:flex items-center gap-12">
                        <li>
                            <NavItem icon={Search} text="Search" />
                        </li>
                        <li>
                            <NavItem icon={Percent} text="Offers" />
                        </li>
                        <li>
                            <NavItem icon={HelpCircle} text="Help" />
                        </li>
                        <li>
                            {user ? (
                                <div className="relative">
                                    <div
                                        className="flex items-center gap-3 cursor-pointer group hover:text-[#fc8019] transition-colors duration-300"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <User size={20} strokeWidth={2} />
                                        <span className="font-medium text-[#3d4152] group-hover:text-[#fc8019] text-base">
                                            {user.name || 'Account'}
                                        </span>
                                    </div>

                                    {dropdownOpen && (
                                        <div className="absolute top-10 right-0 w-48 bg-white rounded-md shadow-xl py-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center px-4 py-3 text-sm text-[#3d4152] hover:bg-gray-50 hover:text-[#fc8019] transition-colors"
                                            >
                                                <LogOut size={16} className="mr-3" />
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavItem icon={User} text="Sign In" to="/login" />
                            )}
                        </li>
                        <li>
                            <NavItem icon={ShoppingBag} text="Cart" badge={cartCount} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

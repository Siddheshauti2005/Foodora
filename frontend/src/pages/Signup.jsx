import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { fadeInUp, pageTransition } from '../utils/animations';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('https://foodora-backend.onrender.com/api/auth/register', formData);
            if (response.data.success) {
                login(response.data.token, response.data.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex bg-accent"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
        >
            {/* Left Side - Image/Brand */}
            <div className="hidden md:flex w-1/2 bg-secondary text-white items-center justify-center relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&auto=format&fit=crop&q=80"
                    alt="Join Foodora"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 bg-center"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80'; }}
                />
                <div className="relative z-10 text-center p-12">
                    <motion.h1
                        className="text-6xl font-heading font-bold mb-4 tracking-tight"
                        variants={fadeInUp}
                    >
                        Join Foodora
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-md mx-auto"
                        variants={fadeInUp}
                    >
                        Your favorite restaurants, delivered with care. Start your culinary journey today.
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl"
                    variants={fadeInUp}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-heading font-bold text-secondary mb-2">Create Account</h2>
                        <p className="text-text-muted">Sign up to get started</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-secondary mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-secondary mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-secondary mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-3.5 rounded-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-8 text-center text-text-muted">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Signup;

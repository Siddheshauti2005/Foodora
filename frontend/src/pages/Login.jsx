import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { fadeInUp, pageTransition } from '../utils/animations';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            if (response.data.success) {
                login(response.data.token, response.data.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex bg-white"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
        >
            {/* Left Side - High Quality Indian Food Image */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543353071-87d3df1e6508?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center transition-transform hover:scale-105 duration-[20s]"
                    aria-label="Delicious Indian Food"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white">
                    <motion.h1
                        className="text-5xl font-heading font-bold mb-4"
                        variants={fadeInUp}
                    >
                        Taste of India
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-200 max-w-md"
                        variants={fadeInUp}
                    >
                        Authentic flavors, delivered to your doorstep. Experience the finest culinary delights with Foodora.
                    </motion.p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <motion.div
                    className="w-full max-w-md"
                    variants={fadeInUp}
                >
                    <div className="mb-10">
                        <h2 className="text-4xl font-heading font-bold text-secondary mb-3">Welcome Back</h2>
                        <p className="text-text-muted text-lg">Please enter your details to sign in.</p>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-secondary mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-gray-50 focus:bg-white"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-secondary">Password</label>
                                <Link to="#" className="text-sm text-primary font-bold hover:underline">Forgot Password?</Link>
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-text-muted">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary font-bold hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;

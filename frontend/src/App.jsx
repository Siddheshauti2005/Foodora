import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Menu from './pages/Menu';
import RestaurantDetails from './pages/RestaurantDetails';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import BottomNav from './components/BottomNav';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

// Layout component to handle Navbar visibility and common layout for authenticated users
const ProtectedLayout = ({ children }) => {
  return (
    <div className='app min-h-screen bg-accent text-secondary font-sans selection:bg-primary selection:text-white'>
      {/* Navbar - Desktop navigation */}
      <Navbar />
      <main className="container mx-auto px-4 py-4 pb-20 md:pb-4">
        {children}
      </main>
      <BottomNav />
      <CartDrawer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes - The Gatekeeper pattern */}
            <Route path="/*" element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<Orders />} />
                    {/* Redirect unknown protected routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </ProtectedLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;

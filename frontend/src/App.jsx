import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <div className='app'>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <CartDrawer />
          </div>
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;

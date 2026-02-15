import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [restaurant, setRestaurant] = useState(null); // To track which restaurant the items are from

    // Load from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        const storedRestaurant = localStorage.getItem('cartRestaurant');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
        if (storedRestaurant) {
            setRestaurant(JSON.parse(storedRestaurant));
        }
    }, []);

    // Save to localStorage whenever cartItems or restaurant changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        if (restaurant) {
            localStorage.setItem('cartRestaurant', JSON.stringify(restaurant));
        } else {
            localStorage.removeItem('cartRestaurant');
        }
    }, [cartItems, restaurant]);

    const addToCart = (item, currentRestaurant) => {
        // Check if adding from a different restaurant
        if (restaurant && restaurant.id !== currentRestaurant.id && cartItems.length > 0) {
            if (!window.confirm("Start a new basket? Each order can only be from one restaurant.")) return;
            // Clear restaurant cart
            setCartItems([]);
            setRestaurant(null);
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartRestaurant');
        }

        setRestaurant(currentRestaurant);

        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const incrementItem = (itemId) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decrementItem = (itemId) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === itemId);
            if (existingItem?.quantity === 1) {
                const newItems = prevItems.filter(i => i.id !== itemId);
                if (newItems.length === 0) setRestaurant(null);
                return newItems;
            }
            return prevItems.map(i =>
                i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            );
        });
    };

    const removeFromCart = (itemId) => decrementItem(itemId); // Alias for backward compatibility if needed, or just replace usages.

    const clearCart = () => {
        setCartItems([]);
        setRestaurant(null);
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartRestaurant');
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    // Restaurant Calculations
    // Restaurant Calculations
    const itemTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Dynamic Delivery Fee based on Menu.jsx calculation (restaurant.distance)
    // If restaurant object has distance, use it: 5 Rs/km with min 20, max capped at 100 for sanity
    // Fallback to old logic if no restaurant/distance
    let dynamicDeliveryFee = 40;
    if (restaurant && restaurant.distance !== undefined) {
        dynamicDeliveryFee = Math.round(Math.max(20, restaurant.distance * 5));
    }

    // Free delivery check
    const deliveryFee = itemTotal > 500 ? 0 : dynamicDeliveryFee;

    const platformFee = itemTotal > 0 ? 5 : 0;
    const gst = itemTotal > 0 ? Math.round(itemTotal * 0.05) : 0;
    const grandTotal = itemTotal + deliveryFee + platformFee + gst;

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            restaurant,
            addToCart,
            removeFromCart,
            incrementItem,
            decrementItem,
            clearCart,
            toggleCart,
            setIsCartOpen,
            itemTotal,
            deliveryFee,
            platformFee,
            gst,
            grandTotal,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

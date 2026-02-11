import React from 'react';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

const QuantityControl = ({ item, restaurant }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();

    // Check if item is in cart
    const cartItem = cartItems.find(i => i.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(item, restaurant);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        removeFromCart(item.id);
    };

    if (quantity === 0) {
        return (
            <button
                onClick={handleAdd}
                className="bg-white text-green-600 font-bold py-2 px-6 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-all uppercase text-sm"
            >
                Add
            </button>
        );
    }

    return (
        <div className="flex items-center bg-green-50 rounded-md border border-green-200 overflow-hidden shadow-sm">
            <button
                onClick={handleRemove}
                className="p-2 text-green-700 hover:bg-green-100 transition-colors"
                aria-label="Decrease quantity"
            >
                <Minus size={14} strokeWidth={3} />
            </button>
            <span className="font-bold text-green-700 w-6 text-center text-sm">{quantity}</span>
            <button
                onClick={handleAdd}
                className="p-2 text-green-700 hover:bg-green-100 transition-colors"
                aria-label="Increase quantity"
            >
                <Plus size={14} strokeWidth={3} />
            </button>
        </div>
    );
};

export default QuantityControl;

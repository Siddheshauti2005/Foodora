import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuantityControl from './QuantityControl';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const {
        isCartOpen,
        toggleCart,
        cartItems,
        restaurant,
        itemTotal,
        deliveryFee,
        platformFee,
        gst,
        grandTotal
    } = useCart();

    const variants = {
        open: { x: 0 },
        closed: { x: '100%' },
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={variants}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-50 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-white p-4 flex items-center justify-between shadow-sm">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingBag size={20} />
                                Cart
                                {restaurant && <span className="text-sm font-normal text-gray-500">from {restaurant.name}</span>}
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-32 opacity-50" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Your cart is empty</h3>
                                    <p className="text-gray-500">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
                                    <Link
                                        to="/menu"
                                        onClick={toggleCart}
                                        className="bg-orange-600 text-white px-6 py-3 rounded-md font-bold text-sm uppercase shadow-md hover:bg-orange-700 transition-colors mt-4"
                                    >
                                        See Restaurants Near You
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Items List */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                                                        <p className="text-sm text-gray-500">₹{item.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <QuantityControl item={item} restaurant={restaurant} />
                                                    <span className="text-sm font-medium w-12 text-right">₹{item.price * item.quantity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Suggestions (Mock) */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-bold text-sm mb-3">Complete your meal</h3>
                                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                            {/* Mock Suggestion Item */}
                                            <div className="min-w-[120px] border border-gray-200 rounded-lg p-2 flex flex-col items-center">
                                                <div className="w-full h-20 bg-gray-100 rounded mb-2 overflow-hidden">
                                                    <img src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=60" alt="Coke" className="w-full h-full object-cover" />
                                                </div>
                                                <p className="text-xs font-medium truncate w-full text-center">Coke (300ml)</p>
                                                <div className="flex justify-between items-center w-full mt-2">
                                                    <span className="text-xs">₹40</span>
                                                    <button className="text-xs text-green-600 uppercase font-bold border border-green-200 px-2 py-1 rounded hover:bg-green-50">Add</button>
                                                </div>
                                            </div>
                                            <div className="min-w-[120px] border border-gray-200 rounded-lg p-2 flex flex-col items-center">
                                                <div className="w-full h-20 bg-gray-100 rounded mb-2 overflow-hidden">
                                                    <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&auto=format&fit=crop&q=60" alt="Ice Cream" className="w-full h-full object-cover" />
                                                </div>
                                                <p className="text-xs font-medium truncate w-full text-center">Vanilla Scoop</p>
                                                <div className="flex justify-between items-center w-full mt-2">
                                                    <span className="text-xs">₹60</span>
                                                    <button className="text-xs text-green-600 uppercase font-bold border border-green-200 px-2 py-1 rounded hover:bg-green-50">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bill Details */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-bold text-sm mb-4">Bill Details</h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Item Total</span>
                                                <span>₹{itemTotal}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="border-b border-dashed border-gray-400">Delivery Fee | {restaurant?.location}</span>
                                                <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="border-b border-dashed border-gray-400">Platform Fee</span>
                                                <span>₹{platformFee}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="border-b border-dashed border-gray-400">GST and Restaurant Charges</span>
                                                <span>₹{gst}</span>
                                            </div>
                                            <div className="h-px bg-gray-200 my-2"></div>
                                            <div className="flex justify-between text-base font-bold text-gray-900">
                                                <span>TO PAY</span>
                                                <span>₹{grandTotal}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Policy Text */}
                                    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Review your order and address details to avoid cancellations.
                                            <span className="text-red-500 font-medium ml-1">Note:</span>
                                            Orders once placed cannot be cancelled and are non-refundable.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Action */}
                        {cartItems.length > 0 && (
                            <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-between transition-colors shadow-lg">
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="text-sm">₹{grandTotal}</span>
                                        <span className="text-xs opacity-90 font-medium">TOTAL</span>
                                    </div>
                                    <span className="flex items-center gap-2 text-lg">
                                        Proceed to Pay
                                        <ArrowRight size={20} />
                                    </span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

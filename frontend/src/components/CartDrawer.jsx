import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, ArrowRight, Truck, TicketPercent, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const {
        isCartOpen,
        toggleCart,
        cartItems,
        restaurant,
        itemTotal,
        deliveryFee,
        grandTotal,
        incrementItem,
        decrementItem,
        clearCart
    } = useCart();

    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = React.useState(false);

    const handleCheckout = () => {
        // Create Order Object
        const newOrder = {
            id: Date.now(), // timestamp as ID
            items: cartItems,
            total: grandTotal,
            date: new Date().toLocaleString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            }),
            restaurant: restaurant,
            status: 'Delivered'
        };

        // Save to LocalStorage
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

        // Clear Cart Immediately
        clearCart();

        // Show Success UI
        setShowSuccess(true);

        // Force Redirect after 2 seconds
        setTimeout(() => {
            setShowSuccess(false);
            toggleCart();
            // Force reload/navigation to ensure state is fresh
            window.location.href = '/orders';
        }, 2000);
    };

    // Drawer Slide Animation
    const drawerVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '100%', opacity: 0 },
    };

    const hasRestaurantItems = cartItems && cartItems.length > 0;
    const isEmpty = !hasRestaurantItems;

    // Free Delivery Logic
    const freeDeliveryThreshold = 500;
    const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - itemTotal);
    const progressPercentage = Math.min(100, (itemTotal / freeDeliveryThreshold) * 100);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Glassmorphism Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />

                    {/* Premium Drawer */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={drawerVariants}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white/90 backdrop-blur-xl z-[70] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col border-l border-white/50"
                    >
                        {/* 1. Header */}
                        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white/50">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Your Cart</h2>
                                {restaurant && (
                                    <p className="text-sm text-gray-500 font-medium">From <span className="text-emerald-600">{restaurant.name}</span></p>
                                )}
                            </div>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* 2. Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {isEmpty ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                                            alt="Empty Cart"
                                            className="w-32 h-32 opacity-50 grayscale"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your cart is lonely</h3>
                                        <p className="text-gray-500 max-w-xs mx-auto">Add some delicious items to cheer it up!</p>
                                    </div>
                                    <button
                                        onClick={() => { toggleCart(); navigate('/menu'); }}
                                        className="bg-emerald-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-600 transition-all hover:shadow-emerald-500/30 ring-4 ring-emerald-500/20"
                                    >
                                        Start Ordering
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Free Delivery Bar */}
                                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="bg-white p-1.5 rounded-full shadow-sm text-emerald-600">
                                                <Truck size={18} />
                                            </div>
                                            <p className="text-sm font-bold text-gray-700">
                                                {amountToFreeDelivery > 0
                                                    ? <span>Add <span className="text-emerald-600">₹{amountToFreeDelivery}</span> for Free Delivery</span>
                                                    : <span className="text-emerald-600">Free Delivery Unlocked! 🎉</span>
                                                }
                                            </p>
                                        </div>
                                        <div className="h-2 bg-emerald-200/50 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-emerald-500 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercentage}%` }}
                                                transition={{ duration: 0.5 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                layout
                                                key={item.id}
                                                className="group bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow relative overflow-hidden"
                                            >
                                                {/* Item Image */}
                                                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/5"></div>
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'} shrink-0`}>
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                                                </div>
                                                                <span className="font-bold text-gray-800 text-sm md:text-base line-clamp-1">{item.name}</span>
                                                            </div>
                                                            <p className="text-gray-500 text-xs font-medium">₹{item.price}</p>
                                                        </div>
                                                        <div className="text-sm font-bold text-gray-800">₹{item.price * item.quantity}</div>
                                                    </div>

                                                    {/* Custom Stepper */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                                                            <button
                                                                onClick={() => decrementItem(item.id)}
                                                                className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-gray-600 shadow-sm hover:text-red-500 transition-colors"
                                                            >
                                                                {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                                                            <button
                                                                onClick={() => incrementItem(item.id)}
                                                                className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-emerald-600 shadow-sm hover:bg-emerald-50 transition-colors"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Offers Snippet */}
                                    <div className="border border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 text-blue-600 p-2 rounded-full">
                                                <TicketPercent size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">Apply Coupon</p>
                                                <p className="text-xs text-blue-500 font-medium">Save more on this order</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={16} className="text-gray-400" />
                                    </div>

                                    {/* Bill Details */}
                                    <div className="space-y-3 pt-2">
                                        <h4 className="font-bold text-gray-800 text-sm">Bill Details</h4>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-medium">₹{itemTotal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span className="flex items-center gap-1">Delivery Fee <span className="text-xs bg-gray-100 px-1 rounded text-gray-400">?</span></span>
                                            <span className="font-medium text-emerald-600">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-3">
                                            <span>Taxes & Charges</span>
                                            <span className="font-medium">₹{Math.round(itemTotal * 0.05) + 5}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* 3. Footer */}
                        {!isEmpty && (
                            <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Grand Total</p>
                                        <p className="text-2xl font-black text-gray-900 leading-none">₹{grandTotal}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/30 flex items-center justify-between px-6 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span>Proceed to Pay</span>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <ArrowRight size={20} className="text-white" />
                                    </div>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
            {/* Success Modal Overlay */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl"
                    >
                        {/* Custom Animated Checkmark */}
                        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-20 h-20 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
                        <p className="text-gray-500 mb-6">Redirecting you to order history...</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

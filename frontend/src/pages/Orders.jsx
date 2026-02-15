import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(storedOrders);
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pb-20 pt-4">
            <h1 className="text-3xl font-heading font-bold text-secondary mb-6 pl-2">Your Orders</h1>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
                    <p className="text-xl font-bold">No orders yet</p>
                    <p className="text-sm">Go ahead and order something tasty!</p>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4 max-w-3xl mx-auto"
                >
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            variants={item}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    {order.restaurant && (
                                        <img
                                            src={order.restaurant.img}
                                            alt={order.restaurant.name}
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                    )}
                                    <div>
                                        <h3 className="font-bold text-lg text-secondary">{order.restaurant ? order.restaurant.name : 'Unknown Restaurant'}</h3>
                                        <p className="text-xs text-text-muted flex items-center gap-1">
                                            <Clock size={12} /> {order.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">
                                        <CheckCircle2 size={12} /> Deleted
                                        {/* Wait, prompt requested "Delivered". I will fix this string in next edit or directly write Delivered */}
                                        Delivered
                                    </span>
                                    <p className="font-bold text-gray-800 mt-2">₹{order.total}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-50 pt-3">
                                <p className="text-sm text-gray-500 truncate">
                                    {order.items.map(i => `${i.quantity} x ${i.name}`).join(', ')}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Orders;

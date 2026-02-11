import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const Toast = ({ message, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-24 right-4 z-50 animate-fade-in-down">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 min-w-[300px]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium text-sm flex-1">{message}</p>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;

import React from 'react';
import { User, Mail, MapPin, Edit2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    // Hardcoded User Info as per request
    const user = {
        name: "Siddhesh Auti",
        email: "autisiddhesh4@gmail.com",
        phone: "+91 98765 43210"
    };

    const savedAddresses = [
        { type: "Home", text: "Flat 402, Green Valley, Panch Pakadi, Thane West" },
        { type: "Work", text: "Tech Park, Airoli, Navi Mumbai" }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen pb-20 pt-4 max-w-2xl mx-auto"
        >
            <h1 className="text-3xl font-heading font-bold text-secondary mb-8 pl-2">My Profile</h1>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary/20 to-emerald-100"></div>

                <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 pt-10">
                    <div className="w-24 h-24 bg-white p-1 rounded-full shadow-lg">
                        <div className="w-full h-full bg-gradient-to-tr from-primary to-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {user.name[0]}
                        </div>
                    </div>
                    <div className="text-center md:text-left flex-1 mb-2">
                        <h2 className="text-2xl font-bold text-secondary">{user.name}</h2>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm mt-1">
                            <Mail size={14} /> {user.email}
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all">
                        <Edit2 size={14} /> Edit Profile
                    </button>
                </div>
            </div>

            {/* Saved Addresses */}
            <h3 className="text-xl font-bold text-secondary mb-4 pl-2">Saved Addresses</h3>
            <div className="grid gap-4 mb-8">
                {savedAddresses.map((addr, index) => (
                    <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="bg-gray-50 p-2.5 rounded-full text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-secondary text-sm uppercase tracking-wide mb-1">{addr.type}</p>
                            <p className="text-gray-500 text-sm">{addr.text}</p>
                        </div>
                    </div>
                ))}
            </div>

        </motion.div>
    );
};

export default Profile;

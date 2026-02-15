import { useState, useEffect } from 'react';
import { MENU_DATA } from '../utils/menuData';

const useRestaurantMenu = (resId) => {
    const [restaurant, setRestaurant] = useState(null);
    const [menuCategories, setMenuCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true);

            // Simulate API Network Delay
            await new Promise(resolve => setTimeout(resolve, 600));

            const id = String(resId);
            const data = MENU_DATA[id];

            if (data) {
                setRestaurant(data.restaurant);
                setMenuCategories(data.menuCategories);
            } else {
                setRestaurant(null);
                setMenuCategories([]);
            }

            setLoading(false);
        };

        if (resId) {
            fetchMenu();
        }
    }, [resId]);

    return { restaurant, menuCategories, loading };
};

export default useRestaurantMenu;

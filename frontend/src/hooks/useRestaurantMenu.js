import { useState, useEffect } from 'react';

const useRestaurantMenu = (resId) => {
    const [restaurant, setRestaurant] = useState(null);
    const [menuCategories, setMenuCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            // Mock Data Logic based on ID
            const id = String(resId);

            const mockRestaurant = {
                id: parseInt(id),
                name: id === '1' ? 'Pizza Hut' : (id === '2' ? 'Chinese Wok' : 'Gourmet Kitchen'),
                rating: 4.2,
                ratingCount: '1K+',
                time: '30-35 mins',
                location: 'Kalyan',
                cuisines: 'Pizzas, Fast Food',
                fee: 40
            };

            const mockMenu = [
                {
                    title: 'Recommended',
                    items: [
                        { id: 101, name: 'Margherita Pizza', price: 249, description: 'Classic cheese pizza with basil', isVeg: true, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&auto=format&fit=crop&q=60' },
                        { id: 102, name: 'Pepperoni Pizza', price: 349, description: 'Spicy pepperoni with extra cheese', isVeg: false, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&auto=format&fit=crop&q=60' },
                        { id: 103, name: 'Garlic Bread', price: 129, description: 'Buttery garlic bread sticks', isVeg: true, img: 'https://images.unsplash.com/photo-1573140247632-f84660f67627?w=200&auto=format&fit=crop&q=60' },
                    ]
                },
                {
                    title: 'Pastas',
                    items: [
                        { id: 201, name: 'White Sauce Pasta', price: 289, description: 'Creamy alfredo sauce with mushrooms', isVeg: true, img: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=200&auto=format&fit=crop&q=60' },
                        { id: 202, name: 'Chicken Arrabbiata', price: 319, description: 'Spicy tomato sauce with grilled chicken', isVeg: false, img: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=200&auto=format&fit=crop&q=60' },
                    ]
                },
                {
                    title: 'Beverages',
                    items: [
                        { id: 301, name: 'Coke (300ml)', price: 40, description: 'Chilled soft drink', isVeg: true, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=60' },
                        { id: 302, name: 'Cold Coffee', price: 149, description: 'Class cold coffee with ice cream', isVeg: true, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&auto=format&fit=crop&q=60' },
                    ]
                }
            ];

            setRestaurant(mockRestaurant);
            setMenuCategories(mockMenu);
            setLoading(false);
        };

        fetchMenu();
    }, [resId]);

    return { restaurant, menuCategories, loading };
};

export default useRestaurantMenu;

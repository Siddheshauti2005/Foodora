export const MENU_DATA = {
    // 1: Pizza Hut (Deep Dish, Indian Toppings, Garlic Bread)
    '1': {
        restaurant: {
            id: 1,
            name: 'Pizza Hut',
            rating: 4.1,
            ratingCount: '5K+',
            time: '30-35 mins',
            location: 'Kalyan',
            cuisines: 'Pizzas, Pastas, Fast Food',
            fee: 40,
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80'
        },
        menuCategories: [
            {
                title: 'Pizzas',
                items: [
                    { id: 101, name: 'Margherita Pizza', price: 249, description: 'Classic cheese pizza with basil and Indian spices', isVeg: true, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80' },
                    { id: 102, name: 'Tandoori Paneer Pizza', price: 349, description: 'Spiced tandoori paneer chunks with onion and capsicum', isVeg: true, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80' },
                    { id: 103, name: 'Veggie Supreme', price: 299, description: 'Loaded with bell peppers, onions, olives and corn', isVeg: true, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80' },
                    { id: 104, name: 'Chicken Tikka Pizza', price: 399, description: 'Indian fusion pizza with tandoori chicken tikka', isVeg: false, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Garlic Bread',
                items: [
                    { id: 105, name: 'Garlic Bread Stix', price: 129, description: 'Freshly baked buttery garlic bread sticks', isVeg: true, img: 'https://images.unsplash.com/photo-1573140247632-f84660f67126?auto=format&fit=crop&w=500&q=60' },
                    { id: 106, name: 'Cheese Garlic Bread', price: 159, description: 'Garlic bread topped with melted mozzarella cheese', isVeg: true, img: 'https://images.unsplash.com/photo-1619531040576-f3eebc38d3ca?auto=format&fit=crop&w=500&q=60' }
                ]
            },
            {
                title: 'Pastas',
                items: [
                    { id: 107, name: 'Creamy Alfredo Pasta', price: 289, description: 'White sauce pasta with mushrooms and herbs', isVeg: true, img: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=500&auto=format&fit=crop&q=80' },
                    { id: 108, name: 'Spicy Arrabbiata Pasta', price: 269, description: 'Red sauce pasta with chili flakes and garlic', isVeg: true, img: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=500&auto=format&fit=crop&q=80' }
                ]
            }
        ]
    },

    // 2: Chinese Wok (Desi-Chinese, Schezwan, Manchurian)
    '2': {
        restaurant: {
            id: 2,
            name: 'Chinese Wok',
            rating: 4.3,
            ratingCount: '1K+',
            time: '45-50 mins',
            location: 'Dombivli',
            cuisines: 'Chinese, Asian, Tibetan',
            fee: 35,
            img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80'
        },
        menuCategories: [
            {
                title: 'Noodles',
                items: [
                    { id: 201, name: 'Veg Hakka Noodles', price: 199, description: 'Stir-fried noodles with fresh vegetables', isVeg: true, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80' },
                    { id: 202, name: 'Schezwan Chicken Noodles', price: 249, description: 'Spicy noodles tossed with chicken and schezwan sauce', isVeg: false, img: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Rice & Gravy',
                items: [
                    { id: 203, name: 'Veg Fried Rice', price: 189, description: 'Classic fried rice with aromatic spices', isVeg: true, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=60' },
                    { id: 204, name: 'Manchurian Gravy', price: 229, description: 'Veg balls in spicy soya garlic sauce', isVeg: true, img: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=500&q=60' }
                ]
            },
            {
                title: 'Dimsums & Momos',
                items: [
                    { id: 205, name: 'Veg Steamed Momos', price: 149, description: 'Steamed dumplings filled with minced veggies', isVeg: true, img: 'https://images.unsplash.com/photo-1625220195679-51340428d587?auto=format&fit=crop&w=500&q=60' },
                    { id: 206, name: 'Chicken Fried Momos', price: 179, description: 'Crispy fried dumplings with chicken filling', isVeg: false, img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&auto=format&fit=crop&q=80' }
                ]
            }
        ]
    },

    // 3: Burger King (Veg Whopper, Thick Burgers, Fries)
    '3': {
        restaurant: {
            id: 3,
            name: 'Burger King',
            rating: 4.2,
            ratingCount: '10K+',
            time: '25-30 mins',
            location: 'Thane',
            cuisines: 'Burgers, American',
            fee: 30,
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80'
        },
        menuCategories: [
            {
                title: 'Whoppers & Burgers',
                items: [
                    { id: 301, name: 'Veg Whopper', price: 169, description: 'Signature flame-grilled veg patty burger', isVeg: true, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80' },
                    { id: 302, name: 'Paneer King Burger', price: 189, description: 'Thick paneer patty with spicy mayo', isVeg: true, img: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&auto=format&fit=crop&q=80' },
                    { id: 303, name: 'Chicken Whopper', price: 199, description: 'Flame-grilled chicken patty with fresh veggies', isVeg: false, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Sides',
                items: [
                    { id: 304, name: 'Cheesy Fries', price: 119, description: 'Golden fries topped with liquid cheese', isVeg: true, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&auto=format&fit=crop&q=80' },
                    { id: 305, name: 'Chicken Nuggets (6 pcs)', price: 139, description: 'Golden fried crispy chicken nuggets', isVeg: false, img: 'https://images.unsplash.com/photo-1562967960-f55430ae51e8?auto=format&fit=crop&w=500&q=60' }
                ]
            },
            {
                title: 'Drinks',
                items: [
                    { id: 306, name: 'Chocolate Shake', price: 149, description: 'Thick and creamy chocolate milkshake', isVeg: true, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop&q=80' }
                ]
            }
        ]
    },

    // 4: KFC (Golden Brown Buckets, Zingers)
    '4': {
        restaurant: {
            id: 4,
            name: 'KFC',
            rating: 4.0,
            ratingCount: '8K+',
            time: '20-25 mins',
            location: 'Kalyan',
            cuisines: 'Burgers, Fried Chicken, American',
            fee: 45,
            img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80'
        },
        menuCategories: [
            {
                title: 'Fried Chicken Buckets',
                items: [
                    { id: 401, name: 'Hot & Crispy Bucket (8pc)', price: 699, description: '8 pieces of signature hot & crispy chicken', isVeg: false, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=80' },
                    { id: 402, name: 'Smoky Grilled Bucket (6pc)', price: 549, description: '6 pieces of smoky grilled chicken', isVeg: false, img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Burgers',
                items: [
                    { id: 403, name: 'Chicken Zinger Burger', price: 179, description: 'Classic chicken zinger burger with mayo', isVeg: false, img: 'https://images.unsplash.com/photo-1615297928064-24977384d0f9?auto=format&fit=crop&w=500&q=60' },
                    { id: 404, name: 'Veg Zinger Burger', price: 159, description: 'Crispy veg patty zinger burger', isVeg: true, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=60' }
                ]
            },
            {
                title: 'Snacks',
                items: [
                    { id: 405, name: 'Popcorn Chicken', price: 219, description: 'Bite-sized crunchy chicken popcorn', isVeg: false, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60' },
                    { id: 406, name: 'Large Peri Peri Fries', price: 119, description: 'Crispy golden fries with peri peri spice', isVeg: true, img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&auto=format&fit=crop&q=80' }
                ]
            }
        ]
    },

    // 5: McDonald's (McChicken, McAloo, Maharaja Mac)
    '5': {
        restaurant: {
            id: 5,
            name: 'McDonald\'s',
            rating: 4.4,
            ratingCount: '12K+',
            time: '25-30 mins',
            location: 'Bhiwandi',
            cuisines: 'Burgers, Beverages',
            fee: 25,
            img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80'
        },
        menuCategories: [
            {
                title: 'Burgers',
                items: [
                    { id: 501, name: 'McChicken Burger', price: 129, description: 'Classic chicken patty with lettuce and mayo', isVeg: false, img: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&auto=format&fit=crop&q=80' },
                    { id: 502, name: 'McAloo Tikki Burger', price: 59, description: 'Crispy potato patty with special sauce', isVeg: true, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80' },
                    { id: 503, name: 'Maharaja Mac Chicken', price: 219, description: 'Double decker huge burger', isVeg: false, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Sides',
                items: [
                    { id: 504, name: 'Large Piri Piri Fries', price: 109, description: 'World famous crispy fries with spice mix', isVeg: true, img: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500&auto=format&fit=crop&q=80' },
                    { id: 505, name: 'Chicken McNuggets (6pc)', price: 149, description: 'Tempura coated chicken bits', isVeg: false, img: 'https://images.unsplash.com/photo-1562967960-f55430ae51e8?auto=format&fit=crop&w=500&q=60' }
                ]
            }
        ]
    },

    // 6: Domino's Pizza (Updated with Authentic Indian Items)
    '6': {
        restaurant: {
            id: 6,
            name: 'Domino\'s Pizza',
            rating: 4.5,
            ratingCount: '15K+',
            time: '30 mins',
            location: 'Thane',
            cuisines: 'Pizzas, Italian',
            fee: 30,
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80'
        },
        menuCategories: [
            {
                title: 'Best Sellers',
                items: [
                    { id: 601, name: 'Margherita Pizza', price: 239, description: 'Classic cheese pizza with 100% real mozzarella cheese.', isVeg: true, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80' },
                    { id: 602, name: 'Peppy Paneer Pizza', price: 459, description: 'Flavorful trio of juicy paneer, crisp capsicum & spicy red pepper.', isVeg: true, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60' },
                    { id: 603, name: 'Veg Extravaganza', price: 549, description: 'A pizza that decidedly staggers under an overload of golden corn, exotic black olives, crunchy onions, crisp capsicum & tomatoes.', isVeg: true, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Non-Veg Pizzas',
                items: [
                    { id: 604, name: 'Pepperoni Pizza', price: 549, description: 'American classic pepperoni with extra cheese.', isVeg: false, img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=80' },
                    { id: 605, name: 'Chicken Dominator', price: 619, description: 'Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rasher.', isVeg: false, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80' }
                ]
            },
            {
                title: 'Sides & Desserts',
                items: [
                    { id: 606, name: 'Stuffed Garlic Bread', price: 159, description: 'Freshly baked garlic bread stuffed with mozzarella cheese, sweet corn & jalapenos.', isVeg: true, img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=60' },
                    { id: 607, name: 'Choco Lava Cake', price: 119, description: 'Molten chocolate cake with gooey center.', isVeg: true, img: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=500&q=60' }
                ]
            }
        ]
    }
};

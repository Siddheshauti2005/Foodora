export const GROCERY_DATA = {
    categories: [
        { id: 'c1', name: 'Fresh Vegetables', icon: 'Carrot' },
        { id: 'c2', name: 'Dairy & Eggs', icon: 'Milk' },
        { id: 'c3', name: 'Snacks', icon: 'Cookie' },
        { id: 'c4', name: 'Cleaning Essentials', icon: 'Spray' },
        { id: 'c5', name: 'Personal Care', icon: 'Smile' },
    ],
    banners: [
        { id: 'b1', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', title: 'Fresh Veggies', subtitle: 'Flat 50% off on your first order' },
        { id: 'b2', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80', title: 'Daily Essentials', subtitle: 'Fast delivery in 10 mins' },
    ],
    flashSales: [
        {
            id: 'f1',
            name: 'Farm Fresh Tomatoes',
            weight: '1 kg',
            price: 25,
            originalPrice: 40,
            img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=60'
        },
        {
            id: 'f2',
            name: 'Amul Butter',
            weight: '100g',
            price: 52,
            originalPrice: 58,
            img: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=200&q=60'
        },
        {
            id: 'f3',
            name: 'Coke Zero',
            weight: '300ml',
            price: 35,
            originalPrice: 40,
            img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=200&q=60'
        },
    ],
    products: {
        'Fresh Vegetables': [
            { id: 'p1', name: 'Onion', weight: '1 kg', price: 30, originalPrice: 45, img: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=200&q=60' },
            { id: 'p2', name: 'Potato', weight: '1 kg', price: 25, originalPrice: 35, img: 'https://images.unsplash.com/photo-1518977676605-dc5641708756?auto=format&fit=crop&w=200&q=60' },
            { id: 'p3', name: 'Capsicum', weight: '500g', price: 40, originalPrice: 60, img: 'https://images.unsplash.com/photo-1563565375-f3fdf5ecc269?auto=format&fit=crop&w=200&q=60' },
        ],
        'Dairy & Eggs': [
            { id: 'p4', name: 'Milk', weight: '500ml', price: 32, originalPrice: 35, img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=200&q=60' },
            { id: 'p5', name: 'Eggs (6 pcs)', weight: '6 pcs', price: 55, originalPrice: 65, img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=200&q=60' },
        ],
        'Snacks': [
            { id: 'p6', name: 'Lays Chips', weight: '50g', price: 20, originalPrice: 20, img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=200&q=60' },
            { id: 'p7', name: 'Oreo Biscuits', weight: '120g', price: 30, originalPrice: 35, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=200&q=60' },
        ],
        'Cleaning Essentials': [
            { id: 'p8', name: 'Dish Soap', weight: '500ml', price: 85, originalPrice: 99, img: 'https://images.unsplash.com/photo-1585837575652-2c96441a7c0c?auto=format&fit=crop&w=200&q=60' },
        ],
        'Personal Care': [
            { id: 'p9', name: 'Hand Wash', weight: '200ml', price: 99, originalPrice: 120, img: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&w=200&q=60' },
        ]
    }
};

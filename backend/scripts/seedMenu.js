import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem.js';
import connectDB from '../config/db.js';

dotenv.config();

// Sample menu data from your frontend
const menuData = [
    // Appetizers
    {
        name: 'Burrata & Heirloom Tomatoes',
        description: 'Fresh burrata cheese with seasonal heirloom tomatoes, basil oil, and aged balsamic',
        price: 18,
        category: 'appetizers',
        dietary: ['vegetarian'],
        rating: 4.8,
        isAvailable: true,
    },
    {
        name: 'Foie Gras Torchon',
        description: 'Terrine of foie gras with Sauternes gelée and brioche',
        price: 22,
        category: 'appetizers',
        rating: 4.9,
        isAvailable: true,
    },
    {
        name: 'Carpaccio di Beef',
        description: 'Thinly sliced raw beef with caper berries, shaved Parmigiano-Reggiano, and truffle oil',
        price: 20,
        category: 'appetizers',
        rating: 4.7,
        isAvailable: true,
    },

    // Mains
    {
        name: 'Risotto al Tartufo',
        description: 'Creamy Arborio risotto with black truffle, Parmigiano-Reggiano, and butter',
        price: 42,
        category: 'mains',
        dietary: ['vegetarian'],
        rating: 4.9,
        isPopular: true,
        isAvailable: true,
    },
    {
        name: 'Coq au Vin',
        description: 'Classic French chicken braised in Burgundy wine, mushrooms, and pearl onions',
        price: 38,
        category: 'mains',
        rating: 4.8,
        isPopular: true,
        isAvailable: true,
    },
    {
        name: 'Ossobuco Milanese',
        description: 'Braised veal shanks with gremolata and saffron risotto',
        price: 45,
        category: 'mains',
        rating: 5.0,
        isPopular: true,
        isAvailable: true,
    },
    {
        name: 'Dover Sole Meunière',
        description: 'Whole Dover sole pan-fried and finished with brown butter and lemon',
        price: 48,
        category: 'mains',
        rating: 4.9,
        isAvailable: true,
    },
    {
        name: 'Spaghetti alla Carbonara',
        description: 'Authentic Roman pasta with Guanciale, egg yolk, and Pecorino Romano',
        price: 28,
        category: 'mains',
        rating: 4.7,
        isAvailable: true,
    },

    // Desserts
    {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with mascarpone, espresso, and cocoa',
        price: 12,
        category: 'desserts',
        dietary: ['vegetarian'],
        rating: 4.8,
        isAvailable: true,
    },
    {
        name: 'Chocolate Soufflé',
        description: 'Dark chocolate soufflé with Grand Marnier sauce',
        price: 14,
        category: 'desserts',
        dietary: ['vegetarian'],
        rating: 4.9,
        isAvailable: true,
    },
    {
        name: 'Panna Cotta',
        description: 'Silky panna cotta with fresh berries and berry coulis',
        price: 11,
        category: 'desserts',
        dietary: ['vegetarian'],
        rating: 4.6,
        isAvailable: true,
    },
];

const seedMenu = async () => {
    try {
        await connectDB();

        // Clear existing menu items
        await MenuItem.deleteMany();
        console.log('🗑️  Cleared existing menu items');

        // Insert new menu items
        const items = await MenuItem.insertMany(menuData);
        console.log(`✅ Seeded ${items.length} menu items`);

        console.log('\n📊 Menu Summary:');
        const categories = await MenuItem.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);
        categories.forEach((cat) => {
            console.log(`   ${cat._id}: ${cat.count} items`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding menu:', error);
        process.exit(1);
    }
};

seedMenu();

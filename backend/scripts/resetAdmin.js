import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const resetAdmin = async () => {
    try {
        await connectDB();

        const email = 'admin@bistro.com';

        // Delete existing admin
        await User.deleteOne({ email });
        console.log('🗑️  Existing admin deleted');

        // Create new admin
        const user = await User.create({
            name: 'Admin User',
            email: email,
            password: 'admin123',
            role: 'admin',
            phone: '1234567890'
        });

        console.log('✅ Admin user reset successfully');
        console.log(`📧 Email: ${user.email}`);
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

resetAdmin();

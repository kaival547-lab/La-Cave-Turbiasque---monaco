import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config({ path: './.env' });

const seedAdmin = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@bistro.com' });
        if (adminExists) {
            console.log('⚠️ Admin user already exists');
            process.exit();
        }

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            name: 'Admin User',
            email: 'admin@bistro.com',
            password: hashedPassword,
            role: 'admin',
            phone: '1234567890'
        });

        await adminUser.save();
        console.log('✅ Admin user created successfully');
        console.log('📧 Email: admin@bistro.com');
        console.log('🔑 Password: admin123');

        process.exit();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedAdmin();

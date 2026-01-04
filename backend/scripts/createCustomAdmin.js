import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config({ path: './.env' });

const createCustomAdmin = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const email = 'kaival547@gmail.com';
        const password = 'kaival@547';

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            console.log(`⚠️ User with email ${email} already exists. Updating to admin role and updating password.`);
            const salt = await bcrypt.genSalt(10);
            user.password = 'kaival@547'; // Password hashing is handled by User model pre-save hook
            user.role = 'admin';
            await user.save();
        } else {
            // Create admin user
            user = new User({
                name: 'Kaival Admin',
                email: email,
                password: password, // Password hashing is handled by User model pre-save hook
                role: 'admin',
                phone: '0000000000'
            });
            await user.save();
        }

        console.log('✅ Admin user created/updated successfully');
        console.log(`📧 Email: ${email}`);
        console.log(`🔑 Password: ${password}`);

        process.exit();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createCustomAdmin();

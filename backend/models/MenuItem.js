import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'appetizers',
            'soups',
            'mains',
            'sides',
            'desserts',
            'wines'
        ]
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    dietary: {
        type: [String],
        enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating can not be more than 5'],
        default: 0
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
MenuItemSchema.index({ category: 1 });
MenuItemSchema.index({ isPopular: 1 });

export default mongoose.model('MenuItem', MenuItemSchema);

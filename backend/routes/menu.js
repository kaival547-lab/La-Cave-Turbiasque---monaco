import express from 'express';
import {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getPopularItems,
    getMenuByCategory
} from '../controllers/menuController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getMenuItems);
router.get('/popular/items', getPopularItems);
router.get('/category/:category', getMenuByCategory);
router.get('/:id', getMenuItem);

// Admin routes
router.post('/', protect, admin, createMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

export default router;

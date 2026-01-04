import express from 'express';
import { check } from 'express-validator';
import {
    getReviews,
    getAllReviewsAdmin,
    createReview,
    updateReviewStatus,
    deleteReview
} from '../controllers/reviewController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getReviews);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
    check('comment', 'Comment is required').not().isEmpty()
], createReview);

// Admin routes
router.get('/admin', protect, admin, getAllReviewsAdmin);
router.put('/:id', protect, admin, updateReviewStatus);
router.delete('/:id', protect, admin, deleteReview);

export default router;

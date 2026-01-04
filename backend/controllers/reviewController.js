import Review from '../models/Review.js';
import { validationResult } from 'express-validator';

// @desc    Get all reviews (public approved only)
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get all reviews (admin only - including pending)
// @route   GET /api/reviews/admin
// @access  Private (Admin)
export const getAllReviewsAdmin = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Public
export const createReview = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const review = await Review.create(req.body);

        res.status(201).json({
            success: true,
            data: review,
            message: 'Review submitted successfully and is pending approval'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Update review status (approve/reject)
// @route   PUT /api/reviews/:id
// @access  Private (Admin)
export const updateReviewStatus = async (req, res) => {
    try {
        const { isApproved } = req.body;

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            {
                isApproved,
                approvedBy: req.user.id,
                approvedAt: isApproved ? Date.now() : null
            },
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        res.status(200).json({
            success: true,
            data: review,
            message: `Review ${isApproved ? 'approved' : 'rejected'}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            data: {},
            message: 'Review deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

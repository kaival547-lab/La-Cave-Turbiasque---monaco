import express from 'express';
import { check } from 'express-validator';
import {
    getReservations,
    createReservation,
    getReservation,
    updateReservation
} from '../controllers/reservationController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getReservations)
    .post([
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('date', 'Date is required').not().isEmpty(),
        check('time', 'Time is required').not().isEmpty(),
        check('phone', 'Phone number is required').not().isEmpty(),
        check('guests', 'Number of guests is required').isInt({ min: 1 })
    ], createReservation);

router.route('/:id')
    .get(protect, admin, getReservation)
    .put(protect, admin, updateReservation);

export default router;

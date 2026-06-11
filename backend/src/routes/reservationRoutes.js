const express = require('express');
const router = express.Router();
const { createReservation, getMyReservations, cancelReservation } = require('../controllers/reservationController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, createReservation);
router.get('/my', authenticate, getMyReservations);
router.delete('/:id', authenticate, cancelReservation);

module.exports = router;
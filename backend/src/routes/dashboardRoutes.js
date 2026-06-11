const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// Admin only
router.get('/stats', authenticate, authorizeAdmin, getDashboardStats);

module.exports = router;
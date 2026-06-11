const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
  changePassword,
  toggleUserStatus
} = require('../controllers/userController');

const { authenticate, authorizeAdmin } = require('../middleware/auth');

// IMPORTANT: static routes must come BEFORE dynamic /:id routes

// User self-service routes (put BEFORE /:id to avoid conflicts)
router.put('/profile', authenticate, updateProfile);
router.put('/password', authenticate, changePassword);

// Admin routes
router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.get('/:id', authenticate, authorizeAdmin, getUserById);
router.put('/:id', authenticate, authorizeAdmin, updateUser);
router.delete('/:id', authenticate, authorizeAdmin, deleteUser);
router.put('/:id/status', authenticate, authorizeAdmin, toggleUserStatus);

module.exports = router;
const express = require('express');
const router = express.Router();
const { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
} = require('../controllers/bookController');

const { authenticate, authorizeAdmin } = require('../middleware/auth');

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected routes (Admin only)
router.post('/', authenticate, authorizeAdmin, createBook);
router.put('/:id', authenticate, authorizeAdmin, updateBook);
router.delete('/:id', authenticate, authorizeAdmin, deleteBook);

module.exports = router;
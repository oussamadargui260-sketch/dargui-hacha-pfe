const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, getMyBorrows, getAllBorrows } = require('../controllers/borrowController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.post('/', authenticate, borrowBook);
router.put('/return', authenticate, returnBook);
router.get('/my', authenticate, getMyBorrows);
router.get('/', authenticate, authorizeAdmin, getAllBorrows);

module.exports = router;
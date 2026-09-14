const express = require('express');
const router = express.Router();
const { addItemToCart, viewCart, deleteCartItem } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

// Sabhi cart routes ke liye login zaroori hai
router.post('/add', verifyToken, addItemToCart);
router.get('/', verifyToken, viewCart);
router.delete('/:id', verifyToken, deleteCartItem);

module.exports = router;
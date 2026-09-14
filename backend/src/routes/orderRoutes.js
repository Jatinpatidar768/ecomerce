const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/place', verifyToken, placeOrder);

module.exports = router;